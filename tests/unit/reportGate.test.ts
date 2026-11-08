// @vitest-environment jsdom
import { createElement } from "react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { ReportGate } from "../../src/components/tools/ReportGate";
import { ANALYTICS } from "../../src/lib/analytics";

vi.mock("@/lib/analytics", () => ({
  ANALYTICS: { toolReportRequested: vi.fn() },
}));

const fetchMock = vi.fn();

const renderGate = () =>
  render(
    createElement(ReportGate, {
      tool: "roi-calculator",
      title: "See the full financial breakdown",
      description: "Enter your email.",
      summary: { "3-year ROI": "412%" },
      children: createElement("p", null, "Full breakdown"),
    })
  );

const trapInput = (container: HTMLElement): HTMLInputElement => {
  const input = container.querySelector<HTMLInputElement>('input[name="contactCheck"]');
  if (!input) throw new Error("bot trap field not rendered");
  return input;
};

const submitWith = async (container: HTMLElement): Promise<Record<string, unknown>> => {
  fireEvent.change(screen.getByLabelText(/email address/i), {
    target: { value: "visitor@example.com" },
  });
  fireEvent.submit(container.querySelector("form") as HTMLFormElement);
  await waitFor(() => expect(fetchMock).toHaveBeenCalledTimes(1));
  const [, init] = fetchMock.mock.calls[0] as [string, RequestInit];
  return JSON.parse(init.body as string) as Record<string, unknown>;
};

describe("ReportGate bot trap", () => {
  beforeEach(() => {
    vi.mocked(ANALYTICS.toolReportRequested).mockClear();
    fetchMock.mockReset();
    fetchMock.mockResolvedValue(new Response(JSON.stringify({ success: true }), { status: 200 }));
    vi.stubGlobal("fetch", fetchMock);
  });

  afterEach(() => {
    cleanup();
    vi.unstubAllGlobals();
  });

  it("renders the trap out of reach of people and assistive tech", () => {
    const { container } = renderGate();
    const trap = trapInput(container);

    expect(trap.tabIndex).toBe(-1);
    expect(trap.closest('[aria-hidden="true"]')).not.toBeNull();
    // The only field a person can reach is the email address.
    expect(screen.getAllByRole("textbox")).toHaveLength(1);
  });

  it("sends an empty trap value for a real visitor", async () => {
    const { container } = renderGate();

    const body = await submitWith(container);

    expect(body).toMatchObject({ email: "visitor@example.com", contactCheck: "" });
    await waitFor(() =>
      expect(ANALYTICS.toolReportRequested).toHaveBeenCalledWith("roi-calculator")
    );
  });

  it("forwards whatever a bot typed into the trap", async () => {
    const { container } = renderGate();
    fireEvent.change(trapInput(container), { target: { value: "https://spam.example" } });

    const body = await submitWith(container);

    expect(body.contactCheck).toBe("https://spam.example");
    // The gate still unlocks (the bot must see success), but it is no conversion.
    await screen.findByText("Full breakdown");
    expect(ANALYTICS.toolReportRequested).not.toHaveBeenCalled();
  });
});
