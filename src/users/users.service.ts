import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './newUser.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}
  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }
  findOneByEmail(mail: string): Promise<User | null> {
    return this.usersRepository.findOneBy({ mail });
  }
  findOne(id: number): Promise<User | null> {
    return this.usersRepository.findOneBy({ id });
  }
  async blockUser(id: number) {
    await this.usersRepository.update({ id }, { blocked: true });
  }
  async removeUser(id: number): Promise<void> {
    await this.usersRepository.delete(id);
  }

  getDayReg() {
    const currentDate = new Date();
    const day = currentDate.getDate();
    const month = currentDate.getMonth() + 1;
    const year = currentDate.getFullYear();
    return `${day}-${month}-${year}`;
  }
  getName(mail: string) {
    return mail.split('@')[0];
  }
  async addNewUser(data) {
    const user = new User();

    user.name = this.getName(data.mail);
    user.password = data.password;
    user.mail = data.mail;
    user.stateUser = true;
    user.dateReg = this.getDayReg();
    user.lastLog = new Date().getDate();
    user.blocked = false;

    await this.usersRepository.save(user);
    return HttpStatus.OK;
  }

  async updateUserStatus(id: number, state: boolean) {
    console.log(id);
    console.log(state);
    const user = await this.usersRepository.findOneBy({ id });
    console.log(user);
    user.blocked = state;
    console.log(user.blocked);

    await this.usersRepository.save(user);
    return user;
  }
}
