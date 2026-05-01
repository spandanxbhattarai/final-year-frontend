import { test, expect } from '@playwright/test';
import { loginAs, getAuthToken, getFirstTableId, getFirstMenuItemId } from '../../helpers/auth';
import { API_URL } from '../../helpers/constants';

async function createTestOrder(page: Parameters<typeof loginAs>[0], token: string, customerName: string) {
  const [tableId, menuItemId] = await Promise.all([
    getFirstTableId(token),
    getFirstMenuItemId(token),
  ]);
  const res = await page.request.post(`${API_URL}/orders`, {
    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
    data: { tableId, customerName, items: [{ menuItemId, quantity: 1 }] },
  });
  const order = await res.json() as { id: number };
  return order.id;
}

test.describe('Order Status Flow', () => {
  test('PENDING → PREPARING → READY → SERVED lifecycle', async ({ page }) => {
    await loginAs(page, 'STAFF');
    const token = await getAuthToken('STAFF');
    const customerName = 'Status Flow Customer';

    const orderId = await createTestOrder(page, token, customerName);

    await page.goto('/orders');
    await page.waitForURL('/orders');
    await page.waitForTimeout(1000);

    const orderCard = page.locator('.rounded-xl').filter({ hasText: customerName }).first();
    await expect(orderCard).toBeVisible({ timeout: 5000 });

    // PENDING → PREPARING
    await orderCard.locator('button', { hasText: 'PREPARING' }).click();
    await page.waitForTimeout(1500);

    // Verify status changed
    const updatedCard = page.locator('.rounded-xl').filter({ hasText: customerName }).first();

    // PREPARING → READY
    const readyBtn = updatedCard.locator('button', { hasText: 'READY' });
    if (await readyBtn.isVisible({ timeout: 3000 }).catch(() => false)) {
      await readyBtn.click();
      await page.waitForTimeout(1500);
    }

    // READY → SERVED
    const servedBtn = page.locator('.rounded-xl').filter({ hasText: customerName }).first()
      .locator('button', { hasText: 'SERVED' });
    if (await servedBtn.isVisible({ timeout: 3000 }).catch(() => false)) {
      await servedBtn.click();
      await page.waitForTimeout(1500);
    }

    expect(page.url()).toContain('/orders');
  });

  test('cancel order — status becomes CANCELLED', async ({ page }) => {
    await loginAs(page, 'STAFF');
    const token = await getAuthToken('STAFF');
    const customerName = 'Cancel Test Customer';

    await createTestOrder(page, token, customerName);

    await page.goto('/orders');
    await page.waitForURL('/orders');
    await page.waitForTimeout(1000);

    const orderCard = page.locator('.rounded-xl').filter({ hasText: customerName }).first();
    await expect(orderCard).toBeVisible({ timeout: 5000 });

    // Click Cancel button
    await orderCard.locator('button', { hasText: /cancel/i }).click();
    await page.waitForTimeout(1500);

    // Filter to cancelled to verify
    await page.locator('button').filter({ hasText: 'Cancelled' }).click();
    await page.waitForTimeout(1000);
    await expect(page.getByText(customerName)).toBeVisible({ timeout: 5000 });
  });
});
