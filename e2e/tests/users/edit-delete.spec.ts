import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { loginAs } from '../../helpers/auth';

test.describe('Edit / Delete User', () => {
  let testUserName: string;

  test.beforeEach(async ({ page }) => {
    testUserName = faker.person.fullName();
    const testUserEmail = faker.internet.email().toLowerCase();

    await loginAs(page, 'SUPER_ADMIN');
    await page.goto('/users');
    await page.waitForURL('/users');

    // Create test user
    await page.getByRole('button', { name: /add user/i }).click();
    const dialog = page.getByRole('dialog');
    await dialog.locator('input[name="name"]').fill(testUserName);
    await dialog.locator('input[name="email"]').fill(testUserEmail);
    await dialog.locator('input[name="password"]').fill('Password123!');
    await dialog.locator('select[name="role"]').selectOption('STAFF');
    await dialog.getByRole('button', { name: /create user/i }).click();
    await expect(dialog).not.toBeVisible({ timeout: 10000 });
    await expect(page.getByText(testUserName)).toBeVisible();
  });

  test('edit user name — updated in table', async ({ page }) => {
    const newName = faker.person.fullName();
    const row = page.locator('tr').filter({ hasText: testUserName });
    await row.locator('button[title="Edit user"]').click();

    const dialog = page.getByRole('dialog');
    await expect(dialog).toBeVisible();
    await dialog.locator('input[name="name"]').fill(newName);
    await dialog.getByRole('button', { name: /save changes/i }).click();

    await expect(dialog).not.toBeVisible({ timeout: 10000 });
    await expect(page.getByText(newName)).toBeVisible({ timeout: 5000 });
  });

  test('delete user — removed from table', async ({ page }) => {
    const row = page.locator('tr').filter({ hasText: testUserName });
    await row.locator('button[title="Delete user"]').click();

    const confirmDialog = page.getByRole('dialog');
    await expect(confirmDialog).toBeVisible();
    await confirmDialog.getByRole('button', { name: /confirm/i }).click();

    await expect(confirmDialog).not.toBeVisible({ timeout: 10000 });
    await expect(page.getByText(testUserName)).not.toBeVisible({ timeout: 5000 });
  });

  test('cannot delete own account', async ({ page }) => {
    // The Super Admin row should have no delete button (isSelf check)
    const superAdminRow = page.locator('tr').filter({ hasText: 'Super Admin' }).filter({ hasText: '(you)' });
    const deleteBtn = superAdminRow.locator('button[title="Delete user"]');
    await expect(deleteBtn).not.toBeVisible();
  });
});
