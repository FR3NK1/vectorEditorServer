import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Shape {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  path: string;

  @Column()
  fill: string;

  @Column()
  stroke: string;

  @Column({ type: 'float' })
  stroke_width: number;

  @Column()
  userId: number;

  @ManyToOne(() => User, (user) => user.shapes, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  user: User;
}
