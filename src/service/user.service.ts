import { Injectable } from '@nestjs/common'
import { UserRepository } from 'src/repository/user.repository'
import { DaoEntity } from '../data/entity/dao.entity'

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async getAllDaos(userId: string): Promise<DaoEntity[]> {
    const res = await this.userRepository.getAllDaosByUserAddress(userId)
    return res
  }
}
