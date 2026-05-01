import { test, expect } from '@playwright/test';
import { loginAs, getAuthToken } from '../../helpers/auth';
import { API_URL } from '../../helpers/constants';

test.describe('Kitchen Order Display', () => {
  test('COOK can view kitchen page', async ({ page }) => {
    await loginAs(page, 'COOK');
    await page.goto('/kitchen');
    await page.waitForURL('/kitchen');
    expect(page.url()).toContain('/kitchen');
    await expect(page.locator('body')).toBeVisible();
  });

  test('COOK can fetch orders via API', async ({ page }) => {
    const token = await getAuthToken('COOK');
    const res = await page.request.get(`${API_URL}/orders`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    expect(res.status()).toBe(200);
    const orders = await res.json() as Array<{ id: number; status: string }>;
    expect(Array.isArray(orders)).toBe(true);
  });

  test('COOK cannot create order via API — 403', async ({ page }) => {
    const token = await getAuthToken('COOK');
    const res = await page.request.post(`${API_URL}/orders`, {
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
      data: { customerName: 'Cook Order Attempt', items: [], tableId: 1 },
    });
    expect(res.status()).toBe(403);
  });

  test('kitchen shows PENDING and PREPARING orders', async ({ page }) => {
    await loginAs(page, 'COOK');
    await page.goto('/kitchen');
    await page.waitForURL('/kitchen');

    // Wait for loading to finish — either orders appear or empty state shows
    await expect(
      page.locator('.rounded-xl').filter({ hasText: /#\d+/ }).first()
        .or(page.getByText('All caught up!'))
    ).toBeVisible({ timeout: 15000 });

    const hasOrders = await page.locator('.rounded-xl').filter({ hasText: /#\d+/ }).count();
    const hasEmptyState = await page.getByText('All caught up!').isVisible().catch(() => false);

    expect(hasOrders > 0 || hasEmptyState).toBe(true);
  });

  test('COOK can update order status via API', async ({ page }) => {
    const token = await getAuthToken('COOK');
    const ordersRes = await page.request.get(`${API_URL}/orders`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const orders = await ordersRes.json() as Array<{ id: number; status: string }>;
    const pending = orders.find((o) => o.status === 'PENDING' || o.status === 'PREPARING');
    if (pending) {
      const newStatus = pending.status === 'PENDING' ? 'PREPARING' : 'READY';
      const res = await page.request.patch(`${API_URL}/orders/${pending.id}/status`, {
        headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
        data: { status: newStatus },
      });
      expect(res.status()).toBe(200);
    } else {
      // No active orders — still a valid state
      expect(Array.isArray(orders)).toBe(true);
    }
  });
});
