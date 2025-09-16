export interface iRole {
  readonly id: number;
  readonly name: string;
  readonly permissions: string[]; // sub dev category items
  readonly description: string;
  readonly status: iRoleStatus;
}

// for status
export enum iRoleStatus {
  Active = 'active',
  Inactive = 'inactive',
  Deleted = 'deleted',
}
