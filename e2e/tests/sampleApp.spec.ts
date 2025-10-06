import { test, expect } from "@playwright/test";
import { SampleAppPage } from "../pages/sampleAppPage";

let sampleAppPage: SampleAppPage;

const testUsername = "testuser";
const testPassword = "testpass";

const validUsername = "validuser";
const validPassword = "pwd";

const invalidPassword = "wrongpass";
const emptyString = "";
const specialUsername = "user@domain.com";

test.beforeEach(async ({ page }) => {
  sampleAppPage = new SampleAppPage(page);
  await sampleAppPage.goto();
});

test.describe("Sample App tests", { tag: "@sampleapp" }, () => {
  test("should navigate to Sample App page successfully", async ({ page }) => {
    // Verify URL and page title
    await expect(page).toHaveURL(/\/sampleapp$/);
    await expect(sampleAppPage.pageTitle).toContainText("Sample App");
  });

  test("should display login form elements", async ({ page }) => {
    // Verify form elements are visible
    await expect(sampleAppPage.usernameField).toBeVisible();
    await expect(sampleAppPage.passwordField).toBeVisible();
    await expect(sampleAppPage.loginButton).toBeVisible();
    await expect(sampleAppPage.loginStatus).toBeVisible();

    // Verify initial state
    await expect(sampleAppPage.loginButton).toContainText("Log In");
    await expect(sampleAppPage.loginStatus).toContainText("User logged out.");
  });

  test("should have proper form field attributes", async ({ page }) => {
    // Verify username field
    await expect(sampleAppPage.usernameField).toHaveAttribute("type", "text");
    await expect(sampleAppPage.usernameField).toHaveAttribute("name", "UserName");
    await expect(sampleAppPage.usernameField).toHaveAttribute("placeholder", "User Name");

    // Verify password field
    await expect(sampleAppPage.passwordField).toHaveAttribute("type", "password");
    await expect(sampleAppPage.passwordField).toHaveAttribute("name", "Password");
    await expect(sampleAppPage.passwordField).toHaveAttribute("placeholder", "********");
  });

  test("should show initial logged out status", async ({ page }) => {
    const loginStatus = await sampleAppPage.getLoginStatus();
    const loginButtonText = await sampleAppPage.getLoginButtonText();
    const isLoggedIn = await sampleAppPage.isLoggedIn();
    const isStatusInfo = await sampleAppPage.isLoginStatusInfo();

    expect(loginStatus).toContain("User logged out.");
    expect(loginButtonText?.trim()).toBe("Log In");
    expect(isLoggedIn).toBe(false);
    expect(isStatusInfo).toBe(true);
  });

  test("should allow filling form fields", async ({ page }) => {
    // Fill form fields
    await sampleAppPage.fillUsername(testUsername);
    await sampleAppPage.fillPassword(testPassword);

    const formValues = await sampleAppPage.getFormValues();
    expect(formValues.username).toBe(testUsername);
    expect(formValues.password).toBe(testPassword);
  });

  test("should clear form fields", async ({ page }) => {
    // Fill fields first
    await sampleAppPage.fillUsername(testUsername);
    await sampleAppPage.fillPassword(testPassword);

    // Clear fields
    await sampleAppPage.clearForm();

    const formValues = await sampleAppPage.getFormValues();
    expect(formValues.username).toBe(emptyString);
    expect(formValues.password).toBe(emptyString);
  });

  test("should login successfully with valid credentials", { tag: "@mainScenario" }, async ({ page }) => {
    // Valid credentials: any non-empty username and valid password
    await sampleAppPage.login(validUsername, validPassword);

    // Verify successful login state
    await expect(sampleAppPage.loginStatus).toContainText("Welcome, validuser!");
    await expect(sampleAppPage.loginButton).toContainText("Log Out");

    const isLoggedIn = await sampleAppPage.isLoggedIn();
    const isStatusSuccess = await sampleAppPage.isLoginStatusSuccess();

    expect(isLoggedIn).toBe(true);
    expect(isStatusSuccess).toBe(true);
  });

  test("should handle invalid password", { tag: "@mainScenario" }, async ({ page }) => {
    // Invalid credentials: wrong password
    await sampleAppPage.login(testUsername, invalidPassword);

    // Verify error state
    await expect(sampleAppPage.loginStatus).toContainText("Invalid username/password");
    await expect(sampleAppPage.loginButton).toContainText("Log In");

    const isLoggedIn = await sampleAppPage.isLoggedIn();
    const isStatusError = await sampleAppPage.isLoginStatusError();

    expect(isLoggedIn).toBe(false);
    expect(isStatusError).toBe(true);

    // Verify fields are cleared after failed login
    const formValues = await sampleAppPage.getFormValues();
    expect(formValues.username).toBe(emptyString);
    expect(formValues.password).toBe(emptyString);
  });

  test("should handle empty username", async ({ page }) => {
    // Invalid credentials: empty username
    await sampleAppPage.login(emptyString, validPassword);

    // Verify error state
    await expect(sampleAppPage.loginStatus).toContainText("Invalid username/password");
    await expect(sampleAppPage.loginButton).toContainText("Log In");

    const isLoggedIn = await sampleAppPage.isLoggedIn();
    const isStatusError = await sampleAppPage.isLoginStatusError();

    expect(isLoggedIn).toBe(false);
    expect(isStatusError).toBe(true);
  });

  test("should handle both empty fields", async ({ page }) => {
    // Invalid credentials: both fields empty
    await sampleAppPage.login(emptyString, emptyString);

    // Verify error state
    await expect(sampleAppPage.loginStatus).toContainText("Invalid username/password");
    await expect(sampleAppPage.loginButton).toContainText("Log In");

    const isLoggedIn = await sampleAppPage.isLoggedIn();
    expect(isLoggedIn).toBe(false);
  });

  test("should logout successfully when logged in", async ({ page }) => {
    // First login
    await sampleAppPage.login(validUsername, validPassword);
    await expect(sampleAppPage.loginButton).toContainText("Log Out");

    // Then logout
    await sampleAppPage.logout();

    // Verify logged out state
    await expect(sampleAppPage.loginStatus).toContainText("User logged out.");
    await expect(sampleAppPage.loginButton).toContainText("Log In");

    const isLoggedIn = await sampleAppPage.isLoggedIn();
    const isStatusInfo = await sampleAppPage.isLoginStatusInfo();

    expect(isLoggedIn).toBe(false);
    expect(isStatusInfo).toBe(true);

    // Verify fields are cleared after logout
    const formValues = await sampleAppPage.getFormValues();
    expect(formValues.username).toBe(emptyString);
    expect(formValues.password).toBe(emptyString);
  });

  test("should handle multiple login attempts", async ({ page }) => {
    // First failed attempt
    await sampleAppPage.login("user1", invalidPassword);
    await expect(sampleAppPage.loginStatus).toContainText("Invalid username/password");

    // Second failed attempt with different credentials
    await sampleAppPage.login("user2", "also" + invalidPassword);
    await expect(sampleAppPage.loginStatus).toContainText("Invalid username/password");

    // Successful attempt
    await sampleAppPage.login("user3", validPassword);
    await expect(sampleAppPage.loginStatus).toContainText("Welcome, user3!");

    const isLoggedIn = await sampleAppPage.isLoggedIn();
    expect(isLoggedIn).toBe(true);
  });

  test("should validate login status CSS classes", async ({ page }) => {
    // Initial state - info class
    let statusClass = await sampleAppPage.getLoginStatusClass();
    expect(statusClass).toContain("text-info");

    // Failed login - danger class
    await sampleAppPage.login(testUsername, invalidPassword);
    statusClass = await sampleAppPage.getLoginStatusClass();
    expect(statusClass).toContain("text-danger");

    // Successful login - success class
    await sampleAppPage.login(validUsername, validPassword);
    statusClass = await sampleAppPage.getLoginStatusClass();
    expect(statusClass).toContain("text-success");

    // Logout - back to info class
    await sampleAppPage.logout();
    statusClass = await sampleAppPage.getLoginStatusClass();
    expect(statusClass).toContain("text-info");
  });

  test("should handle special characters in username", async ({ page }) => {
    await sampleAppPage.login(specialUsername, validPassword);

    await expect(sampleAppPage.loginStatus).toContainText(`Welcome, ${specialUsername}!`);

    const isLoggedIn = await sampleAppPage.isLoggedIn();
    expect(isLoggedIn).toBe(true);
  });
});
