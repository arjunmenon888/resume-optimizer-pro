import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { colors, spacing, fontSize, borderRadius } from '../styles/theme';
import type { AIMode } from '../types';

interface AIModeProps {
  value: AIMode | null;
  onChange: (mode: AIMode) => void;
}

export default function AIModeSelector({ value, onChange }: AIModeProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Select AI Mode</Text>
      <View style={styles.row}>
        {(['local', 'cloud'] as AIMode[]).map((mode) => (
          <TouchableOpacity
            key={mode}
            style={[styles.button, value === mode && styles.active]}
            onPress={() => onChange(mode)}
          >
            <Text style={[styles.buttonText, value === mode && styles.activeText]}>
              {mode === 'local' ? 'Local (Ollama)' : 'Cloud AI'}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginBottom: spacing.md },
  label: { fontSize: fontSize.sm, fontWeight: '600', marginBottom: spacing.xs, color: colors.dark },
  row: { flexDirection: 'row', gap: spacing.sm },
  button: {
    flex: 1,
    padding: spacing.sm,
    borderRadius: borderRadius.md,
    borderWidth: 1,
    borderColor: colors.gray[300],
    alignItems: 'center',
  },
  active: { backgroundColor: colors.primary, borderColor: colors.primary },
  buttonText: { color: colors.dark, fontSize: fontSize.sm },
  activeText: { color: colors.white },
});
