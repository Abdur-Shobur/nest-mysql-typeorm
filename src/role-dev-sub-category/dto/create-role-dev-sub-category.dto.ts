import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';
import { iRoleSubDevCategoryStatus } from '../interfaces/role-dev-sub-category.interface';

export class CreateRoleDevSubCategoryDto {
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

  @IsNumber(
    { allowInfinity: false, allowNaN: false },
    { message: 'Category id must be a number' },
  )
  @IsNotEmpty({ message: 'Category id is required' })
  readonly categoryId: number;

  @IsOptional()
  @IsString({
    message: `Status must be one of the following: ${Object.values(iRoleSubDevCategoryStatus).join(', ')}`,
  })
  readonly status: iRoleSubDevCategoryStatus;
}
