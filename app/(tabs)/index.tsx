/**
 * Main Checklist Screen - Enhanced UI
 * Beautiful, polished checklist with photo verification
 */

import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, FlatList, Pressable, Alert, RefreshControl } from 'react-native';
import { StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router, useFocusEffect } from 'expo-router';

import { ChecklistItem } from '@/types';
import { getChecklistItems, checkAndResetIfNeeded } from '@/services/storage';
import { Colors, Typography, Spacing, Border, Shadow } from '@/constants/DesignSystem';
import { useColorScheme } from '@/components/useColorScheme';

export default function HomeScreen() {
  const colorScheme = useColorScheme();
  const theme = colorScheme === 'dark' ? Colors.dark : Colors.light;

  const [items, setItems] = useState<ChecklistItem[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const [currentDate, setCurrentDate] = useState('');

  const loadItems = async () => {
    try {
      await checkAndResetIfNeeded();
      const loadedItems = await getChecklistItems();
      setItems(loadedItems.sort((a, b) => a.order - b.order));

      const today = new Date();
      const dateStr = today.toLocaleDateString('ko-KR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        weekday: 'long',
      });
      setCurrentDate(dateStr);
    } catch (error) {
      console.error('Error loading items:', error);
      Alert.alert('오류', '체크리스트를 불러오는 중 문제가 발생했습니다.');
    }
  };

  useEffect(() => {
    loadItems();
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadItems();
    }, [])
  );

  const onRefresh = async () => {
    setRefreshing(true);
    await loadItems();
    setRefreshing(false);
  };

  const handleItemPress = (item: ChecklistItem) => {
    if (item.isChecked) {
      router.push({
        pathname: '/photo-view',
        params: { itemId: item.id, itemName: item.name, photoUri: item.photoUri },
      });
    } else {
      router.push({
        pathname: '/camera',
        params: { itemId: item.id, itemName: item.name },
      });
    }
  };

  const renderItem = ({ item, index }: { item: ChecklistItem; index: number }) => {
    const checkedTime = item.checkedAt
      ? new Date(item.checkedAt).toLocaleTimeString('ko-KR', {
          hour: '2-digit',
          minute: '2-digit',
        })
      : null;

    return (
      <Pressable
        style={({ pressed }) => [
          styles(theme).itemContainer,
          pressed && styles(theme).itemPressed,
        ]}
        onPress={() => handleItemPress(item)}>
        {/* Left side: Checkbox + Content */}
        <View style={styles(theme).itemLeft}>
          {/* Animated Checkbox */}
          <View
            style={[
              styles(theme).checkbox,
              item.isChecked && styles(theme).checkboxChecked,
            ]}>
            {item.isChecked ? (
              <Ionicons name="checkmark-circle" size={28} color={theme.primary} />
            ) : (
              <View style={styles(theme).checkboxEmpty} />
            )}
          </View>

          {/* Item Content */}
          <View style={styles(theme).itemContent}>
            <Text
              style={[
                styles(theme).itemName,
                item.isChecked && styles(theme).itemNameChecked,
              ]}>
              {item.name}
            </Text>
            {checkedTime && (
              <View style={styles(theme).timeContainer}>
                <Ionicons name="time-outline" size={14} color={theme.onSurfaceVariant} />
                <Text style={styles(theme).checkedTime}>{checkedTime}</Text>
              </View>
            )}
          </View>
        </View>

        {/* Right side: Photo indicator or Camera icon */}
        <View style={styles(theme).itemRight}>
          {item.isChecked ? (
            <View style={styles(theme).photoIndicator}>
              <Ionicons name="image" size={20} color={theme.primary} />
            </View>
          ) : (
            <View style={styles(theme).cameraHint}>
              <Ionicons name="camera-outline" size={20} color={theme.onSurfaceVariant} />
            </View>
          )}
        </View>
      </Pressable>
    );
  };

  const renderEmpty = () => (
    <View style={styles(theme).emptyContainer}>
      {/* Empty State Illustration */}
      <View style={styles(theme).emptyIconContainer}>
        <Ionicons name="checkbox-outline" size={80} color={theme.primary} opacity={0.3} />
      </View>
      <Text style={styles(theme).emptyTitle}>체크리스트가 비어있어요</Text>
      <Text style={styles(theme).emptySubtext}>
        외출 전 확인할 항목을 추가해보세요{'\n'}
        고데기, 가스밸브, 전등 등
      </Text>

      {/* CTA Button */}
      <Pressable
        style={({ pressed }) => [
          styles(theme).emptyButton,
          pressed && { opacity: 0.8 },
        ]}
        onPress={() => router.push('/(tabs)/manage')}>
        <Ionicons name="add" size={20} color={theme.onPrimary} />
        <Text style={styles(theme).emptyButtonText}>첫 항목 추가하기</Text>
      </Pressable>
    </View>
  );

  const completedCount = items.filter(item => item.isChecked).length;
  const totalCount = items.length;
  const progressPercentage = totalCount > 0 ? (completedCount / totalCount) * 100 : 0;

  return (
    <View style={styles(theme).container}>
      {/* Header */}
      <View style={styles(theme).header}>
        {/* Date */}
        <Text style={styles(theme).dateText}>{currentDate}</Text>

        {/* Progress */}
        {totalCount > 0 && (
          <View style={styles(theme).progressContainer}>
            <View style={styles(theme).progressHeader}>
              <Text style={styles(theme).progressLabel}>오늘의 진행률</Text>
              <Text style={styles(theme).progressCount}>
                {completedCount}/{totalCount}
              </Text>
            </View>

            {/* Progress Bar */}
            <View style={styles(theme).progressBar}>
              <View
                style={[
                  styles(theme).progressFill,
                  { width: `${progressPercentage}%` },
                ]}
              />
            </View>

            {/* Completion Message */}
            {completedCount === totalCount && (
              <Text style={styles(theme).completionText}>✓ 모든 항목 확인 완료!</Text>
            )}
          </View>
        )}
      </View>

      {/* List */}
      <FlatList
        data={items}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={
          items.length === 0 ? styles(theme).listEmpty : styles(theme).listContent
        }
        ListEmptyComponent={renderEmpty}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={theme.primary}
          />
        }
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = (theme: typeof Colors.light) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.background,
    },
    header: {
      padding: Spacing.xl,
      paddingBottom: Spacing.lg,
      backgroundColor: '#FFFFFF',
      borderBottomWidth: 1,
      borderBottomColor: '#F1F5F9',
    },
    dateText: {
      ...Typography.styles.headlineMedium,
      color: '#0F172A',
      fontWeight: Typography.fontWeight.bold,
      marginBottom: Spacing.lg,
    },
    progressContainer: {
      gap: Spacing.sm,
    },
    progressHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    progressLabel: {
      ...Typography.styles.bodyMedium,
      color: '#64748B',
    },
    progressCount: {
      ...Typography.styles.titleMedium,
      color: '#64748B',
      fontWeight: Typography.fontWeight.bold,
    },
    progressBar: {
      height: 6,
      backgroundColor: '#E2E8F0',
      borderRadius: Border.radius.full,
      overflow: 'hidden',
    },
    progressFill: {
      height: '100%',
      backgroundColor: '#64748B',
      borderRadius: Border.radius.full,
    },
    completionText: {
      ...Typography.styles.bodyMedium,
      color: '#10B981',
      fontWeight: Typography.fontWeight.semibold,
      marginTop: Spacing.xs,
    },
    listContent: {
      padding: Spacing.lg,
      gap: Spacing.md,
    },
    listEmpty: {
      flexGrow: 1,
    },
    itemContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      backgroundColor: '#FFFFFF',
      padding: Spacing.lg,
      borderRadius: Border.radius.md,
      borderWidth: 1,
      borderColor: '#E2E8F0',
    },
    itemPressed: {
      backgroundColor: '#F8FAFC',
    },
    itemLeft: {
      flexDirection: 'row',
      alignItems: 'center',
      flex: 1,
      gap: Spacing.md,
    },
    checkbox: {
      alignItems: 'center',
      justifyContent: 'center',
    },
    checkboxChecked: {
      // Animation placeholder
    },
    checkboxEmpty: {
      width: 28,
      height: 28,
      borderRadius: Border.radius.full,
      borderWidth: 2,
      borderColor: theme.outline,
    },
    itemContent: {
      flex: 1,
      gap: Spacing.xs,
    },
    itemName: {
      ...Typography.styles.bodyLarge,
      color: '#1E293B',
      fontWeight: Typography.fontWeight.medium,
    },
    itemNameChecked: {
      color: '#94A3B8',
    },
    timeContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: Spacing.xs,
    },
    checkedTime: {
      ...Typography.styles.bodySmall,
      color: '#94A3B8',
    },
    itemRight: {
      marginLeft: Spacing.sm,
    },
    photoIndicator: {
      width: 40,
      height: 40,
      borderRadius: Border.radius.md,
      backgroundColor: '#DBEAFE',
      alignItems: 'center',
      justifyContent: 'center',
    },
    cameraHint: {
      width: 40,
      height: 40,
      borderRadius: Border.radius.md,
      backgroundColor: '#F1F5F9',
      alignItems: 'center',
      justifyContent: 'center',
    },
    emptyContainer: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      padding: Spacing['4xl'],
    },
    emptyIconContainer: {
      width: 120,
      height: 120,
      borderRadius: Border.radius.full,
      backgroundColor: theme.surfaceContainer,
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: Spacing['2xl'],
    },
    emptyTitle: {
      ...Typography.styles.headlineMedium,
      color: '#1E293B',
      marginBottom: Spacing.sm,
      textAlign: 'center',
    },
    emptySubtext: {
      ...Typography.styles.bodyMedium,
      color: '#64748B',
      textAlign: 'center',
      lineHeight: 24,
      marginBottom: Spacing['2xl'],
    },
    emptyButton: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: Spacing.sm,
      backgroundColor: '#64748B',
      paddingVertical: Spacing.md + 2,
      paddingHorizontal: Spacing.xl,
      borderRadius: Border.radius.md,
    },
    emptyButtonText: {
      ...Typography.styles.labelLarge,
      color: '#FFFFFF',
      fontWeight: Typography.fontWeight.semibold,
    },
  });
