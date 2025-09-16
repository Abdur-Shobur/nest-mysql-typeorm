import {
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  IsEnum,
} from 'class-validator';
import { iRoleDevCategoryStatus } from '../interfaces/role-dev-category.interface';
import { CreateRoleDevSubCategoryDto } from '@/role-dev-sub-category/dto/create-role-dev-sub-category.dto';

export class CreateRoleDevCategoryDto {
  @MaxLength(50, { message: 'Name must not exceed 50 characters' })
  @IsString({ message: 'Name must be a string' })
  @IsNotEmpty({ message: 'Name is required' })
  readonly name: string;

  @MaxLength(100, { message: 'Permission key must not exceed 100 characters' })
  @IsString({ message: 'Permission key must be a string' })
  @IsNotEmpty({ message: 'Permission key is required' })
  readonly permissionKey: string;

  @IsOptional()
  @MaxLength(255, { message: 'Description must not exceed 255 characters' })
  @IsString({ message: 'Description must be a string' })
  readonly description: string;

  @IsOptional()
  @IsEnum(iRoleDevCategoryStatus, {
    message: `Status must be one of the following: ${Object.values(iRoleDevCategoryStatus).join(', ')}`,
  })
  readonly status: iRoleDevCategoryStatus;

  @IsOptional()
  readonly subCategories?: CreateRoleDevSubCategoryDto[];
}
