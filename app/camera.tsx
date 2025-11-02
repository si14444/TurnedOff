/**
 * Camera Screen - Enhanced UI
 * Beautiful camera interface for photo verification
 */

import React, { useState, useRef } from 'react';
import { View, Text, Pressable, Alert, StyleSheet } from 'react-native';
import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import { router, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import * as FileSystem from 'expo-file-system';

import { checkItem } from '@/services/storage';
import { Colors, Typography, Spacing, Border, Shadow } from '@/constants/DesignSystem';
import { useColorScheme } from '@/components/useColorScheme';

export default function CameraScreen() {
  const colorScheme = useColorScheme();
  const theme = colorScheme === 'dark' ? Colors.dark : Colors.light;

  const params = useLocalSearchParams<{ itemId: string; itemName: string }>();
  const { itemId, itemName } = params;

  const [facing, setFacing] = useState<CameraType>('back');
  const [permission, requestPermission] = useCameraPermissions();
  const [capturedPhoto, setCapturedPhoto] = useState<string | null>(null);
  const [isCapturing, setIsCapturing] = useState(false);
  const cameraRef = useRef<CameraView>(null);

  if (!permission) {
    return <View style={styles(theme).container} />;
  }

  if (!permission.granted) {
    return (
      <View style={styles(theme).permissionContainer}>
        <View style={styles(theme).permissionIconContainer}>
          <Ionicons name="camera-outline" size={64} color="#64748B" />
        </View>

        <Text style={styles(theme).permissionTitle}>카메라 권한 필요</Text>
        <Text style={styles(theme).permissionText}>
          체크리스트 항목을 사진으로 인증하려면{'\n'}
          카메라 접근 권한이 필요합니다
        </Text>

        <Pressable
          style={({ pressed }) => [
            styles(theme).permissionButton,
            pressed && { opacity: 0.8 },
          ]}
          onPress={requestPermission}>
          <Text style={styles(theme).permissionButtonText}>권한 허용하기</Text>
        </Pressable>
      </View>
    );
  }

  const toggleCameraFacing = () => {
    setFacing(current => (current === 'back' ? 'front' : 'back'));
  };

  const takePicture = async () => {
    if (!cameraRef.current || isCapturing) return;

    setIsCapturing(true);
    try {
      const photo = await cameraRef.current.takePictureAsync({
        quality: 0.8,
      });

      if (photo && photo.uri) {
        setCapturedPhoto(photo.uri);
      }
    } catch (error) {
      console.error('Error taking picture:', error);
      Alert.alert('오류', '사진 촬영 중 문제가 발생했습니다.');
    } finally {
      setIsCapturing(false);
    }
  };

  const retakePicture = () => {
    setCapturedPhoto(null);
  };

  const confirmPicture = async () => {
    if (!capturedPhoto || !itemId) return;

    try {
      const photosDir = `${FileSystem.documentDirectory}photos/`;
      const dirInfo = await FileSystem.getInfoAsync(photosDir);

      if (!dirInfo.exists) {
        await FileSystem.makeDirectoryAsync(photosDir, { intermediates: true });
      }

      const fileName = `${itemId}_${Date.now()}.jpg`;
      const newPath = `${photosDir}${fileName}`;

      await FileSystem.moveAsync({
        from: capturedPhoto,
        to: newPath,
      });

      const success = await checkItem(itemId, newPath);

      if (success) {
        router.back();
      } else {
        Alert.alert('오류', '항목 업데이트 중 문제가 발생했습니다.');
      }
    } catch (error) {
      console.error('Error saving photo:', error);
      Alert.alert('오류', '사진 저장 중 문제가 발생했습니다.');
    }
  };

  return (
    <View style={styles(theme).container}>
      {/* Camera View or Preview */}
      {capturedPhoto ? (
        <View style={styles(theme).previewContainer}>
          <img
            src={capturedPhoto}
            style={{ width: '100%', height: '100%', objectFit: 'contain' }}
            alt="Preview"
          />
        </View>
      ) : (
        <CameraView style={styles(theme).camera} facing={facing} ref={cameraRef}>
          {/* Top Bar */}
          <View style={styles(theme).topBar}>
            <Pressable
              style={({ pressed }) => [
                styles(theme).topButton,
                pressed && { opacity: 0.7 },
              ]}
              onPress={() => router.back()}>
              <Ionicons name="close" size={28} color="#FFFFFF" />
            </Pressable>

            <Text style={styles(theme).itemNameText}>{itemName}</Text>

            <Pressable
              style={({ pressed }) => [
                styles(theme).topButton,
                pressed && { opacity: 0.7 },
              ]}
              onPress={toggleCameraFacing}>
              <Ionicons name="camera-reverse" size={28} color="#FFFFFF" />
            </Pressable>
          </View>

          {/* Bottom Controls */}
          <View style={styles(theme).bottomBar}>
            <Pressable
              style={({ pressed }) => [
                styles(theme).captureButton,
                pressed && { opacity: 0.8 },
              ]}
              onPress={takePicture}
              disabled={isCapturing}>
              <View style={styles(theme).captureButtonInner} />
            </Pressable>
          </View>
        </CameraView>
      )}

      {/* Bottom Controls for Preview */}
      {capturedPhoto && (
        <View style={styles(theme).previewControls}>
          <Pressable
            style={({ pressed }) => [
              styles(theme).retakeButton,
              pressed && { opacity: 0.8 },
            ]}
            onPress={retakePicture}>
            <Ionicons name="refresh" size={22} color="#0F172A" />
            <Text style={styles(theme).retakeButtonText}>다시 찍기</Text>
          </Pressable>

          <Pressable
            style={({ pressed }) => [
              styles(theme).confirmButton,
              pressed && { opacity: 0.9 },
            ]}
            onPress={confirmPicture}>
            <Ionicons name="checkmark" size={22} color="#FFFFFF" />
            <Text style={styles(theme).confirmButtonText}>확인</Text>
          </Pressable>
        </View>
      )}
    </View>
  );
}

const styles = (theme: typeof Colors.light) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#000',
    },
    camera: {
      flex: 1,
    },
    topBar: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: Spacing.lg,
      paddingTop: Spacing['3xl'],
      paddingBottom: Spacing.lg,
      backgroundColor: 'rgba(0, 0, 0, 0.4)',
    },
    topButton: {
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
    bottomBar: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      paddingVertical: Spacing['3xl'],
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.4)',
    },
    captureButton: {
      width: 72,
      height: 72,
      borderRadius: 36,
      backgroundColor: 'rgba(255, 255, 255, 0.3)',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 4,
    },
    captureButtonInner: {
      width: 64,
      height: 64,
      borderRadius: 32,
      backgroundColor: '#FFFFFF',
    },
    previewContainer: {
      flex: 1,
      backgroundColor: '#000',
    },
    previewControls: {
      flexDirection: 'row',
      padding: Spacing.lg,
      backgroundColor: '#FFFFFF',
      gap: Spacing.sm,
      borderTopWidth: 1,
      borderTopColor: '#E2E8F0',
    },
    retakeButton: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: Spacing.md + 2,
      borderRadius: Border.radius.md,
      gap: Spacing.xs,
      backgroundColor: '#FFFFFF',
      borderWidth: 1.5,
      borderColor: '#CBD5E1',
    },
    retakeButtonText: {
      ...Typography.styles.labelLarge,
      color: '#0F172A',
      fontWeight: Typography.fontWeight.semibold,
    },
    confirmButton: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: Spacing.md + 2,
      borderRadius: Border.radius.md,
      gap: Spacing.xs,
      backgroundColor: '#64748B',
    },
    confirmButtonText: {
      ...Typography.styles.labelLarge,
      color: '#FFFFFF',
      fontWeight: Typography.fontWeight.semibold,
    },
    permissionContainer: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      padding: Spacing['4xl'],
      backgroundColor: '#F8FAFC',
    },
    permissionIconContainer: {
      width: 120,
      height: 120,
      borderRadius: Border.radius.full,
      backgroundColor: '#E2E8F0',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: Spacing['2xl'],
    },
    permissionTitle: {
      ...Typography.styles.headlineMedium,
      color: '#0F172A',
      fontWeight: Typography.fontWeight.bold,
      marginBottom: Spacing.md,
      textAlign: 'center',
    },
    permissionText: {
      ...Typography.styles.bodyMedium,
      color: '#64748B',
      textAlign: 'center',
      lineHeight: 24,
      marginBottom: Spacing['2xl'],
    },
    permissionButton: {
      backgroundColor: '#64748B',
      paddingVertical: Spacing.md + 2,
      paddingHorizontal: Spacing['2xl'],
      borderRadius: Border.radius.md,
    },
    permissionButtonText: {
      ...Typography.styles.labelLarge,
      color: '#FFFFFF',
      fontWeight: Typography.fontWeight.semibold,
    },
  });
