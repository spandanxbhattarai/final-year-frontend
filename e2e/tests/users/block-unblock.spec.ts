import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { loginAs } from '../../helpers/auth';

test.describe('Block / Unblock User', () => {
  let testUserName: string;
  let testUserEmail: string;

  test.beforeEach(async ({ page }) => {
    // Create a fresh user for each test
    testUserName = faker.person.fullName();
    testUserEmail = faker.internet.email().toLowerCase();

    await loginAs(page, 'SUPER_ADMIN');
    await page.goto('/users');
    await page.waitForURL('/users');

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

  test('block user — Blocked badge appears', async ({ page }) => {
    const row = page.locator('tr').filter({ hasText: testUserName });
    await row.locator('button[title="Block user"]').click();

    await expect(row.getByText('Blocked')).toBeVisible({ timeout: 5000 });
  });

  test('blocked user cannot login — shows error', async ({ page }) => {
    // Block the user first
    const row = page.locator('tr').filter({ hasText: testUserName });
    await row.locator('button[title="Block user"]').click();
    await expect(row.getByText('Blocked')).toBeVisible({ timeout: 5000 });

    // Logout as SUPER_ADMIN
    await page.locator('header button').filter({ has: page.locator('.lucide-user') }).click();
    await page.getByText('Sign out').click();
    await page.waitForURL('/login');

    // Try to login as the blocked user
    await page.fill('input[name="email"]', testUserEmail);
    await page.fill('input[name="password"]', 'Password123!');
    await page.click('button[type="submit"]');

    await expect(page.locator('.text-destructive').first()).toBeVisible({ timeout: 5000 });
    await expect(page.locator('.text-destructive').first()).toContainText(/blocked/i);
  });

  test('unblock user — Active badge appears', async ({ page }) => {
    // Block first
    const row = page.locator('tr').filter({ hasText: testUserName });
    await row.locator('button[title="Block user"]').click();
    await expect(row.getByText('Blocked')).toBeVisible({ timeout: 5000 });

    // Unblock
    await row.locator('button[title="Unblock user"]').click();
    await expect(row.getByText('Active')).toBeVisible({ timeout: 5000 });
  });
});
