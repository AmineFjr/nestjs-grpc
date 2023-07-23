/* eslint-disable */
import { Metadata } from "@grpc/grpc-js";
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { Observable } from "rxjs";

export const protobufPackage = "auth.v1alpha";

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  accessToken: string;
}

export interface RegisterRequest {
  name: string;
  password: string;
  email: string;
}

export interface User {
  id: number;
  name: string;
  password: string;
  email: string;
}

export interface RegisterResponse {
  name: string;
  email: string;
}

export interface GetRequest {
  name: string;
  id: number;
}

export interface GetResponse {
  users: User[];
}

export interface UpdateRequest {
  id: number;
  user: User | undefined;
}

export interface UpdateResponse {
  success: boolean;
  message: string;
}

export interface DeleteRequest {
  id: number;
}

export interface DeleteResponse {
  success: boolean;
  message: string;
}

export interface Token {
  accessToken: string;
}

export interface TokenValidationResponse {
  isValid: boolean;
}

export const AUTH_V1ALPHA_PACKAGE_NAME = "auth.v1alpha";

export interface AuthServiceClient {
  login(request: LoginRequest, metadata?: Metadata): Observable<LoginResponse>;

  validateToken(request: Token, metadata?: Metadata): Observable<TokenValidationResponse>;

  get(request: GetRequest, metadata?: Metadata): Observable<GetResponse>;

  add(request: RegisterRequest, metadata?: Metadata): Observable<RegisterResponse>;

  update(request: UpdateRequest, metadata?: Metadata): Observable<UpdateResponse>;

  delete(request: DeleteRequest, metadata?: Metadata): Observable<DeleteResponse>;
}

export interface AuthServiceController {
  login(request: LoginRequest, metadata?: Metadata): Promise<LoginResponse> | Observable<LoginResponse> | LoginResponse;

  validateToken(
    request: Token,
    metadata?: Metadata,
  ): Promise<TokenValidationResponse> | Observable<TokenValidationResponse> | TokenValidationResponse;

  get(request: GetRequest, metadata?: Metadata): Promise<GetResponse> | Observable<GetResponse> | GetResponse;

  add(
    request: RegisterRequest,
    metadata?: Metadata,
  ): Promise<RegisterResponse> | Observable<RegisterResponse> | RegisterResponse;

  update(
    request: UpdateRequest,
    metadata?: Metadata,
  ): Promise<UpdateResponse> | Observable<UpdateResponse> | UpdateResponse;

  delete(
    request: DeleteRequest,
    metadata?: Metadata,
  ): Promise<DeleteResponse> | Observable<DeleteResponse> | DeleteResponse;
}

export function AuthServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ["login", "validateToken", "get", "add", "update", "delete"];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcMethod("AuthService", method)(constructor.prototype[method], method, descriptor);
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcStreamMethod("AuthService", method)(constructor.prototype[method], method, descriptor);
    }
  };
}

export const AUTH_SERVICE_NAME = "AuthService";
