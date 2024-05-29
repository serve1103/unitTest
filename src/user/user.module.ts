// src/user/user.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entity/user.entity';
import { UserService } from './user.service';
import { UserController } from './user.controller';

@Module({
  imports: [TypeOrmModule.forFeature([User])], // User 엔티티에 대한 TypeORM 모듈 등록
  providers: [UserService], // UserService 등록
  controllers: [UserController], // UserController 등록
})
export class UserModule {}
