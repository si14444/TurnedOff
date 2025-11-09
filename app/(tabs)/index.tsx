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
import { Border, Colors, Shadow, Spacing } from "@/constants/DesignSystem";
import { checkAndResetIfNeeded, getChecklistItems } from "@/services/storage";
import { ChecklistItem } from "@/types";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import NativeAdComponent from "@/components/ads/NativeAd";

export default function HomeScreen() {
  const colorScheme = useColorScheme();
  const insets = useSafeAreaInsets();

  // Force light mode for debugging - text visibility issue
  const theme = Colors.light;

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
        <Text style={{ color: "black" }}>첫 항목 추가하기</Text>
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
      <View
        style={[
          styles(theme).welcomeSection,
          { paddingTop: insets.top + Spacing.xl },
        ]}
      >
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
          {/* <View style={styles(theme).quickStats}>
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
          </View> */}
        </View>
      )}

      {/* Native Ad */}
      <View style={styles(theme).nativeAdContainer}>
        <NativeAdComponent />
      </View>

      {/* Quick Actions */}

      {/* Checklist Title */}
      {totalCount > 0 && (
        <View style={styles(theme).checklistHeader}>
          <Text style={styles(theme).checklistTitle}>오늘의 체크리스트</Text>
          {completedCount === totalCount && (
            <View style={styles(theme).completionBadge}>
              <Ionicons
                name="checkmark-circle"
                size={16}
                color={theme.success}
              />
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
      backgroundColor: "#F8FAFC",
    },
    listContent: {
      paddingHorizontal: 0,
      paddingBottom: Spacing.xl,
      backgroundColor: "#F8FAFC",
    },
    // Welcome Section
    welcomeSection: {
      paddingHorizontal: Spacing.xl,
      paddingTop: Spacing.xl,
      paddingBottom: Spacing.xl,
      backgroundColor: "#FFFFFF",
      borderBottomLeftRadius: 28,
      borderBottomRightRadius: 28,
      ...Shadow.md,
    },
    greetingContainer: {
      flexDirection: "row",
      alignItems: "center",
      gap: Spacing.sm,
      marginBottom: Spacing.xs,
    },
    greetingText: {
      fontSize: 28,
      color: "#000000",
      fontWeight: "700",
    },
    dateText: {
      fontSize: 16,
      color: "#333333",
    },
    // Stats Section
    statsSection: {
      paddingHorizontal: Spacing.xl,
      paddingTop: Spacing.xl,
      gap: Spacing.lg,
    },
    statCard: {
      backgroundColor: "#FFFFFF",
      padding: Spacing.xl,
      borderRadius: 20,
      borderWidth: 0,
      ...Shadow.lg,
    },
    statCardHeader: {
      flexDirection: "row",
      alignItems: "center",
      gap: Spacing.sm,
      marginBottom: Spacing.md,
    },
    statCardTitle: {
      fontSize: 14,
      color: "#666666",
      fontWeight: "500",
    },
    statCardBody: {
      gap: Spacing.sm,
    },
    statCardValue: {
      fontSize: 30,
      color: "#000000",
      fontWeight: "700",
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
      fontSize: 16,
      color: "#666666",
    },
    quickStats: {
      flexDirection: "row",
      backgroundColor: "#FFFFFF",
      borderRadius: 20,
      borderWidth: 0,
      overflow: "hidden",
      ...Shadow.lg,
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
      fontSize: 20,
      color: "#000000",
      fontWeight: "700",
    },
    quickStatLabel: {
      fontSize: 14,
      color: "#666666",
    },
    // Native Ad
    nativeAdContainer: {
      marginHorizontal: Spacing.xl,
      marginTop: Spacing.xl,
    },
    // Quick Actions
    quickActionsSection: {
      paddingHorizontal: Spacing.xl,
      paddingTop: Spacing.xl,
      gap: Spacing.lg,
    },
    sectionTitle: {
      fontSize: 16,
      color: "#000000",
      fontWeight: "600",
    },
    quickActionsGrid: {
      flexDirection: "row",
      gap: Spacing.md,
    },
    quickActionButton: {
      flex: 1,
      backgroundColor: "#FFFFFF",
      padding: Spacing.xl,
      borderRadius: 20,
      borderWidth: 0,
      alignItems: "center",
      gap: Spacing.md,
      ...Shadow.md,
    },
    quickActionIcon: {
      width: 52,
      height: 52,
      borderRadius: 16,
      alignItems: "center",
      justifyContent: "center",
    },
    quickActionText: {
      fontSize: 14,
      color: "#000000",
      fontWeight: "500",
    },
    // Checklist Header
    checklistHeader: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingHorizontal: Spacing.xl,
      paddingTop: Spacing.xl,
      paddingBottom: Spacing.md,
    },
    checklistTitle: {
      fontSize: 20,
      color: "#000000",
      fontWeight: "700",
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
      fontSize: 12,
      color: "#10B981",
      fontWeight: "600",
    },
    listEmpty: {
      flexGrow: 1,
      backgroundColor: "#F8FAFC",
    },
    itemContainer: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      backgroundColor: "#FFFFFF",
      padding: Spacing.xl,
      marginHorizontal: Spacing.xl,
      marginBottom: Spacing.md,
      borderRadius: 20,
      borderWidth: 0,
      ...Shadow.md,
    },
    itemPressed: {
      backgroundColor: "#F1F5F9",
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
      borderRadius: 14,
      borderWidth: 2,
      borderColor: "#CBD5E1",
    },
    itemContent: {
      flex: 1,
      gap: Spacing.xs,
    },
    itemName: {
      fontSize: 18,
      color: "#000000",
      fontWeight: "500",
    },
    itemNameChecked: {
      color: "#666666",
    },
    timeContainer: {
      flexDirection: "row",
      alignItems: "center",
      gap: Spacing.xs,
    },
    checkedTime: {
      fontSize: 14,
      color: "#666666",
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
      fontSize: 20,
      color: "#000000",
      marginBottom: Spacing.sm,
      textAlign: "center",
      fontWeight: "600",
    },
    emptySubtext: {
      fontSize: 16,
      color: "#666666",
      textAlign: "center",
      lineHeight: 24,
      marginBottom: Spacing["2xl"],
    },
    emptyButton: {
      flexDirection: "row",
      alignItems: "center",
      gap: Spacing.sm,
      backgroundColor: "#2563EB",
      paddingVertical: Spacing.lg,
      paddingHorizontal: Spacing["2xl"],
      borderRadius: 16,
      ...Shadow.lg,
    },
    emptyButtonText: {
      fontSize: 16,
      color: "#FFFFFF",
      fontWeight: "600",
    },
  });
