import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeleteResult } from 'typeorm';
import { CreateUserDto } from './create-user.dto';
import { User } from './user.entity';
import { Rooms } from '../quartos/rooms.entity';
import { Requests } from '../pedidos/requests.entity';
import { CreateRoomsDto } from '../quartos/create-rooms.dto';
import { CreateRequestsDto } from '../pedidos/create-requests.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Rooms)
    private readonly roomsRepository: Repository<Rooms>,
    @InjectRepository(Requests)
    private readonly requestsRepository: Repository<Requests>,
  ) {}

  async findAll(): Promise<User[]> {
    return this.userRepository.find({ relations: ['rooms', 'requests'] });
  }

  async getUser(id: number): Promise<User> {
    return this.userRepository.findOne({ where: { id }, relations: ['rooms', 'requests'] });
  }

  async createUser(body: CreateUserDto): Promise<User> {
    const user: User = this.userRepository.create(body);
    user.rooms = [];

    const savedUser = await this.userRepository.save(user);

    const userWithRelations = await this.userRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.rooms', 'rooms')
      .where('user.id = :id', { id: savedUser.id })
      .getOne();

    return userWithRelations;
  }

  async update(id: number, updateUserDto: CreateUserDto): Promise<User> {
    return this.userRepository.update(id, updateUserDto).then(() => this.userRepository.findOne({ where: { id } }));
  }

  async remove(id: number): Promise<DeleteResult> {
    return this.userRepository.delete(id);
  }

  async createRoom(createRoomDto: CreateRoomsDto): Promise<Rooms> {
    const room: Rooms = new Rooms();
    room.n_quarto = createRoomDto.n_quarto;
    room.valor = createRoomDto.valor;
    room.situacao = createRoomDto.situacao;
    room.descricao = createRoomDto.descricao;
    room.data_entrada = new Date(createRoomDto.data_entrada);
    room.data_saida = new Date(createRoomDto.data_saida);

    return this.roomsRepository.save(room);
  }

  async addRoomToUser(
    n_cadastro: number,
    roomId: number,
    roomUpdates: { descricao?: string; valor?: number; situacao?: boolean },
  ): Promise<User> {
    const user = await this.userRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.rooms', 'rooms')
      .where('user.n_cadastro = :n_cadastro', { n_cadastro })
      .getOne();

    if (!user) {
      throw new Error('User not found');
    }

    const room = await this.roomsRepository.findOne({ where: { id: roomId }, relations: ['owner'] });

    if (!room) {
      throw new Error('Room not found');
    }

    if (room.owner) {
      throw new Error('Room is already assigned to another user');
    }

    // Atualiza os campos da sala, se fornecidos
    if (roomUpdates.descricao !== undefined) room.descricao = roomUpdates.descricao;
    if (roomUpdates.valor !== undefined) room.valor = roomUpdates.valor;
    if (roomUpdates.situacao !== undefined) room.situacao = roomUpdates.situacao;

    // Salva as alterações na sala
    await this.roomsRepository.save(room);

    // Adiciona a sala ao usuário
    user.rooms.push(room);
    await this.userRepository.save(user);

    return user;
  }

  async createRequest(createRequestsDto: CreateRequestsDto): Promise<Requests> {
    const request: Requests = new Requests();
    request.valor = createRequestsDto.valor;
    request.paymentmethod = createRequestsDto.paymentmethod;
    request.pago = createRequestsDto.pago;

    return this.requestsRepository.save(request);
  }

  async addRequestToUser(nCadastro: number, request: Requests): Promise<User> {
    const user = await this.userRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.requests', 'requests')
      .where('user.n_cadastro = :nCadastro', { nCadastro: nCadastro })
      .getOne();

    if (!user) {
      throw new Error('User not found');
    }

    user.requests.push(request); // Adiciona o pedido ao usuário
    await this.userRepository.save(user); // Salva as alterações no banco de dados

    return user;
  }

}
