import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { colors, spacing, fontSize, borderRadius } from '../styles/theme';

interface OllamaModelSelectorProps {
  models: any[];
  selected: string;
  onSelect: (model: string) => void;
}

export default function OllamaModelSelector({ models, selected, onSelect }: OllamaModelSelectorProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Select Ollama Model</Text>
      {models.length === 0 ? (
        <Text style={styles.empty}>No models found. Make sure Ollama is running.</Text>
      ) : (
        models.map((m) => (
          <TouchableOpacity
            key={m.name}
            style={[styles.item, selected === m.name && styles.active]}
            onPress={() => onSelect(m.name)}
          >
            <Text style={[styles.itemText, selected === m.name && styles.activeText]}>{m.name}</Text>
          </TouchableOpacity>
        ))
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginBottom: spacing.md },
  label: { fontSize: fontSize.sm, fontWeight: '600', marginBottom: spacing.xs, color: colors.dark },
  empty: { color: colors.gray[500], fontSize: fontSize.sm, fontStyle: 'italic' },
  item: {
    padding: spacing.sm,
    borderRadius: borderRadius.sm,
    borderWidth: 1,
    borderColor: colors.gray[300],
    marginBottom: spacing.xs,
  },
  active: { backgroundColor: colors.primary, borderColor: colors.primary },
  itemText: { color: colors.dark },
  activeText: { color: colors.white },
});
