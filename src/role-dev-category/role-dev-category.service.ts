import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateRoleDevCategoryDto as DTO } from './dto/create-role-dev-category.dto';
import { UpdateRoleDevCategoryDto as UpdateDto } from './dto/update-role-dev-category.dto';
import { ROLE_DEV_CATEGORY_REPOSITORY_TOKEN } from './repositories/role-dev-category.repository.interface';
import { RoleDevCategoryModel } from './models/role-dev-category.model';
import { RoleDevCategoryTypeOrmRepository } from './repositories/implementations/role-dev-category.typeorm.repository';
import { PaginationDto, PaginationMetaDto } from '@/helpers/pagination.dto';
import { UpdateResult } from 'typeorm';

@Injectable()
export class RoleDevCategoryService {
  constructor(
    @Inject(ROLE_DEV_CATEGORY_REPOSITORY_TOKEN)
    private readonly roleDevCategoryRepository: RoleDevCategoryTypeOrmRepository,
  ) {}

  public async findAll(paginationDto: PaginationDto): Promise<{
    data: RoleDevCategoryModel[];
    meta: PaginationMetaDto;
  }> {
    return this.roleDevCategoryRepository.findAll(paginationDto);
  }

  public async create(dto: DTO): Promise<RoleDevCategoryModel> {
    try {
      return await this.roleDevCategoryRepository.create(dto);
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }

  public async findOne(id: string): Promise<RoleDevCategoryModel> {
    const result = await this.roleDevCategoryRepository.findById(id);

    if (!result) {
      throw new NotFoundException(`Role Dev Category #${id} not found`);
    }

    return result;
  }

  public async update(id: string, uDto: UpdateDto): Promise<UpdateResult> {
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
