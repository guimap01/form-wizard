import { PreferredTime } from '@prisma/client';
import { IsEmail, IsEnum, IsOptional, IsString } from 'class-validator';
export class CreateUserDto {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsEmail()
  email: string;

  @IsString()
  deliveryAddress: string;

  @IsEnum(PreferredTime)
  preferredTime: PreferredTime;

  @IsString()
  @IsOptional()
  specialInstructions?: string;
}
