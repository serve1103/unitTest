// src/user/user.entity.ts
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity() // TypeORM 데코레이터를 사용하여 User 클래스가 데이터베이스 엔티티임을 표시
export class User {
  @PrimaryGeneratedColumn() // 자동 생성되는 기본 키
  id: number;

  @Column() // 데이터베이스 컬럼으로 매핑
  name: string;

  @Column() // 데이터베이스 컬럼으로 매핑
  age: number;

  @Column()
  email: string;
}
