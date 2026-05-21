import React, { createContext, useContext, useState, ReactNode } from 'react';

interface AppContextType {
  aiMode: 'local' | 'cloud' | null;
  setAiMode: (mode: 'local' | 'cloud' | null) => void;
  provider: 'anthropic' | 'openai' | 'google';
  setProvider: (provider: 'anthropic' | 'openai' | 'google') => void;
  model: string;
  setModel: (model: string) => void;
  apiKey: string;
  setApiKey: (key: string) => void;
  resume: string;
  setResume: (resume: string) => void;
  jobDescription: string;
  setJobDescription: (jd: string) => void;
  optimizedResume: string;
  setOptimizedResume: (resume: string) => void;
  isProcessing: boolean;
  setIsProcessing: (processing: boolean) => void;
  error: string;
  setError: (error: string) => void;
  downloadId: string;
  setDownloadId: (id: string) => void;
  ollamaModels: any[];
  setOllamaModels: (models: any[]) => void;
}

export const AppContext = createContext<AppContextType | undefined>(undefined);

export function useAppContext(): AppContextType {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useAppContext must be used within AppProvider');
  return ctx;
}

export function AppProvider({ children }: { children: ReactNode }) {
  const [aiMode, setAiMode] = useState<'local' | 'cloud' | null>(null);
  const [provider, setProvider] = useState<'anthropic' | 'openai' | 'google'>('anthropic');
  const [model, setModel] = useState('');
  const [apiKey, setApiKey] = useState('');
  const [resume, setResume] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [optimizedResume, setOptimizedResume] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState('');
  const [downloadId, setDownloadId] = useState('');
  const [ollamaModels, setOllamaModels] = useState<any[]>([]);

  return (
    <AppContext.Provider
      value={{
        aiMode, setAiMode,
        provider, setProvider,
        model, setModel,
        apiKey, setApiKey,
        resume, setResume,
        jobDescription, setJobDescription,
        optimizedResume, setOptimizedResume,
        isProcessing, setIsProcessing,
        error, setError,
        downloadId, setDownloadId,
        ollamaModels, setOllamaModels,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
