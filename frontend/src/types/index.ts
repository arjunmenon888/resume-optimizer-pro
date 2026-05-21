export type AIMode = 'local' | 'cloud';
export type Provider = 'anthropic' | 'openai' | 'google';

export interface OllamaModel {
  name: string;
  modified_at: string;
  size: number;
}

export interface OptimizeRequest {
  mode: AIMode;
  provider?: Provider;
  model?: string;
  resume: string;
  job_description: string;
  api_key?: string;
}

export interface OptimizeResponse {
  success: boolean;
  optimized_resume: string;
  cost: number;
}

export interface GenerateResponse {
  success: boolean;
  id: string;
  fileName: string;
  downloadUrl: string;
}
