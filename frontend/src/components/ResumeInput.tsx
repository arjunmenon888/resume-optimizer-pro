import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { colors, spacing, fontSize, borderRadius } from '../styles/theme';

interface ResumeInputProps {
  value: string;
  onChange: (text: string) => void;
}

export default function ResumeInput({ value, onChange }: ResumeInputProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Your Resume</Text>
      <TextInput
        style={styles.input}
        multiline
        numberOfLines={8}
        placeholder="Paste your resume text here..."
        placeholderTextColor={colors.gray[400]}
        value={value}
        onChangeText={onChange}
        textAlignVertical="top"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginBottom: spacing.md },
  label: { fontSize: fontSize.sm, fontWeight: '600', marginBottom: spacing.xs, color: colors.dark },
  input: {
    borderWidth: 1,
    borderColor: colors.gray[300],
    borderRadius: borderRadius.md,
    padding: spacing.sm,
    fontSize: fontSize.sm,
    color: colors.dark,
    minHeight: 150,
  },
});
