import { AddUserToDaoDto } from './../dto/dao/add-user-to-dao.dto'
import {
  Body,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common'
import { FileFieldsInterceptor } from '@nestjs/platform-express'

import { UniDecorators } from '@unistory/route-decorators'
import { diskStorage } from 'multer';
import { UserEntity } from 'src/data/entity/user.entiry';
import { DaoService } from 'src/service/dao.service'
import { CreateDaoDto } from '../dto/dao/create-dao.dto'

@UniDecorators.Controller('dao')
export class DaoController {
  constructor(private readonly daoService: DaoService) {}

  @UniDecorators.Post(
    '/upload-nfts',
    'Create link',
    false

  )
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'ava', maxCount: 1 },
      { name: 'lowImg', maxCount: 1 },
      { name: 'mediumImg', maxCount: 1 },
      { name: 'highImg', maxCount: 1 },
    ], { storage: diskStorage({
      destination: './uploads/',
      filename: (req, file, cb) => {
        cb(null, file.originalname.replace(' ', '-'));
      },
    }) })
  )
  async generateImagesLink(
    @UploadedFiles() images: { ava: Express.Multer.File, lowImg: Express.Multer.File, mediumImg: Express.Multer.File, highImg: Express.Multer.File }
  ): Promise<string[]> {
    const res = this.daoService.generateImagesLink(images)
    return res
  }

  @UniDecorators.Post(
    '/create-dao',
    'Create DAO and get ipfs link',
    false
  )
  async createDao(@Body() createDaoDto: CreateDaoDto): Promise<string> {
    const res = this.daoService.createDao(createDaoDto)
    return res
  }

  @UniDecorators.Post(
    '/add-user',
    'Get all daos for user',
    false
  )
  async addUserToDao(@Body() addUserToDaoDto: AddUserToDaoDto): Promise<string> {
    const res = await this.daoService.addUser(addUserToDaoDto)
    
    return res
  }
}
