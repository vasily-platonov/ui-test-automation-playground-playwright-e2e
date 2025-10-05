import { test, expect } from "@playwright/test";
import { HomePage } from "../pages/homePage";

let homePage: HomePage;

test.beforeEach(async ({ page }) => {
  homePage = new HomePage(page);
});

test.describe("Homepage tests", { tag: "@homepage" }, () => {
  test("has title", async ({ page }) => {
    await homePage.goto();

    // Expect a title "to contain" a substring.
    await expect(page).toHaveTitle(/UI Test Automation Playground/);
  });

  test("Homepage testing links are present", async ({ page }) => {
    await homePage.goto();

    // Verify correct number of test links
    const links = homePage.getAllTestLinks();

    // Verify each link is visible
    for (const link of links) {
      await expect(link).toBeVisible();
    }
  });

  test("AJAX Data link navigates correctly", async ({ page }) => {
    await homePage.goto();
    await homePage.goToAjaxData();

    // Verify we're on the AJAX page
    await expect(page).toHaveURL(/\/ajax$/);
    await expect(page.locator("h3")).toContainText("AJAX Data");
  });

  test("Text Input link navigates correctly", async ({ page }) => {
    await homePage.goto();
    await homePage.goToTextInput();

    // Verify we're on the Text Input page
    await expect(page).toHaveURL(/\/textinput$/);
    await expect(page.locator("h3")).toContainText("Text Input");
  });

  test("Dynamic Table link navigates correctly", async ({ page }) => {
    await homePage.goto();
    await homePage.goToDynamicTable();

    // Verify we're on the Dynamic Table page
    await expect(page).toHaveURL(/\/dynamictable$/);
    await expect(page.locator("h3")).toContainText("Dynamic Table");
  });

  test("Progress Bar link navigates correctly", async ({ page }) => {
    await homePage.goto();
    await homePage.goToProgressBar();

    // Verify we're on the Progress Bar page
    await expect(page).toHaveURL(/\/progressbar$/);
    await expect(page.locator("h3")).toContainText("Progress Bar");
  });

  test("Visibility link navigates correctly", async ({ page }) => {
    await homePage.goto();
    await homePage.goToVisibility();

    // Verify we're on the Visibility page
    await expect(page).toHaveURL(/\/visibility$/);
    await expect(page.locator("h3")).toContainText("Visibility");
  });

  test("Sample App link navigates correctly", async ({ page }) => {
    await homePage.goto();
    await homePage.goToSampleApp();

    // Verify we're on the Sample App page
    await expect(page).toHaveURL(/\/sampleapp$/);
    await expect(page.locator("h3")).toContainText("Sample App");
  });

  test("Overlapped Element link navigates correctly", async ({ page }) => {
    await homePage.goto();
    await homePage.goToOverlappedElement();

    // Verify we're on the Overlapped Element page
    await expect(page).toHaveURL(/\/overlapped$/);
    await expect(page.locator("h3")).toContainText("Overlapped Element");
  });
});
