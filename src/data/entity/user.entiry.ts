import {
  BaseEntity,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,

} from 'typeorm';
import { DaoEntity } from './dao.entity';

@Entity()
export class UserEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
    id: number;

  @Column({ unique: true })
    contractAddress: string;

  @ManyToMany(() => DaoEntity, (dao) => dao.users)
  @JoinTable()
    daos: Promise<DaoEntity[]>
}
