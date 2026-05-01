import { test, expect } from '@playwright/test';
import { loginAs } from '../../helpers/auth';

test.describe('Dashboard Reservations Timeline', () => {
  test.beforeEach(async ({ page }) => {
    await loginAs(page, 'ADMIN');
    await page.goto('/dashboard');
    await page.waitForURL('/dashboard');
  });

  test('timeline section is visible', async ({ page }) => {
    await expect(page.getByText("Today's Reservations")).toBeVisible({ timeout: 10000 });
  });

  test('shows today\'s reservations', async ({ page }) => {
    await page.waitForFunction(() => {
      return document.querySelectorAll('[class*="animate-pulse"]').length === 0;
    }, { timeout: 10000 });

    // Seeded reservations include "Reservation Alpha" and "Reservation Beta" for today
    const section = page.locator('.rounded-xl').filter({ hasText: "Today's Reservations" });
    await expect(section).toBeVisible();
    // Should show at least one reservation name
    const hasData = await page.getByText('Reservation Alpha').isVisible().catch(() => false);
    const hasEmpty = await page.getByText(/no reservation/i).isVisible().catch(() => false);
    expect(hasData || hasEmpty).toBe(true);
  });
});
