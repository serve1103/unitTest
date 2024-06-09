// src/user/dto/user.dto.ts
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ description: 'The name of the user' })
  name: string;

  @ApiProperty({ description: 'The age of the user' })
  age: number;

  @ApiProperty({ description: 'The email of the user' })
  email: string;
}

export class UpdateEmailDto {
  @ApiProperty({ description: 'The new email of the user' })
  email: string;
}
