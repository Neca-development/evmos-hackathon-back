import { ApiProperty } from '@nestjs/swagger';
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { DaoEntity } from './dao.entity';

@Entity()
export class VotingEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
    id: number;

  @Column()
    ipfsUrl: string;

  @Column()
    smartContractId: number;

  @ManyToOne(() => DaoEntity, (dao) => dao.votings)
  @ApiProperty({ type: DaoEntity })
    dao: DaoEntity
}
