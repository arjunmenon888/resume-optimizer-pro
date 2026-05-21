import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system';
import { apiService } from '../services/api';
import { colors, spacing, fontSize, borderRadius } from '../styles/theme';

interface JobDescriptionInputProps {
  value: string;
  onChange: (text: string) => void;
}

export default function JobDescriptionInput({ value, onChange }: JobDescriptionInputProps) {
  const [loading, setLoading] = useState(false);

  const handleFilePick = async () => {
    setLoading(true);
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: ['text/plain', 'image/*', 'application/pdf'],
        copyToCacheDirectory: true,
      });
      if (result.canceled || !result.assets?.[0]) return;

      const file = result.assets[0];

      if (file.mimeType === 'text/plain') {
        const content = await FileSystem.readAsStringAsync(file.uri);
        onChange(content);
      } else {
        // image or PDF — send to backend OCR
        const response = await apiService.extractJobDescription({
          uri: file.uri,
          type: file.mimeType ?? 'application/octet-stream',
          name: file.name ?? 'file',
        });
        onChange(response.data.extracted_text);
      }
    } catch (err: any) {
      const msg = err?.response?.data?.detail ?? 'Could not extract text. Please paste the job description manually.';
      Alert.alert('Upload Error', msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.labelRow}>
        <Text style={styles.label}>Job Description</Text>
        <TouchableOpacity style={styles.uploadBtn} onPress={handleFilePick} disabled={loading}>
          {loading
            ? <ActivityIndicator size="small" color={colors.primary} />
            : <Text style={styles.uploadBtnText}>Upload file</Text>}
        </TouchableOpacity>
      </View>
      <TextInput
        style={styles.input}
        multiline
        numberOfLines={8}
        placeholder="Paste the job description here..."
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
