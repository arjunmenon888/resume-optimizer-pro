import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, StyleSheet,
  Alert, ActivityIndicator, Platform,
} from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import { apiService } from '../services/api';
import { colors, spacing, fontSize, borderRadius } from '../styles/theme';

const ACCEPTED_TYPES = [
  'image/*',
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'application/vnd.ms-powerpoint',
  'application/vnd.openxmlformats-officedocument.presentationml.presentation',
  'text/plain',
];

interface ResumeInputProps {
  value: string;
  onChange: (text: string) => void;
}

export default function ResumeInput({ value, onChange }: ResumeInputProps) {
  const [loading, setLoading] = useState(false);
  const [fileName, setFileName] = useState('');

  const handleFilePick = async () => {
    setLoading(true);
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: ACCEPTED_TYPES,
        copyToCacheDirectory: true,
      });
      if (result.canceled || !result.assets?.[0]) return;

      const asset = result.assets[0];
      // On web, asset.file is the real browser File object.
      // On native, pass the { uri, type, name } descriptor that RN's FormData understands.
      const filePayload = Platform.OS === 'web' && (asset as any).file
        ? (asset as any).file
        : { uri: asset.uri, type: asset.mimeType ?? 'application/octet-stream', name: asset.name ?? 'file' };

      const response = await apiService.extractResume(filePayload);

      onChange(response.data.extracted_text);
      setFileName(asset.name ?? '');
    } catch (err: any) {
      const detail = err?.response?.data?.detail;
      Alert.alert('Upload Error', detail ?? 'Could not extract text. Please paste your resume manually.');
    } finally {
      setLoading(false);
    }
  };

  const handleClearFile = () => {
    setFileName('');
    onChange('');
  };

  return (
    <View style={styles.container}>
      <View style={styles.labelRow}>
        <Text style={styles.label}>Your Resume</Text>
        <TouchableOpacity style={styles.uploadBtn} onPress={handleFilePick} disabled={loading}>
          {loading
            ? <ActivityIndicator size="small" color={colors.primary} />
            : <Text style={styles.uploadBtnText}>Upload file</Text>}
        </TouchableOpacity>
      </View>

      {fileName ? (
        <View style={styles.fileBadge}>
          <Text style={styles.fileBadgeText} numberOfLines={1}>📄 {fileName}</Text>
          <TouchableOpacity onPress={handleClearFile}>
            <Text style={styles.clearBtn}>✕</Text>
          </TouchableOpacity>
        </View>
      ) : null}

      <TextInput
        style={styles.input}
        multiline
        numberOfLines={8}
        placeholder="Paste your resume text here, or upload a file above..."
        placeholderTextColor={colors.gray[400]}
        value={value}
        onChangeText={(t) => { onChange(t); if (t === '') setFileName(''); }}
        textAlignVertical="top"
      />

      <Text style={styles.hint}>PDF · Word · PPT · Image · Text</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginBottom: spacing.md },
  labelRow: {
    flexDirection: 'row', justifyContent: 'space-between',
    alignItems: 'center', marginBottom: spacing.xs,
  },
  label: { fontSize: fontSize.sm, fontWeight: '600', color: colors.dark },
  uploadBtn: {
    borderWidth: 1, borderColor: colors.primary, borderRadius: borderRadius.sm,
    paddingHorizontal: spacing.sm, paddingVertical: 4,
  },
  uploadBtnText: { fontSize: fontSize.xs, color: colors.primary, fontWeight: '600' },
  fileBadge: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    backgroundColor: colors.primary + '18', borderRadius: borderRadius.sm,
    paddingHorizontal: spacing.sm, paddingVertical: 6, marginBottom: spacing.xs,
  },
  fileBadgeText: { fontSize: fontSize.xs, color: colors.primary, flex: 1 },
  clearBtn: { fontSize: fontSize.sm, color: colors.gray[500], paddingLeft: spacing.sm },
  input: {
    borderWidth: 1, borderColor: colors.gray[300], borderRadius: borderRadius.md,
    padding: spacing.sm, fontSize: fontSize.sm, color: colors.dark, minHeight: 150,
  },
  hint: {
    marginTop: 4, fontSize: 11, color: colors.gray[400], textAlign: 'right',
  },
});
