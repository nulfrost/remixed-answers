import { test, expect } from "@playwright/test";

test("testing", async ({ page }) => {
  await page.goto("/login");

  await expect(
    page.getByRole("heading", { name: /Remixed Answers/i })
  ).toBeInViewport();
});
