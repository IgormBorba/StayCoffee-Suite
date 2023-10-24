import { Module } from '@nestjs/common';
import { HcheckService } from './hcheck.service';
import { HcheckController } from './hcheck.controller';

@Module({
  controllers: [HcheckController],
  providers: [HcheckService]
})
export class HcheckModule {}
