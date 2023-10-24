import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { Rooms } from './rooms.entity';
import { RoomsService } from './rooms.service';
import { UpdateRoomsDto } from './update-rooms.dto';
import { DeleteResult } from 'typeorm';
import { CreateRoomsDto } from './create-rooms.dto';

@Controller('rooms')
export class RoomsController {
  constructor(private readonly roomsService: RoomsService) {}

  @Get()
  async findAllRooms(): Promise<Rooms[]> {
    return this.roomsService.findAllRooms();
  }

  @Get(':id')
  async getRooms(@Param('id', ParseIntPipe) id: number): Promise<Rooms> {
    return this.roomsService.getRooms(id);
  }

  @Post()
  createRoom(@Body() createRoomsDto: CreateRoomsDto): Promise<Rooms> {
    return this.roomsService.createRoom(createRoomsDto);
  }

  @Patch(':id')
  async updateRoom(@Param('id', ParseIntPipe) id: number, @Body() body: UpdateRoomsDto): Promise<Rooms> {
    return this.roomsService.update(id, body);
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<DeleteResult> {
    return this.roomsService.remove(id);
  }
}
