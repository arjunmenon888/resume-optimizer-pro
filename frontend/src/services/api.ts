import axios from 'axios';

const API_URL = process.env.EXPO_PUBLIC_API_URL || 'http://localhost:8000/api';

const api = axios.create({
  baseURL: API_URL,
  timeout: 60000,
});

export const apiService = {
  // Health
  health: () => api.get('/health'),

  // Models
  getOllamaModels: () => api.get('/models/ollama'),

  // Extract
  // file can be a browser File/Blob (web) or { uri, type, name } descriptor (native).
  // Do NOT set Content-Type manually — axios must generate the multipart boundary itself.
  extractResume: (file: any) => {
    const formData = new FormData();
    if (typeof File !== 'undefined' && file instanceof File) {
      formData.append('file', file, file.name);
    } else if (typeof Blob !== 'undefined' && file instanceof Blob) {
      formData.append('file', file, 'resume');
    } else {
      formData.append('file', file as any);
    }
    return api.post('/extract/resume', formData);
  },

  extractJobDescription: (file: any) => {
    const formData = new FormData();
    if (typeof File !== 'undefined' && file instanceof File) {
      formData.append('file', file, file.name);
    } else if (typeof Blob !== 'undefined' && file instanceof Blob) {
      formData.append('file', file, 'job-description');
    } else {
      formData.append('file', file as any);
    }
    return api.post('/extract/job-description', formData);
  },

  // Optimize
  optimizeResume: (data: any) => api.post('/optimize/resume', data),

  // Generate
  generateResume: (data: any) => api.post('/generate/resume', data),

  // Download
  downloadResume: (id: string) =>
    api.get(`/download/${id}`, { responseType: 'blob' }),
};

export default api;
