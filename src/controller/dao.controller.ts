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
import { GenerateDaoLinksResponseDto } from 'src/dto/dao/generate-dao-links-res.dto';
import { GetDaoDto } from '../dto/dao/get-dao.dto'
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
        cb(null, file.fieldname.concat(file.originalname).replace(' ', '-'));
      },
    }) })
  )
  async generateImagesLink(
    @UploadedFiles() images: { ava: Express.Multer.File, lowImg: Express.Multer.File, mediumImg: Express.Multer.File, highImg: Express.Multer.File }
  ): Promise<string[]> {
    console.log(images);

    const res = this.daoService.generateImagesLink(images)
    return res
  }

  @UniDecorators.Post(
    '/generate-link',
    'Generate 4 ipfs links to dao info and 3 tokens meta',
    true,
    GenerateDaoLinksResponseDto
  )
  async generateDaoLink(@Body() dto: GenerateDaoLinkDto): Promise<GenerateDaoLinksResponseDto> {
    const res = this.daoService.generateDaoLink(dto)
    return res
  }

  @UniDecorators.Post(
    '/create',
    'Create new DAO in db',
    false,
    GetDaoDto
  )
  async createDao(@Body() createDaoDto: CreateDaoDto): Promise<DaoEntity> {
    const res = await this.daoService.create(createDaoDto)
    return res
  }

  @UniDecorators.Post(
    '/add-user',
    'Add user to dao',
    false,
    GetDaoDto
  )
  async addUserToDao(@Body() addUserToDaoDto: AddUserToDaoDto): Promise<DaoEntity> {
    const res = await this.daoService.addUser(addUserToDaoDto)
    return res
  }

  @UniDecorators.Get(
    '',
    'Get all Daos',
    false
  )
  async getAll(): Promise<DaoEntity[]> {
    const res = await this.daoService.getAll()
    return res
  }

  @UniDecorators.Get(
    '/:daoAddress',
    'Get all dao info',
    false,
    DaoEntity
  )
  async getDao(@Param('daoAddress') daoAddress: string): Promise<DaoEntity> {
    const res = await this.daoService.getByAddress(daoAddress)
    return res
  }
}
