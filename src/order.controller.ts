import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';

@Controller()
export class OrderController {
  @GrpcMethod('OrderService', 'GetOrder')
  getOrder(data: { id: string }, metadata: any): { id: string; userId: string; product: string } {
    // Votre logique métier ici
    return { id: '1', userId: '1', product: 'book' };
  }
}
