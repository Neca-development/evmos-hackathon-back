import { UserRepository } from 'src/repository/user.repository'
import { CreateMintRequestDto } from 'src/dto/mint-request/create-mint-request.dto';
import { Injectable, NotFoundException } from '@nestjs/common'

import { InjectMapper } from '@automapper/nestjs'
import { Mapper } from '@automapper/core'
import { ErrorMessages } from 'src/infrastructure/const/error-messages.const'
import { MintRequestRepository } from 'src/repository/mint-request.repository'
import { createReadStream, rm } from 'fs'
import { CsvParser, ParsedData } from 'nest-csv-parser'
import { join, resolve } from 'path';
import { ethers } from 'ethers';
import { DaoRepository } from '../repository/dao.repository'
import { MintRequestDto } from '../dto/mint-request/mint-request.dto';
import { MintRequestEntity } from '../data/entity/mint-request.entity'

@Injectable()
export class MintRequestService {
  constructor(
    @InjectMapper()
    private readonly mapper: Mapper,

    private readonly mintRequestRepository: MintRequestRepository,
    private readonly daoRepository: DaoRepository,
    private readonly userRepository: UserRepository,
    private readonly csvParser: CsvParser
  ) {}

  async getMintRequestList(): Promise<MintRequestDto[]> {
    const mintRequests = await this.mintRequestRepository.getList();
    return this.mapper.mapArray(mintRequests, MintRequestEntity, MintRequestDto);
  }

  async generateMintRequestList(
    file: Express.Multer.File,
    daoAddress: string,
  ): Promise<void> {
    const filePath = join(resolve(''), 'uploads', 'csv', file.originalname)

    const stream = createReadStream(filePath)
    const data: ParsedData<MintRequestEntity> = await this.csvParser.parse(
      stream,
      MintRequestEntity,
      null,
      null,
      { strict: true, separator: ',' },
    );

    rm(filePath, { force: true }, () => {})

    console.log(data);
    console.log(data.list);

    data.list.forEach((el) => {
      console.log(el.userAddress);

      this.mintRequestRepository.create(daoAddress, el.tokenType, el.userAddress)
    })
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

    const wallet = new ethers.Wallet('')

    const res = await wallet.signMessage(JSON.stringify(entity))

    return res
  }

  async successMintRequest(mintRequestId: number) {
    const mintRequest = await this.mintRequestRepository.getOneById(mintRequestId)

    this.mintRequestRepository.remove(mintRequest)

    const user = await this.userRepository.save(mintRequest.userAddress)

    await this.daoRepository.addUserToDao(user, mintRequest.daoAddress)
  }
}
