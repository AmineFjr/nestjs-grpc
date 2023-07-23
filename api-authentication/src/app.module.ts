import { Module } from '@nestjs/common';
import {AppController} from "./app.controller";
import {AppService} from "./app.service";
import {PrismaService} from "./prisma.service";
import {JwtModule, JwtService} from "@nestjs/jwt";
import * as process from "process";

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET, // Définissez votre clé privée ici.
      signOptions: { expiresIn: '1h' }, // Réglage de l'expiration du token (1 heure dans cet exemple).
    }),
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
