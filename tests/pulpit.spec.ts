import { test, expect } from "@playwright/test";
import { loginData } from "../test-data/login.data";
import { LoginPage } from "../pages/login.page";
import { PulpitPage } from "../pages/pultpit.page";

test.describe("pulpit test", () => {

  let pulpitPage: PulpitPage;

  test.beforeEach(async ({ page }) => {
    const username = loginData.userLogin;
    const userPassword = loginData.userPassword;
    await page.goto("/");
    
    const loginPage = new LoginPage(page);
    await loginPage.login(username,userPassword)

    pulpitPage = new PulpitPage(page);
  });

  test("001 Valid quick transfer with correct data", async ({ page }) => {
    // Arrange
    const recieverId = "2";
    const transferAmount = "150";
    const transferTitle = "Zwrot środków";
    const expectedTransferReciever = "Chuck Demobankowy";

    // Act
    
    await pulpitPage.transferRecieverInput.selectOption(recieverId);
    await pulpitPage.transferAmountInput.fill(transferAmount);
    await pulpitPage.transferTitleInput.fill(transferTitle);
    await pulpitPage.transferButton.click();
    await pulpitPage.closeButton.click();

    // Assert
    await expect(pulpitPage.messageText).toHaveText(
      `Przelew wykonany! ${expectedTransferReciever} - ${transferAmount},00PLN - ${transferTitle}`
    );
  });

  test("002 Valid mobile top-up with correct data", async ({ page }) => {
    // Arrange

    const topupRevieverNumber = "502 xxx xxx";
    const topupAmount = "30";
    const initialBalance = await pulpitPage.moneyValueText.innerText()
    const expectedBalance = Number(initialBalance) - Number(topupAmount)

    // Act
    await pulpitPage.topupRecieverInput.selectOption(topupRevieverNumber);
    await pulpitPage.topupAmonutInput.fill(topupAmount);
    await pulpitPage.topupAgreementCheckbox.click();
    await pulpitPage.topupButton.click();
    await pulpitPage.closeButton.click();

    // Assert
    await expect(pulpitPage.messageText).toHaveText(
      `Doładowanie wykonane! ${topupAmount},00PLN na numer ${topupRevieverNumber}`
    );
    await expect(pulpitPage.moneyValueText).toHaveText(`${expectedBalance}`)
  });
});
