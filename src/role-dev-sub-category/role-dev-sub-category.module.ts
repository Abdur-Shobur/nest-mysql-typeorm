import { Module } from '@nestjs/common';
import { RoleDevSubCategoryService } from './role-dev-sub-category.service';
import { RoleDevSubCategoryController } from './role-dev-sub-category.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoleSubDevCategoryModel } from './models/role-dev-sub-category.model';
import { provideRoleDevSubCategoryRepository } from './repositories/role-dev-sub-category.repository.provider';
import { RoleDevCategoryModel } from '@/role-dev-category/models/role-dev-category.model';
import { RoleModel } from '@/role/models/role.model';

@Module({
  imports: [
    TypeOrmModule.forFeature([RoleSubDevCategoryModel]),
    TypeOrmModule.forFeature([RoleDevCategoryModel]),
    TypeOrmModule.forFeature([RoleModel]),
  ],
  controllers: [RoleDevSubCategoryController],
  providers: [
    RoleDevSubCategoryService,
    ...provideRoleDevSubCategoryRepository(),
  ],
})
export class RoleDevSubCategoryModule {}
