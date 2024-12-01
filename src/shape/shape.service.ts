import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { Shape } from '../entities/shape.entity';
import { CreateShapeDto } from './shape.dto';

@Injectable()
export class ShapeService {
  constructor(
    @InjectRepository(Shape)
    private readonly shapeRepository: Repository<Shape>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  findAll(): Promise<Shape[]> {
    return this.shapeRepository.find();
  }

  async create(createShapeDto: CreateShapeDto): Promise<Shape> {
    const user = await this.userRepository.findOneBy({
      id: createShapeDto.userId,
    });
    if (!user) {
      throw new NotFoundException(
        `Пользователь с id ${createShapeDto.userId} не найден`,
      );
    }

    const newShape = this.shapeRepository.create(createShapeDto);
    return this.shapeRepository.save(newShape);
  }

  async delete(userId: number, shapeId: number): Promise<void> {
    const shape = await this.shapeRepository.findOneBy({ id: shapeId, userId });
    if (!shape) {
      throw new NotFoundException(
        `Фигура с id ${shapeId} для пользователя с id ${userId} не найдена`,
      );
    }

    await this.shapeRepository.remove(shape);
  }
}
