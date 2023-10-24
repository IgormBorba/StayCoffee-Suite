import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { Requests } from './requests.entity';
import { CreateRequestsDto } from './create-requests.dto';
import { UpdateRequestsDto } from './update-requests.dto';
// import { DeleteResult } from 'typeorm';
// import { UpdateRoomsDto } from './update-requests.dto';

@Injectable()
export class RequestsService {
  constructor(
    @InjectRepository(Requests)
    private readonly requestsRepository: Repository<Requests>,
  ) {}

  async findAllRequests(): Promise<Requests[]> {
    return this.requestsRepository.find({ relations: ['owner'] });
  }

  async createRequest(createRequestsDto: CreateRequestsDto): Promise<Requests> {
    const request: Requests = this.requestsRepository.create(createRequestsDto);
    return this.requestsRepository.save(request);
  }

  async update(id: number, updateRequestsDto: UpdateRequestsDto): Promise<Requests> {
    const requestToUpdate = await this.requestsRepository.findOne({ where: { id } });
    if (!requestToUpdate) {
      throw new Error('Request not found');
    }

    Object.assign(requestToUpdate, updateRequestsDto);

    return this.requestsRepository.save(requestToUpdate);
  }

  async remove(id: number): Promise<DeleteResult> {
    return this.requestsRepository.delete(id);
  }
}
