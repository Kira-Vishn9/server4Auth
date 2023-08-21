import { HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
declare class NewUserDto {
    mail: string;
    password: string;
}
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    addNewUser(data: NewUserDto): Promise<HttpStatus>;
    updateStatus(updateStatusDto: {
        id: number;
        state: string;
    }): Promise<import("../users/newUser.entity").User>;
    login(req: any, dataLogDto: {
        mail: string;
        password: string;
    }): Promise<{
        status: HttpStatus;
        token?: undefined;
    } | {
        status: HttpStatus;
        token: string;
    }>;
    logout(req: any): Promise<{
        status: HttpStatus;
    }>;
}
export {};
