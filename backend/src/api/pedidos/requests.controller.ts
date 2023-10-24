import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { Requests } from './requests.entity';
// import { AuthGuard } from '@nestjs/passport';
import { RequestsService } from './requests.service';
import { CreateRequestsDto } from './create-requests.dto';
import { DeleteResult } from 'typeorm';
import { UpdateRequestsDto } from './update-requests.dto';

@Controller('request')
// @UseGuards(AuthGuard('jwt'))
export class RequestsController {
  constructor(private readonly requestsService: RequestsService) {}

  @Get()
  async findAllRequests(): Promise<Requests[]> {
    return this.requestsService.findAllRequests();
  }

  @Post()
  async createRequest(@Body() createRequestsDto: CreateRequestsDto): Promise<Requests> {
    return this.requestsService.createRequest(createRequestsDto);
  }

  @Patch(':id')
  async updateRequest(@Param('id', ParseIntPipe) id: number, @Body() body: UpdateRequestsDto): Promise<Requests> {
    return this.requestsService.update(id, body);
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<DeleteResult> {
    return this.requestsService.remove(id);
  }
}
