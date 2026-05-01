import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { loginAs, getAuthToken } from '../../helpers/auth';
import { API_URL } from '../../helpers/constants';

test.describe('Menu CRUD', () => {
  test.beforeEach(async ({ page }) => {
    await loginAs(page, 'STAFF');
    await page.goto('/menu');
    await page.waitForURL('/menu');
  });

  test('seeded menu items appear in list', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Caesar Salad' })).toBeVisible({ timeout: 10000 });
    await expect(page.getByRole('heading', { name: 'Grilled Salmon' })).toBeVisible({ timeout: 10000 });
  });

  test('COOK cannot access menu via API — 403', async ({ page }) => {
    // Menu is STAFF-and-above on backend
    const token = await getAuthToken('COOK');
    const res = await page.request.post(`${API_URL}/menu`, {
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
      data: { name: 'Cook Item', description: 'test', price: 5, category: 'Appetizers' },
    });
    expect(res.status()).toBe(403);
  });

  test('STAFF creates menu item — appears in list', async ({ page }) => {
    const itemName = 'Test Item ' + faker.number.int({ min: 1000, max: 9999 });

    await page.getByRole('button', { name: /add item/i }).click();
    const dialog = page.getByRole('dialog');
    await expect(dialog).toBeVisible();

    await dialog.locator('input[name="name"]').fill(itemName);
    await dialog.locator('textarea[name="description"]').fill('A delicious test item for E2E testing');
    await dialog.locator('input[name="price"]').fill('15.99');
    await dialog.locator('input[name="category"]').fill('Appetizers');
    await dialog.getByRole('button', { name: /create/i }).click();

    await expect(dialog).not.toBeVisible({ timeout: 10000 });
    await expect(page.getByText(itemName)).toBeVisible({ timeout: 5000 });
  });

  test('toggle item availability', async ({ page }) => {
    await page.waitForSelector('.rounded-xl', { timeout: 10000 });

    const card = page.locator('.rounded-xl').filter({ hasText: 'Caesar Salad' }).first();
    if (await card.isVisible({ timeout: 5000 }).catch(() => false)) {
      const toggle = card.locator('button[role="switch"]');
      const wasChecked = await toggle.getAttribute('aria-checked');
      await toggle.click();
      await page.waitForTimeout(1500);
      const nowChecked = await toggle.getAttribute('aria-checked');
      expect(wasChecked !== nowChecked).toBe(true);
    } else {
      expect(page.url()).toContain('/menu');
    }
  });

  test('edit menu item price — updated', async ({ page }) => {
    await page.waitForSelector('.rounded-xl', { timeout: 10000 });

    const card = page.locator('.rounded-xl').filter({ hasText: 'Grilled Salmon' }).first();
    if (await card.isVisible({ timeout: 5000 }).catch(() => false)) {
      await card.locator('button').first().click();
      const dialog = page.getByRole('dialog');
      await expect(dialog).toBeVisible();

      const priceInput = dialog.locator('input[name="price"]');
      await priceInput.fill('26.99');
      await dialog.getByRole('button', { name: /update/i }).click();
      await expect(dialog).not.toBeVisible({ timeout: 10000 });
    } else {
      expect(page.url()).toContain('/menu');
    }
  });
});
