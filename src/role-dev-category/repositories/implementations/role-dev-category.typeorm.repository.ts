import { RoleDevCategoryRepository } from '../role-dev-category.repository.interface';
import { Repository, UpdateResult } from 'typeorm';
import { RoleDevCategoryModel } from '@/role-dev-category/models/role-dev-category.model';
import { CreateRoleDevCategoryDto } from '@/role-dev-category/dto/create-role-dev-category.dto';
import { PaginationDto, PaginationMetaDto } from '@/helpers/pagination.dto';
import { UpdateRoleDevCategoryDto } from '@/role-dev-category/dto/update-role-dev-category.dto';

export class RoleDevCategoryTypeOrmRepository
  implements RoleDevCategoryRepository
{
  constructor(private readonly repository: Repository<RoleDevCategoryModel>) {}

  public async findAll(paginationDto: PaginationDto): Promise<{
    data: RoleDevCategoryModel[];
    meta: PaginationMetaDto;
  }> {
    const page = paginationDto.page || 1;
    const limit = paginationDto.limit || 10;

    const [items, total] = await this.repository.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
      order: { id: 'DESC' },
    });

    const pageCount = Math.ceil(total / limit);
    const meta: PaginationMetaDto = {
      page,
      limit,
      total,
      pageCount,
      hasPreviousPage: page > 1,
      hasNextPage: page < pageCount,
    };

    return { data: items, meta };
  }

  public async findBySub(sub: number): Promise<RoleDevCategoryModel> {
    return await this.repository.findOneByOrFail({
      id: sub,
    });
  }

  public async findById(userId: string): Promise<RoleDevCategoryModel | null> {
    return await this.repository.findOneBy({
      id: +userId,
    });
  }

  public async create(
    dto: CreateRoleDevCategoryDto,
  ): Promise<RoleDevCategoryModel> {
    return await this.repository.save(dto);
  }

  public async update(
    id: string,
    dto: UpdateRoleDevCategoryDto,
  ): Promise<UpdateResult> {
    return await this.repository.update(
      {
        id: +id,
      },
      { ...dto },
    );
  }

  public async remove(data: any): Promise<void> {
    await this.repository.remove(data);
  }
}
