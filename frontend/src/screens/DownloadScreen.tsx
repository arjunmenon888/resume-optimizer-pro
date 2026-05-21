import React from 'react';
import {
  View, Text, TouchableOpacity, StyleSheet, ScrollView,
} from 'react-native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../App';
import { useAppContext } from '../contexts/AppContext';
import DownloadPanel from '../components/DownloadPanel';
import { colors, spacing, fontSize, borderRadius } from '../styles/theme';

type Props = { navigation: NativeStackNavigationProp<RootStackParamList, 'Download'> };

export default function DownloadScreen({ navigation }: Props) {
  const { downloadId, setAiMode, setResume, setJobDescription, setOptimizedResume, setDownloadId, setError } = useAppContext();

  const handleNewResume = () => {
    setResume('');
    setJobDescription('');
    setOptimizedResume('');
    setDownloadId('');
    setError('');
    setAiMode(null);
    navigation.navigate('ModeSelection');
  };

  const handleOptimizeAnother = () => {
    setResume('');
    setJobDescription('');
    setOptimizedResume('');
    setDownloadId('');
    setError('');
    navigation.navigate('Input');
  };

  return (
    <ScrollView style={styles.scroll} contentContainerStyle={styles.container}>
      <View style={styles.successBadge}>
        <Text style={styles.successIcon}>✅</Text>
        <Text style={styles.successTitle}>Resume Ready!</Text>
        <Text style={styles.successSubtitle}>
          Your ATS-optimized Word document has been generated.
        </Text>
      </View>

      <DownloadPanel downloadId={downloadId} fileName={`optimized-resume-${downloadId?.slice(0, 8)}.docx`} />

      <View style={styles.actions}>
        <TouchableOpacity style={styles.secondaryBtn} onPress={handleOptimizeAnother}>
          <Text style={styles.secondaryBtnText}>Optimize Another Job</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.ghostBtn} onPress={handleNewResume}>
          <Text style={styles.ghostBtnText}>Start Over</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.tipsBox}>
        <Text style={styles.tipsTitle}>ATS Tips</Text>
        <Text style={styles.tip}>• Use standard section headings (Experience, Education, Skills)</Text>
        <Text style={styles.tip}>• Avoid tables, text boxes, and graphics</Text>
        <Text style={styles.tip}>• Use common fonts: Calibri, Arial, Times New Roman</Text>
        <Text style={styles.tip}>• Submit as .docx or PDF from Word</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: { flex: 1 },
  container: { padding: spacing.lg, paddingBottom: spacing.xxl },
  successBadge: {
    alignItems: 'center', backgroundColor: colors.white,
    borderRadius: borderRadius.lg, padding: spacing.xl,
    marginBottom: spacing.lg, borderWidth: 1, borderColor: colors.success + '44',
    shadowColor: '#000', shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06, shadowRadius: 3, elevation: 2,
  },
  successIcon: { fontSize: 48, marginBottom: spacing.sm },
  successTitle: { fontSize: fontSize.xl, fontWeight: 'bold', color: colors.dark, marginBottom: spacing.xs },
  successSubtitle: { fontSize: fontSize.sm, color: colors.gray[500], textAlign: 'center' },
  actions: { marginTop: spacing.md, gap: spacing.sm },
  secondaryBtn: {
    borderWidth: 1, borderColor: colors.primary, borderRadius: borderRadius.md,
    padding: spacing.md, alignItems: 'center',
  },
  secondaryBtnText: { color: colors.primary, fontSize: fontSize.sm, fontWeight: '600' },
  ghostBtn: {
    borderWidth: 1, borderColor: colors.gray[300], borderRadius: borderRadius.md,
    padding: spacing.md, alignItems: 'center',
  },
  ghostBtnText: { color: colors.gray[500], fontSize: fontSize.sm },
  tipsBox: {
    marginTop: spacing.xl, backgroundColor: colors.primary + '11',
    borderRadius: borderRadius.lg, padding: spacing.md,
  },
  tipsTitle: { fontSize: fontSize.sm, fontWeight: 'bold', color: colors.primary, marginBottom: spacing.sm },
  tip: { fontSize: fontSize.xs, color: colors.gray[600], marginBottom: spacing.xs, lineHeight: 18 },
});
