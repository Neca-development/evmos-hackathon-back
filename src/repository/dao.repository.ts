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

  async getByAddress(daoAddress: string): Promise<DaoEntity> {
    const dao = await this.repository.findOneOrFail({ where: { contractAddress: daoAddress }, relations: ['users', 'votings'] });
    return dao
  }

  async addUserToDao(user: UserEntity, daoAddress: string): Promise<DaoEntity> {
    const dao = await this.repository.findOne({ where: { contractAddress: daoAddress } });
    (await dao.users).push(user)

    return dao
  }

  async create(contractAddress: string, ipfsUrl: string, creatorAddress: string): Promise<DaoEntity> {
    const dao = await this.repository.create({ contractAddress, ipfsUrl, creatorAddress })
    return dao
  }

  async getAll(): Promise<DaoEntity[]> {
    const daos = await this.repository.find({ relations: ['users', 'votings'] })
    return daos
  }
}
