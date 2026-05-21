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
  extractResume: (file: any) => {
    const formData = new FormData();
    formData.append('file', { uri: file.uri, type: file.type || 'application/octet-stream', name: file.name || 'file' } as any);
    return api.post('/extract/resume', formData, { headers: { 'Content-Type': 'multipart/form-data' } });
  },

  extractJobDescription: (file: any) => {
    const formData = new FormData();
    formData.append('file', { uri: file.uri, type: file.type || 'application/octet-stream', name: file.name || 'file' } as any);
    return api.post('/extract/job-description', formData, { headers: { 'Content-Type': 'multipart/form-data' } });
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
