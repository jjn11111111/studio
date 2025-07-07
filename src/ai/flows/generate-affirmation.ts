'use server';

/**
 * @fileOverview An AI agent that generates positive affirmations and explanations tailored to the current video and unit.
 *
 * - generateAffirmation - A function that handles the affirmation generation process.
 * - GenerateAffirmationInput - The input type for the generateAffirmation function.
 * - GenerateAffirmationOutput - The return type for the generateAffirmation function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateAffirmationInputSchema = z.object({
  unit: z.string().describe('The current unit of the exercise.'),
  videoTitle: z.string().describe('The title of the current video.'),
  videoDescription: z.string().describe('The description of the current video.'),
});
export type GenerateAffirmationInput = z.infer<typeof GenerateAffirmationInputSchema>;

const GenerateAffirmationOutputSchema = z.object({
  affirmation: z.string().describe('A positive affirmation related to the video and unit.'),
  explanation: z.string().describe('An explanation of the affirmation and its benefits.'),
});
export type GenerateAffirmationOutput = z.infer<typeof GenerateAffirmationOutputSchema>;

export async function generateAffirmation(input: GenerateAffirmationInput): Promise<GenerateAffirmationOutput> {
  return generateAffirmationFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateAffirmationPrompt',
  input: {schema: GenerateAffirmationInputSchema},
  output: {schema: GenerateAffirmationOutputSchema},
  prompt: `You are a motivational AI assistant designed to provide positive affirmations and explanations for stereoscopic video exercises.

  Current Unit: {{{unit}}}
  Video Title: {{{videoTitle}}}
  Video Description: {{{videoDescription}}}

  Generate a positive affirmation related to the video and unit, and provide a brief explanation of the affirmation and its benefits. The affirmation should be concise and inspiring. The explanation should be easy to understand and connect to the purpose of the exercise.
  Here's an example output you must follow:
  {
    "affirmation": "I am opening my third eye and expanding my awareness.",
    "explanation": "This affirmation encourages you to focus on activating your pineal gland, enhancing your intuition, and achieving higher states of consciousness."
  }
  `,
});

const generateAffirmationFlow = ai.defineFlow(
  {
    name: 'generateAffirmationFlow',
    inputSchema: GenerateAffirmationInputSchema,
    outputSchema: GenerateAffirmationOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
