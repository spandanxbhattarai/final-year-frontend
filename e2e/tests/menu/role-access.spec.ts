import { test, expect } from '@playwright/test';
import { loginAs } from '../../helpers/auth';

test.describe('Menu Role Access', () => {
  test('COOK cannot access /menu — redirected to /kitchen', async ({ page }) => {
    await loginAs(page, 'COOK');
    await page.goto('/menu');
    await page.waitForURL('/kitchen', { timeout: 5000 });
    expect(page.url()).toContain('/kitchen');
  });

  test('ADMIN can access and modify menu', async ({ page }) => {
    await loginAs(page, 'ADMIN');
    await page.goto('/menu');
    await page.waitForURL('/menu');

    // Add Item button should be visible
    await expect(page.getByRole('button', { name: /add item/i })).toBeVisible({ timeout: 5000 });
  });
});
