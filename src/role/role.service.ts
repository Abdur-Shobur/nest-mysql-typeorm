import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import {
  RoleRepository,
  ROLE_REPOSITORY_TOKEN,
} from './repositories/role.repository.interface';
import { RoleModel } from './models/role.model';

@Injectable()
export class RoleService {
  constructor(
    @Inject(ROLE_REPOSITORY_TOKEN)
    private readonly repository: RoleRepository,
  ) {}

  async create(createRoleDto: CreateRoleDto): Promise<RoleModel> {
    return this.repository.create(createRoleDto);
  }

  async findAll(): Promise<RoleModel[]> {
    return this.repository.findAll();
  }

  async findOne(id: number): Promise<RoleModel> {
    const role = await this.repository.findById(String(id));
    if (!role) throw new NotFoundException(`Role #${id} not found`);
    return role;
  }

  async update(id: number, updateRoleDto: UpdateRoleDto): Promise<RoleModel> {
    return this.repository.update(String(id), updateRoleDto);
  }

  async remove(id: number): Promise<{ id: number; deleted: boolean }> {
    const role = await this.repository.findById(String(id));
    if (!role) throw new NotFoundException(`Role #${id} not found`);
    await this.repository.remove(role);
    return { id, deleted: true };
  }
}
