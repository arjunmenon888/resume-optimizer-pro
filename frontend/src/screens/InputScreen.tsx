import React, { useState } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity, StyleSheet, Alert,
} from 'react-native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../App';
import { useAppContext } from '../contexts/AppContext';
import ResumeInput from '../components/ResumeInput';
import JobDescriptionInput from '../components/JobDescriptionInput';
import { validateResume, validateJobDescription } from '../utils/validators';
import { colors, spacing, fontSize, borderRadius } from '../styles/theme';

type Props = { navigation: NativeStackNavigationProp<RootStackParamList, 'Input'> };

export default function InputScreen({ navigation }: Props) {
  const {
    resume, setResume,
    jobDescription, setJobDescription,
    aiMode, provider, model, apiKey,
    setOptimizedResume, setIsProcessing, setError,
  } = useAppContext();

  const [localError, setLocalError] = useState('');

  const handleOptimize = () => {
    const resumeErr = validateResume(resume);
    const jdErr = validateJobDescription(jobDescription);
    if (resumeErr || jdErr) {
      setLocalError(resumeErr || jdErr || '');
      return;
    }
    setLocalError('');
    navigation.navigate('Processing');
  };

  return (
    <ScrollView style={styles.scroll} contentContainerStyle={styles.container}>
      <View style={styles.modeTag}>
        <Text style={styles.modeText}>
          {aiMode === 'local' ? `Local · ${model}` : `Cloud · ${provider}`}
        </Text>
      </View>

      <ResumeInput value={resume} onChange={setResume} />
      <JobDescriptionInput value={jobDescription} onChange={setJobDescription} />

      {localError ? <Text style={styles.errorText}>{localError}</Text> : null}

      <TouchableOpacity style={styles.optimizeBtn} onPress={handleOptimize}>
        <Text style={styles.optimizeBtnText}>Optimize Resume ✨</Text>
      </TouchableOpacity>

      <Text style={styles.note}>
        Your resume will be tailored to match the job description keywords and structure.
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: { flex: 1 },
  container: { padding: spacing.lg, paddingBottom: spacing.xxl },
  modeTag: {
    alignSelf: 'flex-start', backgroundColor: colors.primary + '22',
    borderRadius: borderRadius.xl, paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs, marginBottom: spacing.md,
  },
  modeText: { fontSize: fontSize.xs, color: colors.primary, fontWeight: '600' },
  errorText: { color: colors.danger, fontSize: fontSize.sm, marginBottom: spacing.sm },
  optimizeBtn: {
    backgroundColor: colors.primary, borderRadius: borderRadius.md,
    padding: spacing.md, alignItems: 'center', marginTop: spacing.md,
  },
  optimizeBtnText: { color: colors.white, fontSize: fontSize.md, fontWeight: 'bold' },
  note: {
    marginTop: spacing.md, fontSize: fontSize.xs,
    color: colors.gray[500], textAlign: 'center',
  },
});
