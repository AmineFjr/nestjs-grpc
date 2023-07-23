import {Controller, Get, Post} from '@nestjs/common';
import { AppService } from './app.service';
import {
  AuthServiceController,
  DeleteRequest,
  DeleteResponse,
  GetRequest,
  GetResponse, LoginRequest, LoginResponse,
  RegisterRequest, RegisterResponse, Token, TokenValidationResponse, UpdateRequest, UpdateResponse, User, AUTH_SERVICE_NAME,
  AuthServiceControllerMethods
} from "./stubs/auth";
import {Metadata} from "@grpc/grpc-js";
import { GrpcMethod, RpcException } from '@nestjs/microservices';

@Controller()
@AuthServiceControllerMethods()
export class AppController implements AuthServiceController{
  constructor(private readonly appService: AppService) {}

  @GrpcMethod(AUTH_SERVICE_NAME)
  async add(request: RegisterRequest, metadata?: Metadata): Promise<RegisterResponse>  {
    try{
      const user = await this.appService.create(request);
      return {
        name: user.name,
        email: user.email
      };
    }catch(error){
      throw new RpcException("erreur de la création du produit");
    }
  }

  @GrpcMethod(AUTH_SERVICE_NAME)
  async get(request: GetRequest, metadata?: Metadata): Promise<GetResponse>  {

    let user: User;
    let users: User[] = [];
    if (request.id) {
      user = await this.appService.findById(request.id);
      return { users: [user] };
    } else if (request.name) {
      user = await this.appService.findByName(request.name);
      return { users: [user] };
    } else {
      users = await this.appService.findAll();
      return { users };
    }
  }

  @GrpcMethod(AUTH_SERVICE_NAME)
  async login(request: LoginRequest, metadata?: Metadata): Promise<LoginResponse> {
    const accessToken = await this.appService.login(request.email, request.password);
    return { accessToken };
  }


  @GrpcMethod(AUTH_SERVICE_NAME)
  async update(request: UpdateRequest, metadata?: Metadata): Promise<UpdateResponse> {

    try {
         await this.appService.update(request.id , request.user);
        return {
          message: 'Update success',
          success: true,
      }
    }catch (e){
    }
  }

  @GrpcMethod(AUTH_SERVICE_NAME)
  async delete (
      request: DeleteRequest,
  ): Promise<DeleteResponse> {
    try {
      await this.appService.delete(request.id);
      return {
        success: true,
        message: 'Deleted success'
      }
    }catch (e) {
      throw new RpcException("Error during deletion")
    }
  }

  @GrpcMethod(AUTH_SERVICE_NAME)
  async validateToken(request: Token): Promise<TokenValidationResponse> {
    return this.appService.validateToken(request);
  }
}
