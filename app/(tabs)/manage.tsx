/**
 * Checklist Management Screen - Enhanced UI
 * Beautiful interface for managing checklist items
 */

import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  Pressable,
  TextInput,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect } from 'expo-router';

import { ChecklistItem } from '@/types';
import {
  getChecklistItems,
  createChecklistItem,
  deleteChecklistItem,
} from '@/services/storage';
import { Colors, Typography, Spacing, Border, Shadow } from '@/constants/DesignSystem';
import { useColorScheme } from '@/components/useColorScheme';

export default function ManageScreen() {
  const colorScheme = useColorScheme();
  const theme = colorScheme === 'dark' ? Colors.dark : Colors.light;

  const [items, setItems] = useState<ChecklistItem[]>([]);
  const [newItemName, setNewItemName] = useState('');
  const [isAdding, setIsAdding] = useState(false);

  const loadItems = async () => {
    try {
      const loadedItems = await getChecklistItems();
      setItems(loadedItems.sort((a, b) => a.order - b.order));
    } catch (error) {
      console.error('Error loading items:', error);
      Alert.alert('오류', '체크리스트를 불러오는 중 문제가 발생했습니다.');
    }
  };

  useFocusEffect(
    useCallback(() => {
      loadItems();
    }, [])
  );

  const handleAddItem = async () => {
    const trimmedName = newItemName.trim();

    if (!trimmedName) {
      Alert.alert('입력 오류', '항목 이름을 입력해주세요.');
      return;
    }

    setIsAdding(true);
    try {
      const newItem = await createChecklistItem(trimmedName);

      if (newItem) {
        setItems([...items, newItem]);
        setNewItemName('');
      } else {
        Alert.alert('오류', '항목 추가 중 문제가 발생했습니다.');
      }
    } catch (error) {
      console.error('Error adding item:', error);
      Alert.alert('오류', '항목 추가 중 문제가 발생했습니다.');
    } finally {
      setIsAdding(false);
    }
  };

  const handleDeleteItem = (item: ChecklistItem) => {
    Alert.alert(
      '삭제 확인',
      `"${item.name}" 항목을 삭제하시겠습니까?\n이 작업은 되돌릴 수 없습니다.`,
      [
        {
          text: '취소',
          style: 'cancel',
        },
        {
          text: '삭제',
          style: 'destructive',
          onPress: async () => {
            try {
              const success = await deleteChecklistItem(item.id);

              if (success) {
                setItems(items.filter(i => i.id !== item.id));
              } else {
                Alert.alert('오류', '항목 삭제 중 문제가 발생했습니다.');
              }
            } catch (error) {
              console.error('Error deleting item:', error);
              Alert.alert('오류', '항목 삭제 중 문제가 발생했습니다.');
            }
          },
        },
      ]
    );
  };

  const renderItem = ({ item, index }: { item: ChecklistItem; index: number }) => (
    <View style={styles(theme).itemWrapper}>
      <View style={styles(theme).itemContainer}>
        {/* Drag Handle */}
        <View style={styles(theme).dragHandle}>
          <Ionicons name="reorder-two" size={24} color={theme.onSurfaceVariant} />
        </View>

        {/* Item Content */}
        <View style={styles(theme).itemContent}>
          <Text style={styles(theme).itemName}>{item.name}</Text>
          <Text style={styles(theme).itemMeta}>항목 {index + 1}</Text>
        </View>

        {/* Delete Button */}
        <Pressable
          style={({ pressed }) => [
            styles(theme).deleteButton,
            pressed && styles(theme).deleteButtonPressed,
          ]}
          onPress={() => handleDeleteItem(item)}>
          <Ionicons name="trash-outline" size={20} color={theme.error} />
        </Pressable>
      </View>
    </View>
  );

  const renderEmpty = () => (
    <View style={styles(theme).emptyContainer}>
      <View style={styles(theme).emptyIconContainer}>
        <Ionicons name="list-outline" size={80} color={theme.primary} opacity={0.3} />
      </View>
      <Text style={styles(theme).emptyTitle}>아직 항목이 없어요</Text>
      <Text style={styles(theme).emptySubtext}>
        외출 전 확인하고 싶은 항목을{'\n'}
        아래에 추가해보세요
      </Text>
    </View>
  );

  const renderHeader = () => (
    <View style={styles(theme).headerContainer}>
      <Text style={styles(theme).headerTitle}>항목 관리</Text>
      {items.length > 0 && (
        <Text style={styles(theme).headerSubtitle}>총 {items.length}개</Text>
      )}
    </View>
  );

  return (
    <KeyboardAvoidingView
      style={styles(theme).container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={100}>
      {/* List */}
      <FlatList
        data={items}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={
          items.length === 0 ? styles(theme).listEmpty : styles(theme).listContent
        }
        ListHeaderComponent={renderHeader}
        ListEmptyComponent={renderEmpty}
        showsVerticalScrollIndicator={false}
      />

      {/* Add New Item Section */}
      <View style={styles(theme).addSection}>
        <View style={styles(theme).addInputContainer}>
          <TextInput
            style={styles(theme).input}
            value={newItemName}
            onChangeText={setNewItemName}
            placeholder="새 항목 추가 (예: 고데기, 가스밸브, 전등)"
            placeholderTextColor={theme.onSurfaceVariant}
            returnKeyType="done"
            onSubmitEditing={handleAddItem}
            editable={!isAdding}
          />

          <Pressable
            style={({ pressed }) => [
              styles(theme).addButton,
              pressed && { opacity: 0.8, transform: [{ scale: 0.95 }] },
              (!newItemName.trim() || isAdding) && styles(theme).addButtonDisabled,
            ]}
            onPress={handleAddItem}
            disabled={!newItemName.trim() || isAdding}>
            {isAdding ? (
              <Ionicons name="hourglass-outline" size={22} color="#94A3B8" />
            ) : (
              <Ionicons name="add" size={26} color="#FFFFFF" />
            )}
          </Pressable>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = (theme: typeof Colors.light) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.background,
    },
    listContent: {
      padding: Spacing.lg,
    },
    listEmpty: {
      flexGrow: 1,
    },
    headerContainer: {
      marginBottom: Spacing.lg,
      flexDirection: 'row',
      alignItems: 'baseline',
      gap: Spacing.sm,
    },
    headerTitle: {
      ...Typography.styles.headlineLarge,
      color: theme.onSurface,
      fontWeight: Typography.fontWeight.bold,
    },
    headerSubtitle: {
      ...Typography.styles.bodyLarge,
      color: theme.onSurfaceVariant,
    },
    itemWrapper: {
      marginBottom: Spacing.md,
    },
    itemContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: theme.surface,
      padding: Spacing.lg,
      borderRadius: Border.radius.lg,
      borderWidth: 1,
      borderColor: theme.outline,
      ...Shadow.sm,
    },
    dragHandle: {
      marginRight: Spacing.md,
      padding: Spacing.xs,
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
    itemMeta: {
      ...Typography.styles.bodySmall,
      color: theme.onSurfaceVariant,
    },
    deleteButton: {
      padding: Spacing.md,
      borderRadius: Border.radius.lg,
      backgroundColor: theme.errorContainer,
      marginLeft: Spacing.sm,
    },
    deleteButtonPressed: {
      backgroundColor: theme.error,
      transform: [{ scale: 0.95 }],
    },
    emptyContainer: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      padding: Spacing['4xl'],
      paddingTop: Spacing['8xl'],
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
      color: theme.onSurface,
      marginBottom: Spacing.sm,
      textAlign: 'center',
    },
    emptySubtext: {
      ...Typography.styles.bodyMedium,
      color: theme.onSurfaceVariant,
      textAlign: 'center',
      lineHeight: 24,
    },
    addSection: {
      padding: Spacing.lg,
      paddingBottom: Spacing.xl,
      backgroundColor: theme.surface,
      borderTopWidth: 1,
      borderTopColor: theme.outline,
      ...Shadow.lg,
    },
    addInputContainer: {
      flexDirection: 'row',
      gap: Spacing.sm,
      alignItems: 'center',
    },
    input: {
      ...Typography.styles.bodyMedium,
      flex: 1,
      backgroundColor: theme.surface,
      borderWidth: 2,
      borderColor: theme.outlineVariant,
      borderRadius: Border.radius.lg,
      paddingVertical: Spacing.lg,
      paddingHorizontal: Spacing.lg,
      color: theme.onSurface,
      fontSize: 16,
    },
    addButton: {
      width: 56,
      height: 56,
      backgroundColor: theme.primary,
      borderRadius: Border.radius.lg,
      alignItems: 'center',
      justifyContent: 'center',
      ...Shadow.md,
    },
    addButtonDisabled: {
      backgroundColor: theme.surfaceContainer,
      ...Shadow.none,
    },
  });
