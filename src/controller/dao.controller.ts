import {
  Body,
  Param,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common'
import { FileFieldsInterceptor } from '@nestjs/platform-express'

import { UniDecorators } from '@unistory/route-decorators'
import { diskStorage } from 'multer';
import { GenerateDaoLinkDto } from 'src/dto/dao/generate-dao-link.dto';
import { DaoService } from 'src/service/dao.service'
import { UserEntity } from '../data/entity/user.entiry'
import { DaoEntity } from '../data/entity/dao.entity'
import { AddUserToDaoDto } from '../dto/dao/add-user-to-dao.dto'
import { CreateDaoDto } from '../dto/dao/create-dao.dto'

@UniDecorators.Controller('dao')
export class DaoController {
  constructor(private readonly daoService: DaoService) {}

  @UniDecorators.Post(
    '/upload-nfts',
    'Upload 4 images and get 4 urls to ipfs',
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
    '/generate-link',
    'Generate ipfs link to dao info',
    false
  )
  async generateDaoLink(@Body() dto: GenerateDaoLinkDto): Promise<string> {
    const res = this.daoService.generateDaoLink(dto)
    return res
  }

  @UniDecorators.Post(
    '/create',
    'Create new DAO in db',
    false
  )
  async createDao(@Body() createDaoDto: CreateDaoDto): Promise<DaoEntity> {
    const res = await this.daoService.create(createDaoDto)
    return res
  }

  @UniDecorators.Post(
    '/add-user',
    'Add user to dao',
    false
  )
  async addUserToDao(@Body() addUserToDaoDto: AddUserToDaoDto): Promise<DaoEntity> {
    const res = await this.daoService.addUser(addUserToDaoDto)
    return res
  }

  @UniDecorators.Get(
    '/get-users/:daoAddress',
    'Get users from DAO',
    false
  )
  async getUsers(@Param('daoAddress') address: string): Promise<UserEntity[]> {
    const res = await this.daoService.getUsers(address)

    return res
  }

  @UniDecorators.Get(
    '',
    'Get all Daos',
    false,

  )
  async getAll(): Promise<DaoEntity[]> {
    const res = await this.daoService.getAll()
    return res
  }
}
