import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Work {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  file_path: string;

  @Column()
  name: string;

  @ManyToOne(() => User, (user) => user.works)
  user: User;
}
