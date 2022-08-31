import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DaoEntity } from 'src/data/entity/dao.entity';
import { UserEntity } from 'src/data/entity/user.entiry';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class UserRepository {
  private readonly repository: Repository<UserEntity>;

  constructor(
    @InjectDataSource()
    private readonly dataSource: DataSource,
  ) {
    this.repository = this.dataSource.getRepository(UserEntity);
  }

  async getByAddress(userAddress: string): Promise<UserEntity> {
    const user = await this.repository.findOne({ where: { walletAddress: userAddress }, relations: ['daos'] });
    return user
  }

  async create(userAddress: string, dao: DaoEntity): Promise<UserEntity> {
    const res = await this.repository.create({ walletAddress: userAddress, daos: [dao] }).save()
    return res
  }

  async delete(userAddress: string): Promise<any> {
    const user = await this.getByAddress(userAddress)
    return this.repository.delete({ walletAddress: user.walletAddress })
  }
}
