import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { iRoleStatus } from '../interfaces/role.interface';
import { RoleSubDevCategoryModel } from '@/role-dev-sub-category/models/role-dev-sub-category.model';

@Entity('roles')
export class RoleModel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255 })
  name: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @ManyToMany(
    () => RoleSubDevCategoryModel,
    (devSubCategory) => devSubCategory.roles,
  )
  @JoinTable({ name: 'role_permissions' })
  permissions: RoleSubDevCategoryModel[];

  @Column({
    type: 'enum',
    enum: iRoleStatus,
    default: iRoleStatus.Active,
  })
  status: iRoleStatus;
}
