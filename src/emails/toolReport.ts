import { escapeHtml, layout } from '@/lib/email';

export type ToolSlug = 'roi-calculator' | 'ai-readiness';

export interface ToolReport {
  email: string;
  tool: ToolSlug;
  summary: Record<string, string | number>;
  recommendations?: string[];
}

export const TOOL_LABELS: Record<ToolSlug, string> = {
  'roi-calculator': 'AI ROI Calculator',
  'ai-readiness': 'AI Readiness Assessment',
};

function renderSummaryRows(summary: ToolReport['summary']): string {
  return Object.entries(summary)
    .map(
      ([key, value]) => `
          <div class="field">
            <div class="label">${escapeHtml(key)}</div>
            <div class="value">${escapeHtml(String(value))}</div>
          </div>`
    )
    .join('');
}

function renderRecommendations(recommendations: string[]): string {
  if (recommendations.length === 0) {
    return '';
  }

  const items = recommendations
    .map((recommendation) => `<li>${escapeHtml(recommendation)}</li>`)
    .join('');

  return `
          <div class="field">
            <div class="label">Where to focus next</div>
            <div class="value">
              <ul style="margin: 0; padding-left: 20px;">${items}</ul>
            </div>
          </div>`;
}

/** What the visitor asked for. Failing to send it fails their request. */
export function buildVisitorReport(report: ToolReport): string {
  const toolLabel = TOOL_LABELS[report.tool];

  return layout({
    title: `Your ${toolLabel} results`,
    body: `
          <p>Thanks for using the ${escapeHtml(toolLabel)}. Here is a copy of the results you saw, so you can keep them or share them internally.</p>
          ${renderSummaryRows(report.summary)}
          ${renderRecommendations(report.recommendations ?? [])}
          <p>These figures come from the answers you entered. They are a planning aid, not a forecast.</p>
          <p style="text-align: center;">
            <a href="https://vivancedata.com/contact" class="button">Talk to a consultant</a>
          </p>
          <div class="footer">
            <p>VivanceData</p>
            <p>https://vivancedata.com</p>
          </div>`,
  });
}

/**
 * The lead. The visitor already has their report, so this is courtesy -- but a
 * dropped one is a lost lead, which is why its failure is logged with the
 * address attached.
 */
export function buildLeadNotification(report: ToolReport): string {
  const toolLabel = TOOL_LABELS[report.tool];
  const safeEmail = escapeHtml(report.email);

  return layout({
    title: `New ${toolLabel} lead`,
    body: `
          <div class="field">
            <div class="label">Email</div>
            <div class="value"><a href="mailto:${safeEmail}">${safeEmail}</a></div>
          </div>
          <div class="field">
            <div class="label">Tool</div>
            <div class="value">${escapeHtml(toolLabel)}</div>
          </div>
          ${renderSummaryRows(report.summary)}
          ${renderRecommendations(report.recommendations ?? [])}
          <p style="color: #6b7280; font-size: 12px; margin-top: 20px;">
            Submitted at ${new Date().toLocaleString('en-US', { timeZone: 'America/Los_Angeles' })} PST
          </p>`,
  });
}
