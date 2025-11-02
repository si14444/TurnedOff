/**
 * Photo View Screen - Enhanced UI
 * Beautiful interface for viewing verification photos
 */

import React from 'react';
import { View, Text, Pressable, Image, StyleSheet } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

import { Colors, Typography, Spacing, Border, Shadow } from '@/constants/DesignSystem';
import { useColorScheme } from '@/components/useColorScheme';

export default function PhotoViewScreen() {
  const colorScheme = useColorScheme();
  const theme = colorScheme === 'dark' ? Colors.dark : Colors.light;

  const params = useLocalSearchParams<{
    itemId: string;
    itemName: string;
    photoUri: string;
  }>();
  const { itemName, photoUri } = params;

  return (
    <View style={styles(theme).container}>
      {/* Photo Container with Gradient Overlay */}
      <View style={styles(theme).photoContainer}>
        {photoUri ? (
          <Image source={{ uri: photoUri }} style={styles(theme).photo} resizeMode="contain" />
        ) : (
          <View style={styles(theme).noPhotoContainer}>
            <View style={styles(theme).noPhotoIconContainer}>
              <Ionicons name="image-outline" size={80} color={theme.primary} opacity={0.3} />
            </View>
            <Text style={styles(theme).noPhotoTitle}>사진을 불러올 수 없습니다</Text>
            <Text style={styles(theme).noPhotoSubtext}>
              인증 사진이 삭제되었거나{'\n'}
              파일을 찾을 수 없습니다
            </Text>
          </View>
        )}

        {/* Top Bar */}
        <View style={styles(theme).topBar}>
          <Pressable
            style={({ pressed }) => [
              styles(theme).headerButton,
              pressed && { opacity: 0.7 },
            ]}
            onPress={() => router.back()}>
            <Ionicons name="close" size={28} color="#FFFFFF" />
          </Pressable>

          <Text style={styles(theme).itemNameText}>{itemName}</Text>

          <View style={{ width: 44 }} />
        </View>
      </View>
    </View>
  );
}

const styles = (theme: typeof Colors.light) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#000',
    },
    photoContainer: {
      flex: 1,
      position: 'relative',
    },
    photo: {
      width: '100%',
      height: '100%',
    },
    topBar: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: Spacing.lg,
      paddingTop: Spacing['3xl'],
      paddingBottom: Spacing.lg,
      backgroundColor: 'rgba(0, 0, 0, 0.4)',
    },
    headerButton: {
      width: 44,
      height: 44,
      borderRadius: Border.radius.full,
      backgroundColor: 'rgba(255, 255, 255, 0.2)',
      alignItems: 'center',
      justifyContent: 'center',
    },
    itemNameText: {
      ...Typography.styles.titleMedium,
      color: '#FFFFFF',
      fontWeight: Typography.fontWeight.semibold,
    },
    noPhotoContainer: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      padding: Spacing['4xl'],
      backgroundColor: theme.background,
    },
    noPhotoIconContainer: {
      width: 120,
      height: 120,
      borderRadius: Border.radius.full,
      backgroundColor: theme.surfaceContainer,
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: Spacing['2xl'],
    },
    noPhotoTitle: {
      ...Typography.styles.headlineMedium,
      color: '#0F172A',
      marginBottom: Spacing.sm,
      textAlign: 'center',
    },
    noPhotoSubtext: {
      ...Typography.styles.bodyMedium,
      color: '#64748B',
      textAlign: 'center',
      lineHeight: 24,
    },
  });
