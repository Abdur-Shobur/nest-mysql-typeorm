import { Test, TestingModule } from '@nestjs/testing';
import { RoleDevCategoryService } from './role-dev-category.service';
import { ROLE_DEV_CATEGORY_REPOSITORY_TOKEN } from './repositories/role-dev-category.repository.interface';
import { HttpException, NotFoundException } from '@nestjs/common';
import { iRoleDevCategoryStatus } from './interfaces/role-dev-category.interface';
import { UpdateResult } from 'typeorm';
import { PaginationDto } from '@/helpers/pagination.dto';

const roleDevCategoryMock = {
  id: 1,
  name: 'Backend',
  permissionKey: 'backend_access',
  description: 'Access to backend roles',
  status: iRoleDevCategoryStatus.Active,
};

const roleDevCategoryArray = [roleDevCategoryMock];

const paginationDto: PaginationDto = {
  page: 1,
  limit: 10,
};

describe('RoleDevCategoryService', () => {
  let service: RoleDevCategoryService;
  let repository: any;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RoleDevCategoryService,
        {
          provide: ROLE_DEV_CATEGORY_REPOSITORY_TOKEN,
          useValue: {
            findAll: jest.fn().mockResolvedValue({
              data: roleDevCategoryArray,
              meta: {
                totalItems: 1,
                itemCount: 1,
                itemsPerPage: 10,
                totalPages: 1,
                currentPage: 1,
              },
            }),
            create: jest.fn().mockResolvedValue(roleDevCategoryMock),
            findById: jest.fn().mockResolvedValue(roleDevCategoryMock),
            update: jest
              .fn()
              .mockResolvedValue({ affected: 1 } as UpdateResult),
            remove: jest.fn().mockResolvedValue(undefined),
          },
        },
      ],
    }).compile();

    service = module.get<RoleDevCategoryService>(RoleDevCategoryService);
    repository = module.get(ROLE_DEV_CATEGORY_REPOSITORY_TOKEN);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return paginated role dev categories', async () => {
      const result = await service.findAll(paginationDto);
      expect(result.data).toEqual(roleDevCategoryArray);
      expect(repository.findAll).toHaveBeenCalledWith(paginationDto);
    });
  });

  describe('findOne', () => {
    it('should return a role dev category by id', async () => {
      const result = await service.findOne('1');
      expect(result).toEqual(roleDevCategoryMock);
    });

    it('should throw NotFoundException if not found', async () => {
      repository.findById = jest.fn().mockResolvedValue(null);
      await expect(service.findOne('999')).rejects.toThrow(NotFoundException);
    });
  });

  describe('create', () => {
    it('should create a new role dev category', async () => {
      const dto = {
        name: 'Backend',
        permissionKey: 'backend_access',
        description: 'Access to backend roles',
        status: iRoleDevCategoryStatus.Active,
      };
      const result = await service.create(dto);
      expect(result).toEqual(roleDevCategoryMock);
    });

    it('should throw HttpException if creation fails', async () => {
      repository.create = jest
        .fn()
        .mockRejectedValue(new Error('Create failed'));
      await expect(service.create({} as any)).rejects.toThrow(HttpException);
    });
  });

  describe('update', () => {
    it('should update a role dev category', async () => {
      const updateDto = { name: 'Updated Name' };
      const result = await service.update('1', updateDto);
      expect(result).toEqual({ affected: 1 });
    });

    it('should throw HttpException if update fails', async () => {
      repository.update = jest
        .fn()
        .mockRejectedValue(new Error('Update failed'));
      await expect(service.update('1', {} as any)).rejects.toThrow(
        HttpException,
      );
    });
  });

  describe('remove', () => {
    it('should delete a role dev category', async () => {
      const result = await service.remove('1');
      expect(repository.remove).toHaveBeenCalledWith(roleDevCategoryMock);
      expect(result).toEqual({ id: '1', deleted: true });
    });

    it('should throw NotFoundException if not found', async () => {
      repository.findById = jest.fn().mockResolvedValue(null);
      await expect(service.remove('999')).rejects.toThrow(NotFoundException);
    });
  });
});
