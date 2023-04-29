import { test, expect } from "@playwright/test";

test.describe("pulpit test", () => {
  // Arrange - global
  const url = "https://demo-bank.vercel.app/";
  const userLogin = "tester12";
  const userPassword = "testtest";

  test("001 Valid quick transfer with correct data", async ({ page }) => {
    // Arrange
    const recieverId = "2";
    const transferAmount = "150";
    const transferTitle = "Zwrot środków";
    const expectedTransferReciever = "Chuck Demobankowy";
    // Act
    await page.goto(url);
    await page.getByTestId("login-input").fill(userLogin);
    await page.getByTestId("password-input").fill(userPassword);
    await page.getByTestId("login-button").click();

    await page.locator("#widget_1_transfer_receiver").selectOption(recieverId);
    await page.locator("#widget_1_transfer_amount").fill(transferAmount);
    await page.locator("#widget_1_transfer_title").fill(transferTitle);

    await page.getByRole("button", { name: "wykonaj" }).click();
    await page.getByTestId("close-button").click();

    // Assert
    await expect(page.locator("#show_messages")).toHaveText(
      `Przelew wykonany! ${expectedTransferReciever} - ${transferAmount},00PLN - ${transferTitle}`
    );
  });

  test("002 Valid mobile top-up with correct data", async ({ page }) => {
    // Arrange
    const topupRevieverNumber = "502 xxx xxx";
    const topupAmount = "30";
    // Act
    await page.goto(url);

    await page.getByTestId("login-input").fill(userLogin);
    await page.getByTestId("password-input").fill(userPassword);
    await page.getByTestId("login-button").click();

    await page
      .locator("#widget_1_topup_receiver")
      .selectOption(topupRevieverNumber);
    await page.locator("#widget_1_topup_amount").fill(topupAmount);
    await page.locator("#uniform-widget_1_topup_agreement span").click();
    await page.getByRole("button", { name: "doładuj telefon" }).click();
    await page.getByTestId("close-button").click();
    // Assert
    await expect(page.getByTestId("message-text")).toHaveText(
      `Doładowanie wykonane! ${topupAmount},00PLN na numer ${topupRevieverNumber}`
    );
  });
});
