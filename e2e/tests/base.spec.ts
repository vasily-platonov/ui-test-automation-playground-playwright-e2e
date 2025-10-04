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
});
