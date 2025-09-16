import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  ManyToMany,
} from 'typeorm';
import { iRoleSubDevCategoryStatus } from '../interfaces/role-dev-sub-category.interface'; // adjust path as needed
import { RoleDevCategoryModel } from '@/role-dev-category/models/role-dev-category.model';
import { RoleModel } from '@/role/models/role.model';

@Entity('role_dev_sub_categories')
export class RoleSubDevCategoryModel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255 })
  name: string;

  @Column({ length: 255 })
  permissionKey: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @ManyToOne(() => RoleDevCategoryModel, (category) => category.subCategories, {
    onDelete: 'CASCADE',
  })
  category: RoleDevCategoryModel;

  @ManyToMany(() => RoleModel, (role) => role.permissions)
  roles: RoleModel[];

  @Column({
    type: 'enum',
    enum: iRoleSubDevCategoryStatus,
    default: iRoleSubDevCategoryStatus.ForLoginUser,
  })
  status: iRoleSubDevCategoryStatus;
}
