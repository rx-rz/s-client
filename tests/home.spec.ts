import { createRoute } from "@/lib";
import { api } from "@/lib/axios";
import { GetRoomTypesResponse } from "@/types/roomtype.types";
import { test, expect } from "@playwright/test";

test("has title", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveTitle(/Bliss/);
});

test("has room types", async ({ page }) => {
  await page.goto("/");
  const response: GetRoomTypesResponse = await api.get(
    createRoute({
      prefix: "roomtypes",
      route: "/getRoomTypesForHomePage",
    })
  );
  const roomTypes = response.roomTypes;
  if (response.isSuccess && roomTypes.length > 0) {
    await expect(page.getByText(roomTypes[0].name)).toBeVisible();
  }
});
