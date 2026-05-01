import { test, expect } from '@playwright/test';
import { loginAs } from '../../helpers/auth';

test.describe('Dashboard Revenue Chart', () => {
  test.beforeEach(async ({ page }) => {
    await loginAs(page, 'ADMIN');
    await page.goto('/dashboard');
    await page.waitForURL('/dashboard');
  });

  test('revenue chart section is visible', async ({ page }) => {
    await expect(page.getByText('Revenue — Last 7 Days')).toBeVisible({ timeout: 10000 });
  });

  test('chart has SVG element (Recharts rendered)', async ({ page }) => {
    // Wait for chart to load
    await page.waitForSelector('svg', { timeout: 10000 });
    const svgs = page.locator('svg');
    await expect(svgs.first()).toBeVisible();
  });

  test('chart has data (not empty skeleton)', async ({ page }) => {
    await page.waitForFunction(() => {
      return document.querySelectorAll('[class*="animate-pulse"]').length === 0;
    }, { timeout: 10000 });
    const svg = page.locator('.recharts-wrapper, svg').first();
    await expect(svg).toBeVisible();
  });
});
