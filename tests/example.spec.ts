import { test, expect } from '@playwright/test';


test.describe("User login funcionality", () => {

  test('001 Valid login with correct credentials', async ({ page }) => {
    await page.goto('https://demo-bank.vercel.app/');
    await expect(page.getByTestId('login-input')).toBeVisible()
    await page.getByTestId('login-input').click();
    await page.getByTestId('login-input').fill('adminadm');
    await page.getByTestId('password-input').click();
    await page.getByTestId('password-input').fill('haslohas');
    await page.getByTestId('login-button').click();
    await expect(page.getByTestId('user-name')).toBeVisible()

  })

  test('002 Invalid login with incorrect username', async ({ page }) => {
    await page.goto('https://demo-bank.vercel.app/');
    await expect(page.getByTestId('login-input')).toBeVisible()
    await page.getByTestId('login-input').click();
    await page.getByTestId('login-input').fill('admin');
    await page.getByTestId('password-input').click();
    await page.getByTestId('password-input').fill('haslohas');
    await expect(page.getByTestId('error-login-id')).toBeVisible()
    await expect(page.getByTestId('error-login-id')).toHaveText("identyfikator ma min. 8 znaków")
    await expect(page.getByTestId('login-button')).toBeDisabled()
});

})