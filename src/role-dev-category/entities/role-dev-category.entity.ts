import { iRoleDevCategoryStatus } from '../interfaces/role-dev-category.interface';

export class RoleDevCategoryEntity {
  constructor(
    public id: number,
    public name: string,
    public permissionKey: string,
    public description: string,
    public status: iRoleDevCategoryStatus = iRoleDevCategoryStatus.Active,
  ) {}
}
