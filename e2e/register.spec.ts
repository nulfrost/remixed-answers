import { test, expect } from '@playwright/test'

test.describe('Testing the register page', () => {
  test.describe('Error states', () => {
    test.beforeEach(async ({page}) => {
      await page.goto('/register')
    })
    test('Should show an error message if the user does not fill in the username field', async ({
      page,
    }) => {
      await page.getByLabel('Username (required)').fill('')
      await page.getByRole('button', { name: /Register Account/i }).click()
      await expect(
        page.getByText('Please enter a username', {exact: true})
      ).toBeVisible()
    })

    test('Should show an error message when a username is too short', async ({
      page,
    }) => {
      await page.getByLabel('Username (required)').fill('D')
      await page.getByRole('button', { name: /Register Account/i }).click()
      await expect(
        page.getByText('Username must be at least 10 characters', {exact: true})
      ).toBeVisible()
    })

    test('Should show an error if the username is taken', async ({
      page,
    }) => {
      await page.getByLabel('Username (required)').fill('Danex10')
      await page.getByRole('button', { name: /Register Account/i }).click()
      await expect(
        page.getByText('User with this username already exists', {exact: true})
      ).toBeVisible()
    })

    test('Should show an error if the user does not fill in the e-mail field', async ({
      page,
    }) => {
      await page.getByLabel('E-mail (required)').fill('')
      await page.getByRole('button', { name: /Register Account/i }).click()
      await expect(
        page.getByText('Please enter an e-mail', {exact: true})
      ).toBeVisible()
    })

    test('Should show an error if the user does not fill in the password field', async ({
      page,
    }) => {
      await page.getByLabel('Password (required)', {exact: true}).fill('')
      await page.getByRole('button', { name: /Register Account/i }).click()
      await expect(
        page.getByText('Please enter a password', {exact: true})
      ).toBeVisible()
    })

    test('Should show an error if the user\'s password is too short', async ({
      page,
    }) => {
      await page.getByLabel('Password (required)', {exact: true}).fill('a')
      await page.getByRole('button', { name: /Register Account/i }).click()
      await expect(
        page.getByText('Password must be at least 10 characters', {exact: true})
      ).toBeVisible()
    })

    test('Should show an error if the user does not confirm their password', async ({
      page,
    }) => {
      await page.getByLabel('Confirm Password (required)', {exact: true}).fill('')
      await page.getByRole('button', { name: /Register Account/i }).click()
      await expect(
        page.getByText('Please confirm your password', {exact: true})
      ).toBeVisible()
    })

    test('Should show an error if user\'s password and confirm password do not match', async ({
      page,
    }) => {
      /**
       * Because of the way zod refine works, we have to fill in all of the other fields
       * first so that we can see the confirm password errors
       * https://github.com/colinhacks/zod/issues/479
       */
      await page.getByLabel('Username (required)', {exact: true}).fill('Danex20')
      await page.getByLabel('E-mail (required)', {exact: true}).fill('dane20@gmail.com')
      await page.getByLabel('Password (required)', {exact: true}).fill('thisisapassword')
      await page.getByLabel('Confirm Password (required)', {exact: true}).fill('thisis')
      await page.getByRole('button', { name: /Register Account/i }).click()
      await expect(
        page.getByText('Passwords do not match', {exact: true})
      ).toBeVisible()
    })
  })
})
