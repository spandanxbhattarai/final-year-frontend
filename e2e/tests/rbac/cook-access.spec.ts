import { test, expect } from '@playwright/test';
import { loginAs } from '../../helpers/auth';

test.describe('COOK access', () => {
  test.beforeEach(async ({ page }) => {
    await loginAs(page, 'COOK');
  });

  test('can access /kitchen', async ({ page }) => {
    await page.goto('/kitchen');
    await page.waitForURL('/kitchen');
    expect(page.url()).toContain('/kitchen');
  });

  test('can access /profile', async ({ page }) => {
    await page.goto('/profile');
    await page.waitForURL('/profile');
    expect(page.url()).toContain('/profile');
  });

  test('cannot access /dashboard — redirected', async ({ page }) => {
    await page.goto('/dashboard');
    await page.waitForURL('/kitchen', { timeout: 5000 });
    expect(page.url()).toContain('/kitchen');
  });

  test('cannot access /menu — redirected', async ({ page }) => {
    await page.goto('/menu');
    await page.waitForURL('/kitchen', { timeout: 5000 });
    expect(page.url()).toContain('/kitchen');
  });

  test('cannot access /orders — redirected', async ({ page }) => {
    await page.goto('/orders');
    await page.waitForURL('/kitchen', { timeout: 5000 });
    expect(page.url()).toContain('/kitchen');
  });

  test('cannot access /tables — redirected', async ({ page }) => {
    await page.goto('/tables');
    await page.waitForURL('/kitchen', { timeout: 5000 });
    expect(page.url()).toContain('/kitchen');
  });

  test('cannot access /reservations — redirected', async ({ page }) => {
    await page.goto('/reservations');
    await page.waitForURL('/kitchen', { timeout: 5000 });
    expect(page.url()).toContain('/kitchen');
  });

  test('cannot access /users — redirected', async ({ page }) => {
    await page.goto('/users');
    await page.waitForURL('/kitchen', { timeout: 5000 });
    expect(page.url()).toContain('/kitchen');
  });

  test('sidebar shows only Kitchen and Profile', async ({ page }) => {
    await page.goto('/kitchen');
    const nav = page.locator('nav');
    await expect(nav.getByText('Kitchen')).toBeVisible();
    await expect(nav.getByText('Profile')).toBeVisible();
    await expect(nav.getByText('Dashboard')).not.toBeVisible();
    await expect(nav.getByText('Users')).not.toBeVisible();
    await expect(nav.getByText('Orders')).not.toBeVisible();
    await expect(nav.getByText('Menu')).not.toBeVisible();
  });

  test('direct URL /settings redirects to /kitchen', async ({ page }) => {
    await page.goto('/settings');
    await page.waitForURL('/kitchen', { timeout: 5000 });
    expect(page.url()).toContain('/kitchen');
  });
});
