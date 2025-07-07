'use server';

import { generateAffirmation, type GenerateAffirmationInput, type GenerateAffirmationOutput } from '@/ai/flows/generate-affirmation';

type ActionState = {
  data: GenerateAffirmationOutput | null;
  error: string | null;
  status: 'initial' | 'pending' | 'success' | 'error';
}

export async function getAffirmationAction(
  prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  const input: GenerateAffirmationInput = {
    unit: formData.get('unit') as string,
    videoTitle: formData.get('videoTitle') as string,
    videoDescription: formData.get('videoDescription') as string,
  };

  if (!input.unit || !input.videoTitle || !input.videoDescription) {
    return { ...prevState, error: 'Missing required fields.', status: 'error' };
  }

  try {
    const result = await generateAffirmation(input);
    return { data: result, error: null, status: 'success' };
  } catch (error) {
    console.error(error);
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred.';
    return { ...prevState, error: errorMessage, status: 'error' };
  }
}
