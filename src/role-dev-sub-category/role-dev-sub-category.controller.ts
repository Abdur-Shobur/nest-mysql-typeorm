import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpException,
  HttpStatus,
  Query,
} from '@nestjs/common';
import { RoleDevSubCategoryService } from './role-dev-sub-category.service';
import { CreateRoleDevSubCategoryDto as DTO } from './dto/create-role-dev-sub-category.dto';
import { UpdateRoleDevSubCategoryDto as UpdateDTO } from './dto/update-role-dev-sub-category.dto';
import { iRoleSubDevCategory } from './interfaces/role-dev-sub-category.interface';
import { LoggerService } from '@/common/logger/logger.service';
import { PaginationDto } from '@/helpers/pagination.dto';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@/iam/login/decorators/auth-guard.decorator';
import { AuthType } from '@/iam/login/enums/auth-type.enum';
import { ResponseService } from '@/common/response/response.service';
import { iResponse } from '@/common/response/response.interface';
import { UpdateResult } from 'typeorm';
import { RoleDevSubCategoryEntity } from './entities/role-dev-sub-category.entity';

@ApiBearerAuth()
@AuthGuard(AuthType.Bearer)
@Controller('role-dev-sub-category')
export class RoleDevSubCategoryController {
  constructor(
    private readonly service: RoleDevSubCategoryService,
    private readonly loggerService: LoggerService,
  ) {}

  /**
   * CREATE ROLE DEV CATEGORY
   **/
  @Post()
  async create(@Body() dto: DTO): Promise<iResponse<iRoleSubDevCategory>> {
    try {
      const result = await this.service.create(dto);

      this.loggerService.log(
        'Successfully created role dev category',
        'UsersController',
      );

      return ResponseService.success({
        data: result,
        message: 'RoleDevCategory created successfully',
        statusCode: HttpStatus.CREATED,
      });
    } catch (error: any) {
      this.loggerService.error(
        error.message || 'Unknown error',
        error.stack,
        'UsersController',
      );

      throw new HttpException(
        ResponseService.error({
          message: error.message || 'Failed to create RoleDevCategory',
          statusCode: HttpStatus.BAD_REQUEST,
          errors: error,
        }),
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  /**
   * GET ALL ROLE DEV CATEGORIES
   **/
  @Get()
  public async findAllRoleDevCategory(
    @Query() paginationDto: PaginationDto,
  ): Promise<iResponse<iRoleSubDevCategory[]>> {
    try {
      this.loggerService.log('Fetching role dev categories', 'UsersController');

      const result = await this.service.findAll(paginationDto);

      return ResponseService.success({
        data: result.data,
        message: 'Successfully fetched role dev categories',
        statusCode: 200,
        meta: result.meta,
      });
    } catch (error: any) {
      this.loggerService.error(
        error.message || 'Unknown error',
        error.stack,
        'UsersController',
      );

      throw new HttpException(
        ResponseService.error({
          message: error.message || 'Role Dev Categories not found',
          statusCode: HttpStatus.NOT_FOUND,
          errors: error,
        }),
        HttpStatus.NOT_FOUND,
      );
    }
  }

  /**
   * GET ONE ROLE DEV CATEGORY
   */
  @Get(':id')
  async findOne(
    @Param('id') id: string,
  ): Promise<iResponse<iRoleSubDevCategory>> {
    try {
      const category = await this.service.findOne(id);

      if (!category) {
        throw new HttpException(
          ResponseService.error({
            message: `RoleDevCategory with ID ${id} not found`,
            statusCode: HttpStatus.NOT_FOUND,
          }),
          HttpStatus.NOT_FOUND,
        );
      }

      this.loggerService.log(
        `Successfully fetched RoleDevCategory with ID ${id}`,
        'UsersController',
      );

      return ResponseService.success({
        data: category,
        message: 'RoleDevCategory retrieved successfully',
      });
    } catch (error: any) {
      this.loggerService.error(
        error.message || 'Unknown error',
        error.stack,
        'UsersController',
      );

      throw new HttpException(
        ResponseService.error({
          message:
            error.message || `Failed to fetch RoleDevCategory with ID ${id}`,
          statusCode: HttpStatus.BAD_REQUEST,
          errors: error,
        }),
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() uDto: UpdateDTO,
  ): Promise<iResponse<RoleDevSubCategoryEntity>> {
    try {
      const updated = await this.service.update(id, uDto);

      if (!updated) {
        throw new HttpException(
          ResponseService.error({
            message: `RoleDevCategory with ID ${id} not found`,
            statusCode: HttpStatus.NOT_FOUND,
          }),
          HttpStatus.NOT_FOUND,
        );
      }

      this.loggerService.log(
        `Successfully updated RoleDevCategory with ID ${id}`,
        'UsersController',
      );

      return ResponseService.success({
        data: updated,
        message: 'RoleDevCategory updated successfully',
        statusCode: HttpStatus.OK,
      });
    } catch (error: any) {
      this.loggerService.error(
        error.message || 'Unknown error',
        error.stack,
        'UsersController',
      );

      throw new HttpException(
        ResponseService.error({
          message:
            error.message || `Failed to update RoleDevCategory with ID ${id}`,
          statusCode: HttpStatus.BAD_REQUEST,
          errors: error,
        }),
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<iResponse<any>> {
    try {
      const result = await this.service.remove(id);

      this.loggerService.log(
        `Successfully deleted RoleDevCategory with ID ${id}`,
        'UsersController',
      );

      return ResponseService.success({
        data: result,
        message: 'RoleDevCategory deleted successfully',
        statusCode: HttpStatus.OK,
      });
    } catch (error: any) {
      this.loggerService.error(
        error.message || 'Unknown error',
        error.stack,
        'UsersController',
      );

      throw new HttpException(
        ResponseService.error({
          message:
            error.message || `Failed to delete RoleDevCategory with ID ${id}`,
          statusCode: error.status || HttpStatus.BAD_REQUEST,
          errors: error,
        }),
        error.status || HttpStatus.BAD_REQUEST,
      );
    }
  }
}
