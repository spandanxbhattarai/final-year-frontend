import { test, expect } from '@playwright/test';
import { loginAs } from '../../helpers/auth';

test.describe('STAFF access', () => {
  test.beforeEach(async ({ page }) => {
    await loginAs(page, 'STAFF');
  });

  test('cannot access /dashboard — redirected to /reservations', async ({ page }) => {
    await page.goto('/dashboard');
    await page.waitForURL('/reservations', { timeout: 5000 });
    expect(page.url()).toContain('/reservations');
  });

  test('cannot access /users — redirected to /reservations', async ({ page }) => {
    await page.goto('/users');
    await page.waitForURL('/reservations', { timeout: 5000 });
    expect(page.url()).toContain('/reservations');
  });

  test('cannot access /call-logs — redirected to /reservations', async ({ page }) => {
    await page.goto('/call-logs');
    await page.waitForURL('/reservations', { timeout: 5000 });
    expect(page.url()).toContain('/reservations');
  });

  test('can access /settings', async ({ page }) => {
    await page.goto('/settings');
    await page.waitForURL('/settings', { timeout: 5000 });
    expect(page.url()).toContain('/settings');
  });

  test('cannot access /kitchen — redirected to /reservations', async ({ page }) => {
    await page.goto('/kitchen');
    await page.waitForURL('/reservations', { timeout: 5000 });
    expect(page.url()).toContain('/reservations');
  });

  test('can access /menu', async ({ page }) => {
    await page.goto('/menu');
    await page.waitForURL('/menu', { timeout: 5000 });
    expect(page.url()).toContain('/menu');
  });

  test('can access /orders', async ({ page }) => {
    await page.goto('/orders');
    await page.waitForURL('/orders', { timeout: 5000 });
    expect(page.url()).toContain('/orders');
  });

  test('can access /tables', async ({ page }) => {
    await page.goto('/tables');
    await page.waitForURL('/tables', { timeout: 5000 });
    expect(page.url()).toContain('/tables');
  });

  test('can access /reservations', async ({ page }) => {
    await page.goto('/reservations');
    await page.waitForURL('/reservations', { timeout: 5000 });
    expect(page.url()).toContain('/reservations');
  });

  test('sidebar shows only allowed items', async ({ page }) => {
    await page.goto('/reservations');
    const nav = page.locator('nav');
    await expect(nav.getByText('Dashboard')).not.toBeVisible();
    await expect(nav.getByText('Users')).not.toBeVisible();
    await expect(nav.getByText('Kitchen')).not.toBeVisible();
    await expect(nav.getByText('Tables')).toBeVisible();
    await expect(nav.getByText('Menu')).toBeVisible();
    await expect(nav.getByText('Orders')).toBeVisible();
    await expect(nav.getByText('Reservations')).toBeVisible();
    await expect(nav.getByText('Profile')).toBeVisible();
  });
});
