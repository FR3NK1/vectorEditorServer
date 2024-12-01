import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length } from 'class-validator';

export class CreateUserDto {
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

  @ApiProperty({ example: 'John Doe', description: 'Имя пользователя' })
  @IsString()
  @Length(1, 100)
  name: string;
}
