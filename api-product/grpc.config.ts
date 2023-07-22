import { GrpcOptions, Transport } from '@nestjs/microservices';
import { PRODUCT_V1ALPHA_PACKAGE_NAME } from 'src/stubs/product';
import { join } from 'path';
import { addReflectionToGrpcConfig } from 'nestjs-grpc-reflection';
export const grpcConfig = addReflectionToGrpcConfig({
  transport: Transport.GRPC,
  options: {
    url: '0.0.0.0:6000',
    package: PRODUCT_V1ALPHA_PACKAGE_NAME,
    protoPath: join(__dirname, 'proto/product/v1alpha/product.proto'),
  },
}) as GrpcOptions;
