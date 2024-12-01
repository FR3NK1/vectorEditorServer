import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from 'src/user/user.module';
import { Shape } from '../entities/shape.entity';
import { ShapeController } from './shape.controller';
import { ShapeService } from './shape.service';

@Module({
  imports: [TypeOrmModule.forFeature([Shape]), UserModule],
  controllers: [ShapeController],
  providers: [ShapeService],
})
export class ShapeModule {}
