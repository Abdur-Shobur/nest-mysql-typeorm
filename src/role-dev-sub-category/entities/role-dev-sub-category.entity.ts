import { RoleDevCategoryModel } from '@/role-dev-category/models/role-dev-category.model';
import { iRoleSubDevCategoryStatus } from '../interfaces/role-dev-sub-category.interface';
import { RoleModel } from '@/role/models/role.model';

export class RoleDevSubCategoryEntity {
  constructor(
    public id: number,
    public name: string,
    public permissionKey: string,
    public description: string,
    public status: iRoleSubDevCategoryStatus = iRoleSubDevCategoryStatus.ForLoginUser,
    public category: RoleDevCategoryModel,
    public roles: RoleModel[],
  ) {}
}
