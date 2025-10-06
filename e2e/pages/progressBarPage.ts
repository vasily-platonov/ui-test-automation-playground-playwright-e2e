import { Page, Locator } from "@playwright/test";

export class ProgressBarPage {
  readonly page: Page;

  // Main elements
  readonly pageTitle: Locator;

  // Control elements
  readonly startButton: Locator;
  readonly stopButton: Locator;

  // Progress bar elements
  readonly progressContainer: Locator;
  readonly progressBar: Locator;

  // Result elements
  readonly contentDiv: Locator;
  readonly resultLabel: Locator;

  constructor(page: Page) {
    this.page = page;

    // Page elements
    this.pageTitle = page.locator("h3");

    // Control elements
    this.startButton = page.locator("#startButton");
    this.stopButton = page.locator("#stopButton");

    // Progress bar elements
    this.progressContainer = page.locator(".progress");
    this.progressBar = page.locator("#progressBar");

    // Result elements
    this.contentDiv = page.locator("#content");
    this.resultLabel = page.locator("#result");
  }

  /**
   * Navigate to the Progress Bar page
   */
  async goto() {
    await this.page.goto("/progressbar");
  }

  /**
   * Click the Start button to begin progress
   */
  async clickStart() {
    await this.startButton.click();
  }

  /**
   * Click the Stop button to halt progress
   */
  async clickStop() {
    await this.stopButton.click();
  }

  /**
   * Get the current progress bar value as a number (0-100)
   */
  async getProgressValue() {
    const ariaValue = await this.progressBar.getAttribute("aria-valuenow");
    return ariaValue ? parseInt(ariaValue) : 0;
  }

  /**
   * Get the progress bar text content (e.g., "75%")
   */
  async getProgressText() {
    return await this.progressBar.textContent();
  }

  /**
   * Get the progress bar width style as percentage
   */
  async getProgressWidth() {
    const style = await this.progressBar.getAttribute("style");
    const widthMatch = style?.match(/width:\s*(\d+)%/);
    return widthMatch ? parseInt(widthMatch[1]) : 0;
  }

  /**
   * Wait for progress bar to reach or exceed a specific value
   */
  async waitForProgress(targetValue: number, timeout: number = 30000) {
    await this.page.waitForFunction(
      ({ selector, target }) => {
        const progressBar = document.querySelector(selector);
        if (!progressBar) return false;
        const currentValue = parseInt(progressBar.getAttribute("aria-valuenow") || "0");
        return currentValue === target;
      },
      { selector: "#progressBar", target: targetValue },
      { timeout }
    );
  }

  /**
   * Get the result text from the result label
   */
  async getResultText() {
    return await this.resultLabel.textContent();
  }

  /**
   * Parse the result to extract the difference value and duration
   */
  async getResultData() {
    const resultText = await this.getResultText();
    if (!resultText) return { difference: null, duration: null };

    // Parse "Result: -2, duration: 3456" format
    const match = resultText.match(/Result:\s*([^,]+),\s*duration:\s*(.+)/);
    if (!match) return { difference: null, duration: null };

    const difference = match[1] === "n/a" ? null : parseInt(match[1]);
    const duration = match[2] === "n/a" ? null : parseInt(match[2]);

    return { difference, duration };
  }

  /**
   * Get page title text
   */
  async getPageTitle() {
    return await this.pageTitle.textContent();
  }

  /**
   * Wait for page to be fully loaded
   */
  async waitForPageToLoad() {
    await this.startButton.waitFor({ state: "visible" });
    await this.stopButton.waitFor({ state: "visible" });
    await this.progressBar.waitFor({ state: "visible" });
    await this.resultLabel.waitFor({ state: "visible" });
  }

  /**
   * Get initial progress bar state (should be 25%)
   */
  async getInitialProgress() {
    return await this.getProgressValue();
  }
}
