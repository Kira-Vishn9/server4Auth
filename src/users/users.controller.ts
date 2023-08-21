import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthGuard } from '../auth/auth.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Post('delete')
  async deleteUsers(@Body() body: { ids: number[] }) {
    for (let i = 0; i < body.ids.length; i++) {
      const userId = body.ids[i] || -1;
      await this.userService.removeUser(userId);
    }
    return HttpStatus.OK;
  }

  @Get('get')
  async getAllUser() {
    return await this.userService.findAll();
  }

  @Post(':id')
  async block(@Param() params) {
    const userId = params.id || -1;

    await this.userService.blockUser(userId);

    return HttpStatus.OK;
  }
}
