import Image from "next/image";
import type { Specimen as SpecimenData } from "@/constants/specimens";
import { AnimateOnScroll } from "@/hooks/useAnimateOnScroll";
import { wallLabel } from "@/components/common/controls";

interface SpecimenProps {
  specimen: SpecimenData;
  /**
   * Set on the one specimen above the fold so it is not lazy-loaded. Exactly
   * one per route, or the priority means nothing.
   */
  priority?: boolean;
  className?: string;
}

/**
 * A photograph of the paperwork a build starts from.
 *
 * This is the site's entire image system. The composition is doing one job:
 * putting a cream document on a near-black ground so it reads as a lit object
 * on a desk at ten at night, which is what `nightshift` has always been a
 * description of. The ground does the work, so the frame is a hairline and
 * nothing else — no shadow, no rounding, no tilt. A drop shadow under a
 * photograph of paper is a second decorative system, and the design system
 * names that as the specific failure it guards against.
 *
 * The wall label and caption are not decoration either. `Sample` is the same
 * mono label the night-log records carry, and it is load-bearing: the data on
 * these documents is invented, in the same register as the live demos, and a
 * reader has to be able to tell that at a glance rather than by inference.
 *
 * The caption is the `alt` text. Writing them separately produces two
 * descriptions that drift, and the sighted reader's caption is almost always
 * the better sentence — so there is one sentence, and it is used twice.
 */
export function Specimen({ specimen, priority = false, className = "" }: SpecimenProps) {
  return (
    <AnimateOnScroll variant="settle" className={className}>
      <figure className="flex flex-col">
        <p className={`${wallLabel} mb-md`}>{specimen.label}</p>

        {/* Hairline, square, flush. The document supplies the only warmth on
          * the page and does not need help from a frame. */}
        <div className="relative overflow-hidden border border-rule bg-muted">
          <Image
            src={`/${specimen.src}`}
            alt={specimen.caption}
            width={1200}
            height={900}
            priority={priority}
            sizes="(min-width: 1024px) 46vw, 100vw"
            className="h-auto w-full object-cover"
          />
        </div>

        <figcaption className="mt-md max-w-[52ch] text-body-sm text-muted-foreground">
          {specimen.caption}
        </figcaption>
      </figure>
    </AnimateOnScroll>
  );
}
