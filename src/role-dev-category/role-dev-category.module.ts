import { Module } from '@nestjs/common';
import { RoleDevCategoryService } from './role-dev-category.service';
import { RoleDevCategoryController } from './role-dev-category.controller';
import { provideRoleDevCategoryRepository } from './repositories/role-dev-category.repository.provider';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoleDevCategoryModel as RoleDevCategories } from './models/role-dev-category.model';

@Module({
  imports: [TypeOrmModule.forFeature([RoleDevCategories])],
  controllers: [RoleDevCategoryController],
  providers: [RoleDevCategoryService, ...provideRoleDevCategoryRepository()],
  exports: [RoleDevCategoryService, ...provideRoleDevCategoryRepository()],
})
export class RoleDevCategoryModule {}
