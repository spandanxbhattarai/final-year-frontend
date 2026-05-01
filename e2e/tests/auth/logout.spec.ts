import { test, expect } from '@playwright/test';
import { loginAs } from '../../helpers/auth';

test.describe('Logout', () => {
  test('logout redirects to /login', async ({ page }) => {
    await loginAs(page, 'ADMIN');
    await page.waitForURL('/dashboard');

    // Open user dropdown
    await page.locator('header button').filter({ has: page.locator('.lucide-user') }).click();
    await page.getByText('Sign out').click();

    await page.waitForURL('/login', { timeout: 5000 });
    expect(page.url()).toContain('/login');
  });

  test('after logout /dashboard redirects to /login', async ({ page }) => {
    await loginAs(page, 'ADMIN');
    await page.waitForURL('/dashboard');

    // Logout
    await page.locator('header button').filter({ has: page.locator('.lucide-user') }).click();
    await page.getByText('Sign out').click();
    await page.waitForURL('/login');

    // Try to access protected route
    await page.goto('/dashboard');
    await page.waitForURL('/login', { timeout: 5000 });
    expect(page.url()).toContain('/login');
  });
});
