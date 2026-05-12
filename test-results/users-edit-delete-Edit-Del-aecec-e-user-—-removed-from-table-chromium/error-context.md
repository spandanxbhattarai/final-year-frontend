# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: users\edit-delete.spec.ts >> Edit / Delete User >> delete user — removed from table
- Location: e2e\tests\users\edit-delete.spec.ts:42:3

# Error details

```
Error: expect(locator).not.toBeVisible() failed

Locator:  getByText('Miss Anne Goyette')
Expected: not visible
Received: visible
Timeout:  5000ms

Call log:
  - Expect "not toBeVisible" with timeout 5000ms
  - waiting for getByText('Miss Anne Goyette')
    9 × locator resolved to <td class="px-4 py-3 font-medium text-card-foreground">Miss Anne Goyette</td>
      - unexpected value "visible"

```

# Page snapshot

```yaml
- generic [ref=e3]:
  - complementary [ref=e4]:
    - generic [ref=e5]:
      - img "Spandan" [ref=e6]
      - generic [ref=e7]: Spandan
    - navigation [ref=e8]:
      - link "Dashboard" [ref=e9] [cursor=pointer]:
        - /url: /dashboard
        - img [ref=e10]
        - generic [ref=e15]: Dashboard
      - link "Users" [ref=e16] [cursor=pointer]:
        - /url: /users
        - img [ref=e17]
        - generic [ref=e22]: Users
      - link "Tables" [ref=e23] [cursor=pointer]:
        - /url: /tables
        - img [ref=e24]
        - generic [ref=e29]: Tables
      - link "Reservations" [ref=e30] [cursor=pointer]:
        - /url: /reservations
        - img [ref=e31]
        - generic [ref=e33]: Reservations
      - link "Menu" [ref=e34] [cursor=pointer]:
        - /url: /menu
        - img [ref=e35]
        - generic [ref=e38]: Menu
      - link "Orders" [ref=e39] [cursor=pointer]:
        - /url: /orders
        - img [ref=e40]
        - generic [ref=e43]: Orders
      - link "Call Logs" [ref=e44] [cursor=pointer]:
        - /url: /call-logs
        - img [ref=e45]
        - generic [ref=e47]: Call Logs
      - link "Messages" [ref=e48] [cursor=pointer]:
        - /url: /contact-messages
        - img [ref=e49]
        - generic [ref=e51]: Messages
      - link "Kitchen" [ref=e52] [cursor=pointer]:
        - /url: /kitchen
        - img [ref=e53]
        - generic [ref=e55]: Kitchen
      - link "Settings" [ref=e56] [cursor=pointer]:
        - /url: /settings
        - img [ref=e57]
        - generic [ref=e60]: Settings
      - link "Profile" [ref=e61] [cursor=pointer]:
        - /url: /profile
        - img [ref=e62]
        - generic [ref=e65]: Profile
  - generic [ref=e66]:
    - banner [ref=e67]:
      - generic [ref=e68]:
        - button [ref=e69]:
          - img [ref=e70]
        - heading "Dashboard" [level=1] [ref=e71]
      - generic [ref=e72]:
        - button "Toggle theme" [ref=e73]:
          - img [ref=e74]
        - button [ref=e77]:
          - img [ref=e78]
        - button "Super Admin" [ref=e82]:
          - img [ref=e84]
          - generic [ref=e87]: Super Admin
    - main [ref=e88]:
      - generic [ref=e89]:
        - generic [ref=e90]:
          - generic [ref=e91]:
            - heading "Users" [level=1] [ref=e92]
            - paragraph [ref=e93]: Manage staff accounts and permissions
          - button "Add User" [ref=e94]:
            - img [ref=e95]
            - text: Add User
        - generic [ref=e98]:
          - img [ref=e99]
          - textbox "Search by name or email..." [ref=e103]
        - table [ref=e105]:
          - rowgroup [ref=e106]:
            - row "Name Email Role Status Joined Actions" [ref=e107]:
              - columnheader "Name" [ref=e108]
              - columnheader "Email" [ref=e109]
              - columnheader "Role" [ref=e110]
              - columnheader "Status" [ref=e111]
              - columnheader "Joined" [ref=e112]
              - columnheader "Actions" [ref=e113]
          - rowgroup [ref=e114]:
            - row "Miss Anne Goyette edwina95@yahoo.com Staff Deleted 5/11/2026" [ref=e115]:
              - cell "Miss Anne Goyette" [ref=e116]
              - cell "edwina95@yahoo.com" [ref=e117]
              - cell "Staff" [ref=e118]:
                - generic [ref=e119]: Staff
              - cell "Deleted" [ref=e120]:
                - generic [ref=e121]: Deleted
              - cell "5/11/2026" [ref=e122]
              - cell [ref=e123]:
                - generic [ref=e124]:
                  - button "Edit user" [ref=e125]:
                    - img [ref=e126]
                  - button "Block user" [disabled] [ref=e129]:
                    - img [ref=e130]
                  - button "Delete user" [disabled] [ref=e134]:
                    - img [ref=e135]
            - row "Wm Emmerich jasmin_murphy@hotmail.com Staff Active 5/11/2026" [ref=e138]:
              - cell "Wm Emmerich" [ref=e139]
              - cell "jasmin_murphy@hotmail.com" [ref=e140]
              - cell "Staff" [ref=e141]:
                - generic [ref=e142]: Staff
              - cell "Active" [ref=e143]:
                - generic [ref=e144]: Active
              - cell "5/11/2026" [ref=e145]
              - cell [ref=e146]:
                - generic [ref=e147]:
                  - button "Edit user" [ref=e148]:
                    - img [ref=e149]
                  - button "Block user" [ref=e152]:
                    - img [ref=e153]
                  - button "Delete user" [ref=e157]:
                    - img [ref=e158]
            - row "Darnell Mayert bennie_runte71@gmail.com Cook Active 5/11/2026" [ref=e161]:
              - cell "Darnell Mayert" [ref=e162]
              - cell "bennie_runte71@gmail.com" [ref=e163]
              - cell "Cook" [ref=e164]:
                - generic [ref=e165]: Cook
              - cell "Active" [ref=e166]:
                - generic [ref=e167]: Active
              - cell "5/11/2026" [ref=e168]
              - cell [ref=e169]:
                - generic [ref=e170]:
                  - button "Edit user" [ref=e171]:
                    - img [ref=e172]
                  - button "Block user" [ref=e175]:
                    - img [ref=e176]
                  - button "Delete user" [ref=e180]:
                    - img [ref=e181]
            - row "Vickie Cole dallin_reinger59@gmail.com Staff Active 5/11/2026" [ref=e184]:
              - cell "Vickie Cole" [ref=e185]
              - cell "dallin_reinger59@gmail.com" [ref=e186]
              - cell "Staff" [ref=e187]:
                - generic [ref=e188]: Staff
              - cell "Active" [ref=e189]:
                - generic [ref=e190]: Active
              - cell "5/11/2026" [ref=e191]
              - cell [ref=e192]:
                - generic [ref=e193]:
                  - button "Edit user" [ref=e194]:
                    - img [ref=e195]
                  - button "Block user" [ref=e198]:
                    - img [ref=e199]
                  - button "Delete user" [ref=e203]:
                    - img [ref=e204]
            - row "Kathryn Graham janessa.swift@gmail.com Staff Active 5/11/2026" [ref=e207]:
              - cell "Kathryn Graham" [ref=e208]
              - cell "janessa.swift@gmail.com" [ref=e209]
              - cell "Staff" [ref=e210]:
                - generic [ref=e211]: Staff
              - cell "Active" [ref=e212]:
                - generic [ref=e213]: Active
              - cell "5/11/2026" [ref=e214]
              - cell [ref=e215]:
                - generic [ref=e216]:
                  - button "Edit user" [ref=e217]:
                    - img [ref=e218]
                  - button "Block user" [ref=e221]:
                    - img [ref=e222]
                  - button "Delete user" [ref=e226]:
                    - img [ref=e227]
            - row "Lila Walker brycen.rippin@hotmail.com Staff Blocked 5/11/2026" [ref=e230]:
              - cell "Lila Walker" [ref=e231]
              - cell "brycen.rippin@hotmail.com" [ref=e232]
              - cell "Staff" [ref=e233]:
                - generic [ref=e234]: Staff
              - cell "Blocked" [ref=e235]:
                - generic [ref=e236]: Blocked
              - cell "5/11/2026" [ref=e237]
              - cell [ref=e238]:
                - generic [ref=e239]:
                  - button "Edit user" [ref=e240]:
                    - img [ref=e241]
                  - button "Unblock user" [ref=e244]:
                    - img [ref=e245]
                  - button "Delete user" [ref=e248]:
                    - img [ref=e249]
            - row "Francis Morar addie99@gmail.com Staff Blocked 5/11/2026" [ref=e252]:
              - cell "Francis Morar" [ref=e253]
              - cell "addie99@gmail.com" [ref=e254]
              - cell "Staff" [ref=e255]:
                - generic [ref=e256]: Staff
              - cell "Blocked" [ref=e257]:
                - generic [ref=e258]: Blocked
              - cell "5/11/2026" [ref=e259]
              - cell [ref=e260]:
                - generic [ref=e261]:
                  - button "Edit user" [ref=e262]:
                    - img [ref=e263]
                  - button "Unblock user" [ref=e266]:
                    - img [ref=e267]
                  - button "Delete user" [ref=e270]:
                    - img [ref=e271]
            - row "Blocked User blocked@test.com Staff Blocked 5/11/2026" [ref=e274]:
              - cell "Blocked User" [ref=e275]
              - cell "blocked@test.com" [ref=e276]
              - cell "Staff" [ref=e277]:
                - generic [ref=e278]: Staff
              - cell "Blocked" [ref=e279]:
                - generic [ref=e280]: Blocked
              - cell "5/11/2026" [ref=e281]
              - cell [ref=e282]:
                - generic [ref=e283]:
                  - button "Edit user" [ref=e284]:
                    - img [ref=e285]
                  - button "Unblock user" [ref=e288]:
                    - img [ref=e289]
                  - button "Delete user" [ref=e292]:
                    - img [ref=e293]
            - row "Cook User cook@test.com Cook Active 5/11/2026" [ref=e296]:
              - cell "Cook User" [ref=e297]
              - cell "cook@test.com" [ref=e298]
              - cell "Cook" [ref=e299]:
                - generic [ref=e300]: Cook
              - cell "Active" [ref=e301]:
                - generic [ref=e302]: Active
              - cell "5/11/2026" [ref=e303]
              - cell [ref=e304]:
                - generic [ref=e305]:
                  - button "Edit user" [ref=e306]:
                    - img [ref=e307]
                  - button "Block user" [ref=e310]:
                    - img [ref=e311]
                  - button "Delete user" [ref=e315]:
                    - img [ref=e316]
            - row "Staff User staff@test.com Staff Active 5/11/2026" [ref=e319]:
              - cell "Staff User" [ref=e320]
              - cell "staff@test.com" [ref=e321]
              - cell "Staff" [ref=e322]:
                - generic [ref=e323]: Staff
              - cell "Active" [ref=e324]:
                - generic [ref=e325]: Active
              - cell "5/11/2026" [ref=e326]
              - cell [ref=e327]:
                - generic [ref=e328]:
                  - button "Edit user" [ref=e329]:
                    - img [ref=e330]
                  - button "Block user" [ref=e333]:
                    - img [ref=e334]
                  - button "Delete user" [ref=e338]:
                    - img [ref=e339]
            - row "Admin User admin@test.com Admin Active 5/11/2026" [ref=e342]:
              - cell "Admin User" [ref=e343]
              - cell "admin@test.com" [ref=e344]
              - cell "Admin" [ref=e345]:
                - generic [ref=e346]: Admin
              - cell "Active" [ref=e347]:
                - generic [ref=e348]: Active
              - cell "5/11/2026" [ref=e349]
              - cell [ref=e350]:
                - generic [ref=e351]:
                  - button "Edit user" [ref=e352]:
                    - img [ref=e353]
                  - button "Block user" [ref=e356]:
                    - img [ref=e357]
                  - button "Delete user" [ref=e361]:
                    - img [ref=e362]
            - row "Super Admin(you) superadmin@test.com Super Admin Active 5/11/2026" [ref=e365]:
              - cell "Super Admin(you)" [ref=e366]
              - cell "superadmin@test.com" [ref=e367]
              - cell "Super Admin" [ref=e368]:
                - generic [ref=e369]: Super Admin
              - cell "Active" [ref=e370]:
                - generic [ref=e371]: Active
              - cell "5/11/2026" [ref=e372]
              - cell [ref=e373]:
                - button "Edit user" [ref=e375]:
                  - img [ref=e376]
    - contentinfo [ref=e379]:
      - paragraph [ref=e380]: © 2026 Spandan AI. All rights reserved.
```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test';
  2  | import { faker } from '@faker-js/faker';
  3  | import { loginAs } from '../../helpers/auth';
  4  | 
  5  | test.describe('Edit / Delete User', () => {
  6  |   let testUserName: string;
  7  | 
  8  |   test.beforeEach(async ({ page }) => {
  9  |     testUserName = faker.person.fullName();
  10 |     const testUserEmail = faker.internet.email().toLowerCase();
  11 | 
  12 |     await loginAs(page, 'SUPER_ADMIN');
  13 |     await page.goto('/users');
  14 |     await page.waitForURL('/users');
  15 | 
  16 |     // Create test user
  17 |     await page.getByRole('button', { name: /add user/i }).click();
  18 |     const dialog = page.getByRole('dialog');
  19 |     await dialog.locator('input[name="name"]').fill(testUserName);
  20 |     await dialog.locator('input[name="email"]').fill(testUserEmail);
  21 |     await dialog.locator('input[name="password"]').fill('Password123!');
  22 |     await dialog.locator('select[name="role"]').selectOption('STAFF');
  23 |     await dialog.getByRole('button', { name: /create user/i }).click();
  24 |     await expect(dialog).not.toBeVisible({ timeout: 10000 });
  25 |     await expect(page.getByText(testUserName)).toBeVisible();
  26 |   });
  27 | 
  28 |   test('edit user name — updated in table', async ({ page }) => {
  29 |     const newName = faker.person.fullName();
  30 |     const row = page.locator('tr').filter({ hasText: testUserName });
  31 |     await row.locator('button[title="Edit user"]').click();
  32 | 
  33 |     const dialog = page.getByRole('dialog');
  34 |     await expect(dialog).toBeVisible();
  35 |     await dialog.locator('input[name="name"]').fill(newName);
  36 |     await dialog.getByRole('button', { name: /save changes/i }).click();
  37 | 
  38 |     await expect(dialog).not.toBeVisible({ timeout: 10000 });
  39 |     await expect(page.getByText(newName)).toBeVisible({ timeout: 5000 });
  40 |   });
  41 | 
  42 |   test('delete user — removed from table', async ({ page }) => {
  43 |     const row = page.locator('tr').filter({ hasText: testUserName });
  44 |     await row.locator('button[title="Delete user"]').click();
  45 | 
  46 |     const confirmDialog = page.getByRole('dialog');
  47 |     await expect(confirmDialog).toBeVisible();
  48 |     await confirmDialog.getByRole('button', { name: /confirm/i }).click();
  49 | 
  50 |     await expect(confirmDialog).not.toBeVisible({ timeout: 10000 });
> 51 |     await expect(page.getByText(testUserName)).not.toBeVisible({ timeout: 5000 });
     |                                                    ^ Error: expect(locator).not.toBeVisible() failed
  52 |   });
  53 | 
  54 |   test('cannot delete own account', async ({ page }) => {
  55 |     // The Super Admin row should have no delete button (isSelf check)
  56 |     const superAdminRow = page.locator('tr').filter({ hasText: 'Super Admin' }).filter({ hasText: '(you)' });
  57 |     const deleteBtn = superAdminRow.locator('button[title="Delete user"]');
  58 |     await expect(deleteBtn).not.toBeVisible();
  59 |   });
  60 | });
  61 | 
```