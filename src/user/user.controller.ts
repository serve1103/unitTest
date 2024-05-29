// src/user/user.controller.ts
import { Controller, Get, Post, Body, Param, Put, Delete, Patch } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto, UpdateEmailDto } from './dto/user.dto';

@Controller('user') // '/users' 경로에 대한 요청을 처리하는 컨트롤러
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post() // HTTP POST 요청을 처리하는 메소드
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto); // 새로운 유저 생성
  }

  @Get() // HTTP GET 요청을 처리하는 메소드
  findAll() {
    return this.userService.findAll(); // 모든 유저 조회
  }

  @Get(':id') // 특정 유저 조회를 위한 HTTP GET 요청 처리
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id); // 주어진 id로 유저 조회
  }

  @Put(':id') // 특정 유저 정보를 업데이트하는 HTTP PUT 요청 처리
  update(@Param('id') id: string, @Body() updateUserDto: CreateUserDto) {
    return this.userService.update(+id, updateUserDto); // 주어진 id의 유저 정보 업데이트
  }

  @Delete(':id') // 특정 유저를 삭제하는 HTTP DELETE 요청 처리
  remove(@Param('id') id: string) {
    return this.userService.remove(+id); // 주어진 id의 유저 삭제
  }

  // 이메일 업데이트 엔드포인트 추가
  @Patch(':id/email')
  updateEmail(@Param('id') id: string, @Body() updateEmailDto: UpdateEmailDto) {
    return this.userService.updateEmail(+id, updateEmailDto);
  }
}
