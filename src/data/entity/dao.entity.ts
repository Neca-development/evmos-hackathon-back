import {
  BaseEntity,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserEntity } from './user.entiry';

@Entity()
export class DaoEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
    id: number;

  @Column()
    ipfsUrl: string;

  @Column()
    contractAddress: string;

  @ManyToMany(() => UserEntity, (user) => user.daos)
  @JoinTable()
    users: Promise<UserEntity[]>
}
