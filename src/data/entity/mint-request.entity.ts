import { DaoEntity } from 'src/data/entity/dao.entity'
import { AutoMap } from '@automapper/classes';
import { TokenTypeEnum } from 'src/infrastructure/config/enums/token-type.enum'
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

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
    default: TokenTypeEnum.LOW,
  })
  @AutoMap()
    tokenType: TokenTypeEnum;

  @Column()
  @AutoMap()
    daoAddress: string;

  @ManyToOne(() => DaoEntity, (dao) => dao.mintRequests)
  @ApiProperty({ type: DaoEntity })
    dao: DaoEntity
}
