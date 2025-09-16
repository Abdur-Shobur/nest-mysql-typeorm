import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateRoleDevSubCategoryDto as DTO } from './dto/create-role-dev-sub-category.dto';
import { UpdateRoleDevSubCategoryDto as UpdateDto } from './dto/update-role-dev-sub-category.dto';
import { ROLE_DEV_SUB_CATEGORY_REPOSITORY_TOKEN } from './repositories/role-dev-sub-category.repository.interface';
import { RoleSubDevCategoryModel as Model } from './models/role-dev-sub-category.model';
import { RoleDevSubCategoryTypeOrmRepository } from './repositories/implementations/role-dev-sub-category.typeorm.repository';
import { PaginationDto, PaginationMetaDto } from '@/helpers/pagination.dto';
import { UpdateResult } from 'typeorm';
import { RoleDevSubCategoryEntity } from './entities/role-dev-sub-category.entity';

@Injectable()
export class RoleDevSubCategoryService {
  constructor(
    @Inject(ROLE_DEV_SUB_CATEGORY_REPOSITORY_TOKEN)
    private readonly roleDevCategoryRepository: RoleDevSubCategoryTypeOrmRepository,
  ) {}

  public async findAll(paginationDto: PaginationDto): Promise<{
    data: Model[];
    meta: PaginationMetaDto;
  }> {
    return this.roleDevCategoryRepository.findAll(paginationDto);
  }

  public async create(dto: DTO): Promise<Model> {
    try {
      return await this.roleDevCategoryRepository.create(dto);
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }

  public async findOne(id: string): Promise<Model> {
    const result = await this.roleDevCategoryRepository.findById(id);

    if (!result) {
      throw new NotFoundException(`Role Dev Category #${id} not found`);
    }

    return result;
  }

  public async update(
    id: string,
    uDto: UpdateDto,
  ): Promise<RoleDevSubCategoryEntity> {
    try {
      return await this.roleDevCategoryRepository.update(id, uDto);
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }

  public async remove(id: string): Promise<{ id: string; deleted: boolean }> {
    const entity = await this.findOne(id);
    console.log(entity);
    if (!entity) {
      throw new NotFoundException(`RoleDevCategory with ID ${id} not found`);
    }

    await this.roleDevCategoryRepository.remove(entity);

    return { id, deleted: true };
  }
}
