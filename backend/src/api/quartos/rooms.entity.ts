import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, Generated } from 'typeorm';
import { User } from '../cliente/user.entity';

@Entity('quartos')
export class Rooms {
  @PrimaryGeneratedColumn()
  id!: number;

  @Generated('increment')
  @Column({ type: 'int', unique: true })
  codigo: number;

  @Column({ type: 'varchar', length: 120 })
  n_quarto: string;

  @Column({ type: 'float' })
  valor: number;

  @Column({ type: 'boolean', default: false })
  situacao: boolean;

  @Column({ type: 'varchar', length: 120 })
  descricao: string;

  @Column({ type: 'timestamp' })
  data_entrada: Date;

  @Column({ type: 'timestamp' })
  data_saida: Date;

  @ManyToOne(() => User, (user) => user.rooms, { onDelete: 'CASCADE' })
  owner: User;

  @CreateDateColumn({ type: 'timestamp' })
  createdat!: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedat!: Date;
  user: string;
}
