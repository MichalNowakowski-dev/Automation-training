import { test, expect } from "@playwright/test";
import { loginData } from "../test-data/login.data";
import { LoginPage } from "../pages/login.page";

test.describe("User login funcionality", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });
  
  test("001 Valid login with correct credentials", async ({ page }) => {
    // Arrange
    const username = loginData.userLogin
    const userPassword = loginData.userPassword
    const expectedUsername = "Jan Demobankowy";

    // Act
    const loginPage = new LoginPage(page);
    
    await loginPage.loginInput.fill(username)
    await loginPage.passwordInput.fill(userPassword)
    await loginPage.loginButton.click();

    // Assert
    await expect(page.getByTestId("user-name")).toBeVisible();
    await expect(page.getByTestId("user-name")).toHaveText(expectedUsername);
  });

  test("002 Invalid login with too short username", async ({ page }) => {
    // Arrange
    const invalidUserLogin = "admin";
    const errorUsernameMessage = "identyfikator ma min. 8 znaków";

    // Act
    await page.getByTestId("login-input").fill(invalidUserLogin);
    await page.getByTestId("password-input").click()

    // Assert
    await expect(page.getByTestId("error-login-id")).toBeVisible();
    await expect(page.getByTestId("error-login-id")).toHaveText(
      errorUsernameMessage
    );
    await expect(page.getByTestId("login-button")).toBeDisabled();
  });

  test("003 Invalid login with too short password", async ({ page }) => {
    // Arrange
    const username = loginData.userLogin
    const invalidUserPassword = "haslo";
    const errorPasswordMessage = "hasło ma min. 8 znaków";

    // Act
    await page.getByTestId("login-input").fill(username);
    await page.getByTestId("password-input").fill(invalidUserPassword);
    await page.getByTestId("password-input").blur(); // Usuwa focus z elementu

    // Assert
    await expect(page.getByTestId("error-login-password")).toBeVisible();
    await expect(page.getByTestId("error-login-password")).toHaveText(
      errorPasswordMessage
    );
    await expect(page.getByTestId("login-button")).toBeDisabled();
  });
});
