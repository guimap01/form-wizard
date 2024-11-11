import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma/prisma.service';
import { CreateUserDto } from './dto/CreateUserDto';

@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService) {}
  async create(data: CreateUserDto) {
    const user = await this.findUserByEmail(data.email);
    if (user) {
      throw new BadRequestException('Email already exists');
    }
    return this.prismaService.user.create({
      data: {
        first_name: data.firstName,
        last_name: data.lastName,
        email: data.email,
        address: data.deliveryAddress,
        preferred_time: data.preferredTime,
        special_instructions: data.specialInstructions,
      },
    });
  }

  async findUserByEmail(email: string) {
    return this.prismaService.user.findUnique({
      where: {
        email,
      },
    });
  }
}
