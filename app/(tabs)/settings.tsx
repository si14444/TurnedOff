/**
 * Settings Screen
 * Simplified settings with single time for daily reset and notifications
 */

import { Ionicons } from "@expo/vector-icons";
import { useFocusEffect } from "@react-navigation/native";
import * as Notifications from "expo-notifications";
import React, { useState } from "react";
import {
  Alert,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  View,
  Linking,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import TimePickerModal from "@/components/TimePickerModal";
import { useColorScheme } from "@/components/useColorScheme";
import { Border, Colors, Spacing, Typography } from "@/constants/DesignSystem";
import {
  getSettings,
  updateDailyTime,
  updateNotificationSettings,
} from "@/services/storage";
import { setupNotifications } from "@/services/notifications";
import { registerDailyResetTask } from "@/services/backgroundTasks";
import { AppSettings } from "@/types";

export default function SettingsScreen() {
  const colorScheme = useColorScheme();
  const insets = useSafeAreaInsets();
  const theme = colorScheme === "dark" ? Colors.dark : Colors.light;

  const [settings, setSettings] = useState<AppSettings>({
    dailyTime: "04:00",
    notifications: {
      enabled: false,
    },
  });

  const [isLoading, setIsLoading] = useState(true);
  const [showTimePicker, setShowTimePicker] = useState(false);

  // Load settings when screen is focused
  useFocusEffect(
    React.useCallback(() => {
      loadSettings();
    }, [])
  );

  const loadSettings = async () => {
    setIsLoading(true);
    try {
      const loadedSettings = await getSettings();
      setSettings(loadedSettings);
    } catch (error) {
      console.error("Error loading settings:", error);
      Alert.alert("오류", "설정을 불러오는 중 문제가 발생했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  const formatTime = (time: string): string => {
    const [hours, minutes] = time.split(":");
    const hour = parseInt(hours, 10);
    const period = hour >= 12 ? "오후" : "오전";
    const displayHour = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
    return `${period} ${displayHour}시 ${minutes}분`;
  };

  const handleTimeConfirm = async (time: string) => {
    setSettings({ ...settings, dailyTime: time });
    setShowTimePicker(false);

    const success = await updateDailyTime(time);
    if (!success) {
      Alert.alert("오류", "설정을 저장하는 중 문제가 발생했습니다.");
      loadSettings();
      return;
    }

    // Reschedule notifications and background tasks with new time
    await setupNotifications();
    await registerDailyResetTask();
  };

  const handleNotificationToggle = async (value: boolean) => {
    if (value) {
      // 알림을 켜려고 할 때 권한 요청
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;

      if (existingStatus !== "granted") {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }

      if (finalStatus !== "granted") {
        Alert.alert(
          "알림 권한 필요",
          "알림을 받으려면 기기 설정에서 알림 권한을 허용해주세요.",
          [
            { text: "취소", style: "cancel" },
            {
              text: "설정으로 이동",
              onPress: () => Linking.openSettings(),
            },
          ]
        );
        return;
      }
    }

    // 권한이 있거나 알림을 끄는 경우 설정 저장
    const updated = { ...settings.notifications, enabled: value };
    setSettings({ ...settings, notifications: updated });

    const success = await updateNotificationSettings({ enabled: value });
    if (!success) {
      Alert.alert("오류", "설정을 저장하는 중 문제가 발생했습니다.");
      loadSettings();
      return;
    }

    // Update notification schedule
    await setupNotifications();
  };

  if (isLoading) {
    return (
      <View style={styles(theme).container}>
        <View style={styles(theme).loadingContainer}>
          <Text style={styles(theme).loadingText}>설정 불러오는 중...</Text>
        </View>
      </View>
    );
  }

  return (
    <>
      <ScrollView
        style={[styles(theme).container, { paddingTop: insets.top }]}
        contentContainerStyle={{ paddingBottom: Spacing["4xl"] }}
      >
        {/* Daily Time Section */}
        <View style={styles(theme).section}>
          <View style={styles(theme).sectionHeader}>
            <Ionicons name="time-outline" size={24} color={theme.primary} />
            <Text style={styles(theme).sectionTitle}>매일 정해진 시간</Text>
          </View>

          <View style={styles(theme).infoBox}>
            <Ionicons
              name="information-circle-outline"
              size={20}
              color={theme.onSurfaceVariant}
            />
            <Text style={styles(theme).infoBoxText}>
              매일 이 시간에 체크리스트가 초기화되고, 알림이 활성화된 경우
              알림이 울립니다
            </Text>
          </View>

          <Pressable
            style={({ pressed }) => [
              styles(theme).settingItem,
              pressed && { backgroundColor: theme.surfaceContainerHigh },
            ]}
            onPress={() => setShowTimePicker(true)}
          >
            <View style={styles(theme).settingInfo}>
              <Text style={styles(theme).settingLabel}>시간 설정</Text>
              <Text style={styles(theme).settingDescription}>
                {formatTime(settings.dailyTime)}
              </Text>
            </View>
            <Ionicons
              name="chevron-forward"
              size={20}
              color={theme.onSurfaceVariant}
            />
          </Pressable>
        </View>

        {/* Notifications Section */}
        <View style={styles(theme).section}>
          <View style={styles(theme).sectionHeader}>
            <Ionicons
              name="notifications-outline"
              size={24}
              color={theme.primary}
            />
            <Text style={styles(theme).sectionTitle}>알림</Text>
          </View>

          <View style={styles(theme).settingItem}>
            <Text style={styles(theme).settingDescription}>매일 알림 받기</Text>
            <Switch
              value={settings.notifications.enabled}
              onValueChange={handleNotificationToggle}
              trackColor={{ false: theme.outlineVariant, true: theme.primary }}
              thumbColor={Platform.OS === "ios" ? undefined : "#FFFFFF"}
            />
          </View>
        </View>

        {/* App Info Section */}
        <View style={styles(theme).appInfoSection}>
          <Text style={styles(theme).appInfoText}>
            설정은 자동으로 저장됩니다
          </Text>
          <Text style={styles(theme).appInfoTextSmall}>
            알림 권한은 기기 설정에서 변경할 수 있습니다
          </Text>
        </View>
      </ScrollView>

      {/* Time Picker Modal */}
      <TimePickerModal
        visible={showTimePicker}
        initialTime={settings.dailyTime}
        onConfirm={handleTimeConfirm}
        onCancel={() => setShowTimePicker(false)}
      />
    </>
  );
}

const styles = (theme: typeof Colors.light) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.background,
    },
    loadingContainer: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      padding: Spacing["4xl"],
    },
    loadingText: {
      ...Typography.styles.bodyLarge,
      color: theme.onSurfaceVariant,
    },
    section: {
      backgroundColor: theme.surface,
      marginTop: Spacing.lg,
      paddingVertical: Spacing.md,
      borderTopWidth: 1,
      borderBottomWidth: 1,
      borderColor: theme.outline,
    },
    sectionHeader: {
      flexDirection: "row",
      alignItems: "center",
      gap: Spacing.sm,
      paddingHorizontal: Spacing.lg,
      paddingVertical: Spacing.md,
      marginBottom: Spacing.sm,
    },
    sectionTitle: {
      ...Typography.styles.titleMedium,
      color: theme.onSurface,
      fontWeight: Typography.fontWeight.bold,
      lineHeight: 20,
    },
    settingItem: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingHorizontal: Spacing.lg,
      paddingVertical: Spacing.lg,
      gap: Spacing.md,
      borderRadius: Border.radius.md,
    },
    settingInfo: {
      flex: 1,
      gap: Spacing.xs,
    },
    settingLabel: {
      ...Typography.styles.bodyLarge,
      color: theme.onSurface,
      fontWeight: Typography.fontWeight.semibold,
    },
    settingDescription: {
      ...Typography.styles.bodyMedium,
      color: theme.onSurfaceVariant,
      lineHeight: 20,
    },
    infoBox: {
      flexDirection: "row",
      alignItems: "flex-start",
      gap: Spacing.sm,
      paddingHorizontal: Spacing.lg,
      paddingVertical: Spacing.md,
      marginHorizontal: Spacing.lg,
      marginBottom: Spacing.sm,
      backgroundColor: theme.surfaceContainer,
      borderRadius: Border.radius.md,
      borderLeftWidth: 3,
      borderLeftColor: theme.primary,
    },
    infoBoxText: {
      flex: 1,
      ...Typography.styles.bodySmall,
      color: theme.onSurfaceVariant,
      lineHeight: 18,
    },
    appInfoSection: {
      alignItems: "center",
      gap: Spacing.xs,
      padding: Spacing.xl,
      marginTop: Spacing.lg,
      marginHorizontal: Spacing.lg,
    },
    appInfoText: {
      ...Typography.styles.bodyMedium,
      color: theme.onSurfaceVariant,
      textAlign: "center",
    },
    appInfoTextSmall: {
      ...Typography.styles.bodySmall,
      color: theme.onSurfaceVariant,
      textAlign: "center",
      opacity: 0.7,
    },
  });
