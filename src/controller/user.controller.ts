import {
  Body,

} from '@nestjs/common'

import { UniDecorators } from '@unistory/route-decorators'

import { DaoService } from 'src/service/dao.service'
import { CreateDaoDto } from '../dto/dao/create-dao.dto'

@UniDecorators.Controller('user')
export class UserController {
  constructor(private readonly daoService: DaoService) {}

  @UniDecorators.Get(
    '/get-daos',
    'Get all daos for user',
    false
  )
  async createDao(@Body() createDaoDto: CreateDaoDto): Promise<string> {
    const res = this.daoService.createDao(createDaoDto)
    return res
  }
}
