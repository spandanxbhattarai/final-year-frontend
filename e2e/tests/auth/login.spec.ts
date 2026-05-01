import { test, expect } from '@playwright/test';

test.describe('Login', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/login');
  });

  test('ADMIN login redirects to /dashboard', async ({ page }) => {
    await page.fill('input[name="email"]', 'admin@test.com');
    await page.fill('input[name="password"]', 'Test123!');
    await page.click('button[type="submit"]');
    await page.waitForURL('/dashboard', { timeout: 10000 });
    expect(page.url()).toContain('/dashboard');
  });

  test('COOK login redirects to /kitchen', async ({ page }) => {
    await page.fill('input[name="email"]', 'cook@test.com');
    await page.fill('input[name="password"]', 'Test123!');
    await page.click('button[type="submit"]');
    await page.waitForURL('/kitchen', { timeout: 10000 });
    expect(page.url()).toContain('/kitchen');
  });

  test('wrong password shows error and stays on /login', async ({ page }) => {
    await page.fill('input[name="email"]', 'admin@test.com');
    await page.fill('input[name="password"]', 'WrongPassword99');
    await page.click('button[type="submit"]');
    await expect(page.locator('.text-destructive').first()).toBeVisible({ timeout: 5000 });
    expect(page.url()).toContain('/login');
  });

  test('empty form shows validation errors', async ({ page }) => {
    await page.click('button[type="submit"]');
    await expect(page.locator('.text-destructive, .text-xs').first()).toBeVisible({ timeout: 3000 });
    expect(page.url()).toContain('/login');
  });
});
