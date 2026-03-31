/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import type { ReactElement } from "react";

type HeadingAlign = "left" | "center" | "right";

interface SectionHeadingProps {
  readonly eyebrow: string;
  readonly title: string;
  readonly description?: string;
  readonly align?: HeadingAlign;
  readonly className?: string;
  readonly descriptionClassName?: string;
}

const ALIGNMENT_CLASS: Record<HeadingAlign, string> = {
  left: "text-left",
  center: "text-center",
  right: "text-right",
};

function joinClasses(...classes: Array<string | undefined>): string {
  return classes.filter(Boolean).join(" ");
}

export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className,
  descriptionClassName,
}: SectionHeadingProps): ReactElement {
  return (
    <div className={joinClasses(ALIGNMENT_CLASS[align], className)}>
      {/* Space Mono eyebrow with accent underscore line */}
      <div className={joinClasses("flex items-center gap-3 mb-5", align === "center" ? "justify-center" : "")}>
        <span className="w-5 h-px bg-teal shrink-0" />
        <span className="font-mono text-teal text-[11px] tracking-[0.25em] uppercase">{eyebrow}</span>
      </div>
      <h3 className="font-headline text-4xl md:text-5xl font-bold tracking-tight leading-[1.05]">{title}</h3>
      {description ? (
        <p className={joinClasses("text-text-muted mt-4 leading-relaxed", descriptionClassName)}>{description}</p>
      ) : null}
    </div>
  );
}
