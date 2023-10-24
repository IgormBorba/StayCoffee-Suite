import { PartialType, IntersectionType } from '@nestjs/mapped-types';
import { CreateRoomsDto } from './create-rooms.dto';

export class UpdateRoomsDto extends IntersectionType(
  PartialType(CreateRoomsDto),
) {}


