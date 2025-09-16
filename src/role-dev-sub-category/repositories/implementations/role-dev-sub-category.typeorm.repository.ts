import { PaginationDto, PaginationMetaDto } from '@/helpers/pagination.dto';
import { RoleDevCategoryModel } from '@/role-dev-category/models/role-dev-category.model';
import { CreateRoleDevSubCategoryDto } from '@/role-dev-sub-category/dto/create-role-dev-sub-category.dto';
import { UpdateRoleDevSubCategoryDto } from '@/role-dev-sub-category/dto/update-role-dev-sub-category.dto';
import { RoleDevSubCategoryEntity } from '@/role-dev-sub-category/entities/role-dev-sub-category.entity';
import { NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { RoleDevSubCategoryRepository } from '../role-dev-sub-category.repository.interface';

export class RoleDevSubCategoryTypeOrmRepository
  implements RoleDevSubCategoryRepository
{
  constructor(
    private readonly repository: Repository<RoleDevSubCategoryEntity>,
    private readonly categoryRepository: Repository<RoleDevCategoryModel>,
  ) {}

  public async findAll(paginationDto: PaginationDto): Promise<{
    data: RoleDevSubCategoryEntity[];
    meta: PaginationMetaDto;
  }> {
    const page = paginationDto.page || 1;
    const limit = paginationDto.limit || 10;

    const [items, total] = await this.repository.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
      order: { id: 'DESC' },
      relations: ['category'],
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

  public async findBySub(sub: number): Promise<RoleDevSubCategoryEntity> {
    return await this.repository.findOneByOrFail({
      id: sub,
    });
  }

  public async findById(
    userId: string,
  ): Promise<RoleDevSubCategoryEntity | null> {
    return await this.repository.findOne({
      where: { id: +userId },
      relations: ['category'],
    });
  }

  public async create(
    dto: CreateRoleDevSubCategoryDto,
  ): Promise<RoleDevSubCategoryEntity> {
    // 1. Fetch category from DB using the categoryId
    const category = await this.categoryRepository.findOneBy({
      id: dto.categoryId,
    });

    if (!category) {
      throw new NotFoundException(
        `Category with id ${dto.categoryId} not found`,
      );
    }

    // 2. Create new subcategory with relation
    const subCategory = this.repository.create({
      name: dto.name,
      permissionKey: dto.permissionKey,
      description: dto.description,
      status: dto.status,
      category: category,
    });

    // 3. Save and return
    const saved = await this.repository.save(subCategory);

    // 4. Optionally map to entity
    return new RoleDevSubCategoryEntity(
      saved.id,
      saved.name,
      saved.permissionKey,
      saved.description,
      saved.status,
      category,
      saved.roles,
    );
  }

  public async update(
    id: string,
    dto: UpdateRoleDevSubCategoryDto,
  ): Promise<RoleDevSubCategoryEntity> {
    const subCategory = await this.repository.findOne({
      where: { id: +id },
      relations: ['category'],
    });

    if (!subCategory) {
      throw new NotFoundException(`SubCategory with ID ${id} not found`);
    }

    // If categoryId is being updated, validate it exists
    if (dto.categoryId) {
      const category = await this.categoryRepository.findOneBy({
        id: dto.categoryId,
      });
      if (!category) {
        throw new NotFoundException(
          `Category with ID ${dto.categoryId} not found`,
        );
      }
      subCategory.category = category;
    }

    // Apply updates to the entity
    Object.assign(subCategory, {
      name: dto.name ?? subCategory.name,
      permissionKey: dto.permissionKey ?? subCategory.permissionKey,
      description: dto.description ?? subCategory.description,
      status: dto.status ?? subCategory.status,
    });

    const updated = await this.repository.save(subCategory);

    return new RoleDevSubCategoryEntity(
      updated.id,
      updated.name,
      updated.permissionKey,
      updated.description,
      updated.status,
      updated.category,
      updated.roles,
    );
  }

  public async remove(data: any): Promise<void> {
    await this.repository.remove(data);
  }
}
