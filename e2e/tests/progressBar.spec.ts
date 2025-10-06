import { test, expect } from "@playwright/test";
import { ProgressBarPage } from "../pages/progressBarPage";

let progressBarPage: ProgressBarPage;
const targetProgress = 75;

test.beforeEach(async ({ page }) => {
  progressBarPage = new ProgressBarPage(page);
  await progressBarPage.goto();
});

test.describe("Progress Bar tests", { tag: "@progressbar" }, () => {
  test("should load page successfully", async ({ page }) => {
    // Verify URL and page title
    await expect(page).toHaveURL(/\/progressbar$/);
    await expect(progressBarPage.pageTitle).toContainText("Progress Bar");

    // Wait for page to be fully loaded
    await progressBarPage.waitForPageToLoad();
  });

  test("should display elements in initial state", async () => {
    await progressBarPage.waitForPageToLoad();

    // Verify all elements are visible
    await expect(progressBarPage.startButton).toBeVisible();
    await expect(progressBarPage.stopButton).toBeVisible();
    await expect(progressBarPage.progressContainer).toBeVisible();
    await expect(progressBarPage.progressBar).toBeVisible();
    await expect(progressBarPage.resultLabel).toBeVisible();

    // Verify buttons are enabled
    await expect(progressBarPage.startButton).toBeEnabled();
    await expect(progressBarPage.stopButton).toBeEnabled();

    // Verify initial result state
    const resultText = await progressBarPage.getResultText();
    expect(resultText).toContain("Result: n/a");
  });

  test("should verify Start and Stop buttons work regardless of result", async () => {
    const initialProgress = await progressBarPage.getProgressValue();
    // Test Start button functionality
    await progressBarPage.clickStart();

    // Wait a moment for progress to begin
    await progressBarPage.page.waitForTimeout(1500);

    // Test Stop button functionality
    await progressBarPage.clickStop();

    // Verify progress has started
    const progressAfterStart = await progressBarPage.getProgressValue();
    expect(progressAfterStart).toBeGreaterThan(initialProgress);

    // Verify result has been updated
    const resultAfterStop = await progressBarPage.getResultText();
    expect(resultAfterStop).not.toContain("Result: n/a");
    expect(resultAfterStop).not.toContain("duration: n/a");

    // Verify we can parse the result data
    const resultData = await progressBarPage.getResultData();
    expect(resultData.difference).not.toBeNull();
    expect(resultData.duration).not.toBeNull();
  });

  test("should use playwright .toPass assertion to wait for target progress", { tag: "@mainScenario" }, async () => {
    // Start the progress
    await progressBarPage.clickStart();

    // Use expect.toPass to wait for 75% progress instead of POM method
    await expect(async () => {
      const currentProgress = await progressBarPage.getProgressValue();
      expect(currentProgress).toBeGreaterThanOrEqual(targetProgress);
    }).toPass({ timeout: 25000 });

    // Click stop immediately after reaching target
    await progressBarPage.clickStop();

    // Get the actual stopped value
    const finalProgress = await progressBarPage.getProgressValue();
    const resultData = await progressBarPage.getResultData();

    // Evaluate results
    console.log(
      `Target: ${targetProgress}%, Actual: ${finalProgress}%, Difference: ${resultData.difference}, Duration: ${resultData.duration}ms`
    );

    // Verify we stopped at or after target
    expect(finalProgress).toBeGreaterThanOrEqual(targetProgress);

    // Verify the result calculation is correct
    const expectedDifference = finalProgress - targetProgress;
    expect(resultData.difference).toBe(expectedDifference);

    // Verify duration was recorded
    expect(resultData.duration).toBeGreaterThan(0);

    // Verify result text contains the correct values
    const resultText = await progressBarPage.getResultText();
    expect(resultText).toContain(`Result: ${expectedDifference}`);
    expect(resultText).toContain(`duration: ${resultData.duration}`);

    // Assess accuracy (closer to 0 difference is better)
    // This is the main challenge - how precise can we be?
    const accuracy = Math.abs(expectedDifference);
    console.log(`Timing accuracy: ${accuracy} points off target`);

    // Log performance assessment
    if (accuracy === 0) {
      console.log("🎯 Perfect accuracy - stopped exactly at target!");
    } else if (accuracy <= 2) {
      console.log("🟢 Excellent timing - within 2% of target");
    } else if (accuracy <= 5) {
      console.log("🟡 Good timing - within 5% of target");
    } else {
      console.log("🔴 Timing needs improvement - more than 5% off target");
    }
  });

  test("should use POM waitForProgress method to wait for target progress", { tag: "@mainScenario" }, async () => {
    // Start the progress
    await progressBarPage.clickStart();

    // Use POM waitForProgress method to wait for specific target
    await progressBarPage.waitForProgress(targetProgress);

    // Click stop immediately after reaching target
    await progressBarPage.clickStop();

    // Get the actual stopped value
    const finalProgress = await progressBarPage.getProgressValue();
    const resultData = await progressBarPage.getResultData();

    // Evaluate results
    console.log(
      `Target: ${targetProgress}%, Actual: ${finalProgress}%, Difference: ${resultData.difference}, Duration: ${resultData.duration}ms`
    );

    // Verify we stopped at or after target
    expect(finalProgress).toBeGreaterThanOrEqual(targetProgress);

    // Verify the result calculation is correct
    const expectedDifference = finalProgress - targetProgress;
    expect(resultData.difference).toBe(expectedDifference);

    // Verify duration was recorded
    expect(resultData.duration).toBeGreaterThan(0);

    // Verify result text contains the correct values
    const resultText = await progressBarPage.getResultText();
    expect(resultText).toContain(`Result: ${expectedDifference}`);
    expect(resultText).toContain(`duration: ${resultData.duration}`);

    // Assess accuracy (closer to 0 difference is better)
    // This is the main challenge - how precise can we be?
    const accuracy = Math.abs(expectedDifference);
    console.log(`Timing accuracy: ${accuracy} points off target`);

    // Log performance assessment
    if (accuracy === 0) {
      console.log("🎯 Perfect accuracy - stopped exactly at target!");
    } else if (accuracy <= 2) {
      console.log("🟢 Excellent timing - within 2% of target");
    } else if (accuracy <= 5) {
      console.log("🟡 Good timing - within 5% of target");
    } else {
      console.log("🔴 Timing needs improvement - more than 5% off target");
    }
  });

  test("should verify progress text and width synchronization", async () => {
    await progressBarPage.clickStart();
    await progressBarPage.page.waitForTimeout(2500);
    await progressBarPage.clickStop();

    // Get all three progress representations
    const progressValue = await progressBarPage.getProgressValue();
    const progressText = await progressBarPage.getProgressText();
    const progressWidth = await progressBarPage.getProgressWidth();

    // Verify they are all synchronized
    expect(progressText).toBe(`${progressValue}%`);
    expect(progressWidth).toBe(progressValue);

    // Verify the text content matches aria-valuenow
    const ariaValue = await progressBarPage.progressBar.getAttribute("aria-valuenow");
    expect(parseInt(ariaValue || "0")).toBe(progressValue);
  });
});
