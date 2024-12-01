import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length } from 'class-validator';

export class LoginDto {
  @ApiProperty({ example: 'user123', description: 'Логин пользователя' })
  @IsString()
  @Length(3, 50)
  login: string;

  @ApiProperty({
    example: 'securepassword',
    description: 'Пароль пользователя',
  })
  @IsString()
  @Length(6, 100)
  password: string;
}
