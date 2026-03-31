/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export const EASE_OUT = "power2.out";
export const EASE_IN_OUT = "power2.inOut";
/** Punto de entrada para ScrollTrigger.batch en secciones con cards */
export const BATCH_START = "top 88%";
