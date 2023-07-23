import {Inject, Injectable, OnModuleInit} from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { Prisma } from '@prisma/client';
import {
  RegisterResponse,
  User,
  TokenValidationResponse,
  Token,
  LoginResponse,
  RegisterRequest
} from './stubs/auth';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import {ClientGrpc} from "@nestjs/microservices";
import { UserServiceClient, GetRequest, USER_SERVICE_NAME } from '../../user/src/stubs/user'
import {firstValueFrom} from "rxjs";

@Injectable()
export class AppService implements OnModuleInit {

  private userServiceClient: UserServiceClient;
  constructor(private prisma: PrismaService, private readonly jwtService: JwtService, @Inject('USER_MICROSERVICE') private client: ClientGrpc,) {}

  onModuleInit() {
    this.userServiceClient = this.client.getService<UserServiceClient>(USER_SERVICE_NAME);
  }

  async create(data: RegisterRequest): Promise<RegisterResponse> {
    const hashedPassword = await this.hashPassword(data.password);
    const userData = { ...data, password: hashedPassword };
    return this.prisma.user.create({ data: userData });
    try {

    }catch (e) {

    }

    const user = this.userServiceClient.add(data).subscribe((res) => {

    })

  }



  async update(id: number, user: Prisma.userUpdateInput): Promise<User> {
    return this.prisma.user.update({
      where: { id },
      data: {
        name: user.name,
        email: user.email,
        password: user.password
      },
    });
  }

  async hashPassword(password: string): Promise<string> {
    const saltOrRounds = 10;
    return bcrypt.hash(password, saltOrRounds);
  }

  async comparePasswords(enteredPassword: string, hashedPassword: string): Promise<boolean> {
    return bcrypt.compare(enteredPassword, hashedPassword);
  }

  async login(email: string, password: string): Promise<LoginResponse> {

    const getUserRequest: GetRequest = {email: email, name: null, id: null}
    const usersAsObservable = this.userServiceClient.get(getUserRequest);
    const response = await firstValueFrom(usersAsObservable);
    const isValidPassword = await this.comparePasswords(password, response.users[0].password);
    if (!isValidPassword) {
      throw new Error('Invalid credentials');
    } else  if (response) {
      return  {
        accessToken: await this.jwtService.signAsync({ userId: response.users[0].id })
      };
    } else {
      throw new Error('User Unknown')
    }
  }

  async validateToken(request: Token): Promise<TokenValidationResponse> {
    const token = request.accessToken;

    try {
      const decodedToken = await this.jwtService.verifyAsync(token);

      return { isValid: true };
    } catch (error) {
      return { isValid: false };
    }
  }
}
