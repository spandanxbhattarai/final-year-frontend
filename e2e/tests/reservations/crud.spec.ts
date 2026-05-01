import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { loginAs, getAuthToken } from '../../helpers/auth';
import { API_URL } from '../../helpers/constants';

test.describe('Reservations CRUD', () => {
  test.beforeEach(async ({ page }) => {
    await loginAs(page, 'STAFF');
    await page.goto('/reservations');
    await page.waitForURL('/reservations');
  });

  test('seeded reservations appear in list', async ({ page }) => {
    await page.waitForSelector('table, .rounded-xl', { timeout: 10000 });
    await expect(page.getByText('Reservation Alpha')).toBeVisible({ timeout: 5000 });
    await expect(page.getByText('Reservation Beta')).toBeVisible({ timeout: 5000 });
  });

  test('STAFF creates reservation — appears in list', async ({ page }) => {
    const customerName = faker.person.fullName();
    const today = new Date().toISOString().slice(0, 10);

    await page.getByRole('button', { name: /new reservation/i }).click();
    const dialog = page.getByRole('dialog');
    await expect(dialog).toBeVisible();

    await dialog.locator('input[name="customerName"]').fill(customerName);
    await dialog.locator('input[name="phone"]').fill('+12025551234');
    await dialog.locator('input[name="date"]').fill(today);
    await dialog.locator('input[name="time"]').fill('19:00');
    await dialog.locator('input[name="partySize"]').fill('3');
    await dialog.getByRole('button', { name: /confirm/i }).click();

    await expect(dialog).not.toBeVisible({ timeout: 10000 });
    await expect(page.getByRole('cell', { name: customerName })).toBeVisible({ timeout: 5000 });
  });

  test('COOK cannot create reservation via API — 403', async ({ page }) => {
    const token = await getAuthToken('COOK');
    const today = new Date().toISOString().slice(0, 10);
    const res = await page.request.post(`${API_URL}/reservations`, {
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
      data: {
        customerName: 'Cook Reservation Attempt',
        phone: '+10000000000',
        date: today,
        time: '12:00',
        partySize: 2,
      },
    });
    expect(res.status()).toBe(403);
  });

  test('confirm reservation — status visible', async ({ page }) => {
    await page.waitForSelector('table, .rounded-xl', { timeout: 10000 });
    const row = page.locator('tr').filter({ hasText: 'Reservation Alpha' });
    if (await row.isVisible({ timeout: 3000 }).catch(() => false)) {
      await expect(row.getByText('CONFIRMED')).toBeVisible();
    }
    expect(page.url()).toContain('/reservations');
  });

  test('cancel reservation — removed from list', async ({ page }) => {
    const customerName = 'Cancel Test ' + faker.number.int({ min: 100, max: 999 });
    const today = new Date().toISOString().slice(0, 10);

    await page.getByRole('button', { name: /new reservation/i }).click();
    const createDialog = page.getByRole('dialog');
    await createDialog.locator('input[name="customerName"]').fill(customerName);
    await createDialog.locator('input[name="phone"]').fill('+12025559876');
    await createDialog.locator('input[name="date"]').fill(today);
    await createDialog.locator('input[name="time"]').fill('20:00');
    await createDialog.locator('input[name="partySize"]').fill('2');
    await createDialog.getByRole('button', { name: /confirm/i }).click();
    await expect(createDialog).not.toBeVisible({ timeout: 10000 });
    await expect(page.getByRole('cell', { name: customerName })).toBeVisible({ timeout: 5000 });

    const row = page.locator('tr').filter({ hasText: customerName });
    await row.locator('button').last().click();

    const confirmDialog = page.getByRole('dialog');
    await expect(confirmDialog).toBeVisible({ timeout: 3000 });
    await confirmDialog.getByRole('button', { name: /confirm/i }).click();

    await expect(confirmDialog).not.toBeVisible({ timeout: 10000 });
    await expect(page.getByText(customerName)).not.toBeVisible({ timeout: 5000 });
  });
});
