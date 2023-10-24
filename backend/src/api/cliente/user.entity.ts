import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany, Generated } from 'typeorm';
import { Rooms } from '../quartos/rooms.entity';
import { Requests } from '../pedidos/requests.entity';
@Entity('cliente')
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Generated('increment')
  @Column({ type: 'int', unique: true })
  n_cadastro: number;

  @Column({ type: 'varchar', length: 120 })
  nome: string;

  @Column({ type: 'varchar', length: 120 })
  cidade: string;

  @Column({ type: 'varchar', length: 120 })
  celular: string;

  @OneToMany(() => Rooms, (room) => room.owner, { onDelete: 'CASCADE' })
  rooms: Rooms[];

  @OneToMany(() => Requests, (request) => request.owner, { onDelete: 'CASCADE' })
  requests: Requests[];

  /*
   * Create and Update Date Columns
   */

  @CreateDateColumn({ type: 'timestamp' })
  createdat!: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedat!: Date;
}
