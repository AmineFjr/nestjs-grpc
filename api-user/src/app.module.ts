import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaServiceUser } from './prisma.service';
import { JwtModule } from '@nestjs/jwt';
@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET, // Définissez votre clé privée ici.
      signOptions: { expiresIn: '1h' }, // Réglage de l'expiration du token (1 heure dans cet exemple).
    }),
  ],
  controllers: [AppController],
  providers: [AppService, PrismaServiceUser],
})
export class AppModule {}
