import { PartialType, IntersectionType } from '@nestjs/mapped-types';
import { CreateRequestsDto } from './create-requests.dto';

export class UpdateRequestsDto extends IntersectionType(
  PartialType(CreateRequestsDto),
) {}


