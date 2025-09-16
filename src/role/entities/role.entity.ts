import { iRoleStatus } from '../interfaces/role.interface';

export class RoleEntity {
  constructor(
    public id: number,
    public name: string,
    public permissions: string[],
    public description: string,
    public status: iRoleStatus = iRoleStatus.Active,
  ) {}
}
