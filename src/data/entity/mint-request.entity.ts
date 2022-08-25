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
    id: number;

  @Column()
    userAddress: string;

  @Column({
    type: 'enum',
    enum: TokenTypeEnum,
    default: TokenTypeEnum.low,
  })
    tokenType: TokenTypeEnum;

  @Column()
    daoAddress: string;
}
