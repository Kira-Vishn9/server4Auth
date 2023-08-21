import { UsersService } from '../users/users.service';
export declare class AuthService {
    private usersService;
    private static _tokens;
    constructor(usersService: UsersService);
    addToken(token: string, userId: number): void;
    checkToken(token: string): boolean;
    getIdByToken(token: string): number | undefined;
    removeToken(token: string): void;
    validateUser(mail: string, pass: string): Promise<any>;
    checkIsUserAllowed(id: number): Promise<boolean>;
    addNewUser(user: any): Promise<import("@nestjs/common").HttpStatus>;
    updateUserStatus(id: any, state: any): Promise<import("../users/newUser.entity").User>;
}
