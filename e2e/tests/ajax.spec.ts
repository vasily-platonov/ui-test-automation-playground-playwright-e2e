import { test, expect } from "@playwright/test";
import { AjaxPage } from "../pages/ajaxPage";

test.describe("Ajax Page Tests", { tag: "@ajax" }, () => {
  let ajaxPage: AjaxPage;

  test.beforeEach(async ({ page }) => {
    ajaxPage = new AjaxPage(page);
    await ajaxPage.goto();
  });

  test("should load ajax page with correct components", async () => {
    // Verify page title
    await expect(ajaxPage.title).toContainText("AJAX Data");

    // Verify button is present and enabled
    await expect(ajaxPage.ajaxButton).toBeVisible();
    await expect(ajaxPage.ajaxButton).toBeEnabled();

    // Verify content div is initially empty
    await expect(ajaxPage.contentDiv).toBeEmpty();

    // Verify spinner is not visible initially
    await expect(ajaxPage.spinner).not.toBeVisible();
  });

  test("should trigger ajax request and load content", { tag: "@mainScenario" }, async () => {
    // Click the AJAX button
    await ajaxPage.clickAjaxButton();

    // Verify content appears
    await expect(ajaxPage.loadedLabel).toBeVisible({ timeout: 20000 });
    await expect(ajaxPage.loadedLabel).toHaveText(/Data loaded with AJAX get request./);

    // Click on the loaded label
    await ajaxPage.loadedLabel.click();

    // Verify content div is no longer empty
    await expect(ajaxPage.contentDiv).not.toBeEmpty();
  });

  test("should show spinner during ajax request", async () => {
    // Initially spinner should not be visible
    await expect(ajaxPage.spinner).not.toBeVisible();

    // Click AJAX button
    await ajaxPage.clickAjaxButton();

    // Verify spinner appears (might be brief, but should appear)
    await expect(ajaxPage.spinner).toBeVisible();

    // Eventually content should load and spinner should disappear
    await expect(ajaxPage.loadedLabel).toBeVisible({ timeout: 20000 });
    await expect(ajaxPage.spinner).not.toBeVisible();
  });
});
