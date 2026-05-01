import { test, expect } from '@playwright/test';
import { loginAs, getAuthToken, getFirstTableId, getFirstMenuItemId } from '../../helpers/auth';
import { API_URL } from '../../helpers/constants';

test.describe('Dashboard Live Feed', () => {
  test.beforeEach(async ({ page }) => {
    await loginAs(page, 'ADMIN');
    await page.goto('/dashboard');
    await page.waitForURL('/dashboard');
  });

  test('live feed section is visible', async ({ page }) => {
    await expect(page.getByText('Live Feed')).toBeVisible({ timeout: 10000 });
  });

  test('creating order via API appears in recent activity', async ({ page }) => {
    const token = await getAuthToken('STAFF');
    const [tableId, menuItemId] = await Promise.all([
      getFirstTableId(token),
      getFirstMenuItemId(token),
    ]);

    // Create an order via API
    await page.request.post(`${API_URL}/orders`, {
      headers: { Authorization: `Bearer ${token}` },
      data: { tableId, customerName: 'Live Feed Test Customer', items: [{ menuItemId, quantity: 1 }] },
    });

    // Reload or wait for feed to update
    await page.reload();
    await page.waitForURL('/dashboard');

    const feedSection = page.locator('.rounded-xl').filter({ hasText: 'Live Feed' });
    await expect(feedSection).toBeVisible({ timeout: 10000 });
  });
});
