import { PaginationDto, PaginationMetaDto } from '@/helpers/pagination.dto';
import { CreateRoleDevSubCategoryDto } from '../dto/create-role-dev-sub-category.dto';
import { RoleSubDevCategoryModel } from '../models/role-dev-sub-category.model';
import { UpdateRoleDevSubCategoryDto } from '../dto/update-role-dev-sub-category.dto';

export interface RoleDevSubCategoryRepository {
  findAll(paginationDto: PaginationDto): Promise<{
    data: RoleSubDevCategoryModel[];
    meta: PaginationMetaDto;
  }>;
  findBySub(sub: number): void;
  findById(userId: string): void;
  create(userDto: CreateRoleDevSubCategoryDto): void;
  update(id: string, userUpdateDto: UpdateRoleDevSubCategoryDto): void;
  remove(id: string): void;
}

export const ROLE_DEV_SUB_CATEGORY_REPOSITORY_TOKEN =
  'role-dev-sub-category-repository-token';
