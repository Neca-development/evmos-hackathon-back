import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
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

  async getByAddress(daoAddress: string): Promise<VotingEntity[]> {
    const votings = await this.repository.find({ where: { daoAddress } });
    return votings
  }

  // async create(userAddress: string): Promise<VotingEntity> {
  //   const res = await this.repository.create({ walletAddress: userAddress }).save()
  //   return res
  // }

  // async delete(userAddress: string): Promise<any> {
  //   const user = await this.getByAddress(userAddress)
  //   return this.repository.delete({ walletAddress: user.walletAddress })
  // }
}
