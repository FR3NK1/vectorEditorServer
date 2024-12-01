import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Work } from '../entities/work.entity';
import { WorkController } from './work.controller';
import { WorkService } from './work.service';

@Module({
  imports: [TypeOrmModule.forFeature([Work])],
  controllers: [WorkController],
  providers: [WorkService],
})
export class WorkModule {}
