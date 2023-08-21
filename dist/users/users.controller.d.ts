import { HttpStatus } from '@nestjs/common';
import { UsersService } from './users.service';
export declare class UsersController {
    private readonly userService;
    constructor(userService: UsersService);
    deleteUsers(body: {
        ids: number[];
    }): Promise<HttpStatus>;
    getAllUser(): Promise<import("./newUser.entity").User[]>;
    block(params: any): Promise<HttpStatus>;
}
