import { test as setup, expect } from '@playwright/test';

const authFile = 'playwright/.auth/user.json';

setup('Get and save auth state', async ({ page }) => {
  await page.goto('/login');
  await page.getByLabel('Username or email address').fill('username');
  await page.getByLabel('Password').fill('password');
  await page.getByRole('button', { name: 'Sign in' }).click();

  await page.waitForURL('https://github.com/');
  await expect(page.getByRole('button', { name: 'View profile and more' })).toBeVisible();


  await page.context().storageState({ path: authFile });
});