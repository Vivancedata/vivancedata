import { describe, expect, it } from "vitest";
import { getProductSlugByID } from "../../src/lib/api";

describe("api helpers", () => {
  it("returns a predictable product slug payload", async () => {
    await expect(getProductSlugByID(42)).resolves.toEqual({
      slug: { current: "product-42" },
    });
  });
});
