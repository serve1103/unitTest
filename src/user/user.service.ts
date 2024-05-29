// src/user/user.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entity/user.entity';
import { CreateUserDto, UpdateEmailDto } from './dto/user.dto';

@Injectable() // NestJS 의존성 주입 시스템에 의해 관리되는 서비스임을 표시
export class UserService {
  constructor(
    @InjectRepository(User) // User 엔티티를 관리하는 TypeORM 레포지토리 주입
    private userRepository: Repository<User>,
  ) {}

  // 새로운 유저 생성
  create(createUserDto: CreateUserDto): Promise<User> {
    const user = this.userRepository.create(createUserDto); // DTO를 엔티티로 변환
    return this.userRepository.save(user); // 엔티티를 데이터베이스에 저장
  }

  // 모든 유저 조회
  findAll(): Promise<User[]> {
    return this.userRepository.find(); // 데이터베이스에서 모든 유저 조회
  }

  // 특정 유저 조회
  findOne(id: number): Promise<User> {
    return this.userRepository.findOneBy({ id }); // 주어진 id로 유저 조회
  }

  // 유저 정보 업데이트
  async update(id: number, updateUserDto: CreateUserDto): Promise<User> {
    await this.userRepository.update(id, updateUserDto); // 주어진 id의 유저 정보 업데이트
    return this.userRepository.findOneBy({ id }); // 업데이트된 유저 정보 반환
  }

  // 유저 삭제
  async remove(id: number): Promise<void> {
    await this.userRepository.delete(id); // 주어진 id의 유저 삭제
  }

  // 이메일 업데이트 메서드 추가
  async updateEmail(id: number, updateEmailDto: UpdateEmailDto): Promise<User> {
    await this.userRepository.update(id, { email: updateEmailDto.email });
    return this.userRepository.findOneBy({ id });
  }
}
