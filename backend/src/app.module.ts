import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApiModule } from './api/api.module';
// import { getEnvPath } from './common/helper/env.helper';
import { TypeOrmConfigService } from './shared/typeorm/typeorm.service';
import { UsersModule } from './api/usuarios/users.module';
import { AuthModule } from './api/auth/auth.module';
import { HcheckModule } from './api/hcheck/hcheck.module';


// const envFilePath: string = getEnvPath(`${__dirname}/common/envs`);

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({ useClass: TypeOrmConfigService }),
    ApiModule,
    UsersModule,
    AuthModule,
    HcheckModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
