import { HttpStatus } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './newUser.entity';
export declare class UsersService {
    private usersRepository;
    constructor(usersRepository: Repository<User>);
    findAll(): Promise<User[]>;
    findOneByEmail(mail: string): Promise<User | null>;
    findOne(id: number): Promise<User | null>;
    blockUser(id: number): Promise<void>;
    removeUser(id: number): Promise<void>;
    getDayReg(): string;
    getName(mail: string): string;
    addNewUser(data: any): Promise<HttpStatus>;
    updateUserStatus(id: number, state: boolean): Promise<User>;
}
