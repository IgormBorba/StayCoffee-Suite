import { Controller, Get } from '@nestjs/common';
import { HcheckService } from './hcheck.service';

@Controller('hcheck')
export class HcheckController {
  constructor(private readonly hcheckService: HcheckService) {}

  @Get()
  async index() {
    return 'v1.0.0';
  }
}
