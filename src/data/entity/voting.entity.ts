import {
  BaseEntity,
  Column,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { DaoEntity } from './dao.entity';

@Entity()
export class VotingEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
    id: number;

  @Column()
    daoAddress: string;

  @ManyToMany(() => DaoEntity, (dao) => dao.users)
    daos: DaoEntity[]
}
