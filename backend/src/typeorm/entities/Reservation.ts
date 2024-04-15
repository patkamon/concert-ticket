import { ReserveStatus } from 'src/utils/types';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Reservation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  concertId: number;

  @Column({ default: 0 })
  reserverId: number;

  @Column({ default: ReserveStatus.RESERVED })
  status: ReserveStatus;

  @CreateDateColumn()
  created_at: Date; // Creation date

  @UpdateDateColumn()
  updated_at: Date; // Last updated date
}
