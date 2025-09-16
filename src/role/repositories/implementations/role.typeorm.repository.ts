import { Repository } from 'typeorm';
import { RoleRepository } from '../role.repository.interface';
import { CreateRoleDto } from '@/role/dto/create-role.dto';
import { UpdateRoleDto } from '@/role/dto/update-role.dto';
import { RoleModel } from '@/role/models/role.model';

export class RoleTypeOrmRepository implements RoleRepository {
  constructor(private readonly repository: Repository<RoleModel>) {}

  public async findAll(): Promise<RoleModel[]> {
    return this.repository.find({ order: { id: 'DESC' } });
  }

  public async findById(id: string): Promise<RoleModel | null> {
    return this.repository.findOne({
      where: { id: +id },
      relations: ['permissions'],
    });
  }

  public async create(dto: CreateRoleDto): Promise<RoleModel> {
    const entity = this.repository.create({
      name: dto.name,
      description: dto.description,
      status: dto.status,
    });
    return this.repository.save(entity);
  }

  public async update(id: string, dto: UpdateRoleDto): Promise<RoleModel> {
    const existing = await this.repository.findOne({
      where: { id: +id },
      relations: ['permissions'],
    });
    if (!existing) {
      throw new Error(`Role with ID ${id} not found`);
    }

    Object.assign(existing, {
      name: dto.name ?? existing.name,
      description: dto.description ?? existing.description,
      status: dto.status ?? existing.status,
    });

    return this.repository.save(existing);
  }

  public async remove(entity: RoleModel): Promise<void> {
    await this.repository.remove(entity);
  }
}
