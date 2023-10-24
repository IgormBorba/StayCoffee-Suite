import { Module } from '@nestjs/common';
import { UserModule } from './cliente/user.module';
import { RoomsModule } from './quartos/rooms.module';
import { RequestsModule } from './pedidos/requests.module';
import { HcheckModule } from './hcheck/hcheck.module';

@Module({
  imports: [UserModule, RoomsModule, RequestsModule, HcheckModule],
})
export class ApiModule {}
