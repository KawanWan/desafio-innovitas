import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';
import { User } from './user.entity';

@Entity('characters')
export class Character {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  original_character_id: number;

  @Column()
  name: string;

  @Column()
  species: string;

  @Column()
  gender: string;

  @Column()
  status: string;

  @Column({ nullable: true })
  origin: string;

  @Column({ nullable: true })
  location: string;

  @Column()
  image: string;

  @ManyToOne(() => User, (user) => user.characters)
  user: User;

  @Column()
  user_id: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Column({ nullable: true })
  notes: string;
}
