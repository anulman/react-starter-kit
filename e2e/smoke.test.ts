import { test, expect } from "@playwright/test";

test("landing page renders and theme toggles", async ({ page }) => {
  const errors: string[] = [];
  page.on("pageerror", (err) => errors.push(err.message));

  await page.goto("/");

  // Verify heading
  await expect(page.getByRole("heading", { name: "React Starter Kit" })).toBeVisible();

  // Get initial theme
  const before = await page.locator("html").getAttribute("data-theme");

  // Toggle theme
  await page.getByRole("button", { name: "Toggle Theme" }).click();

  const after = await page.locator("html").getAttribute("data-theme");
  expect(after).not.toBe(before);

  // No console errors
  expect(errors).toEqual([]);
});
