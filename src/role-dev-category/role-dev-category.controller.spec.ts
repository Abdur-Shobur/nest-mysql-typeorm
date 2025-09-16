import { Test, TestingModule } from '@nestjs/testing';
import { RoleDevCategoryController } from './role-dev-category.controller';
import { RoleDevCategoryService } from './role-dev-category.service';
import { LoggerService } from '@/common/logger/logger.service';
import { HttpException, HttpStatus } from '@nestjs/common';
import { iRoleDevCategoryStatus } from './interfaces/role-dev-category.interface';
import { UpdateResult } from 'typeorm';
import { PaginationDto } from '@/helpers/pagination.dto';
import { ResponseService } from '@/common/response/response.service';

const mockCategory = {
  id: 1,
  name: 'Frontend',
  permissionKey: 'frontend_access',
  description: 'Frontend team permissions',
  status: iRoleDevCategoryStatus.Active,
};

const updateResultMock: UpdateResult = {
  generatedMaps: [],
  raw: [],
  affected: 1,
};

const mockPaginationDto: PaginationDto = {
  page: 1,
  limit: 10,
};

const mockPaginationResponse = {
  data: [mockCategory],
  meta: {
    page: 1,
    limit: 10,
    total: 1,
    pageCount: 1,
    itemCount: 1,
    hasPreviousPage: false,
    hasNextPage: false,
  },
};

describe('RoleDevCategoryController', () => {
  let controller: RoleDevCategoryController;
  let service: RoleDevCategoryService;

  const mockLoggerService = {
    log: jest.fn(),
    error: jest.fn(),
  };

  const mockService = {
    create: jest.fn().mockResolvedValue(mockCategory),
    findAll: jest.fn().mockResolvedValue(mockPaginationResponse),
    findOne: jest.fn().mockResolvedValue(mockCategory),
    update: jest.fn().mockResolvedValue(updateResultMock),
    remove: jest.fn().mockResolvedValue({ id: '1', deleted: true }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RoleDevCategoryController],
      providers: [
        { provide: RoleDevCategoryService, useValue: mockService },
        { provide: LoggerService, useValue: mockLoggerService },
      ],
    }).compile();

    controller = module.get<RoleDevCategoryController>(
      RoleDevCategoryController,
    );
    service = module.get<RoleDevCategoryService>(RoleDevCategoryService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a role dev category and return a response', async () => {
      const result = await controller.create(mockCategory as any);
      expect(result).toEqual(
        ResponseService.success({
          data: mockCategory,
          message: 'RoleDevCategory created successfully',
          statusCode: HttpStatus.CREATED,
        }),
      );
    });

    it('should throw HttpException on service error', async () => {
      mockService.create = jest
        .fn()
        .mockRejectedValue(new Error('Creation failed'));
      await expect(controller.create(mockCategory as any)).rejects.toThrow(
        HttpException,
      );
    });
  });

  describe('findAllRoleDevCategory', () => {
    it('should return all role dev categories with pagination', async () => {
      const result = await controller.findAllRoleDevCategory(mockPaginationDto);
      expect(result).toEqual(
        ResponseService.success({
          data: [mockCategory],
          message: 'Successfully fetched role dev categories',
          statusCode: 200,
          meta: mockPaginationResponse.meta,
        }),
      );
    });

    it('should throw HttpException on failure', async () => {
      mockService.findAll = jest
        .fn()
        .mockRejectedValue(new Error('Fetch failed'));
      await expect(
        controller.findAllRoleDevCategory(mockPaginationDto),
      ).rejects.toThrow(HttpException);
    });
  });

  describe('findOne', () => {
    it('should return a single role dev category', async () => {
      const result = await controller.findOne('1');
      expect(result).toEqual(
        ResponseService.success({
          data: mockCategory,
          message: 'RoleDevCategory retrieved successfully',
        }),
      );
    });

    it('should throw HttpException if category not found', async () => {
      mockService.findOne = jest.fn().mockResolvedValue(null);
      await expect(controller.findOne('999')).rejects.toThrow(HttpException);
    });

    it('should throw HttpException on failure', async () => {
      mockService.findOne = jest
        .fn()
        .mockRejectedValue(new Error('Fetch error'));
      await expect(controller.findOne('999')).rejects.toThrow(HttpException);
    });
  });

  describe('update', () => {
    it('should update a category and return success response', async () => {
      const result = await controller.update('1', {
        name: 'Updated Name',
      } as any);
      expect(result).toEqual(
        ResponseService.success({
          data: updateResultMock,
          message: 'RoleDevCategory updated successfully',
          statusCode: HttpStatus.OK,
        }),
      );
    });

    it('should throw HttpException on update failure', async () => {
      mockService.update = jest
        .fn()
        .mockRejectedValue(new Error('Update failed'));
      await expect(controller.update('1', {} as any)).rejects.toThrow(
        HttpException,
      );
    });
  });

  describe('remove', () => {
    it('should delete a category and return response', async () => {
      const result = await controller.remove('1');
      expect(result).toEqual(
        ResponseService.success({
          data: { id: '1', deleted: true },
          message: 'RoleDevCategory deleted successfully',
          statusCode: HttpStatus.OK,
        }),
      );
    });

    it('should throw HttpException on deletion failure', async () => {
      mockService.remove = jest
        .fn()
        .mockRejectedValue(new Error('Delete failed'));
      await expect(controller.remove('1')).rejects.toThrow(HttpException);
    });
  });
});
