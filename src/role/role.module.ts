import { Module } from '@nestjs/common';
import { RoleService } from './role.service';
import { RoleController } from './role.controller';
import { RoleModel } from './models/role.model';
import { TypeOrmModule } from '@nestjs/typeorm';
import { provideRoleRepository } from './repositories/role.repository.provider';

@Module({
  imports: [TypeOrmModule.forFeature([RoleModel])],
  controllers: [RoleController],
  providers: [RoleService, ...provideRoleRepository()],
})
export class RoleModule {}

/*
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

*/
