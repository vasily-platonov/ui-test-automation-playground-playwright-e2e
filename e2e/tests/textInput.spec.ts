import { test, expect } from "@playwright/test";
import { TextInputPage } from "../pages/textInputPage";

let textInputPage: TextInputPage;

test.beforeEach(async ({ page }) => {
  textInputPage = new TextInputPage(page);
  await textInputPage.goto();
});

test.describe("Text Input tests", { tag: "@textinput" }, () => {
  test("should navigate to Text Input page successfully", async ({ page }) => {
    // Verify URL and page title
    await expect(page).toHaveURL(/\/textinput$/);
    await expect(textInputPage.pageTitle).toContainText("Text Input");
  });

  test("should display all page elements correctly", async () => {
    // Verify page content is visible
    await expect(textInputPage.pageTitle).toBeVisible();
    await expect(textInputPage.pageDescription).toBeVisible();

    // Verify form elements are present and functional
    await expect(textInputPage.form).toBeVisible();
    await expect(textInputPage.inputLabel).toBeVisible();
    await expect(textInputPage.textInput).toBeVisible();
    await expect(textInputPage.updatingButton).toBeVisible();

    // Verify elements are enabled
    await expect(textInputPage.textInput).toBeEnabled();
    await expect(textInputPage.updatingButton).toBeEnabled();
  });

  test("should display correct initial state", async () => {
    // Verify placeholder text
    expect(await textInputPage.getInputPlaceholder()).toBe("MyButton");

    // Verify initial input is empty
    expect(await textInputPage.getInputValue()).toBe("");

    // Verify initial button text exists
    const initialButtonText = await textInputPage.getButtonText();
    expect(initialButtonText).toBeTruthy();
    expect(initialButtonText).toContain("Button That Should Change");
  });

  test("should fill text input using DOM fill method", async () => {
    const testText = "Custom Button Name";

    await textInputPage.fillTextInput(testText);

    // Verify input value was set correctly
    expect(await textInputPage.getInputValue()).toBe(testText);
  });

  test("should type text input using keyboard simulation", async () => {
    const testText = "Keyboard Input Test";

    await textInputPage.typeIntoInput(testText);

    // Verify input value was set correctly
    expect(await textInputPage.getInputValue()).toBe(testText);
  });

  test("should clear text input field", async () => {
    // First add some text
    await textInputPage.fillTextInput("Some text to clear");
    expect(await textInputPage.getInputValue()).toBe("Some text to clear");

    // Clear the input
    await textInputPage.clearTextInput();
    expect(await textInputPage.getInputValue()).toBe("");
  });

  test("should update button text when using DOM fill method", async () => {
    const newButtonName = "Updated Button DOM";
    const initialButtonText = await textInputPage.getButtonText();

    // Fill input and click button
    await textInputPage.fillTextInput(newButtonName);
    await textInputPage.clickUpdatingButton();

    const updatedButtonText = await textInputPage.getButtonText();

    expect(updatedButtonText).toBe(newButtonName);
    expect(updatedButtonText).not.toBe(initialButtonText);
  });

  test("should update button text when using keyboard input method", async () => {
    const newButtonName = "Updated Button Keyboard";
    const initialButtonText = await textInputPage.getButtonText();

    // Type input and click button
    await textInputPage.typeIntoInput(newButtonName);
    await textInputPage.clickUpdatingButton();

    const updatedButtonText = await textInputPage.getButtonText();

    expect(updatedButtonText).toBe(newButtonName);
    expect(updatedButtonText).not.toBe(initialButtonText);
  });

  test("should handle multiple button text updates", async () => {
    const firstButtonName = "First Update";
    const secondButtonName = "Second Update";

    // First update
    await textInputPage.fillTextInput(firstButtonName);
    await textInputPage.clickUpdatingButton();
    expect(await textInputPage.getButtonText()).toBe(firstButtonName);

    // Clear and second update
    await textInputPage.clearTextInput();
    await textInputPage.typeIntoInput(secondButtonName);
    await textInputPage.clickUpdatingButton();
    expect(await textInputPage.getButtonText()).toBe(secondButtonName);
  });

  test("should handle empty input - button text should not change", async () => {
    const initialButtonText = await textInputPage.getButtonText();

    // Click button without entering any text
    await textInputPage.clickUpdatingButton();

    // Verify button text remained unchanged
    const buttonTextAfterClick = await textInputPage.getButtonText();
    expect(buttonTextAfterClick).toBe(initialButtonText);
  });

  test("should handle special characters in button name", async () => {
    const specialButtonName = "Special!@#$%^&*()_+{}[]";
    const initialButtonText = await textInputPage.getButtonText();

    await textInputPage.fillTextInput(specialButtonName);
    await textInputPage.clickUpdatingButton();

    const updatedButtonText = await textInputPage.getButtonText();

    expect(updatedButtonText).toBe(specialButtonName);
    expect(updatedButtonText).not.toBe(initialButtonText);
  });

  test("should handle long text input for button name", async () => {
    const longButtonName =
      "This is a very long button name that tests how the application handles extended text input for the button text update functionality";
    const initialButtonText = await textInputPage.getButtonText();

    await textInputPage.typeIntoInput(longButtonName);
    await textInputPage.clickUpdatingButton();

    const updatedButtonText = await textInputPage.getButtonText();

    expect(updatedButtonText).toBe(longButtonName);
    expect(updatedButtonText).not.toBe(initialButtonText);
  });

  test("should handle rapid successive inputs correctly", async () => {
    const finalText = "Final Text";

    // Rapidly type different values
    await textInputPage.fillTextInput("First");
    await textInputPage.fillTextInput("Second");
    await textInputPage.fillTextInput("Third");
    await textInputPage.fillTextInput(finalText);

    // Click button once
    await textInputPage.clickUpdatingButton();

    // Verify final result
    expect(await textInputPage.getButtonText()).toBe(finalText);
    expect(await textInputPage.getInputValue()).toBe(finalText);
  });
});
