import {
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  IsEnum,
} from 'class-validator';
import { iRoleStatus } from '../interfaces/role.interface';
import { CreateRoleDevSubCategoryDto } from '@/role-dev-sub-category/dto/create-role-dev-sub-category.dto';

export class CreateRoleDto {
  @MaxLength(50, { message: 'Name must not exceed 50 characters' })
  @IsString({ message: 'Name must be a string' })
  @IsNotEmpty({ message: 'Name is required' })
  readonly name: string;

  @IsOptional()
  @MaxLength(255, { message: 'Description must not exceed 255 characters' })
  @IsString({ message: 'Description must be a string' })
  readonly description: string;

  @IsOptional()
  @IsEnum(iRoleStatus, {
    message: `Status must be one of the following: ${Object.values(iRoleStatus).join(', ')}`,
  })
  readonly status: iRoleStatus;

  @IsOptional()
  readonly permissions?: CreateRoleDevSubCategoryDto[];
}
