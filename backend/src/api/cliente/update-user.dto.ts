import { PartialType, IntersectionType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends IntersectionType(
  PartialType(CreateUserDto),
) {}


