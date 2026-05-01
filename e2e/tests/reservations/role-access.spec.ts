import { test, expect } from '@playwright/test';
import { loginAs } from '../../helpers/auth';

test.describe('Reservations Role Access', () => {
  test('COOK cannot access /reservations — redirected to /kitchen', async ({ page }) => {
    await loginAs(page, 'COOK');
    await page.goto('/reservations');
    await page.waitForURL('/kitchen', { timeout: 5000 });
    expect(page.url()).toContain('/kitchen');
  });
});
