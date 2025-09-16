import { CreateRoleDto } from '../dto/create-role.dto';
import { RoleModel } from '../models/role.model';
import { UpdateRoleDto } from '../dto/update-role.dto';

export interface RoleRepository {
  findAll(): Promise<RoleModel[]>;
  findById(id: string): Promise<RoleModel | null>;
  create(dto: CreateRoleDto): Promise<RoleModel>;
  update(id: string, dto: UpdateRoleDto): Promise<RoleModel>;
  remove(entity: RoleModel): Promise<void>;
}

export const ROLE_REPOSITORY_TOKEN = 'role-repository-token';
