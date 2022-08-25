import { Injectable } from '@nestjs/common'
import { readFileSync, unlink } from 'fs';
import { extname } from 'path'
import { DaoEntity } from 'src/data/entity/dao.entity';
import { AddUserToDaoDto } from '../dto/dao/add-user-to-dao.dto'
import { DaoRepository } from '../repository/dao.repository'
import { CreateDaoDto } from '../dto/dao/create-dao.dto'
import { UploadImagesDto } from '../dto/dao/upload-images.dto'
import { FileService } from './file.service'
import { IpfsService } from './ipfs.service'

@Injectable()
export class DaoService {
  constructor(private readonly ipfsService: IpfsService, private readonly fileService: FileService, private readonly daoRepository: DaoRepository) {}

  async generateImagesLink(images: UploadImagesDto): Promise<string[]> {
    const imageLinks = await Promise.all(Object.values(images).map(async (file) => {
      const path = this.fileService.getPath(file[0].filename)

      const buffer = readFileSync(path);
      unlink(path, () => {})

      const res = await this.ipfsService.loadImg(buffer, extname(file[0]?.filename))
      return res
    }))
    return imageLinks
  }

  async createDao(createDaoDto: CreateDaoDto): Promise<string> {
    const string = JSON.stringify(createDaoDto)
    const res = await this.ipfsService.loadJson(string)
    return res
  }

  async addUser(dto: AddUserToDaoDto): Promise<DaoEntity> {
    const dao = await this.daoRepository.findByAddress(dto.daoAddress);
    // TODO Разобраться как добавлять юзера в массив
    (await dao.users).push()

    return dao
  }
}
