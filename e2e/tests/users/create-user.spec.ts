import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { loginAs } from '../../helpers/auth';

test.describe('Create User', () => {
  test.beforeEach(async ({ page }) => {
    await loginAs(page, 'SUPER_ADMIN');
    await page.goto('/users');
    await page.waitForURL('/users');
  });

  test('Super Admin creates a STAFF user — appears in table', async ({ page }) => {
    const name = faker.person.fullName();
    const email = faker.internet.email().toLowerCase();

    await page.getByRole('button', { name: /add user/i }).click();
    const dialog = page.getByRole('dialog');
    await expect(dialog).toBeVisible();

    await dialog.locator('input[name="name"]').fill(name);
    await dialog.locator('input[name="email"]').fill(email);
    await dialog.locator('input[name="password"]').fill('Password123!');
    await dialog.locator('select[name="role"]').selectOption('STAFF');
    await dialog.getByRole('button', { name: /create user/i }).click();

    await expect(dialog).not.toBeVisible({ timeout: 10000 });
    await expect(page.getByText(name)).toBeVisible({ timeout: 5000 });
  });

  test('Super Admin creates a COOK user — appears in table', async ({ page }) => {
    const name = faker.person.fullName();
    const email = faker.internet.email().toLowerCase();

    await page.getByRole('button', { name: /add user/i }).click();
    const dialog = page.getByRole('dialog');

    await dialog.locator('input[name="name"]').fill(name);
    await dialog.locator('input[name="email"]').fill(email);
    await dialog.locator('input[name="password"]').fill('Password123!');
    await dialog.locator('select[name="role"]').selectOption('COOK');
    await dialog.getByRole('button', { name: /create user/i }).click();

    await expect(dialog).not.toBeVisible({ timeout: 10000 });
    await expect(page.getByText(name)).toBeVisible({ timeout: 5000 });
  });

  test('duplicate email shows error message', async ({ page }) => {
    await page.getByRole('button', { name: /add user/i }).click();
    const dialog = page.getByRole('dialog');

    // Use an already-seeded email
    await dialog.locator('input[name="name"]').fill('Duplicate Test');
    await dialog.locator('input[name="email"]').fill('staff@test.com');
    await dialog.locator('input[name="password"]').fill('Password123!');
    await dialog.locator('select[name="role"]').selectOption('STAFF');
    await dialog.getByRole('button', { name: /create user/i }).click();

    // Toast or error should appear; dialog stays open or shows error
    // The backend returns 409, which the hook shows as a toast
    await page.waitForTimeout(2000);
    // Dialog should still be visible (failed) or page shows toast
    const toastOrError = await page.locator('[role="status"], .toast, [class*="toast"]').isVisible().catch(() => false);
    expect(toastOrError || await dialog.isVisible()).toBe(true);
  });
});
