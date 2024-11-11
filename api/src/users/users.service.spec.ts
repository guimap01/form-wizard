import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { PrismaService } from '../database/prisma/prisma.service';
import { PreferredTime } from '@prisma/client';

const prismaMock = {
  user: {
    create: jest.fn(),
    findUnique: jest.fn(),
  },
};

describe('UsersService', () => {
  let service: UsersService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        { provide: PrismaService, useValue: prismaMock },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    prisma = module.get<PrismaService>(PrismaService);
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  it('should create a user', async () => {
    const data = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'test@email.com',
      deliveryAddress: '123 Test St',
      preferredTime: PreferredTime.morning,
      specialInstructions: 'None',
    };
    await service.create(data);

    expect(prisma.user.create).toHaveBeenCalledTimes(1);

    expect(prisma.user.create).toHaveBeenCalledWith({
      data: {
        first_name: data.firstName,
        last_name: data.lastName,
        email: data.email,
        address: data.deliveryAddress,
        preferred_time: data.preferredTime,
        special_instructions: data.specialInstructions,
      },
    });
  });
  it('should find a user by email', async () => {
    const email = 'test@gmail.com';
    await service.findUserByEmail(email);

    expect(prisma.user.findUnique).toHaveBeenCalledWith({
      where: {
        email,
      },
    });
  });
  it('should throw an error if email already exists', async () => {
    const data = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'test@gmail.com',
      deliveryAddress: '123 Test St',
      preferredTime: PreferredTime.morning,
      specialInstructions: 'None',
    };
    prismaMock.user.findUnique.mockResolvedValueOnce(data);

    expect(() => service.create(data)).rejects.toThrow('Email already exists');
  });
});
