/* eslint-disable */
import { Metadata } from "@grpc/grpc-js";
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { Observable } from "rxjs";

export const protobufPackage = "product.v1alpha";

export interface Product {
  title?: string | undefined;
  id?: number | undefined;
  description?: string | undefined;
  price?: number | undefined;
}

export interface GetRequest {
  title?: string | undefined;
  id?: number | undefined;
  description?: string | undefined;
  price?: number | undefined;
}

export interface GetResponse {
  products?: Product[] | undefined;
}

export interface AddRequest {
  title?: string | undefined;
  description?: string | undefined;
  price?: number | undefined;
}

export interface AddResponse {
  product?: Product | undefined;
}

export interface UpdateRequest {
  id?: number | undefined;
  title?: string | undefined;
  description?: string | undefined;
  price?: number | undefined;
}

export interface UpdateResponse {
  product?: Product | undefined;
}

export interface DeleteRequest {
  id?: number | undefined;
}

export interface DeleteResponse {
  product?: Product | undefined;
}

export const PRODUCT_V1ALPHA_PACKAGE_NAME = "product.v1alpha";

export interface ProductCRUDServiceClient {
  get(request: GetRequest, metadata?: Metadata): Observable<GetResponse>;

  add(request: AddRequest, metadata?: Metadata): Observable<AddResponse>;

  update(request: UpdateRequest, metadata?: Metadata): Observable<UpdateResponse>;

  delete(request: DeleteRequest, metadata?: Metadata): Observable<DeleteResponse>;
}

export interface ProductCRUDServiceController {
  get(request: GetRequest, metadata?: Metadata): Promise<GetResponse> | Observable<GetResponse> | GetResponse;

  add(request: AddRequest, metadata?: Metadata): Promise<AddResponse> | Observable<AddResponse> | AddResponse;

  update(
    request: UpdateRequest,
    metadata?: Metadata,
  ): Promise<UpdateResponse> | Observable<UpdateResponse> | UpdateResponse;

  delete(
    request: DeleteRequest,
    metadata?: Metadata,
  ): Promise<DeleteResponse> | Observable<DeleteResponse> | DeleteResponse;
}

export function ProductCRUDServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ["get", "add", "update", "delete"];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcMethod("ProductCRUDService", method)(constructor.prototype[method], method, descriptor);
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcStreamMethod("ProductCRUDService", method)(constructor.prototype[method], method, descriptor);
    }
  };
}

export const PRODUCT_CR_UD_SERVICE_NAME = "ProductCRUDService";
