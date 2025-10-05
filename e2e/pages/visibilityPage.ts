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

  /**
   * Check if a specific button element is overlapped by another element
   */
  async isButtonOverlapped(buttonLocator: Locator, expectedId?: string) {
    const box = await buttonLocator.boundingBox();
    if (!box) return true; // If we can't get bounding box, assume it's overlapped

    // Check the center point of the element
    const centerX = box.x + box.width / 2;
    const centerY = box.y + box.height / 2;

    // Get the element at the center point
    const elementAtPoint = await this.page.evaluate(
      ({ x, y }) => {
        const element = document.elementFromPoint(x, y);
        return {
          id: element?.id || "",
          tagName: element?.tagName || "",
          className: element?.className || "",
        };
      },
      { x: centerX, y: centerY }
    );

    // If expectedId is provided, check against it; otherwise get the id from the locator
    if (expectedId) {
      return elementAtPoint.id !== expectedId;
    }

    // Try to get the expected id from the locator
    const buttonId = await buttonLocator.getAttribute("id");
    return elementAtPoint.id !== buttonId;
  }
}
