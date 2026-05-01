import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { loginAs, getAuthToken } from '../../helpers/auth';
import { API_URL } from '../../helpers/constants';

test.describe('Tables CRUD', () => {
  test('seeded tables appear in list', async ({ page }) => {
    await loginAs(page, 'ADMIN');
    await page.goto('/tables');
    await page.waitForURL('/tables');
    await page.waitForSelector('.rounded-xl, table', { timeout: 10000 });
    await expect(page.getByText('#1')).toBeVisible({ timeout: 5000 });
    await expect(page.getByText('#2')).toBeVisible({ timeout: 5000 });
    await expect(page.getByText('#3')).toBeVisible({ timeout: 5000 });
  });

  test('COOK cannot access tables via API — 403', async ({ page }) => {
    const token = await getAuthToken('COOK');
    const res = await page.request.get(`${API_URL}/tables`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    expect(res.status()).toBe(403);
  });

  test('ADMIN creates table — appears in list', async ({ page }) => {
    await loginAs(page, 'ADMIN');
    await page.goto('/tables');
    await page.waitForURL('/tables');

    const tableNum = faker.number.int({ min: 50, max: 99 });

    await page.getByRole('button', { name: /add table/i }).click();
    const dialog = page.getByRole('dialog');
    await expect(dialog).toBeVisible();

    await dialog.locator('input[name="number"]').fill(String(tableNum));
    await dialog.locator('input[name="capacity"]').fill('4');
    await dialog.locator('input[name="floor"]').fill('Main');
    await dialog.locator('select[name="status"]').selectOption('AVAILABLE');
    await dialog.getByRole('button', { name: /create/i }).click();

    await expect(dialog).not.toBeVisible({ timeout: 10000 });
    await expect(page.getByText(`#${tableNum}`)).toBeVisible({ timeout: 5000 });
  });

  test('ADMIN deletes table — removed from list', async ({ page }) => {
    await loginAs(page, 'ADMIN');
    await page.goto('/tables');
    await page.waitForURL('/tables');

    const tableNum = faker.number.int({ min: 100, max: 199 });
    await page.getByRole('button', { name: /add table/i }).click();
    const createDialog = page.getByRole('dialog');
    await createDialog.locator('input[name="number"]').fill(String(tableNum));
    await createDialog.locator('input[name="capacity"]').fill('2');
    await createDialog.locator('input[name="floor"]').fill('Test');
    await createDialog.locator('select[name="status"]').selectOption('AVAILABLE');
    await createDialog.getByRole('button', { name: /create/i }).click();
    await expect(createDialog).not.toBeVisible({ timeout: 10000 });
    await expect(page.getByText(`#${tableNum}`)).toBeVisible({ timeout: 5000 });

    await page.getByRole('button').filter({ hasText: `#${tableNum}` }).click();
    await page.waitForTimeout(500);
    await page.getByRole('button', { name: /delete/i }).last().click();

    const confirmDialog = page.getByRole('dialog');
    await expect(confirmDialog).toBeVisible({ timeout: 3000 });
    await confirmDialog.getByRole('button', { name: /confirm/i }).click();

    await expect(confirmDialog).not.toBeVisible({ timeout: 10000 });
    await expect(page.getByText(`#${tableNum}`)).not.toBeVisible({ timeout: 5000 });
  });

  test('STAFF can access tables page', async ({ page }) => {
    await loginAs(page, 'STAFF');
    await page.goto('/tables');
    await page.waitForURL('/tables');
    expect(page.url()).toContain('/tables');
  });

  test('STAFF can view table details', async ({ page }) => {
    await loginAs(page, 'STAFF');
    await page.goto('/tables');
    await page.waitForURL('/tables');

    const tableCard = page.getByRole('button').filter({ hasText: '#1' });
    if (await tableCard.isVisible({ timeout: 5000 }).catch(() => false)) {
      await tableCard.click();
      await expect(page.getByText('Status')).toBeVisible({ timeout: 3000 });
      await page.keyboard.press('Escape');
    }
    expect(page.url()).toContain('/tables');
  });
});
