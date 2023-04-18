import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'users' })
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    length: 32,
    nullable: false,
  })
  first_name: string;

  
  @Column({
    type: 'varchar',
    length: 32,
    nullable: false,
  })
  last_name: string;

  @Column({
    type: 'varchar',
    length: 32,
    nullable: false,
  })
  phone: number;

  @Column({
    type: 'varchar',
    length: 32,
    nullable: false,
  })
  email: string;

  @Column({
    type: 'varchar',
    nullable: false,
  })
  password: string;
}
