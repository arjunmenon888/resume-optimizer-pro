export function validateResume(text: string): string | null {
  if (!text || text.trim().length === 0) return 'Resume cannot be empty';
  if (text.trim().length < 50) return 'Resume is too short';
  return null;
}

export function validateJobDescription(text: string): string | null {
  if (!text || text.trim().length === 0) return 'Job description cannot be empty';
  if (text.trim().length < 20) return 'Job description is too short';
  return null;
}

export function validateApiKey(key: string): string | null {
  if (!key || key.trim().length === 0) return 'API key is required for cloud mode';
  return null;
}
