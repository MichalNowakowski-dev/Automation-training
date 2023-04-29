import { test, expect } from '@playwright/test';


test.describe("User login funcionality", () => {

  test('001 Valid login with correct credentials', async ({ page }) => {
    await page.goto('https://demo-bank.vercel.app/');
    await expect(page.getByTestId('login-input')).toBeVisible();
    await expect(page.getByTestId('password-input')).toBeVisible();
    await page.getByTestId('login-input').fill('adminadm');
    await page.getByTestId('password-input').fill('haslohas');
    await page.getByTestId('login-button').click();
    await expect(page.getByTestId('user-name')).toBeVisible();
    await expect(page.getByTestId('user-name')).toHaveText("Jan Demobankowy")

  })

  test('002 Invalid login with too short username', async ({ page }) => {
    await page.goto('https://demo-bank.vercel.app/');
    await expect(page.getByTestId('login-input')).toBeVisible();
    await expect(page.getByTestId('password-input')).toBeVisible();
    await page.getByTestId('login-input').fill('admin');
    await page.getByTestId('password-input').fill('haslohas');
    await expect(page.getByTestId('error-login-id')).toBeVisible();
    await expect(page.getByTestId('error-login-id')).toHaveText("identyfikator ma min. 8 znaków");
    await expect(page.getByTestId('login-button')).toBeDisabled();
});

  test('003 Invalid login with too short password', async ({ page }) => {
    await page.goto('https://demo-bank.vercel.app/');
    await expect(page.getByTestId('login-input')).toBeVisible();
    await expect(page.getByTestId('password-input')).toBeVisible();
    await page.getByTestId('login-input').fill('adminadm');
    await page.getByTestId('password-input').fill('haslo');
    await page.getByTestId('password-input').blur() // Usuwa focus z elementu
    await expect(page.getByTestId('error-login-password')).toBeVisible();
    await expect(page.getByTestId('error-login-password')).toHaveText("hasło ma min. 8 znaków");
    await expect(page.getByTestId('login-button')).toBeDisabled();
});

})