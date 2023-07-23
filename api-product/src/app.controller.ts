import { Controller } from '@nestjs/common';
import { AppService } from './app.service';
import {
  AddRequest,
  AddResponse,
  DeleteRequest,
  DeleteResponse,
  GetRequest,
  GetResponse,
  PRODUCT_CR_UD_SERVICE_NAME,
  Product,
  ProductCRUDServiceController,
  UpdateRequest,
  UpdateResponse,
  ProductCRUDServiceControllerMethods,
} from './stubs/product';
import { GrpcMethod } from '@nestjs/microservices';
import { Metadata } from '@grpc/grpc-js';

@Controller()
@ProductCRUDServiceControllerMethods()
export class AppController implements ProductCRUDServiceController {
  constructor(private readonly appService: AppService) {}

  async get(request: GetRequest, metadata?: Metadata): Promise<GetResponse> {
    let product: Product;
    let products: Product[] = [];

    if (request.id) {
      product = await this.appService.findById(request.id);
      return { products: [product] };
    } else {
      products = await this.appService.findAll();
      return { products };
    }
  }

  async update(
    request: UpdateRequest,
    metadata?: Metadata,
  ): Promise<UpdateResponse> {
    const id = request.id;
    Object.keys(request).forEach(
      (key) => request[key] === undefined && delete request[key],
    );

    delete request.id;
    const product = await this.appService.update(id, request);
    return { product };
  }

  async delete(request: DeleteRequest, metadata?: Metadata) {
    const product = await this.appService.delete(request.id);
    return { product };
  }

  @GrpcMethod(PRODUCT_CR_UD_SERVICE_NAME)
  async add(request: AddRequest): Promise<AddResponse> {
    const product = await this.appService.create(request as any);
    return { product };
  }
}
