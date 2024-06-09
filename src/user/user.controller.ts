// src/user/user.controller.ts
import { Controller, Get, Post, Body, Param, Put, Delete, Patch } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto, UpdateEmailDto } from './dto/user.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';

@ApiTags('users') // Swagger 태그 추가
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiOperation({ summary: '새 유저 생성' }) // 한글로 변경
  @ApiResponse({ status: 201, description: '유저가 성공적으로 생성되었습니다.' })
  @ApiBody({ type: CreateUserDto })
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  @ApiOperation({ summary: '모든 유저 조회' }) // 한글로 변경
  @ApiResponse({ status: 200, description: '모든 유저를 반환합니다.' })
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'ID로 유저 조회' }) // 한글로 변경
  @ApiParam({ name: 'id', description: '유저 ID' })
  @ApiResponse({ status: 200, description: '주어진 ID의 유저를 반환합니다.' })
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Put(':id')
  @ApiOperation({ summary: '유저 업데이트' }) // 한글로 변경
  @ApiParam({ name: 'id', description: '유저 ID' })
  @ApiBody({ type: CreateUserDto })
  @ApiResponse({ status: 200, description: '유저가 성공적으로 업데이트되었습니다.' })
  update(@Param('id') id: string, @Body() updateUserDto: CreateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: '유저 삭제' }) // 한글로 변경
  @ApiParam({ name: 'id', description: '유저 ID' })
  @ApiResponse({ status: 200, description: '유저가 성공적으로 삭제되었습니다.' })
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }

  @Patch(':id/email')
  @ApiOperation({ summary: '유저 이메일 업데이트' }) // 한글로 변경
  @ApiParam({ name: 'id', description: '유저 ID' })
  @ApiBody({ type: UpdateEmailDto })
  @ApiResponse({ status: 200, description: '이메일이 성공적으로 업데이트되었습니다.' })
  updateEmail(@Param('id') id: string, @Body() updateEmailDto: UpdateEmailDto) {
    return this.userService.updateEmail(+id, updateEmailDto);
  }

  @Patch(':id/toggle-active')
  @ApiOperation({ summary: '유저 활성 상태 변경' }) // 한글로 변경
  @ApiParam({ name: 'id', description: '유저 ID' })
  @ApiResponse({ status: 200, description: '유저의 활성 상태가 성공적으로 변경되었습니다.' })
  toggleActiveStatus(@Param('id') id: string) {
    return this.userService.toggleActiveStatus(+id);
  }
}
