import { DaoEntity } from 'src/data/entity/dao.entity'
import { DaoService } from 'src/service/dao.service'
import { CreateMintRequestDto } from 'src/dto/mint-request/create-mint-request.dto';
import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common'

import { InjectMapper } from '@automapper/nestjs'
import { Mapper } from '@automapper/core'
import { ErrorMessages } from 'src/infrastructure/const/error-messages.const'
import { MintRequestRepository } from 'src/repository/mint-request.repository'
import { createReadStream, rm } from 'fs'
import { CsvParser, ParsedData } from 'nest-csv-parser'
import { join, resolve } from 'path';
import { ethers } from 'ethers';
import { RegExps } from '../infrastructure/const/reg-exps.constant'
import { ApiConfigService } from '../infrastructure/config/api-config.service'
import { UserService } from './user.service'
import { MintRequestDto } from '../dto/mint-request/mint-request.dto';
import { MintRequestEntity } from '../data/entity/mint-request.entity'

@Injectable()
export class MintRequestService {
  constructor(
    @InjectMapper()
    private readonly mapper: Mapper,

    private readonly mintRequestRepository: MintRequestRepository,
    private readonly apiConfigService:ApiConfigService,
    private readonly daoService: DaoService,
    private readonly userService: UserService,
    private readonly csvParser: CsvParser
  ) {}

  async getMintRequestList(): Promise<MintRequestDto[]> {
    const mintRequests = await this.mintRequestRepository.getList();
    return this.mapper.mapArray(mintRequests, MintRequestEntity, MintRequestDto);
  }

  async generateMintRequestList(
    file: Express.Multer.File,
    daoAddress: string,
  ): Promise<any> {
    console.log(file);

    const filePath = join(resolve(''), 'uploads', 'csv', file.originalname)

    if (!daoAddress.match(RegExps.ETH_ADDRESS)) {
      await rm(filePath, { force: true }, () => {
      })
      throw new BadRequestException(ErrorMessages.ADDRESS_NOT_CORRECT)
    }

    const dao = this.daoService.getByAddress(daoAddress)

    if (!dao) {
      throw new BadRequestException(ErrorMessages.DAO_NOT_FOUND)
    }

    const stream = createReadStream(filePath)
    const data: ParsedData<MintRequestEntity> = await this.csvParser.parse(
      stream,
      MintRequestEntity,
      null,
      null,
      { strict: true, separator: ',' },
    );

    rm(filePath, { force: true }, () => {})

    data.list.forEach((el) => {
      if (el.userAddress.match(RegExps.ETH_ADDRESS)) {
        this.mintRequestRepository.create(daoAddress, el.tokenType, el.userAddress)
      }
    })
    return null
  }

  async getMintRequestListByUserAddress(userAddress: string): Promise<MintRequestDto[]> {
    const mintRequests = await this.mintRequestRepository.getAllByUserAddress(userAddress);
    return this.mapper.mapArray(mintRequests, MintRequestEntity, MintRequestDto);
  }

  async createMintRequest(createDto: CreateMintRequestDto): Promise<number> {
    const { daoAddress, tokenType, userAddress } = createDto

    const mintRequest = await this.mintRequestRepository.create(
      daoAddress,
      tokenType,
      userAddress,
    )
    return mintRequest.id;
  }

  async removeMintRequest(id: number): Promise<void> {
    const mintRequest = await this.mintRequestRepository.getOneById(id);

    if (mintRequest == null) {
      throw new NotFoundException(ErrorMessages.MINT_REQUEST_NOT_FOUND);
    }

    await this.mintRequestRepository.remove(mintRequest);
  }

  async generateSignature(mintRequestId: number): Promise<string> {
    const entity = await this.mintRequestRepository.getOneById(mintRequestId)
    if (!entity) {
      throw new BadRequestException(ErrorMessages.MINT_REQUEST_NOT_FOUND)
    }
    const wallet = new ethers.Wallet(this.apiConfigService.ipfsToken)

    const res = await wallet.signMessage(`${entity.daoAddress}${entity.userAddress}${entity.tokenType}`)

    return res
  }

  async successMintRequest(mintRequestId: number): Promise<DaoEntity> {
    const mintRequest = await this.mintRequestRepository.getOneById(mintRequestId)

    if (mintRequest == null) {
      throw new BadRequestException(ErrorMessages.ALREADY_MINTED)
    }

    await this.userService.createUser(mintRequest.userAddress)

    const dao = await this.daoService.addUser({ userAddress: mintRequest.userAddress, daoAddress: mintRequest.daoAddress })
    await this.mintRequestRepository.remove(mintRequest)

    return dao
  }
}
