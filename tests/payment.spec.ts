import { test, expect } from "@playwright/test";
import { loginData } from "../test-data/login.data";
import { LoginPage } from "../pages/login.page";
import { PaymentPage } from "../pages/payment.page";

test.describe("Payment tests", () => {
  test.beforeEach(async ({ page }) => {
    const username = loginData.userLogin;
    const userPassword = loginData.userPassword;
    const loginPage = new LoginPage(page);

    await page.goto("/");
    await loginPage.loginInput.fill(username);
    await loginPage.passwordInput.fill(userPassword);
    await loginPage.loginButton.click();
  });

  test("001 Valid simple normal payment", async ({ page }) => {
    const paymentAmount = "1500";
    const paymentTitle = "kaska";
    const recieverAccountNumber = "55 9595 9987 4841 4154 5465 69585";
    const recieverName = "Jacek Schroeter";
    const successfulPaymentMessage = `Przelew wykonany! ${paymentAmount},00PLN dla ${recieverName}`;

    await page.getByRole("link", { name: "płatności" }).click();

    const paymentPage = new PaymentPage(page);
    await paymentPage.transferRecieverInput.fill(recieverName);
    await paymentPage.transferRecieverAccNumberInput.fill(
      recieverAccountNumber
    );
    await paymentPage.transferRecieverAmountInput.fill(paymentAmount);
    await paymentPage.transferRecieverTitleInput.fill(paymentTitle);
    await paymentPage.transferButton.click();
    await paymentPage.closeButton.click();

    // await page.getByTestId('transfer_receiver').fill(recieverName);
    // await page.getByTestId('form_account_to').fill(recieverAccountNumber);
    // await page.getByTestId('form_amount').fill(paymentAmount);
    // await page.getByTestId('form_title').fill(paymentTitle);
    // await page.getByRole('button', { name: 'wykonaj przelew' }).click();
    // await page.getByTestId('close-button').click();

    await expect(paymentPage.showMessages).toHaveText(successfulPaymentMessage);
  });
});
