/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { GoogleGenAI } from '@google/genai';

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

export const GEMINI_ENABLED = Boolean(GEMINI_API_KEY);

export async function generateAiProposal(prompt: string): Promise<string> {
  if (!GEMINI_API_KEY) {
    throw new Error('Gemini no está configurado.');
  }

  const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.0-flash-001',
      contents: prompt,
      config: {
        temperature: 0.6,
        maxOutputTokens: 600,
      },
    });

    const aiText = response.text?.trim();
    if (!aiText) {
      throw new Error('No se recibió contenido del modelo.');
    }

    return aiText;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`No fue posible generar la propuesta IA: ${error.message}`);
    }

    throw new Error('No fue posible generar la propuesta IA.');
  }
}
