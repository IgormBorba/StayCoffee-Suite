import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeleteResult } from 'typeorm';
import { Rooms } from './rooms.entity';
import { CreateRoomsDto } from './create-rooms.dto';
import { UpdateRoomsDto } from './update-rooms.dto';

@Injectable()
export class RoomsService {
  constructor(
    @InjectRepository(Rooms)
    private readonly roomsRepository: Repository<Rooms>,
  ) {}

  async findAllRooms(): Promise<Rooms[]> {
    return this.roomsRepository.find({ relations: ['owner'] });
  }

  async getRooms(id: number): Promise<Rooms> {
    return this.roomsRepository.findOne({ where: { id } });
  }

  async createRoom(createRoomsDto: CreateRoomsDto): Promise<Rooms> {
    const room: Rooms = this.roomsRepository.create(createRoomsDto);
    return this.roomsRepository.save(room);
  }

  async update(id: number, updateRoomsDto: UpdateRoomsDto): Promise<Rooms> {
    const roomToUpdate = await this.roomsRepository.findOne({ where: { id } });
    if (!roomToUpdate) {
      throw new Error('Room not found');
    }

    // Atualize apenas as propriedades que foram definidas em updateRoomsDto
    Object.assign(roomToUpdate, updateRoomsDto);

    return this.roomsRepository.save(roomToUpdate);
  }

  async remove(id: number): Promise<DeleteResult> {
    return this.roomsRepository.delete(id);
  }
}
