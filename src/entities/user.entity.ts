import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Shape } from './shape.entity';
import { Work } from './work.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'user123', description: 'Логин пользователя' })
  @Column()
  login: string;

  @ApiProperty({
    example: 'securepassword',
    description: 'Пароль пользователя',
  })
  @Column()
  password: string;

  @ApiProperty({ example: 'John Doe', description: 'Имя пользователя' })
  @Column()
  name: string;

  @OneToMany(() => Shape, (shape) => shape.user)
  shapes: Shape[];

  @OneToMany(() => Work, (work) => work.user)
  works: Work[];
}
