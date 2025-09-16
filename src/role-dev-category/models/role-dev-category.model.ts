import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToMany,
} from 'typeorm';
import { iRoleDevCategoryStatus } from '../interfaces/role-dev-category.interface'; // adjust path as needed
import { RoleSubDevCategoryModel } from '@/role-dev-sub-category/models/role-dev-sub-category.model';
import { RoleModel } from '@/role/models/role.model';

@Entity('role_dev_categories')
export class RoleDevCategoryModel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255 })
  name: string;

  @Column({ length: 255 })
  permissionKey: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @OneToMany(() => RoleSubDevCategoryModel, (sub) => sub.category, {
    cascade: true,
  })
  subCategories: RoleSubDevCategoryModel[];

  @Column({
    type: 'enum',
    enum: iRoleDevCategoryStatus,
    default: iRoleDevCategoryStatus.Active,
  })
  status: iRoleDevCategoryStatus;
}
