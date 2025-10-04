import { Page, Locator } from "@playwright/test";

export class HomePage {
  readonly page: Page;

  // Navigation links to test scenarios
  readonly ajaxDataLink: Locator;
  readonly textInputLink: Locator;
  readonly dynamicTableLink: Locator;
  readonly progressBarLink: Locator;
  readonly visibilityLink: Locator;
  readonly sampleAppLink: Locator;
  readonly overlappedElementLink: Locator;

  constructor(page: Page) {
    this.page = page;

    // Navigation links - using href attributes for more reliable selection
    this.ajaxDataLink = page.locator('a[href="/ajax"]');
    this.textInputLink = page.locator('a[href="/textinput"]');
    this.dynamicTableLink = page.locator('a[href="/dynamictable"]');
    this.progressBarLink = page.locator('a[href="/progressbar"]');
    this.visibilityLink = page.locator('a[href="/visibility"]');
    this.sampleAppLink = page.locator('a[href="/sampleapp"]');
    this.overlappedElementLink = page.locator('a[href="/overlapped"]');
  }

  /**
   * Navigate to the home page
   */
  async goto() {
    await this.page.goto("/");
  }

  /**
   * Navigate to AJAX Data test page
   */
  async goToAjaxData() {
    await this.ajaxDataLink.click();
  }

  /**
   * Navigate to Text Input test page
   */
  async goToTextInput() {
    await this.textInputLink.click();
  }

  /**
   * Navigate to Dynamic Table test page
   */
  async goToDynamicTable() {
    await this.dynamicTableLink.click();
  }

  /**
   * Navigate to Progress Bar test page
   */
  async goToProgressBar() {
    await this.progressBarLink.click();
  }

  /**
   * Navigate to Visibility test page
   */
  async goToVisibility() {
    await this.visibilityLink.click();
  }

  /**
   * Navigate to Sample App test page
   */
  async goToSampleApp() {
    await this.sampleAppLink.click();
  }

  /**
   * Navigate to Overlapped Element test page
   */
  async goToOverlappedElement() {
    await this.overlappedElementLink.click();
  }

  /**
   * Get all test scenario links (useful for verification)
   */
  getAllTestLinks(): Locator[] {
    return [
      this.ajaxDataLink,
      this.textInputLink,
      this.dynamicTableLink,
      this.progressBarLink,
      this.visibilityLink,
      this.sampleAppLink,
      this.overlappedElementLink,
    ];
  }
}
