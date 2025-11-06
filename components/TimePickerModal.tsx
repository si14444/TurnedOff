/**
 * Time Picker Modal Component
 * Using @react-native-community/datetimepicker
 */

import DateTimePicker from "@react-native-community/datetimepicker";
import React, { useState } from "react";
import {
  Modal,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

import {
  Border,
  Colors,
  Shadow,
  Spacing,
  Typography,
} from "@/constants/DesignSystem";

interface TimePickerModalProps {
  visible: boolean;
  initialTime: string; // HH:MM format
  onConfirm: (time: string) => void;
  onCancel: () => void;
}

export default function TimePickerModal({
  visible,
  initialTime,
  onConfirm,
  onCancel,
}: TimePickerModalProps) {
  const theme = Colors.light;

  // Parse initial time to Date object
  const [hours, minutes] = initialTime.split(":").map(Number);
  const initialDate = new Date();
  initialDate.setHours(hours, minutes, 0, 0);

  const [selectedDate, setSelectedDate] = useState(initialDate);
  const [showPicker, setShowPicker] = useState(Platform.OS === "ios");

  const formatTime = (date: Date): string => {
    const hour = date.getHours();
    const minute = date.getMinutes();
    const period = hour >= 12 ? "오후" : "오전";
    const displayHour = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
    return `${period} ${displayHour}시 ${minute.toString().padStart(2, "0")}분`;
  };

  const handleTimeChange = (event: any, date?: Date) => {
    if (Platform.OS === "android") {
      setShowPicker(false);

      if (event.type === "set" && date) {
        setSelectedDate(date);
        handleConfirm(date);
      } else {
        onCancel();
      }
    } else {
      if (date) {
        setSelectedDate(date);
      }
    }
  };

  const handleConfirm = (date?: Date) => {
    const finalDate = date || selectedDate;
    const hours = finalDate.getHours().toString().padStart(2, "0");
    const minutes = finalDate.getMinutes().toString().padStart(2, "0");
    const formattedTime = `${hours}:${minutes}`;
    onConfirm(formattedTime);
  };

  const handleCancel = () => {
    setShowPicker(false);
    onCancel();
  };

  // Android shows native dialog, no need for modal wrapper
  if (Platform.OS === "android") {
    return (
      <>
        {visible && showPicker && (
          <DateTimePicker
            value={selectedDate}
            mode="time"
            is24Hour={true}
            display="spinner"
            onChange={handleTimeChange}
          />
        )}
      </>
    );
  }

  // iOS shows picker in modal
  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onCancel}
    >
      <Pressable style={styles(theme).overlay} onPress={onCancel}>
        <Pressable
          style={styles(theme).modalContent}
          onPress={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <View style={styles(theme).header}>
            <Text style={styles(theme).title}>시간 선택</Text>
            <Text style={styles(theme).subtitle}>
              매일 이 시간에 체크리스트가 초기화되고 알림이 울립니다
            </Text>
          </View>

          {/* Time Display */}
          <View style={styles(theme).timeDisplay}>
            <Text style={styles(theme).timeDisplayText}>
              {formatTime(selectedDate)}
            </Text>
          </View>

          {/* Time Picker */}
          <View style={styles(theme).pickerContainer}>
            <DateTimePicker
              value={selectedDate}
              mode="time"
              is24Hour={false}
              display="spinner"
              onChange={handleTimeChange}
              textColor={theme.onSurface}
              style={styles(theme).picker}
            />
          </View>

          {/* Actions */}
          <View style={styles(theme).actions}>
            <Pressable
              style={({ pressed }) => [
                styles(theme).button,
                styles(theme).cancelButton,
                pressed && { opacity: 0.7 },
              ]}
              onPress={handleCancel}
            >
              <Text style={styles(theme).cancelButtonText}>취소</Text>
            </Pressable>

            <Pressable
              style={({ pressed }) => [
                styles(theme).button,
                styles(theme).confirmButton,
                pressed && { opacity: 0.9 },
              ]}
              onPress={() => handleConfirm()}
            >
              <Text style={styles(theme).confirmButtonText}>확인</Text>
            </Pressable>
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
}

const styles = (theme: typeof Colors.light) =>
  StyleSheet.create({
    overlay: {
      flex: 1,
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      justifyContent: "flex-end",
    },
    modalContent: {
      backgroundColor: theme.surface,
      borderTopLeftRadius: Border.radius.xl,
      borderTopRightRadius: Border.radius.xl,
      overflow: "hidden",
      ...Shadow.xl,
    },
    header: {
      padding: Spacing.xl,
      paddingBottom: Spacing.lg,
      borderBottomWidth: 1,
      borderBottomColor: theme.outline,
    },
    title: {
      ...Typography.styles.titleLarge,
      color: theme.onSurface,
      fontWeight: Typography.fontWeight.bold,
      marginBottom: Spacing.xs,
    },
    subtitle: {
      ...Typography.styles.bodyMedium,
      color: theme.onSurfaceVariant,
      lineHeight: 20,
    },
    timeDisplay: {
      alignItems: "center",
      paddingVertical: Spacing.xl,
      backgroundColor: theme.surfaceContainer,
    },
    timeDisplayText: {
      ...Typography.styles.headlineMedium,
      color: theme.primary,
      fontWeight: Typography.fontWeight.bold,
    },
    pickerContainer: {
      paddingVertical: Spacing.md,
      alignItems: "center",
    },
    picker: {
      width: "100%",
      height: 200,
    },
    actions: {
      flexDirection: "row",
      gap: Spacing.md,
      padding: Spacing.lg,
      borderTopWidth: 1,
      borderTopColor: theme.outline,
    },
    button: {
      flex: 1,
      paddingVertical: Spacing.lg,
      borderRadius: Border.radius.lg,
      alignItems: "center",
    },
    cancelButton: {
      backgroundColor: theme.surfaceContainer,
    },
    cancelButtonText: {
      ...Typography.styles.labelLarge,
      color: theme.onSurface,
      fontWeight: Typography.fontWeight.semibold,
    },
    confirmButton: {
      backgroundColor: theme.primary,
      ...Shadow.md,
    },
    confirmButtonText: {
      ...Typography.styles.labelLarge,
      color: theme.onPrimary,
      fontWeight: Typography.fontWeight.bold,
    },
  });
