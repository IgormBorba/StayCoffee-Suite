import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, Generated, ManyToOne } from 'typeorm';
import { User } from '../cliente/user.entity';

@Entity('pedidos')
export class Requests {
  @PrimaryGeneratedColumn()
  id!: number;

  @Generated('increment')
  @Column({ type: 'int', unique: true })
  codigo: number;

  @Column({ type: 'float' })
  valor: number;

  @Column({ type: 'varchar', length: 24 })
  paymentmethod: string;

  @Column({ type: 'boolean' })
  pago: boolean;

  @ManyToOne(() => User, (user) => user.requests, { onDelete: 'CASCADE' })
  owner: User;

  @CreateDateColumn({ type: 'timestamp' })
  createdat!: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedat!: Date;
}
