import { iRole } from '@/role/interfaces/role.interface';
import { RoleModel } from '@/role/models/role.model';

export interface iRoleSubDevCategory {
  readonly id: number;
  readonly name: string;
  readonly permissionKey: string;
  readonly description: string;
  readonly status: iRoleSubDevCategoryStatus;
  readonly roles?: RoleModel[];
}

// for status
export enum iRoleSubDevCategoryStatus {
  ForLoginUser = 'active',
  ForAnyOne = 'anyone',
  Inactive = 'inactive',
  Deleted = 'deleted',
}
