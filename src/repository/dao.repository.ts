import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { UserEntity } from '../data/entity/user.entiry'

import { DaoEntity } from '../data/entity/dao.entity'

@Injectable()
export class DaoRepository {
  private readonly repository: Repository<DaoEntity>;

  constructor(
    @InjectDataSource()
    private readonly dataSource: DataSource,
  ) {
    this.repository = this.dataSource.getRepository(DaoEntity);
  }

  async getAllUsersByDaoAddress(daoAddress: string): Promise<UserEntity[]> {
    const dao = await this.repository.findOne({ where: { contractAddress: daoAddress } });
    return dao.users
  }

  async addUserToDao(user: UserEntity, daoAddress: string): Promise<DaoEntity> {
    const dao = await this.repository.findOne({ where: { contractAddress: daoAddress } });
    (await dao.users).push(user)

    return dao
  }

  async findByAddress(address: string): Promise<DaoEntity> {
    const res = await this.repository.findOne({ where: { contractAddress: address } })
    return res
  }
}
