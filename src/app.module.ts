// src/app.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite', // 데이터베이스 타입 설정 (SQLite 사용)
      database: 'test.db', // 데이터베이스 파일 이름
      entities: [__dirname + '/**/*.entity{.ts,.js}'], // 엔티티 파일 경로 설정
      synchronize: true, // 데이터베이스와 엔티티의 동기화 여부
    }),
    UserModule, // UserModule 등록
  ],
})
export class AppModule {}
