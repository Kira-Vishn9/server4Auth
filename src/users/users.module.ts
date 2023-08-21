import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './newUser.entity';
import { UsersController } from './users.controller';
import { AuthService } from '../auth/auth.service';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UsersService, AuthService],
  exports: [UsersService, UsersModule, TypeOrmModule],
  controllers: [UsersController],
})
export class UsersModule {}
