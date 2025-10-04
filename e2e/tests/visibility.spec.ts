import { test, expect } from "@playwright/test";
import { VisibilityPage } from "../pages/visibilityPage";

test.describe("Visibility Page Tests", { tag: "@visibility" }, () => {
  let visibilityPage: VisibilityPage;

  test.beforeEach(async ({ page }) => {
    visibilityPage = new VisibilityPage(page);
    await visibilityPage.goto();
  });

  test("should load visibility page with correct title", async () => {
    // Verify page title
    await expect(visibilityPage.title).toContainText("Visibility");
  });

  test("should show Hide button as visible after page load", async () => {
    // Verify Hide button is visible
    await expect(visibilityPage.hideButton).toBeVisible();
  });

  test("should show Removed button as visible after page load", async () => {
    // Verify Removed button is visible
    await expect(visibilityPage.removedButton).toBeVisible();
  });

  test("should show Zero Width button as visible after page load", async () => {
    // Verify Zero Width button is visible
    await expect(visibilityPage.zeroWidthButton).toBeVisible();
  });

  test("should show Overlapped button as visible after page load", async () => {
    // Verify Overlapped button is visible
    await expect(visibilityPage.overlappedButton).toBeVisible();
  });

  test("should show Opacity 0 button as visible after page load", async () => {
    // Verify Transparent button is visible
    await expect(visibilityPage.transparentButton).toBeVisible();
  });

  test("should show Visibility Hidden button as visible after page load", async () => {
    // Verify Invisible button is visible
    await expect(visibilityPage.invisibleButton).toBeVisible();
  });

  test("should show Display None button as visible after page load", async () => {
    // Verify Not Displayed button is visible
    await expect(visibilityPage.notDisplayedButton).toBeVisible();
  });

  test("should show Offscreen button as visible after page load", async () => {
    // Verify Offscreen button is visible
    await expect(visibilityPage.offscreenButton).toBeVisible();
  });

  test("should keep Hide button visible after clicking it", async () => {
    // Click the Hide button
    await visibilityPage.clickHideButton();

    // Verify Hide button is still visible (it doesn't change itself)
    await expect(visibilityPage.hideButton).toBeVisible();
  });

  test("should hide Removed button after clicking Hide button", async () => {
    // Click the Hide button
    await visibilityPage.clickHideButton();

    // Verify Removed button is not visible (removed from DOM)
    await expect(visibilityPage.removedButton).not.toBeVisible();
  });

  test("should hide Zero Width button after clicking Hide button", async () => {
    // Click the Hide button
    await visibilityPage.clickHideButton();

    // Verify Zero Width button is not visible (zero width styling)
    await expect(visibilityPage.zeroWidthButton).not.toBeVisible();
  });

  test("should hide Overlapped button after clicking Hide button", async () => {
    // Click the Hide button
    await visibilityPage.clickHideButton();

    // Verify Overlapped button is not visible (covered by layer)
    await expect(visibilityPage.overlappedButton).not.toBeVisible();
  });

  test("should hide Opacity 0 button after clicking Hide button", async () => {
    // Click the Hide button
    await visibilityPage.clickHideButton();

    // Verify Transparent button is not visible (opacity 0)
    await expect(visibilityPage.transparentButton).not.toBeVisible();
  });

  test("should hide Visibility Hidden button after clicking Hide button", async () => {
    // Click the Hide button
    await visibilityPage.clickHideButton();

    // Verify Invisible button is not visible (visibility hidden)
    await expect(visibilityPage.invisibleButton).not.toBeVisible();
  });

  test("should hide Display None button after clicking Hide button", async () => {
    // Click the Hide button
    await visibilityPage.clickHideButton();

    // Verify Not Displayed button is not visible (display none)
    await expect(visibilityPage.notDisplayedButton).not.toBeVisible();
  });

  test("should hide Offscreen button after clicking Hide button", async () => {
    // Click the Hide button
    await visibilityPage.clickHideButton();

    // Verify Offscreen button is not visible (moved offscreen)
    await expect(visibilityPage.offscreenButton).not.toBeVisible();
  });

  // Screenshot tests for each button after clicking Hide button
  //
  // BASELINE CREATION:
  // Run first time with: npx playwright test visibility.spec.ts --update-snapshots
  // This creates baseline screenshots in test-results folder
  //
  // COMPARISON RUNS:
  // Run normally with: npx playwright test visibility.spec.ts
  // This compares current screenshots against baselines and fails if different
  test("should take screenshot of Hide button after Hide click", async ({ page }) => {
    // Click the Hide button
    await visibilityPage.clickHideButton();

    // Take screenshot of the Hide button area (baseline creation or comparison)
    await expect(visibilityPage.hideButton).toHaveScreenshot("hide-button-after-hide-click.png");
  });

  test("should take screenshot of Removed button area after Hide click", async ({ page }) => {
    // Click the Hide button
    await visibilityPage.clickHideButton();

    // Take screenshot of where the Removed button was (baseline creation or comparison)
    await expect(visibilityPage.removedButton).toHaveScreenshot("removed-button-after-hide-click.png");
  });

  test("should take screenshot of Zero Width button after Hide click", async ({ page }) => {
    // Click the Hide button
    await visibilityPage.clickHideButton();

    // Take screenshot of the Zero Width button (baseline creation or comparison)
    await expect(visibilityPage.zeroWidthButton).toHaveScreenshot("zero-width-button-after-hide-click.png");
  });

  test("should take screenshot of Overlapped button after Hide click", async ({ page }) => {
    // Click the Hide button
    await visibilityPage.clickHideButton();

    // Take screenshot of the Overlapped button area (baseline creation or comparison)
    await expect(visibilityPage.overlappedButton).toHaveScreenshot("overlapped-button-after-hide-click.png");
  });

  test("should take screenshot of Opacity 0 button after Hide click", async ({ page }) => {
    // Click the Hide button
    await visibilityPage.clickHideButton();

    // Take screenshot of the Transparent button (baseline creation or comparison)
    await expect(visibilityPage.transparentButton).toHaveScreenshot("transparent-button-after-hide-click.png");
  });

  test("should take screenshot of Visibility Hidden button after Hide click", async ({ page }) => {
    // Click the Hide button
    await visibilityPage.clickHideButton();

    // Take screenshot of the Invisible button (baseline creation or comparison)
    await expect(visibilityPage.invisibleButton).toHaveScreenshot("invisible-button-after-hide-click.png");
  });

  test("should take screenshot of Display None button after Hide click", async ({ page }) => {
    // Click the Hide button
    await visibilityPage.clickHideButton();

    // Take screenshot of where Display None button was (baseline creation or comparison)
    await expect(visibilityPage.notDisplayedButton).toHaveScreenshot("not-displayed-button-after-hide-click.png");
  });

  test("should take screenshot of Offscreen button after Hide click", async ({ page }) => {
    // Click the Hide button
    await visibilityPage.clickHideButton();

    // Take screenshot of the Offscreen button area (baseline creation or comparison)
    await expect(visibilityPage.offscreenButton).toHaveScreenshot("offscreen-button-after-hide-click.png");
  });
});
