import { Module } from '@nestjs/common';
import {AppController} from "./app.controller";
import {AppService} from "./app.service";
import {PrismaService} from "./prisma.service";
import {JwtModule} from "@nestjs/jwt";
import * as process from "process";
import {ClientsModule, Transport} from "@nestjs/microservices";
import {join} from "path";
import { USER_V1ALPHA_PACKAGE_NAME } from '../../user/src/stubs/user'
@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET, // Définissez votre clé privée ici.
      signOptions: { expiresIn: '1h' }, // Réglage de l'expiration du token (1 heure dans cet exemple).
    }),
    ClientsModule.register([
      {
        name: 'USER_MICROSERVICE',
        transport: Transport.GRPC,
        options: {
          url: 'localhost:3001',
          package: USER_V1ALPHA_PACKAGE_NAME,
          protoPath: join(__dirname, '../../../proto/user/v1alpha/user.proto'),
        },
      },
    ]),
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
