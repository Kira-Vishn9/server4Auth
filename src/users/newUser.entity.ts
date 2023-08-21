import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  mail: string;

  @Column()
  password: string;

  @Column()
  stateUser: boolean;

  @Column()
  dateReg: string;

  @Column()
  lastLog: number;

  @Column()
  blocked: boolean;
}
