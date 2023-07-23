import { Injectable } from '@nestjs/common';
import { PrismaServiceUser } from './prisma.service';
import { Prisma } from '@prisma/client';
import { RegisterResponse, DeleteResponse, User } from './stubs/user';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class AppService {
  constructor(
    private prisma: PrismaServiceUser,
    private readonly jwtService: JwtService,
  ) {}
  async create(data: Prisma.userCreateInput): Promise<RegisterResponse> {
    const hashedPassword = await this.hashPassword(data.password);
    const userData = { ...data, password: hashedPassword };
    return this.prisma.user.create({ data: userData });
  }
  async findAll(): Promise<User[]> {
    return this.prisma.user.findMany();
  }
  async delete(id: number): Promise<DeleteResponse> {
    try {
      const deleteUser = await this.prisma.user.delete({ where: { id } });
      if (deleteUser) {
        return {
          message: 'User deleted',
          success: true,
        };
      }
    } catch (e) {
      throw new RpcException('Error during user deleted');
    }
  }

  async findById(id: number): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { id },
    });
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }

  async findByName(name: string): Promise<User | null> {
    return this.prisma.user.findFirst({
      where: { name },
    });
  }

  async update(id: number, user: Prisma.userUpdateInput): Promise<User> {
    return this.prisma.user.update({
      where: { id },
      data: {
        name: user.name,
        email: user.email,
        password: user.password,
      },
    });
  }

  async hashPassword(password: string): Promise<string> {
    const saltOrRounds = 10;
    return bcrypt.hash(password, saltOrRounds);
  }
}
