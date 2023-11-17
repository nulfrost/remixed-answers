import { test as setup, expect } from '@playwright/test'

const authFile = 'playwright/.auth/user.json'

setup('Get and save auth state', async ({ page }) => {
   await page.goto('/login')
   await page.getByLabel('Username').fill('Danex10')
   await page.getByLabel('Password').fill('thisisapassword')
   await page.getByRole('button', { name: 'Login' }).click()

   await page.waitForURL('/')
   await expect(page.getByRole('heading', { name: /Search/i })).toBeVisible()

   await page.context().storageState({ path: authFile })
})
