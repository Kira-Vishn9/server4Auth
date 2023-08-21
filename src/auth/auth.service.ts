import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  private static _tokens: Record<string, number> = {};
  constructor(private usersService: UsersService) {}
  addToken(token: string, userId: number) {
    AuthService._tokens[token] = userId;
  }
  checkToken(token: string): boolean {
    return !!AuthService._tokens[token];
  }
  getIdByToken(token: string): number | undefined {
    return AuthService._tokens[token];
  }
  removeToken(token: string) {
    delete AuthService._tokens[token];
  }

  async validateUser(mail: string, pass: string): Promise<any> {
    const user = await this.usersService.findOneByEmail(mail);

    if (user && user.password === pass && !user.blocked) {
      const { password, ...result } = user;

      return result;
    }
    return null;
  }

  async checkIsUserAllowed(id: number): Promise<boolean> {
    const user = await this.usersService.findOne(id);
    const isBlocked = user?.blocked;
    return !!user && !isBlocked;
  }
  addNewUser(user) {
    return this.usersService.addNewUser(user);
  }
  updateUserStatus(id, state) {
    return this.usersService.updateUserStatus(id, state);
  }
}
