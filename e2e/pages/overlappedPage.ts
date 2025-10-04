import { Page, Locator } from "@playwright/test";

export class OverlappedPage {
  readonly page: Page;

  // Main page elements
  readonly title: Locator;
  readonly scrollableContainer: Locator;

  // Input fields
  readonly idInput: Locator;
  readonly nameInput: Locator;

  constructor(page: Page) {
    this.page = page;

    // Page elements
    this.title = page.locator("h3");
    this.scrollableContainer = page.locator('div[style*="overflow-y: scroll"]');

    // Input fields
    this.idInput = page.locator("#id");
    this.nameInput = page.locator("#name");
  }

  /**
   * Navigate to the Overlapped page
   */
  async goto() {
    await this.page.goto("/overlapped");
  }

  /**
   * Check if a specific input element is overlapped by another element
   */
  async isInputOverlapped(inputLocator: Locator, expectedId?: string) {
    const box = await inputLocator.boundingBox();
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
    const inputId = await inputLocator.getAttribute("id");
    return elementAtPoint.id !== inputId;
  }

  /**
   * Ensure a specific input element is accessible by handling overlap
   */
  async ensureInputAccessible(inputLocator: Locator, inputName?: string) {
    const isOverlapped = await this.isInputOverlapped(inputLocator, inputName);

    if (isOverlapped) {
      // Hover over the element first to ensure it's visible
      await inputLocator.hover();

      // Scroll into view if needed
      await inputLocator.scrollIntoViewIfNeeded();
    }

    return isOverlapped;
  }

  /**
   * Check if the name input is overlapped by another element (legacy method)
   */
  async isNameInputOverlapped() {
    return this.isInputOverlapped(this.nameInput, "name");
  }

  /**
   * Fill any input field with automatic overlap handling
   */
  async fillInputSafely(inputLocator: Locator, text: string, inputName?: string) {
    // First ensure the input is accessible
    await this.ensureInputAccessible(inputLocator, inputName);

    // Then fill the field
    await inputLocator.fill(text);
  }

  /**
   * Fill the ID input field
   */
  async fillId(text: string) {
    await this.fillInputSafely(this.idInput, text, "id");
  }

  /**
   * Fill the name input field with proper overlap handling
   */
  async fillName(text: string) {
    await this.fillInputSafely(this.nameInput, text, "name");
  }

  /**
   * Clear the name input field
   */
  async clearName() {
    await this.nameInput.clear();
  }

  /**
   * Clear the ID input field
   */
  async clearId() {
    await this.idInput.clear();
  }
}
