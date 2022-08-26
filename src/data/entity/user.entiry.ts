import {
  BaseEntity,
  Column,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,

} from 'typeorm';
import { DaoEntity } from './dao.entity';

@Entity()
export class UserEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
    id: number;

  @Column({ unique: true })
    walletAddress: string;

  @ManyToMany(() => DaoEntity, (dao) => dao.users)
    daos: DaoEntity[]
}
