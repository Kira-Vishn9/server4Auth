import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly authService: AuthService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);

    console.log('token', token);

    if (!token) {
      throw new UnauthorizedException();
    }

    const tokenExist = this.authService.checkToken(token);

    console.log('tokenExist', tokenExist);

    if (!tokenExist) {
      throw new UnauthorizedException();
    }

    const id = this.authService.getIdByToken(token) || -1;

    const isUserAllowed = await this.authService.checkIsUserAllowed(id);

    if (!isUserAllowed) {
      this.authService.removeToken(token);
      throw new UnauthorizedException();
    }

    request['user'] = {
      id,
      token,
    };

    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    // @ts-ignore
    const [type, token] = request.headers?.authorization?.split(' ') || [];
    return type === 'Bearer' ? token : undefined;
  }
}
