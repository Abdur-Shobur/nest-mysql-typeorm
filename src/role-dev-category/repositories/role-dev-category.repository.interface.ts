import { PaginationDto, PaginationMetaDto } from '@/helpers/pagination.dto';
import { CreateRoleDevCategoryDto } from '../dto/create-role-dev-category.dto';
import { RoleDevCategoryModel } from '../models/role-dev-category.model';
import { UpdateRoleDevCategoryDto } from '../dto/update-role-dev-category.dto';

export interface RoleDevCategoryRepository {
  findAll(paginationDto: PaginationDto): Promise<{
    data: RoleDevCategoryModel[];
    meta: PaginationMetaDto;
  }>;
  findBySub(sub: number): void;
  findById(userId: string): void;
  create(userDto: CreateRoleDevCategoryDto): void;
  update(id: string, userUpdateDto: UpdateRoleDevCategoryDto): void;
  remove(id: string): void;
}

export const ROLE_DEV_CATEGORY_REPOSITORY_TOKEN =
  'role-dev-category-repository-token';
