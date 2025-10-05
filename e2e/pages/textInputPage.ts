import { Page, Locator } from "@playwright/test";

export class TextInputPage {
  readonly page: Page;

  // Main elements
  readonly pageTitle: Locator;
  readonly pageDescription: Locator;
  readonly scenarioSection: Locator;

  // Form elements
  readonly form: Locator;
  readonly inputLabel: Locator;
  readonly textInput: Locator;
  readonly updatingButton: Locator;

  constructor(page: Page) {
    this.page = page;

    // Page elements
    this.pageTitle = page.locator("h3");
    this.pageDescription = page.locator("p").first();
    this.scenarioSection = page.locator("h4").filter({ hasText: "Scenario" });

    // Form elements
    this.form = page.locator("form");
    this.inputLabel = page.locator('label[for="newButtonName"]');
    this.textInput = page.locator("#newButtonName");
    this.updatingButton = page.locator("#updatingButton");
  }

  /**
   * Navigate to the Text Input page
   */
  async goto() {
    await this.page.goto("/textinput");
  }

  /**
   * Fill the text input with the specified value
   */
  async fillTextInput(text: string) {
    const field = await this.page.$("#newButtonName");
    await field?.fill(text);
  }

  /**
   * Clear the text input field
   */
  async clearTextInput() {
    await this.textInput.clear();
  }

  /**
   * Type text into the input field (character by character)
   * This simulates real keyboard input at OS level
   */
  async typeIntoInput(text: string) {
    await this.textInput.pressSequentially(text);
  }

  /**
   * Get the current value of the text input
   */
  async getInputValue() {
    return await this.textInput.inputValue();
  }

  /**
   * Get the placeholder text of the input field
   */
  async getInputPlaceholder() {
    return await this.textInput.getAttribute("placeholder");
  }

  /**
   * Click the updating button
   */
  async clickUpdatingButton() {
    await this.updatingButton.click();
  }

  /**
   * Get the current text of the updating button
   */
  async getButtonText() {
    return await this.updatingButton.textContent();
  }

  /**
   * Wait for the button text to change to expected value
   */
  async waitForButtonTextChange(expectedText: string, timeout: number = 5000) {
    await this.updatingButton.waitFor({
      state: "visible",
      timeout: timeout,
    });

    // Wait for the button text to match expected value
    await this.page.waitForFunction(
      ({ selector, expected }) => {
        const button = document.querySelector(selector);
        return button && button.textContent?.trim() === expected;
      },
      { selector: "#updatingButton", expected: expectedText },
      { timeout }
    );
  }

  /**
   * Get page title text
   */
  async getPageTitle() {
    return await this.pageTitle.textContent();
  }

  /**
   * Get page description text
   */
  async getPageDescription() {
    return await this.pageDescription.textContent();
  }

  /**
   * Wait for page to be fully loaded
   */
  async waitForPageToLoad() {
    await this.textInput.waitFor({ state: "visible" });
    await this.updatingButton.waitFor({ state: "visible" });
    await this.form.waitFor({ state: "visible" });
  }
}
