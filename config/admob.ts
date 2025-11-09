/**
 * AdMob Configuration
 * Ad unit IDs for different ad formats
 */

import { Platform } from 'react-native';
import Constants from 'expo-constants';

// Get ad unit IDs from environment variables
const IOS_BANNER_ID = Constants.expoConfig?.extra?.EXPO_PUBLIC_IOS_BANNER_ID || process.env.EXPO_PUBLIC_IOS_BANNER_ID;
const IOS_NATIVE_ID = Constants.expoConfig?.extra?.EXPO_PUBLIC_IOS_NATIVE_ID || process.env.EXPO_PUBLIC_IOS_NATIVE_ID;
const IOS_OPENING_ID = Constants.expoConfig?.extra?.EXPO_PUBLIC_IOS_OPENING_ID || process.env.EXPO_PUBLIC_IOS_OPENING_ID;

// Test ad unit IDs for Android (replace with real IDs when you have them)
const ANDROID_BANNER_ID = 'ca-app-pub-3940256099942544/6300978111'; // Test ID
const ANDROID_NATIVE_ID = 'ca-app-pub-3940256099942544/2247696110'; // Test ID
const ANDROID_OPENING_ID = 'ca-app-pub-3940256099942544/3419835294'; // Test ID

export const AdUnitIds = {
  banner: Platform.select({
    ios: IOS_BANNER_ID,
    android: ANDROID_BANNER_ID,
    default: '',
  }),
  native: Platform.select({
    ios: IOS_NATIVE_ID,
    android: ANDROID_NATIVE_ID,
    default: '',
  }),
  appOpen: Platform.select({
    ios: IOS_OPENING_ID,
    android: ANDROID_OPENING_ID,
    default: '',
  }),
};

// Test device IDs (add your test device IDs here)
export const testDeviceIds = [
  '__DEVICE__', // Your test device
];
