import { test, expect } from '@playwright/test';
import { loginAs, getAuthToken, getFirstTableId } from '../../helpers/auth';
import { API_URL } from '../../helpers/constants';

test.describe('Create Order', () => {
  test('seeded orders appear in list', async ({ page }) => {
    await loginAs(page, 'STAFF');
    await page.goto('/orders');
    await page.waitForURL('/orders');
    await page.waitForTimeout(1500);

    const today = new Date().toISOString().slice(0, 10);
    const dateInput = page.locator('input[type="date"]');
    if (await dateInput.isVisible()) {
      await dateInput.fill(today);
      await dateInput.press('Enter');
      await page.waitForTimeout(500);
    }

    // At least one of the seeded order customers should appear
    const hasSeedCustomer = await page.getByText(/Seed Customer/).first().isVisible({ timeout: 5000 }).catch(() => false);
    expect(hasSeedCustomer).toBe(true);
  });

  test('STAFF creates order with items — appears in list', async ({ page }) => {
    await loginAs(page, 'STAFF');

    const token = await getAuthToken('STAFF');

    const menuRes = await page.request.get(`${API_URL}/menu`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const menuData = await menuRes.json() as Array<{ id: number }>;
    const menuItemId = menuData[0]?.id ?? 1;
    const tableId = await getFirstTableId(token);

    const today = new Date().toISOString().slice(0, 10);
    const orderRes = await page.request.post(`${API_URL}/orders`, {
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
      data: {
        tableId,
        customerName: 'E2E Test Customer',
        items: [{ menuItemId, quantity: 2 }],
      },
    });
    expect(orderRes.status()).toBe(201);

    await page.goto('/orders');
    await page.waitForURL('/orders');
    await page.waitForTimeout(1000);

    const dateInput = page.locator('input[type="date"]');
    if (await dateInput.isVisible()) {
      await dateInput.fill(today);
      await dateInput.press('Enter');
    }

    await expect(page.getByText('E2E Test Customer')).toBeVisible({ timeout: 5000 });
  });

  test('COOK cannot create order via API — 403', async ({ page }) => {
    const token = await getAuthToken('COOK');
    const menuRes = await page.request.get(`${API_URL}/orders`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const orders = await menuRes.json() as Array<{ id: number }>;
    const menuItemId = orders[0]?.id ?? 1;

    const res = await page.request.post(`${API_URL}/orders`, {
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
      data: {
        tableId: 1,
        customerName: 'Cook Order Attempt',
        items: [{ menuItemId, quantity: 1 }],
      },
    });
    expect(res.status()).toBe(403);
  });
});
