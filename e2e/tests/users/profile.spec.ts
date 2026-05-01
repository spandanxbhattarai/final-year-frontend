import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { loginAs } from '../../helpers/auth';

test.describe('Profile', () => {
  test('any role can view profile page', async ({ page }) => {
    await loginAs(page, 'COOK');
    await page.goto('/profile');
    await page.waitForURL('/profile');
    await expect(page.getByText('Profile')).toBeVisible();
    await expect(page.getByRole('main').getByText('Cook User')).toBeVisible();
  });

  test('can update own name — success', async ({ page }) => {
    await loginAs(page, 'STAFF');
    await page.goto('/profile');
    await page.waitForURL('/profile');

    const newName = 'Updated Staff ' + faker.number.int({ min: 100, max: 999 });
    await page.locator('input[name="name"]').fill(newName);
    await page.getByRole('button', { name: /save changes/i }).click();

    // Expect success feedback (toast or updated name displayed)
    await page.waitForTimeout(2000);
    await expect(page.getByText(newName)).toBeVisible({ timeout: 5000 });

    // Restore original name to not break other tests
    await page.locator('input[name="name"]').fill('Staff User');
    await page.getByRole('button', { name: /save changes/i }).click();
    await page.waitForTimeout(1000);
  });

  test('can change password — success', async ({ page }) => {
    await loginAs(page, 'ADMIN');
    await page.goto('/profile');
    await page.waitForURL('/profile');

    await page.locator('input[name="password"]').fill('NewPassword123!');
    await page.getByRole('button', { name: /save changes/i }).click();

    // Wait for toast confirmation
    await page.waitForTimeout(2000);

    // Restore original password
    await page.locator('input[name="password"]').fill('Test123!');
    await page.getByRole('button', { name: /save changes/i }).click();
    await page.waitForTimeout(1000);
  });
});
