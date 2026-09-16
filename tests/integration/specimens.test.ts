import { describe, it, expect, afterEach } from "vitest";
import fs from "node:fs";
import path from "node:path";
import { specimenFor, specimens } from "@/constants/specimens";

/**
 * The specimen guard is the thing standing between this site and a broken
 * image on the four routes search traffic lands on. It is filesystem-backed on
 * purpose — a specimen cannot be configured into existence — so the test is
 * filesystem-backed too, and lives here beside the blog's own filesystem tests
 * rather than in the jsdom unit suite.
 */

const SPECIMEN_DIR = path.join(process.cwd(), "public", "images", "specimens");
const written: string[] = [];

function writeSpecimenFile(relativeSrc: string): void {
  const filePath = path.join(process.cwd(), "public", relativeSrc);
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, "not a real photograph, just bytes");
  written.push(filePath);
}

afterEach(() => {
  while (written.length > 0) {
    const filePath = written.pop();
    if (filePath && fs.existsSync(filePath)) fs.unlinkSync(filePath);
  }
});

describe("specimenFor", () => {
  it("returns null for a slug that has no specimen defined", () => {
    expect(specimenFor("financial-services")).toBeNull();
  });

  it("returns null when the slug is defined but no photograph exists yet", () => {
    const filePath = path.join(process.cwd(), "public", specimens.construction.src);
    // Guard the guard: this assertion is what makes the next one meaningful.
    expect(fs.existsSync(filePath)).toBe(false);
    expect(specimenFor("construction")).toBeNull();
  });

  it("returns the specimen once a photograph is actually on disk", () => {
    writeSpecimenFile(specimens.logistics.src);

    const specimen = specimenFor("logistics");
    expect(specimen).not.toBeNull();
    expect(specimen?.src).toBe("images/specimens/logistics.jpg");
    expect(specimen?.label).toBe("Sample — delivery slip");
  });

  it("resolves each trade to its own photograph and never another's", () => {
    writeSpecimenFile(specimens["hvac-trades"].src);

    expect(specimenFor("hvac-trades")?.src).toBe("images/specimens/hvac-trades.jpg");
    // A construction page must not fall back to the HVAC photograph. Showing a
    // message pad on a submittal page is worse than showing nothing, because it
    // says nobody looked.
    expect(specimenFor("construction")).toBeNull();
  });
});

describe("the specimen manifest", () => {
  it("covers exactly the four industries the site sells to", () => {
    expect(Object.keys(specimens).sort()).toEqual([
      "construction",
      "hvac-trades",
      "logistics",
      "manufacturing",
    ]);
  });

  it("declares every photograph under the one directory the shot list names", () => {
    for (const specimen of Object.values(specimens)) {
      expect(specimen.src.startsWith("images/specimens/")).toBe(true);
    }
  });

  it("labels every specimen as a sample, because the data on them is invented", () => {
    // The practice is pre-first-client. A document photograph with no sample
    // label reads as a real client's paperwork, which is the one thing these
    // images must never imply.
    for (const specimen of Object.values(specimens)) {
      expect(specimen.label.toLowerCase()).toContain("sample");
    }
  });

  it("gives every specimen a caption that can stand alone as alt text", () => {
    for (const specimen of Object.values(specimens)) {
      expect(specimen.caption.length).toBeGreaterThan(40);
      expect(specimen.caption.trim().endsWith(".")).toBe(true);
    }
  });

  it("keeps the specimen directory present so the shot list has somewhere to land", () => {
    expect(fs.existsSync(SPECIMEN_DIR)).toBe(true);
  });
});
