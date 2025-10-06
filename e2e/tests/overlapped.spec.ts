import { test, expect } from "@playwright/test";
import { OverlappedPage } from "../pages/overlappedPage";

test.describe("Overlapped Element Tests", { tag: "@overlapped" }, () => {
  let overlappedPage: OverlappedPage;

  test.beforeEach(async ({ page }) => {
    overlappedPage = new OverlappedPage(page);
    await overlappedPage.goto();
  });

  test("should load overlapped page with correct title", async () => {
    // Verify page title
    await expect(overlappedPage.title).toContainText("Overlapped Element");
  });

  test("should load overlapped page with correct elements", async () => {
    // Verify page title and description
    await expect(overlappedPage.title).toContainText("Overlapped Element");

    // Verify scrollable container is present
    await expect(overlappedPage.scrollableContainer).toBeVisible();
  });

  test("should fill ID input field successfully", async () => {
    const testId = "test-id-123";

    await overlappedPage.fillId(testId);

    // Verify the value was set
    await expect(overlappedPage.idInput).toHaveValue(testId);
  });

  test("should fill name field successfully", { tag: "@mainScenario" }, async () => {
    const testName = "Name Field Test";

    await overlappedPage.fillName(testName);

    // Verify the value was set correctly
    await expect(overlappedPage.nameInput).toHaveValue(testName);

    // Verify the field is no longer overlapped after proper handling
    const isOverlapped = await overlappedPage.isNameInputOverlapped();
    expect(isOverlapped).toBe(false);
  });

  test("should fill id and name fields simultaneously", async () => {
    const testData = {
      id: "user-123",
      name: "Jane Smith",
    };

    // Fill ID field
    await overlappedPage.fillId(testData.id);
    await expect(overlappedPage.idInput).toHaveValue(testData.id);

    // Fill name field
    await overlappedPage.fillName(testData.name);
    await expect(overlappedPage.nameInput).toHaveValue(testData.name);
  });

  test("should clear individual fields", async () => {
    // Fill all fields first
    await overlappedPage.fillId("test-id");
    await overlappedPage.fillName("test-name");

    // Verify all fields have values
    await expect(overlappedPage.idInput).toHaveValue("test-id");
    await expect(overlappedPage.nameInput).toHaveValue("test-name");

    // Clear name field specifically
    await overlappedPage.clearName();
    await expect(overlappedPage.nameInput).toHaveValue("");

    // Clear ID field specifically
    await overlappedPage.clearId();
    await expect(overlappedPage.idInput).toHaveValue("");
  });
});
