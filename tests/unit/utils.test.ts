import { describe, expect, it } from "vitest";
import { cn } from "../../src/lib/utils";

describe("cn", () => {
  it("merges className values and resolves Tailwind conflicts", () => {
    const merged = cn("p-2", "text-sm", undefined, false && "hidden", "p-4");

    expect(merged).toContain("p-4");
    expect(merged).toContain("text-sm");
    expect(merged).not.toContain("p-2");
  });
});
