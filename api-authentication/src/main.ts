import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';
import {AUTH_V1ALPHA_PACKAGE_NAME} from "./stubs/auth";


async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
      AppModule,
      {
        transport: Transport.GRPC,
        options: {
          package: AUTH_V1ALPHA_PACKAGE_NAME ,
          protoPath: join(__dirname, '../../../proto/auth/v1alpha/auth.proto'),
          url: '0.0.0.0:3003',
        },
      },
  );

  await app.listen();
}
bootstrap();