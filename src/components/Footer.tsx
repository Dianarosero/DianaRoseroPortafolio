/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Github, Heart, Linkedin } from "lucide-react";
import type { ReactElement } from "react";
import { SOCIAL_LINKS } from "../data/socialLinks";
import type { SocialPlatform } from "../data/socialLinks";

const SOCIAL_ICON: Record<SocialPlatform, ReactElement> = {
  github: <Github size={20} />,
  linkedin: <Linkedin size={20} />,
};

export default function Footer(): ReactElement {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-12 border-t border-white/5 bg-background">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <div>
            <div className="text-2xl font-bold tracking-tighter text-primary mb-2">
              DS<span className="text-foreground">.dev</span>
            </div>
            <p className="text-foreground/50 text-sm">
              Construyendo el futuro de la web, un píxel a la vez.
            </p>
          </div>

          <div className="flex gap-6">
            {SOCIAL_LINKS.map((socialLink) => (
              <a
                key={socialLink.platform}
                href={socialLink.href}
                className="text-foreground/50 hover:text-primary transition-colors"
                target={socialLink.external ? "_blank" : undefined}
                rel={socialLink.external ? "noreferrer noopener" : undefined}
                aria-label={socialLink.label}
              >
                {SOCIAL_ICON[socialLink.platform]}
              </a>
            ))}
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-foreground/30 uppercase tracking-widest font-bold">
          <p>© {currentYear} Diana Sofia. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
