import { Injectable, Provider } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DataSource } from '../../constants';
import { ROLE_DEV_SUB_CATEGORY_REPOSITORY_TOKEN } from './role-dev-sub-category.repository.interface';
import { RoleDevSubCategoryTypeOrmRepository } from './implementations/role-dev-sub-category.typeorm.repository';
import { RoleSubDevCategoryModel } from '../models/role-dev-sub-category.model';
import { RoleDevCategoryModel } from '@/role-dev-category/models/role-dev-category.model';

export function provideRoleDevSubCategoryRepository(): Provider[] {
  return [
    {
      provide: ROLE_DEV_SUB_CATEGORY_REPOSITORY_TOKEN,
      useFactory: (
        dependenciesProvider: RoleDevSubCategoryRepoDependenciesProvider,
      ) => provideRoleDevCategoryRepositoryFactory(dependenciesProvider),
      inject: [RoleDevSubCategoryRepoDependenciesProvider],
    },
    RoleDevSubCategoryRepoDependenciesProvider,
  ];
}

function provideRoleDevCategoryRepositoryFactory(
  dependenciesProvider: RoleDevSubCategoryRepoDependenciesProvider,
) {
  const dataSourceEnv = process.env.USERS_DATASOURCE;

  if (
    !dataSourceEnv ||
    !Object.values(DataSource).includes(dataSourceEnv as DataSource)
  ) {
    throw new Error(`Invalid USERS_DATASOURCE: ${dataSourceEnv}`);
  }

  const dataSource = dataSourceEnv as DataSource;

  switch (dataSource) {
    case DataSource.TYPEORM:
      return new RoleDevSubCategoryTypeOrmRepository(
        dependenciesProvider.typeOrmRepository,
        dependenciesProvider.categoryRepository,
      );
  }
}

@Injectable()
export class RoleDevSubCategoryRepoDependenciesProvider {
  constructor(
    @InjectRepository(RoleSubDevCategoryModel)
    public typeOrmRepository: Repository<RoleSubDevCategoryModel>,
    @InjectRepository(RoleDevCategoryModel)
    public categoryRepository: Repository<RoleDevCategoryModel>,
  ) {}
}
