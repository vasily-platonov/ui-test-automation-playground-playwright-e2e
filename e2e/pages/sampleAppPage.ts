import { Page, Locator } from "@playwright/test";

export class SampleAppPage {
  readonly page: Page;

  // Main elements
  readonly pageTitle: Locator;
  readonly loginStatus: Locator;
  readonly usernameField: Locator;
  readonly passwordField: Locator;
  readonly loginButton: Locator;

  constructor(page: Page) {
    this.page = page;

    // Page elements
    this.pageTitle = page.locator("h3");
    this.loginStatus = page.locator("#loginstatus");

    this.usernameField = page.locator('input[name="UserName"]');
    this.passwordField = page.locator('input[name="Password"]');
    this.loginButton = page.locator("#login");
  }

  /**
   * Navigate to the Sample App page
   */
  async goto() {
    await this.page.goto("/sampleapp");
  }

  /**
   * Fill username field
   */
  async fillUsername(username: string) {
    await this.usernameField.fill(username);
  }

  /**
   * Fill password field
   */
  async fillPassword(password: string) {
    await this.passwordField.fill(password);
  }

  /**
   * Click the login/logout button
   */
  async clickLoginButton() {
    await this.loginButton.click();
  }

  /**
   * Get the current login status text
   */
  async getLoginStatus() {
    return await this.loginStatus.textContent();
  }

  /**
   * Get the current login button text (Log In / Log Out)
   */
  async getLoginButtonText() {
    return await this.loginButton.textContent();
  }

  /**
   * Get the login status CSS class (indicates success/error/info state)
   */
  async getLoginStatusClass() {
    return await this.loginStatus.getAttribute("class");
  }

  /**
   * Check if user is currently logged in (based on button text)
   */
  async isLoggedIn() {
    const buttonText = await this.getLoginButtonText();
    return buttonText?.trim() === "Log Out";
  }

  /**
   * Perform login with username and password
   */
  async login(username: string, password: string) {
    await this.fillUsername(username);
    await this.fillPassword(password);
    await this.clickLoginButton();
  }

  /**
   * Perform logout (if currently logged in)
   */
  async logout() {
    const loggedIn = await this.isLoggedIn();
    if (loggedIn) {
      await this.clickLoginButton();
    }
  }

  /**
   * Clear all form fields
   */
  async clearForm() {
    await this.usernameField.clear();
    await this.passwordField.clear();
  }

  /**
   * Get current values from form fields
   */
  async getFormValues() {
    const username = await this.usernameField.inputValue();
    const password = await this.passwordField.inputValue();
    return { username, password };
  }

  /**
   * Check if login status indicates success state
   */
  async isLoginStatusSuccess() {
    const statusClass = await this.getLoginStatusClass();
    return statusClass?.includes("text-success") || false;
  }

  /**
   * Check if login status indicates error state
   */
  async isLoginStatusError() {
    const statusClass = await this.getLoginStatusClass();
    return statusClass?.includes("text-danger") || false;
  }

  /**
   * Check if login status indicates info/neutral state
   */
  async isLoginStatusInfo() {
    const statusClass = await this.getLoginStatusClass();
    return statusClass?.includes("text-info") || false;
  }
}
