import { Injectable, BadRequestException } from '@nestjs/common'
import { UserRepository } from 'src/repository/user.repository'
import { UserEntity } from 'src/data/entity/user.entiry'
import { ErrorMessages } from '../infrastructure/const/error-messages.const'
import { DaoEntity } from '../data/entity/dao.entity'

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async getAllDaosByUserAddress(userAddress: string): Promise<DaoEntity[]> {
    const user = await this.userRepository.getByAddress(userAddress)
    if (!user) {
      throw new BadRequestException(ErrorMessages.USER_NOT_FOUND)
    }
    const daos = await user.daos()
    return daos
  }

  async createUser(userAddress: string) {
    const user = await this.userRepository.getByAddress(userAddress)
    if (user != null) {
      throw new BadRequestException(
        ErrorMessages.USER_ALREADY_EXIST
      )
    }
    const res = await this.userRepository.create(userAddress)
    return res
  }

  async getByAddress(address: string): Promise<UserEntity> {
    const res = await this.userRepository.getByAddress(address)
    return res
  }
}
