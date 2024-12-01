import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { CreateUserDto } from './create-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findByCredentials(
    login: string,
    password: string,
  ): Promise<{ id: number; name: string }> {
    const user = await this.userRepository.findOneBy({ login, password });
    if (!user) {
      throw new NotFoundException('Пользователь с такими данными не найден');
    }
    return { id: user.id, name: user.name };
  }

  async findAll(): Promise<User[]> {
    try {
      return await this.userRepository.find();
    } catch (error) {
      throw new Error(`Ошибка получения пользователей: ${error.message}`);
    }
  }

  async create(
    createUserDto: CreateUserDto,
  ): Promise<{ id: number; name: string }> {
    const existingUser = await this.userRepository.findOneBy({
      login: createUserDto.login,
    });
    if (existingUser) {
      throw new BadRequestException(
        'Пользователь с таким логином уже существует',
      );
    }

    const newUser = this.userRepository.create(createUserDto);
    const savedUser = await this.userRepository.save(newUser);

    return { id: savedUser.id, name: savedUser.name };
  }
}
