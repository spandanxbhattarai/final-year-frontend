import { test, expect } from '@playwright/test';
import { loginAs } from '../../helpers/auth';

test.describe('SUPER_ADMIN access', () => {
  test.beforeEach(async ({ page }) => {
    await loginAs(page, 'SUPER_ADMIN');
  });

  test('can access /dashboard', async ({ page }) => {
    await page.goto('/dashboard');
    await page.waitForURL('/dashboard');
    expect(page.url()).toContain('/dashboard');
  });

  test('can access /users', async ({ page }) => {
    await page.goto('/users');
    await page.waitForURL('/users');
    await expect(page.getByRole('heading', { name: 'Users' })).toBeVisible();
  });

  test('can access /tables', async ({ page }) => {
    await page.goto('/tables');
    await page.waitForURL('/tables');
    expect(page.url()).toContain('/tables');
  });

  test('can access /orders', async ({ page }) => {
    await page.goto('/orders');
    await page.waitForURL('/orders');
    expect(page.url()).toContain('/orders');
  });

  test('can access /menu', async ({ page }) => {
    await page.goto('/menu');
    await page.waitForURL('/menu');
    expect(page.url()).toContain('/menu');
  });

  test('can access /reservations', async ({ page }) => {
    await page.goto('/reservations');
    await page.waitForURL('/reservations');
    expect(page.url()).toContain('/reservations');
  });

  test('can access /call-logs', async ({ page }) => {
    await page.goto('/call-logs');
    await page.waitForURL('/call-logs');
    expect(page.url()).toContain('/call-logs');
  });

  test('can access /kitchen', async ({ page }) => {
    await page.goto('/kitchen');
    await page.waitForURL('/kitchen');
    expect(page.url()).toContain('/kitchen');
  });

  test('can access /settings', async ({ page }) => {
    await page.goto('/settings');
    await page.waitForURL('/settings');
    expect(page.url()).toContain('/settings');
  });

  test('sidebar shows all nav items', async ({ page }) => {
    await page.goto('/dashboard');
    const nav = page.locator('nav');
    await expect(nav.getByText('Dashboard')).toBeVisible();
    await expect(nav.getByText('Users')).toBeVisible();
    await expect(nav.getByText('Tables')).toBeVisible();
    await expect(nav.getByText('Menu')).toBeVisible();
    await expect(nav.getByText('Orders')).toBeVisible();
    await expect(nav.getByText('Reservations')).toBeVisible();
    await expect(nav.getByText('Kitchen')).toBeVisible();
    await expect(nav.getByText('Settings')).toBeVisible();
    await expect(nav.getByText('Profile')).toBeVisible();
  });
});
