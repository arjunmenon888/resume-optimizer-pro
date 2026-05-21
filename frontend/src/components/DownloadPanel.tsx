import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Linking } from 'react-native';
import { colors, spacing, fontSize, borderRadius } from '../styles/theme';

interface DownloadPanelProps {
  downloadId: string;
  fileName?: string;
}

export default function DownloadPanel({ downloadId, fileName }: DownloadPanelProps) {
  const apiUrl = process.env.EXPO_PUBLIC_API_URL || 'http://localhost:8000/api';

  const handleDownload = () => {
    const url = `${apiUrl}/download/${downloadId}`;
    Linking.openURL(url);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Your optimized resume is ready!</Text>
      <TouchableOpacity style={styles.button} onPress={handleDownload}>
        <Text style={styles.buttonText}>Download Word Document</Text>
      </TouchableOpacity>
      {fileName && <Text style={styles.fileName}>{fileName}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginBottom: spacing.md, alignItems: 'center' },
  label: { fontSize: fontSize.md, fontWeight: '600', marginBottom: spacing.md, color: colors.dark },
  button: {
    backgroundColor: colors.success,
    padding: spacing.md,
    borderRadius: borderRadius.md,
    minWidth: 200,
    alignItems: 'center',
  },
  buttonText: { color: colors.white, fontSize: fontSize.md, fontWeight: 'bold' },
  fileName: { marginTop: spacing.sm, fontSize: fontSize.xs, color: colors.gray[500] },
});
