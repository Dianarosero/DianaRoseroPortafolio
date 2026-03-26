/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * ─── CÓMO AGREGAR UN CASO DE ESTUDIO ────────────────────────────────────────
 *
 *  1. Añade el nombre exacto del repo a ALLOWED_REPOS en src/lib/github.ts
 *  2. Agrega una entrada aquí con el mismo nombre como clave
 *  3. ¡Listo! El botón "Ver caso de estudio" aparecerá automáticamente en la card
 *
 *  Si un repo no tiene entrada aquí, el botón simplemente no aparece.
 * ────────────────────────────────────────────────────────────────────────────
 */

export interface CaseStudy {
  /** El problema o necesidad que motivó el proyecto */
  readonly problema: string;
  /** Descripción del proceso de análisis, diseño e implementación */
  readonly proceso: string;
  /** Decisiones técnicas clave tomadas durante el desarrollo */
  readonly decisiones: readonly string[];
  /** Resultado final entregado */
  readonly resultado: string;
  /** Aprendizajes obtenidos */
  readonly aprendizajes: string;
}

/**
 * Clave = nombre exacto del repositorio en GitHub (igual que en ALLOWED_REPOS).
 * Agrega o edita entradas aquí para mostrar casos de estudio en tu portafolio.
 */
export const CASE_STUDIES: Readonly<Record<string, CaseStudy>> = {

  Proyecto_Saberquest: {
    problema:
      'Escribe aquí el problema o necesidad que existía antes del proyecto. ' +
      '¿Qué hacían manualmente? ¿Qué proceso era ineficiente o inexistente? ' +
      '¿A quién afectaba?',
    proceso:
      'Describe cómo abordaste la solución: levantamiento de requisitos, diseño, ' +
      'iteraciones, herramientas usadas y cómo organizaste el trabajo.',
    decisiones: [
      'Decisión técnica 1: ¿por qué elegiste X tecnología o enfoque?',
      'Decisión técnica 2: ¿qué alternativa descartaste y por qué?',
      'Decisión técnica 3: ¿qué patrón o arquitectura aplicaste?',
    ],
    resultado:
      'Describe qué se entregó al final: funcionalidades implementadas, ' +
      'usuarios beneficiados, métricas o feedback recibido.',
    aprendizajes:
      'Comparte qué aprendiste técnica o profesionalmente: algo nuevo que dominaste, ' +
      'un error que no volverías a cometer, una habilidad que reforzaste.',
  },

  CESMAPS_RESPONSIVE: {
    problema:
      'Escribe aquí el problema o necesidad que existía antes del proyecto. ' +
      '¿Qué hacían manualmente? ¿Qué proceso era ineficiente o inexistente? ' +
      '¿A quién afectaba?',
    proceso:
      'Describe cómo abordaste la solución: levantamiento de requisitos, diseño, ' +
      'iteraciones, herramientas usadas y cómo organizaste el trabajo.',
    decisiones: [
      'Decisión técnica 1: ¿por qué elegiste X tecnología o enfoque?',
      'Decisión técnica 2: ¿qué alternativa descartaste y por qué?',
      'Decisión técnica 3: ¿qué patrón o arquitectura aplicaste?',
    ],
    resultado:
      'Describe qué se entregó al final: funcionalidades implementadas, ' +
      'usuarios beneficiados, métricas o feedback recibido.',
    aprendizajes:
      'Comparte qué aprendiste técnica o profesionalmente: algo nuevo que dominaste, ' +
      'un error que no volverías a cometer, una habilidad que reforzaste.',
  },

  Learn_Go: {
    problema:
      'Escribe aquí el problema o necesidad que existía antes del proyecto. ' +
      '¿Qué hacían manualmente? ¿Qué proceso era ineficiente o inexistente? ' +
      '¿A quién afectaba?',
    proceso:
      'Describe cómo abordaste la solución: levantamiento de requisitos, diseño, ' +
      'iteraciones, herramientas usadas y cómo organizaste el trabajo.',
    decisiones: [
      'Decisión técnica 1: ¿por qué elegiste X tecnología o enfoque?',
      'Decisión técnica 2: ¿qué alternativa descartaste y por qué?',
      'Decisión técnica 3: ¿qué patrón o arquitectura aplicaste?',
    ],
    resultado:
      'Describe qué se entregó al final: funcionalidades implementadas, ' +
      'usuarios beneficiados, métricas o feedback recibido.',
    aprendizajes:
      'Comparte qué aprendiste técnica o profesionalmente: algo nuevo que dominaste, ' +
      'un error que no volverías a cometer, una habilidad que reforzaste.',
  },

};
