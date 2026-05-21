import React, { useEffect, useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, StyleSheet,
  ScrollView, ActivityIndicator, Alert,
} from 'react-native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../App';
import { useAppContext } from '../contexts/AppContext';
import OllamaModelSelector from '../components/OllamaModelSelector';
import { apiService } from '../services/api';
import { colors, spacing, fontSize, borderRadius } from '../styles/theme';
import type { Provider } from '../types';

type Props = { navigation: NativeStackNavigationProp<RootStackParamList, 'Config'> };

const PROVIDERS: { label: string; value: Provider }[] = [
  { label: 'Anthropic Claude', value: 'anthropic' },
  { label: 'OpenAI GPT-4', value: 'openai' },
  { label: 'Google Gemini', value: 'google' },
];

export default function ConfigScreen({ navigation }: Props) {
  const {
    aiMode, provider, setProvider,
    model, setModel,
    apiKey, setApiKey,
    ollamaModels, setOllamaModels,
  } = useAppContext();

  const [loadingModels, setLoadingModels] = useState(false);
  const [modelsError, setModelsError] = useState('');

  useEffect(() => {
    if (aiMode === 'local') fetchModels();
  }, [aiMode]);

  const fetchModels = async () => {
    setLoadingModels(true);
    setModelsError('');
    try {
      const res = await apiService.getOllamaModels();
      setOllamaModels(res.data.models || []);
    } catch {
      setModelsError('Could not reach Ollama. Make sure it is running on localhost:11434.');
    } finally {
      setLoadingModels(false);
    }
  };

  const canContinue = aiMode === 'local' ? !!model : !!apiKey.trim();

  const handleContinue = () => {
    if (!canContinue) {
      Alert.alert(
        'Missing configuration',
        aiMode === 'local' ? 'Please select an Ollama model.' : 'Please enter your API key.',
      );
      return;
    }
    navigation.navigate('Input');
  };

  return (
    <ScrollView style={styles.scroll} contentContainerStyle={styles.container}>
      {aiMode === 'local' ? (
        <View>
          <Text style={styles.heading}>Select Ollama Model</Text>
          <Text style={styles.hint}>
            Make sure Ollama is running: <Text style={styles.code}>ollama serve</Text>
          </Text>

          {loadingModels && <ActivityIndicator color={colors.primary} style={styles.loader} />}
          {modelsError ? (
            <View style={styles.errorBox}>
              <Text style={styles.errorText}>{modelsError}</Text>
              <TouchableOpacity style={styles.retryBtn} onPress={fetchModels}>
                <Text style={styles.retryText}>Retry</Text>
              </TouchableOpacity>
            </View>
          ) : (
            !loadingModels && (
              <OllamaModelSelector
                models={ollamaModels}
                selected={model}
                onSelect={setModel}
              />
            )
          )}
        </View>
      ) : (
        <View>
          <Text style={styles.heading}>Cloud AI Configuration</Text>

          <Text style={styles.label}>Provider</Text>
          <View style={styles.providerRow}>
            {PROVIDERS.map((p) => (
              <TouchableOpacity
                key={p.value}
                style={[styles.providerBtn, provider === p.value && styles.providerBtnActive]}
                onPress={() => setProvider(p.value)}
              >
                <Text style={[styles.providerText, provider === p.value && styles.providerTextActive]}>
                  {p.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <Text style={styles.label}>API Key</Text>
          <TextInput
            style={styles.input}
            placeholder={`Enter your ${provider} API key`}
            placeholderTextColor={colors.gray[400]}
            value={apiKey}
            onChangeText={setApiKey}
            secureTextEntry
            autoCapitalize="none"
          />
          <Text style={styles.hint}>Your key is sent directly to the backend and never stored.</Text>
        </View>
      )}

      <TouchableOpacity
        style={[styles.continueBtn, !canContinue && styles.continueBtnDisabled]}
        onPress={handleContinue}
      >
        <Text style={styles.continueBtnText}>Continue →</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: { flex: 1 },
  container: { padding: spacing.lg, paddingBottom: spacing.xxl },
  heading: { fontSize: fontSize.xl, fontWeight: 'bold', color: colors.dark, marginBottom: spacing.sm },
  hint: { fontSize: fontSize.xs, color: colors.gray[500], marginBottom: spacing.md },
  code: { fontFamily: 'monospace', backgroundColor: colors.gray[200], paddingHorizontal: 4 },
  loader: { marginVertical: spacing.md },
  errorBox: {
    backgroundColor: '#fef2f2', borderRadius: borderRadius.md,
    padding: spacing.md, marginBottom: spacing.md,
  },
  errorText: { color: colors.danger, fontSize: fontSize.sm, marginBottom: spacing.sm },
  retryBtn: {
    alignSelf: 'flex-start', backgroundColor: colors.danger,
    paddingHorizontal: spacing.md, paddingVertical: spacing.xs, borderRadius: borderRadius.sm,
  },
  retryText: { color: colors.white, fontSize: fontSize.sm },
  label: { fontSize: fontSize.sm, fontWeight: '600', color: colors.dark, marginBottom: spacing.xs },
  providerRow: { flexDirection: 'column', gap: spacing.xs, marginBottom: spacing.md },
  providerBtn: {
    padding: spacing.sm, borderRadius: borderRadius.md,
    borderWidth: 1, borderColor: colors.gray[300], backgroundColor: colors.white,
  },
  providerBtnActive: { borderColor: colors.primary, backgroundColor: colors.primary },
  providerText: { fontSize: fontSize.sm, color: colors.dark },
  providerTextActive: { color: colors.white, fontWeight: '600' },
  input: {
    borderWidth: 1, borderColor: colors.gray[300], borderRadius: borderRadius.md,
    padding: spacing.sm, fontSize: fontSize.sm, color: colors.dark,
    backgroundColor: colors.white, marginBottom: spacing.xs,
  },
  continueBtn: {
    backgroundColor: colors.primary, borderRadius: borderRadius.md,
    padding: spacing.md, alignItems: 'center', marginTop: spacing.xl,
  },
  continueBtnDisabled: { backgroundColor: colors.gray[400] },
  continueBtnText: { color: colors.white, fontSize: fontSize.md, fontWeight: 'bold' },
});
