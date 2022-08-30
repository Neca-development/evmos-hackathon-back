import {
  BaseEntity,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { MintRequestEntity } from './mint-request.entity'
import { UserEntity } from './user.entiry';
import { VotingEntity } from './voting.entity';

@Entity()
export class DaoEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
    id: number;

  @Column({ unique: true, })
    ipfsUrl: string;

  @Column({ unique: true })
    contractAddress: string;

  @Column({ nullable: true })
    creatorAddress: string;

  @ManyToMany(() => UserEntity, (user) => user.daos)
  @JoinTable()
    users: UserEntity[]

  @ApiProperty({ isArray: true, type: MintRequestEntity })
  @OneToMany(() => MintRequestEntity, (mintReq) => mintReq.dao)
    mintRequests: MintRequestEntity[]

  @ApiProperty({ isArray: true, type: VotingEntity })
  @OneToMany(() => VotingEntity, (voting) => voting.dao)
    votings: VotingEntity[]
}
