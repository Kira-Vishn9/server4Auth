import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Redirect,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';

class NewUserDto {
  mail: string;
  password: string;
}

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  addNewUser(@Body() data: NewUserDto) {
    return this.authService.addNewUser(data);
  }

  @UseGuards(AuthGuard)
  @Post('update')
  updateStatus(@Body() updateStatusDto: { id: number; state: string }) {
    return this.authService.updateUserStatus(
      updateStatusDto.id,
      updateStatusDto.state,
    );
  }

  @Post('login')
  async login(
    @Request() req,
    @Body() dataLogDto: { mail: string; password: string },
  ) {
    const user = await this.authService.validateUser(
      dataLogDto.mail,
      dataLogDto.password,
    );
    if (!user) {
      return { status: HttpStatus.NOT_FOUND };
    }

    const userEmail = user.mail;
    const userId = user.id;

    const token = userId + '!' + userEmail;

    this.authService.addToken(token, userId);

    return {
      status: HttpStatus.OK,
      token,
    };
  }

  @UseGuards(AuthGuard)
  @Post('logout')
  async logout(@Request() req) {
    const user = req?.user;
    const token = user?.token || '';

    this.authService.removeToken(token);

    return { status: HttpStatus.OK };
  }
}
