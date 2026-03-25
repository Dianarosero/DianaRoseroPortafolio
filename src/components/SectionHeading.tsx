/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import type { ReactElement } from 'react';

type HeadingAlign = 'left' | 'center' | 'right';

interface SectionHeadingProps {
  readonly eyebrow: string;
  readonly title: string;
  readonly description?: string;
  readonly align?: HeadingAlign;
  readonly className?: string;
  readonly descriptionClassName?: string;
}

const ALIGNMENT_CLASS: Record<HeadingAlign, string> = {
  left: 'text-left',
  center: 'text-center',
  right: 'text-right',
};

function joinClasses(...classes: Array<string | undefined>): string {
  return classes.filter(Boolean).join(' ');
}

export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'left',
  className,
  descriptionClassName,
}: SectionHeadingProps): ReactElement {
  return (
    <div className={joinClasses(ALIGNMENT_CLASS[align], className)}>
      <h2 className="text-sm font-bold tracking-widest text-primary uppercase mb-4">{eyebrow}</h2>
      <h3 className="text-4xl font-bold">{title}</h3>
      {description ? (
        <p className={joinClasses('text-foreground/50 mt-4', descriptionClassName)}>{description}</p>
      ) : null}
    </div>
  );
}
