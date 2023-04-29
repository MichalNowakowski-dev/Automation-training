import { test, expect } from '@playwright/test';

test('Valid Login with valid login and password', async ({ page }) => {
  await page.goto('https://demo-bank.vercel.app/');
  await page.getByTestId('login-input').click();
  await expect(page.getByTestId('login-input')).toBeVisible()
  await page.getByTestId('login-input').fill('adminadm');
  await page.getByTestId('password-input').click();
  await page.getByTestId('password-input').fill('haslohas');
  await page.getByTestId('login-button').click();

  
  await expect(page.getByTestId('user-name')).toBeVisible()
});
