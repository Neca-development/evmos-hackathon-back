import { TokenTypeEnum } from 'src/infrastructure/config/enums/token-type.enum'
import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { MintRequestEntity } from 'src/data/entity/mint-request.entity';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class MintRequestRepository {
  private readonly repository: Repository<MintRequestEntity>;

  constructor(
    @InjectDataSource()
    private readonly dataSource: DataSource,
  ) {
    this.repository = this.dataSource.getRepository(MintRequestEntity);
  }

  async getOneByUserAddress(userAddress: string): Promise<MintRequestEntity> {
    return this.repository.findOne({ where: { userAddress } });
  }

  async getOneById(id: number): Promise<MintRequestEntity> {
    return this.repository.findOne({ where: { id } });
  }

  async getAllByUserAddress(userAddress: string): Promise<MintRequestEntity[]> {
    return this.repository.find({ where: { userAddress } });
  }

  async getList(): Promise<MintRequestEntity[]> {
    return this.repository.find();
  }

  async create(
    daoAddress: string,
    tokenType: TokenTypeEnum,
    userAddress: string,
  ): Promise<MintRequestEntity> {
    return this.repository.create({ daoAddress, tokenType, userAddress }).save()
  }

  async remove(entity: MintRequestEntity): Promise<void> {
    await this.repository.remove(entity);
  }
}
