import { GenerateDaoLinkDto } from 'src/dto/dao/generate-dao-link.dto'
import { BadRequestException, Injectable } from '@nestjs/common'
import { readFileSync, unlink } from 'fs';
import { extname } from 'path'
import { DaoEntity } from 'src/data/entity/dao.entity';
import { UserService } from './user.service'
import { UserEntity } from '../data/entity/user.entiry'
import { ErrorMessages } from '../infrastructure/const/error-messages.const'
import { AddUserToDaoDto } from '../dto/dao/add-user-to-dao.dto'
import { DaoRepository } from '../repository/dao.repository'
import { CreateDaoDto } from '../dto/dao/create-dao.dto'
import { UploadImagesDto } from '../dto/dao/upload-images.dto'
import { FileService } from './file.service'
import { IpfsService } from './ipfs.service'

@Injectable()
export class DaoService {
  constructor(private readonly ipfsService: IpfsService, private readonly fileService: FileService, private readonly userService: UserService, private readonly daoRepository: DaoRepository) {}

  async generateImagesLink(images: UploadImagesDto): Promise<string[]> {
    const imageLinks = await Promise.all(Object.values(images).map(async (file) => {
      console.log(file);

      if (!file || !file[0].filename) {
        throw new BadRequestException(
          'Images not found'
        )
      }
      const path = this.fileService.getPath(file[0].filename)

      const buffer = readFileSync(path);
      unlink(path, () => {})

      const res = await this.ipfsService.loadImg(buffer, extname(file[0]?.filename))
      return res
    }))
    return imageLinks
  }

  async generateDaoLink(createDaoDto: GenerateDaoLinkDto): Promise<string> {
    const string = JSON.stringify(createDaoDto)
    const res = await this.ipfsService.loadJson(string)
    return res
  }

  async create(dto: CreateDaoDto): Promise<DaoEntity> {
    const dao = await this.daoRepository.getByAddress(dto.contractAddress)

    if (dao != null) {
      throw new BadRequestException(ErrorMessages.DAO_ALREADY_EXIST)
    }

    const existUser = await this.userService.getByAddress(dto.userAddress)

    if (!existUser) {
      await this.userService.createUser(dto.userAddress)
    }

    await (await this.daoRepository.create(dto.contractAddress, dto.ipfsUrl, dto.userAddress)).save()

    const res = await this.addUser({ daoAddress: dto.contractAddress, userAddress: dto.userAddress })
    return res
  }

  async addUser(dto: AddUserToDaoDto): Promise<DaoEntity> {
    const dao = await this.daoRepository.getByAddress(dto.daoAddress);
    const user = await this.userService.getByAddress(dto.userAddress)

    if (!dao) {
      throw new BadRequestException(ErrorMessages.DAO_NOT_FOUND)
    }

    if (!user) {
      throw new BadRequestException(ErrorMessages.USER_NOT_FOUND)
    }

    const users = await dao.users
    const existUser = await users.find(
      (el) => el.walletAddress === dto.userAddress
    )
    if (existUser != null) {
      throw new BadRequestException('User already added in dao')
    }

    users.push(user)

    dao.users = await Promise.resolve(users)

    await dao.save()

    return dao
  }

  async getUsers(daoAddress: string): Promise<UserEntity[]> {
    const dao = await this.daoRepository.getByAddress(daoAddress)

    if (dao == null) {
      throw new BadRequestException(
        ErrorMessages.DAO_NOT_FOUND
      )
    }

    const users = await dao.users

    return users
  }

  async getAll(): Promise<DaoEntity[]> {
    const daos = await this.daoRepository.getAll()
    return daos
  }

  async getByAddress(daoAddress: string): Promise<DaoEntity> {
    const dao = await this.daoRepository.getByAddress(daoAddress)

    return dao
  }
}
