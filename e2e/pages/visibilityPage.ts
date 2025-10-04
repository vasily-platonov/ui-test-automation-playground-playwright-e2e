import { Page, Locator } from "@playwright/test";

export class VisibilityPage {
  readonly page: Page;

  // Main page elements
  readonly title: Locator;

  // Buttons for visibility testing
  readonly hideButton: Locator;
  readonly removedButton: Locator;
  readonly zeroWidthButton: Locator;
  readonly overlappedButton: Locator;
  readonly transparentButton: Locator;
  readonly invisibleButton: Locator;
  readonly notDisplayedButton: Locator;
  readonly offscreenButton: Locator;

  constructor(page: Page) {
    this.page = page;

    // Page elements
    this.title = page.locator("h3");

    // Buttons
    this.hideButton = page.locator("#hideButton");
    this.removedButton = page.locator("#removedButton");
    this.zeroWidthButton = page.locator("#zeroWidthButton");
    this.overlappedButton = page.locator("#overlappedButton");
    this.transparentButton = page.locator("#transparentButton");
    this.invisibleButton = page.locator("#invisibleButton");
    this.notDisplayedButton = page.locator("#notdisplayedButton");
    this.offscreenButton = page.locator("#offscreenButton");
  }

  /**
   * Navigate to the Visibility page
   */
  async goto() {
    await this.page.goto("/visibility");
  }

  /**
   * Click a button by its locator
   */
  async clickButton(buttonLocator: Locator) {
    await buttonLocator.click();
  }

  /**
   * Click the Hide button
   */
  async clickHideButton() {
    await this.clickButton(this.hideButton);
  }
}
