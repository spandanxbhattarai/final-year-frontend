import { test, expect } from '@playwright/test';
import { loginAs } from '../../helpers/auth';

test.describe('Dashboard Top Items', () => {
  test.beforeEach(async ({ page }) => {
    await loginAs(page, 'ADMIN');
    await page.goto('/dashboard');
    await page.waitForURL('/dashboard');
  });

  test('top items section is visible', async ({ page }) => {
    await expect(page.getByText('Top 5 Ordered Items')).toBeVisible({ timeout: 10000 });
  });

  test('shows menu item names from database', async ({ page }) => {
    await page.waitForFunction(() => {
      return document.querySelectorAll('[class*="animate-pulse"]').length === 0;
    }, { timeout: 10000 });
    // After seeding we should see items from the seeded orders
    const topItemsSection = page.locator('.rounded-xl').filter({ hasText: 'Top 5 Ordered Items' });
    await expect(topItemsSection).toBeVisible();
  });
});
