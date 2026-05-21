export const API_URL = process.env.EXPO_PUBLIC_API_URL || 'http://localhost:8000/api';

export const PROVIDERS = [
  { label: 'Anthropic Claude', value: 'anthropic' },
  { label: 'OpenAI GPT-4', value: 'openai' },
  { label: 'Google Gemini', value: 'google' },
];

export const ACCEPTED_FILE_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'application/pdf'];
