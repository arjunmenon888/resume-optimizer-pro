import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system';
import { colors, spacing, fontSize, borderRadius } from '../styles/theme';

interface ResumeInputProps {
  value: string;
  onChange: (text: string) => void;
}

export default function ResumeInput({ value, onChange }: ResumeInputProps) {
  const [loading, setLoading] = useState(false);

  const handleFilePick = async () => {
    setLoading(true);
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: ['text/plain', 'text/*'],
        copyToCacheDirectory: true,
      });
      if (result.canceled || !result.assets?.[0]) return;
      const content = await FileSystem.readAsStringAsync(result.assets[0].uri);
      onChange(content);
    } catch {
      Alert.alert('Error', 'Could not read file. Please paste your resume as text.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.labelRow}>
        <Text style={styles.label}>Your Resume</Text>
        <TouchableOpacity style={styles.uploadBtn} onPress={handleFilePick} disabled={loading}>
          {loading
            ? <ActivityIndicator size="small" color={colors.primary} />
            : <Text style={styles.uploadBtnText}>Upload .txt</Text>}
        </TouchableOpacity>
      </View>
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
  labelRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: spacing.xs },
  label: { fontSize: fontSize.sm, fontWeight: '600', color: colors.dark },
  uploadBtn: {
    borderWidth: 1, borderColor: colors.primary, borderRadius: borderRadius.sm,
    paddingHorizontal: spacing.sm, paddingVertical: 4,
  },
  uploadBtnText: { fontSize: fontSize.xs, color: colors.primary, fontWeight: '600' },
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
