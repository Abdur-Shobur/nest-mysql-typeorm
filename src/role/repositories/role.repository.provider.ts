import { Injectable, Provider } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DataSource } from '../../constants';
import { RoleModel } from '../models/role.model';
import { RoleTypeOrmRepository } from './implementations/role.typeorm.repository';
import { ROLE_REPOSITORY_TOKEN } from './role.repository.interface';

export function provideRoleRepository(): Provider[] {
  return [
    {
      provide: ROLE_REPOSITORY_TOKEN,
      useFactory: (dependenciesProvider: RoleRepoDependenciesProvider) =>
        provideRoleRepositoryFactory(dependenciesProvider),
      inject: [RoleRepoDependenciesProvider],
    },
    RoleRepoDependenciesProvider,
  ];
}

function provideRoleRepositoryFactory(
  dependenciesProvider: RoleRepoDependenciesProvider,
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
      return new RoleTypeOrmRepository(dependenciesProvider.typeOrmRepository);
  }
}

@Injectable()
export class RoleRepoDependenciesProvider {
  constructor(
    @InjectRepository(RoleModel)
    public typeOrmRepository: Repository<RoleModel>,
  ) {}
}
