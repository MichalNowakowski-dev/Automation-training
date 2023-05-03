import { test, expect } from "@playwright/test";
import { loginData } from "../test-data/login.data";
import { LoginPage } from "../pages/login.page";
import { PaymentPage } from "../pages/payment.page";
import { PulpitPage } from "../pages/pultpit.page";

test.describe("Payment tests", () => {
  let paymentPage: PaymentPage;
  
  test.beforeEach(async ({ page }) => {
    const username = loginData.userLogin;
    const userPassword = loginData.userPassword;
    
    const loginPage = new LoginPage(page);
    await page.goto("/");
    await loginPage.login(username, userPassword)

    const pulpitPage = new PulpitPage(page);
    await pulpitPage.sideMenu.paymentButton.click()

    paymentPage = new PaymentPage(page);
  });
  
  test("001 Valid simple normal payment", async ({ page }) => {
    const recieverName = "Jacek Schroeter";
    const recieverAccountNumber = "55 9595 9987 4841 4154 5465 69585";
    const paymentAmount = "1500";
    const paymentTitle = "kaska";
    const successfulPaymentMessage = `Przelew wykonany! ${paymentAmount},00PLN dla ${recieverName}`;
    
    
    await paymentPage.makeTransfer(recieverName, recieverAccountNumber, paymentAmount, paymentTitle)
    

    await expect(paymentPage.messageText).toHaveText(successfulPaymentMessage);
  });
});
