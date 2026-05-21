import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { colors, spacing, fontSize, borderRadius } from '../styles/theme';

interface ResultsDisplayProps {
  text: string;
}

export default function ResultsDisplay({ text }: ResultsDisplayProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Optimized Resume</Text>
      <ScrollView style={styles.scroll}>
        <Text style={styles.text}>{text}</Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginBottom: spacing.md },
  label: { fontSize: fontSize.sm, fontWeight: '600', marginBottom: spacing.xs, color: colors.dark },
  scroll: {
    maxHeight: 300,
    borderWidth: 1,
    borderColor: colors.gray[300],
    borderRadius: borderRadius.md,
    padding: spacing.sm,
    backgroundColor: colors.gray[100],
  },
  text: { fontSize: fontSize.sm, color: colors.dark, lineHeight: 20 },
});
