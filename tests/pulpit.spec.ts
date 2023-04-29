import { test, expect } from '@playwright/test';

test.describe("pulpit test", () => {
    test('001 Valid quick transfer with correct data', async ({ page }) => {
        await page.goto('https://demo-bank.vercel.app');

        await page.getByTestId('login-input').fill('adminadm');
        await page.getByTestId('password-input').fill('haslohas');
        await page.getByTestId('login-button').click();

        await page.locator('#widget_1_transfer_receiver').selectOption('2');
        await page.locator('#widget_1_transfer_amount').fill('150');
        await page.locator('#widget_1_transfer_title').fill('Zwrot środków');

        await page.getByRole('button', { name: 'wykonaj' }).click();
        await page.getByTestId('close-button').click();
        

        await expect(page.locator("#show_messages")).toHaveText('Przelew wykonany! Chuck Demobankowy - 150,00PLN - Zwrot środków')
      });
})