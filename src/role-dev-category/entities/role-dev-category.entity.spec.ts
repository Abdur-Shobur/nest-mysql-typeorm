import { RoleDevCategoryEntity } from './role-dev-category.entity';
import { iRoleDevCategoryStatus } from '../interfaces/role-dev-category.interface';

describe('RoleDevCategory class', () => {
  it('should create a RoleDevCategory with no fields (empty or default)', () => {
    const category = new RoleDevCategoryEntity(
      0,
      '',
      '',
      '',
      iRoleDevCategoryStatus.Active,
    );
    expect(category).toBeTruthy();
    expect(category.id).toBe(0);
    expect(category.name).toBe('');
    expect(category.permissionKey).toBe('');
    expect(category.description).toBe('');
    expect(category.status).toBe(iRoleDevCategoryStatus.Active);
  });

  it('should create a RoleDevCategory with all fields', () => {
    const category = new RoleDevCategoryEntity(
      1,
      'Category Name',
      'category_permission_key',
      'Description of the category',
      iRoleDevCategoryStatus.Inactive,
    );

    expect(category).toBeTruthy();
    expect(category.id).toBe(1);
    expect(category.name).toBe('Category Name');
    expect(category.permissionKey).toBe('category_permission_key');
    expect(category.description).toBe('Description of the category');
    expect(category.status).toBe(iRoleDevCategoryStatus.Inactive);
  });

  it('should default status to Active if not provided', () => {
    // Create with default status by omitting the last argument
    const category = new RoleDevCategoryEntity(2, 'Name', 'key', 'desc');
    expect(category.status).toBe(iRoleDevCategoryStatus.Active);
  });

  it('should create a RoleDevCategory with partial fields and default status', () => {
    const category = new RoleDevCategoryEntity(3, 'Partial', '', '', undefined);
    expect(category).toBeTruthy();
    expect(category.name).toBe('Partial');
    expect(category.permissionKey).toBe('');
    expect(category.status).toBe(iRoleDevCategoryStatus.Active);
  });
});
