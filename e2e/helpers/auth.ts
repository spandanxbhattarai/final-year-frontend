import { Page } from '@playwright/test';
import { TEST_USERS, API_URL } from './constants';

export async function loginAs(page: Page, role: keyof typeof TEST_USERS) {
  const { email, password } = TEST_USERS[role];
  await page.goto('/login');
  await page.fill('input[name="email"]', email);
  await page.fill('input[name="password"]', password);
  await page.click('button[type="submit"]');
  if (role === 'COOK') {
    await page.waitForURL(/\/kitchen/, { timeout: 10000 });
  } else if (role === 'STAFF') {
    await page.waitForURL(/\/reservations/, { timeout: 10000 });
  } else {
    await page.waitForURL(/\/dashboard/, { timeout: 10000 });
  }
}

export async function getAuthToken(role: keyof typeof TEST_USERS): Promise<string> {
  const { email, password } = TEST_USERS[role];
  const res = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  const data = await res.json() as { accessToken: string };
  return data.accessToken;
}

export async function getFirstTableId(token: string): Promise<number> {
  const res = await fetch(`${API_URL}/tables`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  const tables = await res.json() as Array<{ id: number }>;
  return tables[0]?.id ?? 1;
}

export async function getFirstMenuItemId(token: string): Promise<number> {
  const res = await fetch(`${API_URL}/menu`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  const items = await res.json() as Array<{ id: number }>;
  return items[0]?.id ?? 1;
}
