import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { UserEntity } from 'src/data/entity/user.entiry';
import { DataSource, Repository } from 'typeorm';
import { DaoEntity } from '../data/entity/dao.entity'

@Injectable()
export class UserRepository {
  private readonly repository: Repository<UserEntity>;

  constructor(
    @InjectDataSource()
    private readonly dataSource: DataSource,
  ) {
    this.repository = this.dataSource.getRepository(UserEntity);
  }

  async getAllDaosByUserAddress(userAddress: string): Promise<DaoEntity[]> {
    const user = await this.repository.findOne({ where: { contractAddress: userAddress } });
    return user.daos
  }

  async save(userAddress: string): Promise<UserEntity> {
    const res = await this.repository.save({ contractAddress: userAddress })
    return res
  }
}
