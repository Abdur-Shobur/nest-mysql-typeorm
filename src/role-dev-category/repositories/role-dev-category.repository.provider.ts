import { Injectable, Provider } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DataSource } from '../../constants';
import { ROLE_DEV_CATEGORY_REPOSITORY_TOKEN } from './role-dev-category.repository.interface';
import { RoleDevCategoryModel } from '../models/role-dev-category.model';
import { RoleDevCategoryTypeOrmRepository } from './implementations/role-dev-category.typeorm.repository';

export function provideRoleDevCategoryRepository(): Provider[] {
  return [
    {
      provide: ROLE_DEV_CATEGORY_REPOSITORY_TOKEN,
      useFactory: (
        dependenciesProvider: RoleDevCategoryRepoDependenciesProvider,
      ) => provideRoleDevCategoryRepositoryFactory(dependenciesProvider),
      inject: [RoleDevCategoryRepoDependenciesProvider],
    },
    RoleDevCategoryRepoDependenciesProvider,
  ];
}

function provideRoleDevCategoryRepositoryFactory(
  dependenciesProvider: RoleDevCategoryRepoDependenciesProvider,
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
      return new RoleDevCategoryTypeOrmRepository(
        dependenciesProvider.typeOrmRepository,
      );
  }
}

@Injectable()
export class RoleDevCategoryRepoDependenciesProvider {
  constructor(
    @InjectRepository(RoleDevCategoryModel)
    public typeOrmRepository: Repository<RoleDevCategoryModel>,
  ) {}
}
