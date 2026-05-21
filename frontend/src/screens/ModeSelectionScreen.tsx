import React from 'react';
import {
  View, Text, TouchableOpacity, StyleSheet, SafeAreaView,
} from 'react-native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../App';
import { useAppContext } from '../contexts/AppContext';
import { colors, spacing, fontSize, borderRadius } from '../styles/theme';

type Props = { navigation: NativeStackNavigationProp<RootStackParamList, 'ModeSelection'> };

export default function ModeSelectionScreen({ navigation }: Props) {
  const { setAiMode } = useAppContext();

  const select = (mode: 'local' | 'cloud') => {
    setAiMode(mode);
    navigation.navigate('Config');
  };

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <View style={styles.hero}>
          <Text style={styles.title}>Resume Optimizer Pro</Text>
          <Text style={styles.subtitle}>
            AI-powered ATS optimization for Web, iOS &amp; Android
          </Text>
        </View>

        <Text style={styles.sectionLabel}>Choose your AI mode</Text>

        <TouchableOpacity style={[styles.card, styles.localCard]} onPress={() => select('local')}>
          <Text style={styles.cardIcon}>🖥️</Text>
          <Text style={styles.cardTitle}>Local AI</Text>
          <Text style={styles.cardDesc}>
            Use Ollama running on your machine.{'\n'}Free, private, no API key needed.
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.card, styles.cloudCard]} onPress={() => select('cloud')}>
          <Text style={styles.cardIcon}>☁️</Text>
          <Text style={styles.cardTitle}>Cloud AI</Text>
          <Text style={styles.cardDesc}>
            Use Anthropic, OpenAI, or Google.{'\n'}Requires an API key.
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.light },
  container: { flex: 1, padding: spacing.lg, justifyContent: 'center' },
  hero: { alignItems: 'center', marginBottom: spacing.xxl },
  title: { fontSize: fontSize.xxl, fontWeight: 'bold', color: colors.primary, marginBottom: spacing.sm },
  subtitle: { fontSize: fontSize.sm, color: colors.gray[500], textAlign: 'center' },
  sectionLabel: {
    fontSize: fontSize.md, fontWeight: '600', color: colors.dark,
    marginBottom: spacing.md, textAlign: 'center',
  },
  card: {
    borderRadius: borderRadius.lg, padding: spacing.lg,
    marginBottom: spacing.md, alignItems: 'center',
    shadowColor: '#000', shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08, shadowRadius: 4, elevation: 3,
  },
  localCard: { backgroundColor: colors.white, borderWidth: 2, borderColor: colors.primary },
  cloudCard: { backgroundColor: colors.primary },
  cardIcon: { fontSize: 36, marginBottom: spacing.sm },
  cardTitle: { fontSize: fontSize.lg, fontWeight: 'bold', marginBottom: spacing.xs, color: colors.dark },
  cardDesc: { fontSize: fontSize.sm, color: colors.gray[500], textAlign: 'center', lineHeight: 20 },
});
