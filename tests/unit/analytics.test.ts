import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { ANALYTICS } from "../../src/lib/analytics";

/**
 * `track()` from @vercel/analytics hands each event to `window.va`, the queue
 * the <Analytics /> component installs. Recording calls on `window.va` checks
 * the real package's output shape rather than a mock of our own wrapper.
 */
const va = vi.fn();

describe("analytics", () => {
  beforeEach(() => {
    va.mockReset();
    (window as unknown as { va: unknown }).va = va;
  });

  afterEach(() => {
    delete (window as unknown as { va?: unknown }).va;
  });

  it("records a demo open against the proof category", () => {
    ANALYTICS.demoOpened("Extract a sample delivery slip");

    expect(va).toHaveBeenCalledWith("event", {
      name: "demo_opened",
      data: { category: "proof", label: "Extract a sample delivery slip" },
      options: undefined,
    });
  });

  it("records a contact submission with its service interest", () => {
    ANALYTICS.contactSubmitted("consulting");

    expect(va).toHaveBeenCalledWith(
      "event",
      expect.objectContaining({
        name: "contact_submitted",
        data: { category: "conversion", label: "consulting" },
      })
    );
  });

  it("labels a contact submission with no service interest rather than dropping it", () => {
    ANALYTICS.contactSubmitted(undefined);

    expect(va).toHaveBeenCalledWith(
      "event",
      expect.objectContaining({ data: { category: "conversion", label: "unspecified" } })
    );
  });

  it("records which tool a report was requested from", () => {
    ANALYTICS.toolReportRequested("roi-calculator");

    expect(va).toHaveBeenCalledWith(
      "event",
      expect.objectContaining({
        name: "tool_report_requested",
        data: { category: "conversion", label: "roi-calculator" },
      })
    );
  });

  it("does not depend on cookie consent, because the analytics are cookieless", () => {
    // Nothing is stored for consent here; the event is still recorded.
    ANALYTICS.demoOpened("Triage a sample voicemail");

    expect(va).toHaveBeenCalledTimes(1);
  });

  it("does not throw before the analytics script has installed its queue", () => {
    delete (window as unknown as { va?: unknown }).va;

    expect(() => ANALYTICS.demoOpened("Triage a sample voicemail")).not.toThrow();
  });
});
