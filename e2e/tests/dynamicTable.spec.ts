import { test, expect } from "@playwright/test";
import { DynamicTablePage } from "../pages/dynamicTablePage";

let dynamicTablePage: DynamicTablePage;

test.beforeEach(async ({ page }) => {
  dynamicTablePage = new DynamicTablePage(page);
  await dynamicTablePage.goto();
});

test.describe("Dynamic Table tests", { tag: "@dynamictable" }, () => {
  test("should navigate to Dynamic Table page successfully", async ({ page }) => {
    // Verify URL and page title
    await expect(page).toHaveURL(/\/dynamictable$/);
    await expect(dynamicTablePage.pageTitle).toContainText("Dynamic Table");
  });

  test("should display table with proper ARIA structure", async ({ page }) => {
    await dynamicTablePage.waitForTableToLoad();

    // Verify table structure exists and is visible
    await expect(dynamicTablePage.table).toBeVisible();
    expect(await dynamicTablePage.tableHeaders.count()).toBeGreaterThan(0);
    expect(await dynamicTablePage.tableRows.count()).toBeGreaterThan(0);
    expect(await dynamicTablePage.tableCells.count()).toBeGreaterThan(0);

    // Verify ARIA attributes are present
    await expect(dynamicTablePage.table).toHaveAttribute("role", "table");
    await expect(dynamicTablePage.tableHeaders.first()).toHaveAttribute("role", "columnheader");
    await expect(dynamicTablePage.tableCells.first()).toHaveAttribute("role", "cell");
  });

  test("should have table description", async ({ page }) => {
    const description = await dynamicTablePage.getTableDescription();
    expect(description).toBeTruthy();
    expect(description.length).toBeGreaterThan(0);
  });

  test("should display column headers", async ({ page }) => {
    await dynamicTablePage.waitForTableToLoad();

    const headers = await dynamicTablePage.getColumnHeaders();

    // Verify we have headers
    expect(headers).toBeDefined();
    expect(headers.length).toBeGreaterThan(0);

    // Verify expected column types exist
    const headerText = headers.join(" ").toLowerCase();
    expect(headerText).toContain("name");
    expect(headerText).toContain("cpu");
  });

  test("should find Chrome process in table", async ({ page }) => {
    await dynamicTablePage.waitForTableToLoad();

    // This should not throw an error if Chrome process exists
    const chromeRow = await dynamicTablePage.getRowByProcessName("Chrome");

    expect(chromeRow).toBeDefined();
    expect(chromeRow.length).toBeGreaterThan(0);

    // Verify the row contains "Chrome" (case-insensitive)
    const rowText = chromeRow.join(" ").toLowerCase();
    expect(rowText).toContain("chrome");
  });

  test("should extract Chrome CPU value from table", async ({ page }) => {
    await dynamicTablePage.waitForTableToLoad();

    const chromeCpuValue = await dynamicTablePage.getCpuValueForProcess("Chrome");

    expect(chromeCpuValue).toBeDefined();
    expect(chromeCpuValue).not.toBe("");

    // CPU value should contain percentage or numeric value
    expect(chromeCpuValue).toMatch(/[\d.%]+/);
  });

  test("should display Chrome CPU warning label", async ({ page }) => {
    // Verify warning label is visible
    await expect(dynamicTablePage.chromeCpuLabel).toBeVisible();
    await expect(dynamicTablePage.chromeCpuLabel).toHaveClass(/bg-warning/);

    const labelText = await dynamicTablePage.chromeCpuLabel.textContent();
    expect(labelText).toContain("Chrome CPU:");
  });

  test("Chrome CPU value in table should equal value in warning label", async ({ page }) => {
    await dynamicTablePage.waitForTableToLoad();

    const comparison = await dynamicTablePage.compareChromeCpuValues();

    // Verify comparison object structure
    expect(comparison).toHaveProperty("tableValue");
    expect(comparison).toHaveProperty("labelValue");

    // Verify both values exist
    expect(comparison.tableValue).toBeDefined();
    expect(comparison.tableValue).not.toBe("");
    expect(comparison.labelValue).toBeDefined();
    expect(comparison.labelValue).not.toBe("");

    // Main assertion: Chrome CPU values should match
    expect(comparison.tableValue).toBe(comparison.labelValue);
  });
});
