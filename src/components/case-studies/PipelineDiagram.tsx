import React from "react";

/**
 * The case-study pipeline diagram.
 *
 * This replaced a placeholder: four grey rules with right-aligned captions,
 * which read as an unfinished wireframe rather than as a picture of anything.
 * The rules carried no direction, no actors and no hand-offs, so the graphic
 * said strictly less than the prose beside it.
 *
 * What the diagram has to show, because it is what the copy claims:
 *   - the stages, in order, named the way the case study names them;
 *   - who or what performs each one (the `actor` rail on the right);
 *   - what is handed from one stage to the next (the label on the connector);
 *   - the single point where a person approves, drawn as a gate the work
 *     has to cross rather than as one more identical row.
 *
 * Drawn as inline SVG in the existing type and colour language -- hairlines,
 * brand green for the human gate, Geist Mono for the metadata rails. No
 * illustration library and no imagery: the site does not use either.
 *
 * On sizing: the SVG is capped at its intrinsic 440px rather than stretched to
 * the column. Scaling an SVG scales its type with it, so a full-bleed diagram
 * renders 24px stage names on desktop and 9px ones at 390px. Capping keeps
 * desktop at the designed size and costs mobile only ~19%.
 */

export interface PipelineStage {
  /** Stage name. Must match the wording used in the case study copy. */
  name: string;
  /** What happens here, in one short clause. */
  note: string;
  /** Who performs it -- the mono rail down the right-hand side. */
  actor: string;
  /** What this stage hands to the next one. Omitted on the final stage. */
  handoff?: string;
  /** The one stage a person performs. Drawn as a gate, not a row. */
  human?: boolean;
}

export interface Pipeline {
  label: string;
  stages: PipelineStage[];
}

const VB_W = 440;
const ROW_0 = 34;
const ROW_GAP = 76;
const SPINE_X = 18;
const TEXT_X = 36;
const RAIL_X = 422;

export function PipelineDiagram({ pipeline }: { pipeline: Pipeline }): React.ReactElement {
  const { label, stages } = pipeline;
  const vbH = ROW_0 + (stages.length - 1) * ROW_GAP + 46;
  const rowY = (i: number) => ROW_0 + i * ROW_GAP;

  const slug = label.replace(/[^a-zA-Z0-9]+/g, "-").replace(/^-|-$/g, "").toLowerCase();
  const description = stages
    .map((s, i) => `${i + 1}. ${s.name} (${s.actor}): ${s.note}`)
    .join(" ");

  return (
    <div className="flex h-full w-full flex-col border border-border bg-card p-6">
      <div className="eyebrow mb-4">{label}</div>
      <svg
        viewBox={`0 0 ${VB_W} ${vbH}`}
        width={VB_W}
        height={vbH}
        role="img"
        aria-labelledby={`${slug}-t ${slug}-d`}
        className="mx-auto my-auto h-auto w-full max-w-[440px]"
      >
        <title id={`${slug}-t`}>{`${label.replace(/^\/\/\s*/, "")} pipeline`}</title>
        <desc id={`${slug}-d`}>{description}</desc>

        <defs>
          <marker
            id="pipe-arrow"
            viewBox="0 0 8 8"
            refX="4"
            refY="4"
            markerWidth="5"
            markerHeight="5"
            orient="auto-start-reverse"
          >
            <path d="M0 0 L8 4 L0 8 z" className="fill-brand/50" />
          </marker>
        </defs>

        {/* Connectors first, so the markers sit on top of them. */}
        {stages.slice(0, -1).map((stage, i) => (
          <g key={`link-${stage.name}`}>
            <line
              x1={SPINE_X}
              y1={rowY(i) + 10}
              x2={SPINE_X}
              y2={rowY(i + 1) - 12}
              className="stroke-brand/35"
              strokeWidth={1.25}
              markerEnd="url(#pipe-arrow)"
            />
            {stage.handoff ? (
              <text
                x={TEXT_X}
                y={rowY(i) + 48}
                fontSize={10.5}
                letterSpacing="0.04em"
                className="fill-faint font-mono"
              >
                {stage.handoff}
              </text>
            ) : null}
          </g>
        ))}

        {stages.map((stage, i) => {
          const y = rowY(i);
          const last = i === stages.length - 1;
          return (
            <g key={stage.name}>
              {/* The approval gate: the one stage the work stops at for a person. */}
              {stage.human ? (
                <rect
                  x={6}
                  y={y - 19}
                  width={VB_W - 12}
                  height={54}
                  rx={8}
                  className="fill-brand/5 stroke-brand/30"
                  strokeWidth={1}
                />
              ) : null}

              <circle
                cx={SPINE_X}
                cy={y}
                r={stage.human ? 6.5 : 5}
                /* Brand fill marks the human gate and nothing else; the terminal
                   stage is ink, so the two solid dots are not confusable. */
                className={
                  stage.human
                    ? "fill-brand stroke-brand"
                    : last
                      ? "fill-foreground stroke-foreground"
                      : "fill-card stroke-brand"
                }
                strokeWidth={1.5}
              />

              <text x={TEXT_X} y={y + 5} fontSize={16} fontWeight={500} className="fill-foreground">
                {stage.name}
              </text>
              <text x={TEXT_X} y={y + 23} fontSize={12} className="fill-muted-foreground">
                {stage.note}
              </text>
              <text
                x={RAIL_X}
                y={y + 4}
                textAnchor="end"
                fontSize={10.5}
                letterSpacing="0.06em"
                className={stage.human ? "fill-brand font-mono" : "fill-mute font-mono"}
              >
                {stage.actor.toUpperCase()}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}
