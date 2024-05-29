// src/user/dto/create-user.dto.ts
export class CreateUserDto {
    name: string; // 유저의 이름
    age: number; // 유저의 나이
    email: string; // 이메일 필드 추가
  }
  
export class UpdateEmailDto {
    email: string; // 이메일 업데이트를 위한 DTO
  }