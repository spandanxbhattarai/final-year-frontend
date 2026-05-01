import { test, expect } from '@playwright/test';
import { loginAs } from '../../helpers/auth';

test.describe('Tables Role Access', () => {
  test('COOK cannot access /tables — redirected to /kitchen', async ({ page }) => {
    await loginAs(page, 'COOK');
    await page.goto('/tables');
    await page.waitForURL('/kitchen', { timeout: 5000 });
    expect(page.url()).toContain('/kitchen');
  });
});
