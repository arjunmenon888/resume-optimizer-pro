import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, BackHandler } from 'react-native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../App';
import { useAppContext } from '../contexts/AppContext';
import ProcessingStatus from '../components/ProcessingStatus';
import { apiService } from '../services/api';
import { colors, spacing, fontSize } from '../styles/theme';

type Props = { navigation: NativeStackNavigationProp<RootStackParamList, 'Processing'> };

const MESSAGES = [
  'Analyzing your resume...',
  'Matching keywords...',
  'Optimizing for ATS...',
  'Polishing the content...',
  'Almost done...',
];

export default function ProcessingScreen({ navigation }: Props) {
  const {
    resume, jobDescription,
    aiMode, provider, model, apiKey,
    setOptimizedResume, setError,
  } = useAppContext();

  const [msgIndex, setMsgIndex] = React.useState(0);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);
  const ran = useRef(false);

  useEffect(() => {
    // Block hardware back during processing
    const sub = BackHandler.addEventListener('hardwareBackPress', () => true);
    return () => sub.remove();
  }, []);

  useEffect(() => {
    timer.current = setInterval(() => {
      setMsgIndex((i) => (i + 1) % MESSAGES.length);
    }, 2500);
    return () => { if (timer.current) clearInterval(timer.current); };
  }, []);

  useEffect(() => {
    if (ran.current) return;
    ran.current = true;
    runOptimization();
  }, []);

  const runOptimization = async () => {
    try {
      const payload: any = {
        mode: aiMode,
        resume,
        job_description: jobDescription,
      };
      if (aiMode === 'local') payload.model = model;
      if (aiMode === 'cloud') { payload.provider = provider; payload.api_key = apiKey; }

      const res = await apiService.optimizeResume(payload);
      setOptimizedResume(res.data.optimized_resume);
      navigation.replace('Results');
    } catch (err: any) {
      const msg = err?.response?.data?.detail || err?.message || 'Optimization failed.';
      setError(msg);
      navigation.replace('Results');
    }
  };

  return (
    <View style={styles.container}>
      <ProcessingStatus message={MESSAGES[msgIndex]} />
      <Text style={styles.hint}>
        {aiMode === 'local'
          ? `Running on ${model} via Ollama. This may take a minute.`
          : `Sending to ${provider} cloud API...`}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: colors.light },
  hint: { fontSize: fontSize.xs, color: colors.gray[400], marginTop: spacing.md, textAlign: 'center', paddingHorizontal: spacing.xl },
});
