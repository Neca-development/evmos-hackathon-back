import { UserRepository } from 'src/repository/user.repository'
import { UserEntity } from 'src/data/entity/user.entiry'
import { Injectable, BadRequestException, forwardRef, Inject } from '@nestjs/common'
import { CreateUserDto } from '../dto/user/create-user.dto'
import { ErrorMessages } from '../infrastructure/const/error-messages.const'
import { DaoEntity } from '../data/entity/dao.entity'
import { DaoService } from './dao.service'

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    @Inject(forwardRef(() => DaoService))
    private readonly daoService: DaoService,
  ) {}

  async getAllDaosByUserAddress(userAddress: string): Promise<DaoEntity[]> {
    const user = await this.userRepository.getByAddress(userAddress)
    if (!user) {
      throw new BadRequestException(ErrorMessages.USER_NOT_FOUND)
    }
    const daos = await user.daos()
    return daos
  }

  async createUser(dto: CreateUserDto): Promise<UserEntity> {
    const user = await this.userRepository.getByAddress(dto.userAddress)
    if (user != null) {
      throw new BadRequestException(
        ErrorMessages.USER_ALREADY_EXIST
      )
    }
    const dao = await this.daoService.getByAddress(dto.daoAddress)
    if (dao != null) {
      throw new BadRequestException(
        ErrorMessages.DAO_NOT_FOUND
      )
    }

    const res = await this.userRepository.create(dto.userAddress, dao)
    return res
  }

  async getByAddress(address: string): Promise<UserEntity> {
    const res = await this.userRepository.getByAddress(address)
    return res
  }
}
