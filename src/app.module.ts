import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { OrderController } from './order.controller';

@Module({
  imports: [],
  controllers: [UserController, OrderController],
  providers: [],
})
export class AppModule {}
