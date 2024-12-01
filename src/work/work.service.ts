import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Work } from '../entities/work.entity';
import { CreateWorkDto } from './work.dto';

@Injectable()
export class WorkService {
  constructor(
    @InjectRepository(Work)
    private readonly workRepository: Repository<Work>,
  ) {}

  async findAll(): Promise<Work[]> {
    return this.workRepository.find();
  }

  async findByUserId(userId: number): Promise<Work[]> {
    const works = await this.workRepository.find({
      where: { user: { id: userId } },
    });
    if (works.length === 0) {
      throw new NotFoundException(
        `Работы для пользователя с id ${userId} не найдены`,
      );
    }
    return works;
  }

  async create(createWorkDto: CreateWorkDto): Promise<Work> {
    const newWork = this.workRepository.create({
      ...createWorkDto,
      user: { id: createWorkDto.userId },
    });
    return this.workRepository.save(newWork);
  }

  async delete(workId: number): Promise<void> {
    const work = await this.workRepository.findOneBy({ id: workId });
    if (!work) {
      throw new NotFoundException(`Работа с id ${workId} не найдена`);
    }
    await this.workRepository.remove(work);
  }
}
