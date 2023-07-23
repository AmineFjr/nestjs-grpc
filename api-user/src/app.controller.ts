import { Controller } from '@nestjs/common';
import { AppService } from './app.service';
import {
  DeleteRequest,
  DeleteResponse,
  GetRequest,
  GetResponse,
  RegisterRequest,
  RegisterResponse,
  UpdateRequest,
  UpdateResponse,
  User,
  USER_SERVICE_NAME,
  UserServiceController,
  UserServiceControllerMethods,
} from './stubs/user';
import { Metadata } from '@grpc/grpc-js';
import { GrpcMethod, RpcException } from '@nestjs/microservices';

@Controller()
@UserServiceControllerMethods()
export class AppController implements UserServiceController {
  constructor(private readonly appService: AppService) {}

  @GrpcMethod(USER_SERVICE_NAME)
  async add(
    request: RegisterRequest,
    metadata?: Metadata,
  ): Promise<RegisterResponse> {
    try {
      const user = await this.appService.create(request);
      return {
        name: user.name,
        email: user.email,
      };
    } catch (error) {
      throw new RpcException('erreur de la création du produit');
    }
  }

  @GrpcMethod(USER_SERVICE_NAME)
  async get(request: GetRequest, metadata?: Metadata): Promise<GetResponse> {
    let user: User;
    let users: User[] = [];
    if (request.id) {
      user = await this.appService.findById(request.id);
      return { users: [user] };
    } else if (request.name) {
      user = await this.appService.findByName(request.name);
      return { users: [user] };
    } else if (request.email) {
      user = await this.appService.findByEmail(request.email);
      return { users: [user] };
    } else {
      users = await this.appService.findAll();
      return { users };
    }
  }
  @GrpcMethod(USER_SERVICE_NAME)
  async update(
    request: UpdateRequest,
    metadata?: Metadata,
  ): Promise<UpdateResponse> {
    try {
      await this.appService.update(request.id, request.user);
      return {
        message: 'Update success',
        success: true,
      };
    } catch (e) {}
  }

  @GrpcMethod(USER_SERVICE_NAME)
  async delete(request: DeleteRequest): Promise<DeleteResponse> {
    try {
      await this.appService.delete(request.id);
      return {
        success: true,
        message: 'Deleted success',
      };
    } catch (e) {
      throw new RpcException('Error during deletion');
    }
  }
}
