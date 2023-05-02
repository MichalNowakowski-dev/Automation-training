import { test, expect } from '@playwright/test';
import { loginData } from '../test-data/login.data';
import { LoginPage } from '../pages/login.page';

test.describe('Payment tests', () => {
  test.beforeEach(async ({ page }) => {
    const username = loginData.userLogin
    const userPassword = loginData.userPassword
    
    await page.goto("/");

    const loginPage = new LoginPage(page);
    
    await loginPage.loginInput.fill(username)
    await loginPage.passwordInput.fill(userPassword)
    await loginPage.loginButton.click();
    // await page.getByTestId("login-input").fill(loginData.userLogin);
    // await page.getByTestId("password-input").fill(loginData.userPassword);
    // await page.getByTestId("login-button").click();
  });

  test('001 Valid simple normal payment', async ({ page }) => {
    const paymentAmount = '1500';
    const paymentTitle = 'kaska';
    const recieverAccountNumber = '55 9595 9987 4841 4154 5465 69585';
    const recieverName = 'Jacek Schroeter';
    const successfulPaymentMessage = `Przelew wykonany! ${paymentAmount},00PLN dla ${recieverName}`;

    await page.getByRole('link', { name: 'płatności' }).click();
    await page.getByTestId('transfer_receiver').fill(recieverName);
    await page.getByTestId('form_account_to').fill(recieverAccountNumber);
    await page.getByTestId('form_amount').fill(paymentAmount);
    await page.getByTestId('form_title').fill(paymentTitle);
    await page.getByRole('button', { name: 'wykonaj przelew' }).click();
    await page.getByTestId('close-button').click();
    
    await expect(page.getByTestId('message-text')).toHaveText(successfulPaymentMessage)
  });
})