/**
 * Checklist Management Screen - Enhanced UI
 * Beautiful interface for managing checklist items
 */

import { Ionicons } from "@expo/vector-icons";
import { useFocusEffect } from "expo-router";
import React, { useCallback, useState } from "react";
import {
  Alert,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

import { useColorScheme } from "@/components/useColorScheme";
import { Colors, Shadow, Spacing } from "@/constants/DesignSystem";
import {
  createChecklistItem,
  deleteChecklistItem,
  getChecklistItems,
  updateItemPhotoRequirement,
} from "@/services/storage";
import { ChecklistItem } from "@/types";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function ManageScreen() {
  const colorScheme = useColorScheme();
  const insets = useSafeAreaInsets();
  const theme = Colors.light; // Force light mode

  const [items, setItems] = useState<ChecklistItem[]>([]);
  const [newItemName, setNewItemName] = useState("");
  const [requiresPhoto, setRequiresPhoto] = useState(true);
  const [isAdding, setIsAdding] = useState(false);

  const loadItems = async () => {
    try {
      const loadedItems = await getChecklistItems();
      setItems(loadedItems.sort((a, b) => a.order - b.order));
    } catch (error) {
      console.error("Error loading items:", error);
      Alert.alert("오류", "체크리스트를 불러오는 중 문제가 발생했습니다.");
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
      Alert.alert("입력 오류", "항목 이름을 입력해주세요.");
      return;
    }

    setIsAdding(true);
    try {
      const newItem = await createChecklistItem(trimmedName, requiresPhoto);

      if (newItem) {
        setItems([...items, newItem]);
        setNewItemName("");
        setRequiresPhoto(true); // Reset to default
      } else {
        Alert.alert("오류", "항목 추가 중 문제가 발생했습니다.");
      }
    } catch (error) {
      console.error("Error adding item:", error);
      Alert.alert("오류", "항목 추가 중 문제가 발생했습니다.");
    } finally {
      setIsAdding(false);
    }
  };

  const handleDeleteItem = (item: ChecklistItem) => {
    Alert.alert(
      "삭제 확인",
      `"${item.name}" 항목을 삭제하시겠습니까?\n이 작업은 되돌릴 수 없습니다.`,
      [
        {
          text: "취소",
          style: "cancel",
        },
        {
          text: "삭제",
          style: "destructive",
          onPress: async () => {
            try {
              const success = await deleteChecklistItem(item.id);

              if (success) {
                setItems(items.filter((i) => i.id !== item.id));
              } else {
                Alert.alert("오류", "항목 삭제 중 문제가 발생했습니다.");
              }
            } catch (error) {
              console.error("Error deleting item:", error);
              Alert.alert("오류", "항목 삭제 중 문제가 발생했습니다.");
            }
          },
        },
      ]
    );
  };

  const handleTogglePhotoRequirement = async (item: ChecklistItem) => {
    const newRequiresPhoto = !item.requiresPhoto;
    const success = await updateItemPhotoRequirement(item.id, newRequiresPhoto);
    if (success) {
      await loadItems();
    } else {
      Alert.alert("오류", "설정 변경 중 문제가 발생했습니다.");
    }
  };

  const renderItem = ({
    item,
    index,
  }: {
    item: ChecklistItem;
    index: number;
  }) => (
    <View style={styles(theme).itemWrapper}>
      <View style={styles(theme).itemContainer}>
        {/* Drag Handle */}
        <View style={styles(theme).dragHandle}>
          <Ionicons
            name="reorder-two"
            size={24}
            color={theme.onSurfaceVariant}
          />
        </View>

        {/* Item Content */}
        <View style={styles(theme).itemContent}>
          <Text style={styles(theme).itemName}>{item.name}</Text>
          <Text style={styles(theme).itemMeta}>항목 {index + 1}</Text>
        </View>

        {/* Photo Requirement Toggle - Improved UX */}
        <Pressable
          style={[
            styles(theme).toggleSwitch,
            item.requiresPhoto && styles(theme).toggleSwitchActive,
          ]}
          onPress={() => handleTogglePhotoRequirement(item)}
        >
          <View style={styles(theme).toggleOption}>
            <Ionicons
              name="camera"
              size={16}
              color={item.requiresPhoto ? "#FFFFFF" : "#94A3B8"}
            />
          </View>
          <View style={styles(theme).toggleDivider} />
          <View style={styles(theme).toggleOption}>
            <Ionicons
              name="checkmark-circle"
              size={16}
              color={!item.requiresPhoto ? "#FFFFFF" : "#94A3B8"}
            />
          </View>
          <View
            style={[
              styles(theme).toggleIndicator,
              item.requiresPhoto
                ? styles(theme).toggleIndicatorLeft
                : styles(theme).toggleIndicatorRight,
            ]}
          />
        </Pressable>

        {/* Delete Button */}
        <Pressable
          style={({ pressed }) => [
            styles(theme).deleteButton,
            pressed && styles(theme).deleteButtonPressed,
          ]}
          onPress={() => handleDeleteItem(item)}
        >
          <Ionicons name="trash-outline" size={20} color={theme.error} />
        </Pressable>
      </View>
    </View>
  );

  const renderEmpty = () => (
    <View style={styles(theme).emptyContainer}>
      <View style={styles(theme).emptyIconContainer}>
        <Ionicons
          name="list-outline"
          size={80}
          color={theme.primary}
          opacity={0.3}
        />
      </View>
      <Text style={styles(theme).emptyTitle}>아직 항목이 없어요</Text>
      <Text style={styles(theme).emptySubtext}>
        외출 전 확인하고 싶은 항목을{"\n"}
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
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={100}
    >
      {/* List */}
      <FlatList
        style={{ paddingTop: insets.top }}
        data={items}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={
          items.length === 0
            ? styles(theme).listEmpty
            : styles(theme).listContent
        }
        ListHeaderComponent={renderHeader}
        ListEmptyComponent={renderEmpty}
        showsVerticalScrollIndicator={false}
        contentInsetAdjustmentBehavior="automatic"
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
              (!newItemName.trim() || isAdding) &&
                styles(theme).addButtonDisabled,
            ]}
            onPress={handleAddItem}
            disabled={!newItemName.trim() || isAdding}
          >
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
      backgroundColor: "#F8FAFC",
    },
    listContent: {
      paddingHorizontal: 0,
      paddingTop: Spacing.lg,
      paddingBottom: 200, // Extra padding to avoid banner ad
    },
    listEmpty: {
      flexGrow: 1,
    },
    headerContainer: {
      marginBottom: Spacing.lg,
      marginHorizontal: Spacing.xl,
    },
    headerTitle: {
      fontSize: 24,
      color: "#000000",
      fontWeight: "700",
      marginBottom: Spacing.xs,
    },
    headerSubtitle: {
      fontSize: 14,
      color: "#666666",
    },
    itemWrapper: {
      marginBottom: Spacing.md,
      marginHorizontal: Spacing.xl,
    },
    itemContainer: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: "#FFFFFF",
      padding: Spacing.xl,
      borderRadius: 20,
      borderWidth: 0,
      ...Shadow.lg,
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
      fontSize: 18,
      color: "#000000",
      fontWeight: "600",
    },
    itemMeta: {
      fontSize: 13,
      color: "#999999",
    },
    toggleSwitch: {
      position: "relative",
      flexDirection: "row",
      alignItems: "center",
      width: 72,
      height: 36,
      backgroundColor: "#F1F5F9",
      borderRadius: 18,
      marginRight: Spacing.sm,
      overflow: "hidden",
    },
    toggleSwitchActive: {
      backgroundColor: "#E0E7FF",
    },
    toggleOption: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      zIndex: 2,
    },
    toggleDivider: {
      width: 1,
      height: 20,
      backgroundColor: "#CBD5E1",
      zIndex: 2,
    },
    toggleIndicator: {
      position: "absolute",
      width: 36,
      height: 36,
      backgroundColor: "#2563EB",
      borderRadius: 18,
      zIndex: 1,
      ...Shadow.md,
    },
    toggleIndicatorLeft: {
      left: 0,
    },
    toggleIndicatorRight: {
      right: 0,
    },
    deleteButton: {
      padding: Spacing.md,
      borderRadius: 12,
      backgroundColor: "#FEE2E2",
      marginLeft: Spacing.sm,
    },
    deleteButtonPressed: {
      backgroundColor: "#FCA5A5",
      transform: [{ scale: 0.95 }],
    },
    emptyContainer: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      padding: Spacing["4xl"],
      paddingTop: Spacing["8xl"],
    },
    emptyIconContainer: {
      width: 120,
      height: 120,
      borderRadius: 60,
      backgroundColor: "#F1F5F9",
      alignItems: "center",
      justifyContent: "center",
      marginBottom: Spacing["2xl"],
    },
    emptyTitle: {
      fontSize: 22,
      color: "#000000",
      marginBottom: Spacing.sm,
      textAlign: "center",
      fontWeight: "700",
    },
    emptySubtext: {
      fontSize: 16,
      color: "#666666",
      textAlign: "center",
      lineHeight: 24,
    },
    addSection: {
      padding: Spacing.lg,
      paddingBottom: Spacing.xl,
      marginBottom: 60, // Space for banner ad
      backgroundColor: "#FFFFFF",
      borderTopWidth: 1,
      borderTopColor: "#E2E8F0",
      ...Shadow.lg,
    },
    toggleContainer: {
      flexDirection: "row",
      gap: Spacing.sm,
      marginBottom: Spacing.md,
    },
    toggleButton: {
      flex: 1,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      gap: Spacing.xs,
      paddingVertical: Spacing.sm,
      paddingHorizontal: Spacing.md,
      borderRadius: 10,
      backgroundColor: "#F1F5F9",
      borderWidth: 2,
      borderColor: "#E2E8F0",
    },
    toggleButtonActive: {
      backgroundColor: "#2563EB",
      borderColor: "#2563EB",
    },
    toggleText: {
      fontSize: 14,
      fontWeight: "600",
      color: "#64748B",
    },
    toggleTextActive: {
      color: "#FFFFFF",
    },
    addInputContainer: {
      flexDirection: "row",
      gap: Spacing.sm,
      alignItems: "center",
    },
    input: {
      flex: 1,
      backgroundColor: "#FFFFFF",
      borderWidth: 2,
      borderColor: "#CBD5E1",
      borderRadius: 12,
      paddingVertical: Spacing.lg,
      paddingHorizontal: Spacing.lg,
      color: "#000000",
      fontSize: 16,
    },
    addButton: {
      width: 56,
      height: 56,
      backgroundColor: "#2563EB",
      borderRadius: 12,
      alignItems: "center",
      justifyContent: "center",
      ...Shadow.md,
    },
    addButtonDisabled: {
      backgroundColor: "#E2E8F0",
      ...Shadow.none,
    },
  });
