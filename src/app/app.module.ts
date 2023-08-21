import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../users/newUser.entity';
import { UsersModule } from '../users/users.module';
import { AuthController } from '../auth/auth.controller';
import { AuthModule } from '../auth/auth.module';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'db4free.net',
      port: 3306,
      username: 'kirillvishn9',
      password: 'ytekjdbvsq1',
      database: 'testserver123987',
      entities: [User],
      synchronize: true,
      autoLoadEntities: true,
    }),
    UsersModule,
    AuthModule,
  ],
  controllers: [AuthController],
  providers: [AuthModule],
})
export class AppModule {}
