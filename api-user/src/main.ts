import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { USER_V1ALPHA_PACKAGE_NAME } from './stubs/user';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.GRPC,
      options: {
        package: USER_V1ALPHA_PACKAGE_NAME,
        protoPath: join(__dirname, '../proto/user/v1alpha/user.proto'),
        url: '0.0.0.0:3001',
      },
    },
  );

  await app.listen();
}
bootstrap();
