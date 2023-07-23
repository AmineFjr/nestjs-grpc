import { Injectable } from '@nestjs/common';
import { Product, Prisma } from '@prisma/client';
import { PrismaService } from '../services/prisma.service';

@Injectable()
export class AppService {
  constructor(private prisma: PrismaService) {}

  create(data: Prisma.ProductCreateInput): Promise<Product> {
    return this.prisma.product.create({ data });
  }
  findAll(): Promise<Product[]> {
    return this.prisma.product.findMany();
  }
  findById(id: number): Promise<Product> {
    return this.prisma.product.findUnique({
      where: { id },
    });
  }

  async update(id: number, data: Prisma.ProductUpdateInput): Promise<Product> {
    return this.prisma.product.update({
      where: { id },
      data: data,
    });
  }

  delete(id: number): Promise<Product> {
    return this.prisma.product.delete({
      where: { id },
    });
  }
}
