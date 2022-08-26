import {
  Param,

} from '@nestjs/common'

import { UniDecorators } from '@unistory/route-decorators'
import { UserEntity } from 'src/data/entity/user.entiry'

import { UserService } from 'src/service/user.service'
import { DaoEntity } from '../data/entity/dao.entity'

@UniDecorators.Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UniDecorators.Get(
    '/get-daos/:userAddress',
    'Get all daos for user',
    false,
    DaoEntity
  )
  async getDaos(@Param('userAddress') address: string): Promise<DaoEntity[]> {
    const res = await this.userService.getAllDaosByUserAddress(address)
    return res
  }

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
}
