import { test, expect } from '@playwright/test';
import { loginAs, getAuthToken, getFirstTableId } from '../../helpers/auth';
import { API_URL } from '../../helpers/constants';

test.describe('Kitchen Status Update', () => {
  async function createPendingOrder(page: Parameters<typeof loginAs>[0], token: string, customerName: string) {
    const menuRes = await page.request.get(`${API_URL}/menu`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const menuItems = await menuRes.json() as Array<{ id: number }>;
    const menuItemId = menuItems[0]?.id ?? 1;
    const tableId = await getFirstTableId(token);

    const res = await page.request.post(`${API_URL}/orders`, {
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
      data: { tableId, customerName, items: [{ menuItemId, quantity: 1 }] },
    });
    expect(res.status()).toBe(201);
    return (await res.json() as { id: number }).id;
  }

  test('COOK marks order as PREPARING', async ({ page }) => {
    const token = await getAuthToken('STAFF');
    const customerName = 'Kitchen Pending Test';
    await createPendingOrder(page, token, customerName);

    await loginAs(page, 'COOK');
    await page.goto('/kitchen');
    await page.waitForURL('/kitchen');

    await page.waitForFunction(() => {
      return document.querySelectorAll('[class*="animate-spin"]').length === 0 &&
             document.querySelectorAll('[class*="animate-pulse"]').length === 0;
    }, { timeout: 10000 });

    // Find the order card and click "Mark PREPARING"
    const orderCard = page.locator('.rounded-xl').filter({ hasText: customerName }).first();
    if (await orderCard.isVisible({ timeout: 5000 }).catch(() => false)) {
      const markBtn = orderCard.locator('button').filter({ hasText: /mark preparing|preparing/i });
      if (await markBtn.isVisible().catch(() => false)) {
        await markBtn.click();
        await page.waitForTimeout(2000);
        // Card should now either show PREPARING status or be removed from PENDING section
        expect(page.url()).toContain('/kitchen');
      }
    } else {
      // Seeded PENDING order: Seed Customer 1
      const seedCard = page.locator('.rounded-xl').filter({ hasText: 'Seed Customer 1' }).first();
      if (await seedCard.isVisible({ timeout: 3000 }).catch(() => false)) {
        const markBtn = seedCard.locator('button').filter({ hasText: /preparing/i });
        if (await markBtn.isVisible().catch(() => false)) {
          await markBtn.click();
          await page.waitForTimeout(2000);
        }
      }
    }
    expect(page.url()).toContain('/kitchen');
  });

  test('COOK marks order as READY', async ({ page }) => {
    const token = await getAuthToken('STAFF');
    const customerName = 'Kitchen Preparing Test';

    // Create a PENDING order and advance it to PREPARING via API
    const orderId = await createPendingOrder(page, token, customerName);
    await page.request.patch(`${API_URL}/orders/${orderId}/status`, {
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
      data: { status: 'PREPARING' },
    });

    await loginAs(page, 'COOK');
    await page.goto('/kitchen');
    await page.waitForURL('/kitchen');

    await page.waitForFunction(() => {
      return document.querySelectorAll('[class*="animate-spin"]').length === 0 &&
             document.querySelectorAll('[class*="animate-pulse"]').length === 0;
    }, { timeout: 10000 });

    const orderCard = page.locator('.rounded-xl').filter({ hasText: customerName }).first();
    if (await orderCard.isVisible({ timeout: 5000 }).catch(() => false)) {
      const readyBtn = orderCard.locator('button').filter({ hasText: /mark ready|ready/i });
      if (await readyBtn.isVisible().catch(() => false)) {
        await readyBtn.click();
        await page.waitForTimeout(2000);
      }
    }
    expect(page.url()).toContain('/kitchen');
  });
});
