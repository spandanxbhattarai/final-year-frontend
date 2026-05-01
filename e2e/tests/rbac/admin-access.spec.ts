import { test, expect } from '@playwright/test';
import { loginAs } from '../../helpers/auth';

test.describe('ADMIN access', () => {
  test.beforeEach(async ({ page }) => {
    await loginAs(page, 'ADMIN');
  });

  test('can access /dashboard', async ({ page }) => {
    await page.goto('/dashboard');
    await page.waitForURL('/dashboard');
    expect(page.url()).toContain('/dashboard');
  });

  test('cannot access /users — redirected to /dashboard', async ({ page }) => {
    await page.goto('/users');
    await page.waitForURL('/dashboard', { timeout: 5000 });
    expect(page.url()).toContain('/dashboard');
  });

  test('can access /tables, /orders, /menu, /reservations', async ({ page }) => {
    for (const route of ['/tables', '/orders', '/menu', '/reservations']) {
      await page.goto(route);
      await page.waitForURL(route, { timeout: 5000 });
      expect(page.url()).toContain(route);
    }
  });

  test('can access /call-logs and /settings', async ({ page }) => {
    for (const route of ['/call-logs', '/settings']) {
      await page.goto(route);
      await page.waitForURL(route, { timeout: 5000 });
      expect(page.url()).toContain(route);
    }
  });

  test('can access /kitchen', async ({ page }) => {
    await page.goto('/kitchen');
    await page.waitForURL('/kitchen', { timeout: 5000 });
    expect(page.url()).toContain('/kitchen');
  });

  test('sidebar does not show Users', async ({ page }) => {
    await page.goto('/dashboard');
    const nav = page.locator('nav');
    await expect(nav.getByText('Dashboard')).toBeVisible();
    await expect(nav.getByText('Kitchen')).toBeVisible();
    await expect(nav.getByText('Users')).not.toBeVisible();
  });
});
