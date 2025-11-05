/**
 * Time Picker Modal Component
 * Scrollable time picker with hour and minute selection
 */

import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { Colors, Typography, Spacing, Border, Shadow } from '@/constants/DesignSystem';
import { useColorScheme } from '@/components/useColorScheme';

const ITEM_HEIGHT = 48;
const VISIBLE_ITEMS = 5;
const PICKER_HEIGHT = ITEM_HEIGHT * VISIBLE_ITEMS;

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
  const colorScheme = useColorScheme();
  const theme = colorScheme === 'dark' ? Colors.dark : Colors.light;

  const [hours, minutes] = initialTime.split(':').map(Number);
  const [selectedHour, setSelectedHour] = useState(hours);
  const [selectedMinute, setSelectedMinute] = useState(minutes);

  const hourScrollRef = useRef<ScrollView>(null);
  const minuteScrollRef = useRef<ScrollView>(null);

  // Generate arrays for hours (0-23) and minutes (0-59, step 5)
  const hoursArray = Array.from({ length: 24 }, (_, i) => i);
  const minutesArray = Array.from({ length: 12 }, (_, i) => i * 5);

  useEffect(() => {
    if (visible) {
      // Reset to initial time when modal opens
      const [h, m] = initialTime.split(':').map(Number);
      setSelectedHour(h);
      setSelectedMinute(m);

      // Scroll to initial positions after a short delay
      setTimeout(() => {
        scrollToHour(h, false);
        scrollToMinute(m, false);
      }, 100);
    }
  }, [visible, initialTime]);

  const scrollToHour = (hour: number, animated: boolean = true) => {
    hourScrollRef.current?.scrollTo({
      y: hour * ITEM_HEIGHT,
      animated,
    });
  };

  const scrollToMinute = (minute: number, animated: boolean = true) => {
    const index = Math.floor(minute / 5);
    minuteScrollRef.current?.scrollTo({
      y: index * ITEM_HEIGHT,
      animated,
    });
  };

  const handleHourScroll = (event: any) => {
    const offsetY = event.nativeEvent.contentOffset.y;
    const index = Math.round(offsetY / ITEM_HEIGHT);
    setSelectedHour(hoursArray[index] || 0);
  };

  const handleMinuteScroll = (event: any) => {
    const offsetY = event.nativeEvent.contentOffset.y;
    const index = Math.round(offsetY / ITEM_HEIGHT);
    setSelectedMinute(minutesArray[index] || 0);
  };

  const handleConfirm = () => {
    const formattedTime = `${selectedHour.toString().padStart(2, '0')}:${selectedMinute
      .toString()
      .padStart(2, '0')}`;
    onConfirm(formattedTime);
  };

  const formatHourDisplay = (hour: number): string => {
    if (hour === 0) return '오전 12시';
    if (hour < 12) return `오전 ${hour}시`;
    if (hour === 12) return '오후 12시';
    return `오후 ${hour - 12}시`;
  };

  const renderPickerItem = (value: number, isSelected: boolean, type: 'hour' | 'minute') => {
    const displayText = type === 'hour' ? formatHourDisplay(value) : `${value}분`;

    return (
      <View
        key={value}
        style={[
          styles(theme).pickerItem,
          isSelected && styles(theme).pickerItemSelected,
        ]}
      >
        <Text
          style={[
            styles(theme).pickerItemText,
            isSelected && styles(theme).pickerItemTextSelected,
          ]}
        >
          {displayText}
        </Text>
      </View>
    );
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onCancel}
    >
      <Pressable style={styles(theme).overlay} onPress={onCancel}>
        <Pressable style={styles(theme).modalContent} onPress={(e) => e.stopPropagation()}>
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
              {formatHourDisplay(selectedHour)} {selectedMinute}분
            </Text>
          </View>

          {/* Picker Container */}
          <View style={styles(theme).pickerContainer}>
            {/* Hour Picker */}
            <View style={styles(theme).pickerColumn}>
              <View style={styles(theme).pickerOverlay} pointerEvents="none">
                <View style={styles(theme).selectionIndicator} />
              </View>
              <ScrollView
                ref={hourScrollRef}
                showsVerticalScrollIndicator={false}
                snapToInterval={ITEM_HEIGHT}
                decelerationRate="fast"
                onMomentumScrollEnd={handleHourScroll}
                contentContainerStyle={{
                  paddingVertical: ITEM_HEIGHT * 2,
                }}
              >
                {hoursArray.map((hour) =>
                  renderPickerItem(hour, hour === selectedHour, 'hour')
                )}
              </ScrollView>
            </View>

            {/* Minute Picker */}
            <View style={styles(theme).pickerColumn}>
              <View style={styles(theme).pickerOverlay} pointerEvents="none">
                <View style={styles(theme).selectionIndicator} />
              </View>
              <ScrollView
                ref={minuteScrollRef}
                showsVerticalScrollIndicator={false}
                snapToInterval={ITEM_HEIGHT}
                decelerationRate="fast"
                onMomentumScrollEnd={handleMinuteScroll}
                contentContainerStyle={{
                  paddingVertical: ITEM_HEIGHT * 2,
                }}
              >
                {minutesArray.map((minute) =>
                  renderPickerItem(minute, minute === selectedMinute, 'minute')
                )}
              </ScrollView>
            </View>
          </View>

          {/* Actions */}
          <View style={styles(theme).actions}>
            <Pressable
              style={({ pressed }) => [
                styles(theme).button,
                styles(theme).cancelButton,
                pressed && { opacity: 0.7 },
              ]}
              onPress={onCancel}
            >
              <Text style={styles(theme).cancelButtonText}>취소</Text>
            </Pressable>

            <Pressable
              style={({ pressed }) => [
                styles(theme).button,
                styles(theme).confirmButton,
                pressed && { opacity: 0.9 },
              ]}
              onPress={handleConfirm}
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
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      justifyContent: 'center',
      alignItems: 'center',
      padding: Spacing.xl,
    },
    modalContent: {
      width: '100%',
      maxWidth: 400,
      backgroundColor: theme.surface,
      borderRadius: Border.radius.xl,
      overflow: 'hidden',
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
      alignItems: 'center',
      paddingVertical: Spacing.xl,
      backgroundColor: theme.surfaceContainer,
    },
    timeDisplayText: {
      ...Typography.styles.headlineMedium,
      color: theme.primary,
      fontWeight: Typography.fontWeight.bold,
    },
    pickerContainer: {
      flexDirection: 'row',
      height: PICKER_HEIGHT,
      paddingHorizontal: Spacing.lg,
      paddingVertical: Spacing.md,
    },
    pickerColumn: {
      flex: 1,
      height: PICKER_HEIGHT,
      position: 'relative',
    },
    pickerOverlay: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      justifyContent: 'center',
      zIndex: 1,
    },
    selectionIndicator: {
      height: ITEM_HEIGHT,
      backgroundColor: theme.primaryContainer,
      borderRadius: Border.radius.md,
      opacity: 0.3,
    },
    pickerItem: {
      height: ITEM_HEIGHT,
      justifyContent: 'center',
      alignItems: 'center',
    },
    pickerItemSelected: {
      // Selected item styling handled by overlay
    },
    pickerItemText: {
      ...Typography.styles.bodyLarge,
      color: theme.onSurfaceVariant,
    },
    pickerItemTextSelected: {
      ...Typography.styles.bodyLarge,
      color: theme.onSurface,
      fontWeight: Typography.fontWeight.bold,
    },
    actions: {
      flexDirection: 'row',
      gap: Spacing.md,
      padding: Spacing.lg,
      borderTopWidth: 1,
      borderTopColor: theme.outline,
    },
    button: {
      flex: 1,
      paddingVertical: Spacing.lg,
      borderRadius: Border.radius.lg,
      alignItems: 'center',
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
