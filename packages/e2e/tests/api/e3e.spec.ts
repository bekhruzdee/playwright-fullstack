import { test, expect } from "@playwright/test";
test.describe("API Endpoint Tests", () => {
  test("GET /users returns an array", async ({ request }) => {
    const response = await request.get("/users");
    expect(response.ok()).toBeTruthy();
    const data = await response.json();
    expect(Array.isArray(data)).toBeTruthy();
  });
});
