import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, spacing, fontSize } from '../styles/theme';

interface HeaderProps {
  title?: string;
}

export default function Header({ title = 'Resume Optimizer Pro' }: HeaderProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.primary,
    padding: spacing.md,
    alignItems: 'center',
  },
  title: {
    color: colors.white,
    fontSize: fontSize.lg,
    fontWeight: 'bold',
  },
});
