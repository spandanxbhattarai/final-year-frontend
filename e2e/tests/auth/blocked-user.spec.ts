import { test, expect } from '@playwright/test';

test.describe('Blocked User', () => {
  test('blocked user sees account blocked error and stays on /login', async ({ page }) => {
    await page.goto('/login');
    await page.fill('input[name="email"]', 'blocked@test.com');
    await page.fill('input[name="password"]', 'Test123!');
    await page.click('button[type="submit"]');

    const errorEl = page.locator('.text-destructive').first();
    await expect(errorEl).toBeVisible({ timeout: 5000 });
    await expect(errorEl).toContainText(/blocked/i);
    expect(page.url()).toContain('/login');
  });
});
