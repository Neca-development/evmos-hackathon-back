import { AutoMap } from '@automapper/classes';
import { TokenTypeEnum } from 'src/infrastructure/config/enums/token-type.enum'
import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class MintRequestEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  @AutoMap()
    id: number;

  @Column()
  @AutoMap()
    userAddress: string;

  @Column({
    type: 'enum',
    enum: TokenTypeEnum,
    default: TokenTypeEnum.low,
  })
  @AutoMap()
    tokenType: TokenTypeEnum;

  @Column()
  @AutoMap()
    daoAddress: string;
}
