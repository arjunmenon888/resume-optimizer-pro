import React from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { colors, spacing, fontSize } from '../styles/theme';

interface ProcessingStatusProps {
  message?: string;
}

export default function ProcessingStatus({ message = 'Processing your resume...' }: ProcessingStatusProps) {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={colors.primary} />
      <Text style={styles.text}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { alignItems: 'center', padding: spacing.xl },
  text: { marginTop: spacing.md, fontSize: fontSize.md, color: colors.gray[600] },
});
