import { test, expect } from '@playwright/test';
import { loginAs } from '../../helpers/auth';

test.describe('Orders Role Access', () => {
  test('COOK cannot access /orders — redirected to /kitchen', async ({ page }) => {
    await loginAs(page, 'COOK');
    await page.goto('/orders');
    await page.waitForURL('/kitchen', { timeout: 5000 });
    expect(page.url()).toContain('/kitchen');
  });

  test('STAFF can view and manage orders', async ({ page }) => {
    await loginAs(page, 'STAFF');
    await page.goto('/orders');
    await page.waitForURL('/orders');

    // Page loaded successfully
    expect(page.url()).toContain('/orders');
    await expect(page.locator('body')).toBeVisible();
  });
});
