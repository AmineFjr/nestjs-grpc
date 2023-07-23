import {Controller} from '@nestjs/common';
import { AppService } from './app.service';
import {
  AuthServiceController, LoginRequest, LoginResponse,
  RegisterRequest, RegisterResponse, Token, TokenValidationResponse, AUTH_SERVICE_NAME,
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
  async login(request: LoginRequest, metadata?: Metadata): Promise<LoginResponse> {
    const accessToken = await this.appService.login(request.email, request.password);
    return accessToken ;
  }


  @GrpcMethod(AUTH_SERVICE_NAME)
  async validateToken(request: Token): Promise<TokenValidationResponse> {
    return this.appService.validateToken(request);
  }
}
