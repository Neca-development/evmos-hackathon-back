import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DaoEntity } from 'src/data/entity/dao.entity';
import { VotingEntity } from 'src/data/entity/voting.entity';

import { DataSource, Repository } from 'typeorm';

@Injectable()
export class VotingRepository {
  private readonly repository: Repository<VotingEntity>;

  constructor(
    @InjectDataSource()
    private readonly dataSource: DataSource,
  ) {
    this.repository = this.dataSource.getRepository(VotingEntity);
  }

  async getById(id: number): Promise<VotingEntity[]> {
    const votings = await this.repository.find({ where: { id } },);
    return votings
  }

  async create(ipfsUrl: string, smartContractId: number, dao: DaoEntity): Promise<VotingEntity> {
    const res = await this.repository.create({ ipfsUrl, smartContractId, dao }).save()
    return res
  }

  // async delete(userAddress: string): Promise<any> {
  //   const user = await this.getByAddress(userAddress)
  //   return this.repository.delete({ walletAddress: user.walletAddress })
  // }
}
