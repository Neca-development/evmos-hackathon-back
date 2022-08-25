import {
  Param,

} from '@nestjs/common'

import { UniDecorators } from '@unistory/route-decorators'

import { UserService } from 'src/service/user.service'
import { DaoEntity } from '../data/entity/dao.entity'

@UniDecorators.Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UniDecorators.Get(
    '/get-daos/:userAddress',
    'Get all daos for user',
    false
  )
  async getDaos(@Param('userAddress') address: string): Promise<DaoEntity[]> {
    const res = this.userService.getAllDaosByUserAddress(address)
    return res
  }
}
