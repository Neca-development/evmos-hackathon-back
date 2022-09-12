import {
  Body,
  Param,

} from '@nestjs/common'

import { UniDecorators } from '@unistory/route-decorators'
import { UserEntity } from 'src/data/entity/user.entiry'

import { UserService } from 'src/service/user.service'
import { CreateUserDto } from '../dto/user/create-user.dto'

@UniDecorators.Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UniDecorators.Get(
    '/:userAddress',
    'Get all daos for user',
    false,
    UserEntity
  )
  async getUser(@Param('userAddress') address: string): Promise<UserEntity> {
    const res = await this.userService.getByAddress(address)
    return res
  }

  @UniDecorators.Post(
    '/create',
    'Create new user',
    false,
    UserEntity
  )
  async createUser(@Body() dto: CreateUserDto): Promise<UserEntity> {
    const res = await this.userService.createUser(dto)
    return res
  }
}
