import { Page, Locator } from "@playwright/test";

export class AjaxPage {
  readonly page: Page;

  // Main page elements
  readonly title: Locator;
  readonly description: Locator;
  readonly ajaxButton: Locator;
  readonly spinner: Locator;
  readonly contentDiv: Locator;
  readonly loadedLabel: Locator;

  constructor(page: Page) {
    this.page = page;

    // Page elements
    this.title = page.locator("h3");
    this.description = page.locator("p").first();
    this.ajaxButton = page.locator("#ajaxButton");
    this.spinner = page.locator("#spinner");
    this.contentDiv = page.locator("#content");
    this.loadedLabel = page.locator("#content p.bg-success");
  }

  /**
   * Navigate to the Ajax page
   */
  async goto() {
    await this.page.goto("/ajax");
  }

  /**
   * Click the button that triggers the AJAX request
   */
  async clickAjaxButton() {
    await this.ajaxButton.click();
  }

  /**
   * Click on the loaded label text
   */
  async clickLoadedLabel() {
    await this.loadedLabel.click();
  }
}
