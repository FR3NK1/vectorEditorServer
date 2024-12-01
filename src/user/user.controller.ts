import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { User } from '../entities/user.entity';
import { CreateUserDto } from './create-user.dto';
import { LoginDto } from './login.dto';
import { UserService } from './user.service';

@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @ApiOperation({ summary: 'Получить всех пользователей' })
  async findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Post('login')
  @ApiOperation({
    summary: 'Получить информацию о пользователе по логину и паролю',
  })
  async findByCredentials(
    @Body() credentials: LoginDto,
  ): Promise<{ id: number; name: string }> {
    const { login, password } = credentials;
    return this.userService.findByCredentials(login, password);
  }

  @Post()
  @ApiOperation({ summary: 'Создать нового пользователя' })
  async create(
    @Body() createUserDto: CreateUserDto,
  ): Promise<{ id: number; name: string }> {
    return this.userService.create(createUserDto);
  }
}
