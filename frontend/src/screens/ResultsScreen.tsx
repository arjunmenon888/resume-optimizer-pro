import React, { useState } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity, StyleSheet, Alert,
} from 'react-native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../App';
import { useAppContext } from '../contexts/AppContext';
import ResultsDisplay from '../components/ResultsDisplay';
import { apiService } from '../services/api';
import { colors, spacing, fontSize, borderRadius } from '../styles/theme';

type Props = { navigation: NativeStackNavigationProp<RootStackParamList, 'Results'> };

export default function ResultsScreen({ navigation }: Props) {
  const {
    optimizedResume, error, setDownloadId, aiMode, provider, model,
  } = useAppContext();

  const [generating, setGenerating] = useState(false);

  const handleGenerate = async () => {
    if (!optimizedResume) return;
    setGenerating(true);
    try {
      const res = await apiService.generateResume({ optimized_resume: optimizedResume });
      setDownloadId(res.data.id);
      navigation.navigate('Download');
    } catch (err: any) {
      const msg = err?.response?.data?.detail || err?.message || 'Failed to generate document.';
      Alert.alert('Error', msg);
    } finally {
      setGenerating(false);
    }
  };

  const handleRetry = () => {
    navigation.navigate('Input');
  };

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorIcon}>⚠️</Text>
        <Text style={styles.errorTitle}>Optimization Failed</Text>
        <Text style={styles.errorMsg}>{error}</Text>
        <TouchableOpacity style={styles.retryBtn} onPress={handleRetry}>
          <Text style={styles.retryText}>Try Again</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <ScrollView style={styles.scroll} contentContainerStyle={styles.container}>
      <View style={styles.modeTag}>
        <Text style={styles.modeText}>
          {aiMode === 'local' ? `Optimized with ${model}` : `Optimized with ${provider}`}
        </Text>
      </View>

      <ResultsDisplay text={optimizedResume} />

      <TouchableOpacity
        style={[styles.generateBtn, generating && styles.disabledBtn]}
        onPress={handleGenerate}
        disabled={generating}
      >
        <Text style={styles.generateBtnText}>
          {generating ? 'Generating...' : 'Generate Word Document 📄'}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.backBtn} onPress={handleRetry}>
        <Text style={styles.backBtnText}>Start Over</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: { flex: 1 },
  container: { padding: spacing.lg, paddingBottom: spacing.xxl },
  modeTag: {
    alignSelf: 'flex-start', backgroundColor: colors.success + '22',
    borderRadius: borderRadius.xl, paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs, marginBottom: spacing.md,
  },
  modeText: { fontSize: fontSize.xs, color: colors.success, fontWeight: '600' },
  generateBtn: {
    backgroundColor: colors.success, borderRadius: borderRadius.md,
    padding: spacing.md, alignItems: 'center', marginTop: spacing.md,
  },
  disabledBtn: { backgroundColor: colors.gray[400] },
  generateBtnText: { color: colors.white, fontSize: fontSize.md, fontWeight: 'bold' },
  backBtn: {
    borderWidth: 1, borderColor: colors.gray[300], borderRadius: borderRadius.md,
    padding: spacing.md, alignItems: 'center', marginTop: spacing.sm,
  },
  backBtnText: { color: colors.gray[600], fontSize: fontSize.sm },
  errorContainer: {
    flex: 1, justifyContent: 'center', alignItems: 'center',
    padding: spacing.xl, backgroundColor: colors.light,
  },
  errorIcon: { fontSize: 48, marginBottom: spacing.md },
  errorTitle: { fontSize: fontSize.xl, fontWeight: 'bold', color: colors.danger, marginBottom: spacing.sm },
  errorMsg: { fontSize: fontSize.sm, color: colors.gray[600], textAlign: 'center', marginBottom: spacing.xl },
  retryBtn: {
    backgroundColor: colors.primary, borderRadius: borderRadius.md,
    paddingHorizontal: spacing.xl, paddingVertical: spacing.md,
  },
  retryText: { color: colors.white, fontSize: fontSize.md, fontWeight: 'bold' },
});
