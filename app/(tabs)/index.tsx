/**
 * Main Checklist Screen - Enhanced UI
 * Beautiful, polished checklist with photo verification
 */

import { Ionicons } from "@expo/vector-icons";
import { router, useFocusEffect } from "expo-router";
import React, { useCallback, useEffect, useState } from "react";
import {
  Alert,
  FlatList,
  Pressable,
  RefreshControl,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { useColorScheme } from "@/components/useColorScheme";
import { Border, Colors, Shadow, Spacing, Typography } from "@/constants/DesignSystem";
import { checkAndResetIfNeeded, getChecklistItems } from "@/services/storage";
import { ChecklistItem } from "@/types";

export default function HomeScreen() {
  const colorScheme = useColorScheme();
  const theme = colorScheme === "dark" ? Colors.dark : Colors.light;

  // Initialize greeting and date immediately
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "좋은 아침이에요";
    if (hour < 18) return "좋은 오후에요";
    return "좋은 저녁이에요";
  };

  const getFormattedDate = () => {
    const today = new Date();
    return today.toLocaleDateString("ko-KR", {
      year: "numeric",
      month: "long",
      day: "numeric",
      weekday: "long",
    });
  };

  const [items, setItems] = useState<ChecklistItem[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const [currentDate, setCurrentDate] = useState(getFormattedDate());
  const [greeting, setGreeting] = useState(getGreeting());

  const loadItems = async () => {
    try {
      await checkAndResetIfNeeded();
      const loadedItems = await getChecklistItems();
      setItems(loadedItems.sort((a, b) => a.order - b.order));

      // Update greeting and date on refresh
      setCurrentDate(getFormattedDate());
      setGreeting(getGreeting());
    } catch (error) {
      console.error("Error loading items:", error);
      Alert.alert("오류", "체크리스트를 불러오는 중 문제가 발생했습니다.");
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
        pathname: "/photo-view",
        params: {
          itemId: item.id,
          itemName: item.name,
          photoUri: item.photoUri,
        },
      });
    } else {
      router.push({
        pathname: "/camera",
        params: { itemId: item.id, itemName: item.name },
      });
    }
  };

  const renderItem = ({
    item,
    index,
  }: {
    item: ChecklistItem;
    index: number;
  }) => {
    const checkedTime = item.checkedAt
      ? new Date(item.checkedAt).toLocaleTimeString("ko-KR", {
          hour: "2-digit",
          minute: "2-digit",
        })
      : null;

    return (
      <Pressable
        style={({ pressed }) => [
          styles(theme).itemContainer,
          pressed && styles(theme).itemPressed,
        ]}
        onPress={() => handleItemPress(item)}
      >
        {/* Left side: Checkbox + Content */}
        <View style={styles(theme).itemLeft}>
          {/* Animated Checkbox */}
          <View
            style={[
              styles(theme).checkbox,
              item.isChecked && styles(theme).checkboxChecked,
            ]}
          >
            {item.isChecked ? (
              <Ionicons
                name="checkmark-circle"
                size={28}
                color={theme.primary}
              />
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
              ]}
            >
              {item.name}
            </Text>
            {checkedTime && (
              <View style={styles(theme).timeContainer}>
                <Ionicons
                  name="time-outline"
                  size={14}
                  color={theme.onSurfaceVariant}
                />
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
              <Ionicons
                name="camera-outline"
                size={20}
                color={theme.onSurfaceVariant}
              />
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
        <Ionicons
          name="checkbox-outline"
          size={80}
          color={theme.primary}
          opacity={0.3}
        />
      </View>
      <Text style={styles(theme).emptyTitle}>체크리스트가 비어있어요</Text>
      <Text style={styles(theme).emptySubtext}>
        외출 전 확인할 항목을 추가해보세요{"\n"}
        고데기, 가스밸브, 전등 등
      </Text>

      {/* CTA Button */}
      <Pressable
        style={({ pressed }) => [
          styles(theme).emptyButton,
          pressed && { opacity: 0.8 },
        ]}
        onPress={() => router.push("/(tabs)/manage")}
      >
        <Ionicons name="add" size={20} color={theme.onPrimary} />
        <Text style={styles(theme).emptyButtonText}>첫 항목 추가하기</Text>
      </Pressable>
    </View>
  );

  const completedCount = items.filter((item) => item.isChecked).length;
  const totalCount = items.length;
  const progressPercentage =
    totalCount > 0 ? (completedCount / totalCount) * 100 : 0;

  const renderHeader = () => (
    <>
      {/* Welcome Section */}
      <View style={styles(theme).welcomeSection}>
        <View style={styles(theme).greetingContainer}>
          <Text style={styles(theme).greetingText}>{greeting}</Text>
          <Ionicons name="sunny" size={24} color={theme.primary} />
        </View>
        <Text style={styles(theme).dateText}>{currentDate}</Text>
      </View>

      {/* Stats Cards */}
      {totalCount > 0 && (
        <View style={styles(theme).statsSection}>
          {/* Today's Progress Card */}
          <View style={styles(theme).statCard}>
            <View style={styles(theme).statCardHeader}>
              <Ionicons name="checkmark-done" size={20} color={theme.primary} />
              <Text style={styles(theme).statCardTitle}>오늘의 완료율</Text>
            </View>
            <View style={styles(theme).statCardBody}>
              <Text style={styles(theme).statCardValue}>
                {Math.round(progressPercentage)}%
              </Text>
              <View style={styles(theme).miniProgressBar}>
                <View
                  style={[
                    styles(theme).miniProgressFill,
                    { width: `${progressPercentage}%` },
                  ]}
                />
              </View>
              <Text style={styles(theme).statCardSubtext}>
                {completedCount}/{totalCount} 완료
              </Text>
            </View>
          </View>

          {/* Quick Stats */}
          <View style={styles(theme).quickStats}>
            <View style={styles(theme).quickStatItem}>
              <Ionicons name="list" size={18} color={theme.onSurfaceVariant} />
              <Text style={styles(theme).quickStatValue}>{totalCount}</Text>
              <Text style={styles(theme).quickStatLabel}>전체 항목</Text>
            </View>
            <View style={styles(theme).quickStatDivider} />
            <View style={styles(theme).quickStatItem}>
              <Ionicons name="flame" size={18} color={theme.primary} />
              <Text style={styles(theme).quickStatValue}>{completedCount}</Text>
              <Text style={styles(theme).quickStatLabel}>완료</Text>
            </View>
          </View>
        </View>
      )}

      {/* Native Ad Placeholder */}
      <View style={styles(theme).nativeAdContainer}>
        <View style={styles(theme).adBadge}>
          <Text style={styles(theme).adBadgeText}>AD</Text>
        </View>
        <View style={styles(theme).adContent}>
          <View style={styles(theme).adIconPlaceholder}>
            <Ionicons name="cube-outline" size={32} color={theme.onSurfaceVariant} />
          </View>
          <View style={styles(theme).adTextContainer}>
            <Text style={styles(theme).adTitle}>광고 영역</Text>
            <Text style={styles(theme).adDescription}>
              네이티브 광고가 표시됩니다
            </Text>
          </View>
        </View>
      </View>

      {/* Quick Actions */}
      {totalCount > 0 && (
        <View style={styles(theme).quickActionsSection}>
          <Text style={styles(theme).sectionTitle}>빠른 실행</Text>
          <View style={styles(theme).quickActionsGrid}>
            <Pressable
              style={({ pressed }) => [
                styles(theme).quickActionButton,
                pressed && { opacity: 0.7 },
              ]}
              onPress={() => router.push("/(tabs)/manage")}
            >
              <View style={[styles(theme).quickActionIcon, { backgroundColor: theme.primaryContainer }]}>
                <Ionicons name="add" size={20} color={theme.primary} />
              </View>
              <Text style={styles(theme).quickActionText}>항목 추가</Text>
            </Pressable>

            <Pressable
              style={({ pressed }) => [
                styles(theme).quickActionButton,
                pressed && { opacity: 0.7 },
              ]}
              onPress={onRefresh}
            >
              <View style={[styles(theme).quickActionIcon, { backgroundColor: theme.secondaryContainer }]}>
                <Ionicons name="refresh" size={20} color={theme.secondary} />
              </View>
              <Text style={styles(theme).quickActionText}>새로고침</Text>
            </Pressable>
          </View>
        </View>
      )}

      {/* Checklist Title */}
      {totalCount > 0 && (
        <View style={styles(theme).checklistHeader}>
          <Text style={styles(theme).checklistTitle}>오늘의 체크리스트</Text>
          {completedCount === totalCount && (
            <View style={styles(theme).completionBadge}>
              <Ionicons name="checkmark-circle" size={16} color={theme.success} />
              <Text style={styles(theme).completionBadgeText}>완료</Text>
            </View>
          )}
        </View>
      )}
    </>
  );

  return (
    <View style={styles(theme).container}>
      <FlatList
        data={items}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={renderHeader}
        contentContainerStyle={
          items.length === 0
            ? styles(theme).listEmpty
            : styles(theme).listContent
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
    listContent: {
      paddingHorizontal: Spacing.lg,
      paddingBottom: Spacing.xl,
      backgroundColor: theme.background,
    },
    // Welcome Section
    welcomeSection: {
      padding: Spacing.xl,
      paddingTop: Spacing["2xl"],
      backgroundColor: theme.surface,
      borderBottomLeftRadius: Border.radius["2xl"],
      borderBottomRightRadius: Border.radius["2xl"],
      ...Shadow.sm,
    },
    greetingContainer: {
      flexDirection: "row",
      alignItems: "center",
      gap: Spacing.sm,
      marginBottom: Spacing.xs,
    },
    greetingText: {
      ...Typography.styles.headlineLarge,
      color: theme.onSurface,
      fontWeight: Typography.fontWeight.bold,
    },
    dateText: {
      ...Typography.styles.bodyLarge,
      color: theme.onSurfaceVariant,
    },
    // Stats Section
    statsSection: {
      paddingHorizontal: Spacing.lg,
      paddingTop: Spacing.lg,
      gap: Spacing.md,
    },
    statCard: {
      backgroundColor: theme.surface,
      padding: Spacing.lg,
      borderRadius: Border.radius.xl,
      borderWidth: 1,
      borderColor: theme.outline,
      ...Shadow.md,
    },
    statCardHeader: {
      flexDirection: "row",
      alignItems: "center",
      gap: Spacing.sm,
      marginBottom: Spacing.md,
    },
    statCardTitle: {
      ...Typography.styles.titleSmall,
      color: theme.onSurfaceVariant,
      fontWeight: Typography.fontWeight.medium,
    },
    statCardBody: {
      gap: Spacing.sm,
    },
    statCardValue: {
      ...Typography.styles.displaySmall,
      color: theme.onSurface,
      fontWeight: Typography.fontWeight.bold,
    },
    miniProgressBar: {
      height: 6,
      backgroundColor: theme.surfaceContainer,
      borderRadius: Border.radius.full,
      overflow: "hidden",
    },
    miniProgressFill: {
      height: "100%",
      backgroundColor: theme.primary,
      borderRadius: Border.radius.full,
    },
    statCardSubtext: {
      ...Typography.styles.bodyMedium,
      color: theme.onSurfaceVariant,
    },
    quickStats: {
      flexDirection: "row",
      backgroundColor: theme.surface,
      borderRadius: Border.radius.xl,
      borderWidth: 1,
      borderColor: theme.outline,
      overflow: "hidden",
      ...Shadow.sm,
    },
    quickStatItem: {
      flex: 1,
      padding: Spacing.lg,
      alignItems: "center",
      gap: Spacing.xs,
    },
    quickStatDivider: {
      width: 1,
      backgroundColor: theme.outline,
    },
    quickStatValue: {
      ...Typography.styles.titleLarge,
      color: theme.onSurface,
      fontWeight: Typography.fontWeight.bold,
    },
    quickStatLabel: {
      ...Typography.styles.bodySmall,
      color: theme.onSurfaceVariant,
    },
    // Native Ad
    nativeAdContainer: {
      marginHorizontal: Spacing.lg,
      marginTop: Spacing.lg,
      backgroundColor: theme.surfaceVariant,
      borderRadius: Border.radius.xl,
      borderWidth: 1,
      borderColor: theme.outlineVariant,
      overflow: "hidden",
      position: "relative",
    },
    adBadge: {
      position: "absolute",
      top: Spacing.sm,
      right: Spacing.sm,
      backgroundColor: theme.onSurfaceVariant,
      paddingHorizontal: Spacing.sm,
      paddingVertical: 2,
      borderRadius: Border.radius.sm,
      zIndex: 1,
    },
    adBadgeText: {
      ...Typography.styles.labelSmall,
      color: theme.surface,
      fontWeight: Typography.fontWeight.bold,
      fontSize: 10,
    },
    adContent: {
      flexDirection: "row",
      padding: Spacing.lg,
      alignItems: "center",
      gap: Spacing.md,
    },
    adIconPlaceholder: {
      width: 60,
      height: 60,
      borderRadius: Border.radius.lg,
      backgroundColor: theme.surfaceContainer,
      alignItems: "center",
      justifyContent: "center",
    },
    adTextContainer: {
      flex: 1,
      gap: Spacing.xs,
    },
    adTitle: {
      ...Typography.styles.titleMedium,
      color: theme.onSurfaceVariant,
      fontWeight: Typography.fontWeight.medium,
    },
    adDescription: {
      ...Typography.styles.bodySmall,
      color: theme.onSurfaceVariant,
      opacity: 0.7,
    },
    // Quick Actions
    quickActionsSection: {
      paddingHorizontal: Spacing.lg,
      paddingTop: Spacing.lg,
      gap: Spacing.md,
    },
    sectionTitle: {
      ...Typography.styles.titleMedium,
      color: theme.onSurface,
      fontWeight: Typography.fontWeight.semibold,
    },
    quickActionsGrid: {
      flexDirection: "row",
      gap: Spacing.md,
    },
    quickActionButton: {
      flex: 1,
      backgroundColor: theme.surface,
      padding: Spacing.lg,
      borderRadius: Border.radius.xl,
      borderWidth: 1,
      borderColor: theme.outline,
      alignItems: "center",
      gap: Spacing.sm,
      ...Shadow.sm,
    },
    quickActionIcon: {
      width: 48,
      height: 48,
      borderRadius: Border.radius.lg,
      alignItems: "center",
      justifyContent: "center",
    },
    quickActionText: {
      ...Typography.styles.labelMedium,
      color: theme.onSurface,
      fontWeight: Typography.fontWeight.medium,
    },
    // Checklist Header
    checklistHeader: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingHorizontal: Spacing.lg,
      paddingTop: Spacing.xl,
      paddingBottom: Spacing.md,
    },
    checklistTitle: {
      ...Typography.styles.titleLarge,
      color: theme.onSurface,
      fontWeight: Typography.fontWeight.bold,
    },
    completionBadge: {
      flexDirection: "row",
      alignItems: "center",
      gap: Spacing.xs,
      backgroundColor: theme.successContainer,
      paddingHorizontal: Spacing.md,
      paddingVertical: Spacing.xs,
      borderRadius: Border.radius.full,
    },
    completionBadgeText: {
      ...Typography.styles.labelSmall,
      color: theme.success,
      fontWeight: Typography.fontWeight.semibold,
    },
    listEmpty: {
      flexGrow: 1,
      backgroundColor: theme.background,
    },
    itemContainer: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      backgroundColor: theme.surface,
      padding: Spacing.lg,
      borderRadius: Border.radius.lg,
      borderWidth: 1,
      borderColor: theme.outline,
      ...Shadow.sm,
    },
    itemPressed: {
      backgroundColor: theme.surfaceContainerHigh,
      transform: [{ scale: 0.98 }],
    },
    itemLeft: {
      flexDirection: "row",
      alignItems: "center",
      flex: 1,
      gap: Spacing.md,
    },
    checkbox: {
      alignItems: "center",
      justifyContent: "center",
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
      color: theme.onSurface,
      fontWeight: Typography.fontWeight.medium,
    },
    itemNameChecked: {
      color: theme.onSurfaceVariant,
    },
    timeContainer: {
      flexDirection: "row",
      alignItems: "center",
      gap: Spacing.xs,
    },
    checkedTime: {
      ...Typography.styles.bodySmall,
      color: theme.onSurfaceVariant,
    },
    itemRight: {
      marginLeft: Spacing.sm,
    },
    photoIndicator: {
      width: 44,
      height: 44,
      borderRadius: Border.radius.lg,
      backgroundColor: theme.primaryContainer,
      alignItems: "center",
      justifyContent: "center",
    },
    cameraHint: {
      width: 44,
      height: 44,
      borderRadius: Border.radius.lg,
      backgroundColor: theme.surfaceContainer,
      alignItems: "center",
      justifyContent: "center",
    },
    emptyContainer: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      padding: Spacing["4xl"],
    },
    emptyIconContainer: {
      width: 120,
      height: 120,
      borderRadius: Border.radius.full,
      backgroundColor: theme.surfaceContainer,
      alignItems: "center",
      justifyContent: "center",
      marginBottom: Spacing["2xl"],
    },
    emptyTitle: {
      ...Typography.styles.headlineMedium,
      color: theme.onSurface,
      marginBottom: Spacing.sm,
      textAlign: "center",
    },
    emptySubtext: {
      ...Typography.styles.bodyMedium,
      color: theme.onSurfaceVariant,
      textAlign: "center",
      lineHeight: 24,
      marginBottom: Spacing["2xl"],
    },
    emptyButton: {
      flexDirection: "row",
      alignItems: "center",
      gap: Spacing.sm,
      backgroundColor: theme.primary,
      paddingVertical: Spacing.lg,
      paddingHorizontal: Spacing.xl + Spacing.sm,
      borderRadius: Border.radius.lg,
      ...Shadow.md,
    },
    emptyButtonText: {
      ...Typography.styles.labelLarge,
      color: theme.onPrimary,
      fontWeight: Typography.fontWeight.semibold,
    },
  });
