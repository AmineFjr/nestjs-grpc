import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';

@Controller()
export class UserController {
  @GrpcMethod('UserService', 'GetUser')
  getUser(data: { id: string }, metadata: any): { id: string; name: string; email: string } {
    // Votre logique métier ici
    return { id: '1', name: 'John Doe', email: 'johndoe@example.com' };
  }
}
