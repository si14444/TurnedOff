/**
 * Native Ad Component
 * Google AdMob native ad with custom styling
 */

import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { BannerAd, BannerAdSize } from 'react-native-google-mobile-ads';
import { AdUnitIds } from '@/config/admob';
import { Colors, Spacing, Border, Shadow } from '@/constants/DesignSystem';
import { useColorScheme } from '@/components/useColorScheme';
import { Ionicons } from '@expo/vector-icons';

interface NativeAdComponentProps {
  style?: any;
}

export default function NativeAdComponent({ style }: NativeAdComponentProps) {
  const colorScheme = useColorScheme();
  const theme = Colors.light; // Force light mode to match app
  const [isAdLoaded, setIsAdLoaded] = useState(false);

  if (!AdUnitIds.native) {
    console.warn('Native ad unit ID not configured');
    return null;
  }

  return (
    <View style={[styles.container, style]}>
      <View style={styles.adView}>
        {/* Ad Badge */}
        <View style={styles.adBadgeContainer}>
          <View style={styles.adBadge}>
            <Text style={styles.adBadgeText}>AD</Text>
          </View>
        </View>

        {/* Banner Ad - Using banner format for native ad slot */}
        <BannerAd
          unitId={AdUnitIds.native}
          size={BannerAdSize.MEDIUM_RECTANGLE}
          requestOptions={{
            requestNonPersonalizedAdsOnly: false,
          }}
          onAdLoaded={() => {
            console.log('Native ad loaded');
            setIsAdLoaded(true);
          }}
          onAdFailedToLoad={(error) => {
            console.log('Native ad failed to load:', error);
            setIsAdLoaded(false);
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
  },
  adView: {
    backgroundColor: '#F8FAFC',
    borderRadius: 20,
    padding: Spacing.lg,
    alignItems: 'center',
    justifyContent: 'center',
    ...Shadow.md,
  },
  adBadgeContainer: {
    position: 'absolute',
    top: Spacing.sm,
    right: Spacing.sm,
    zIndex: 10,
  },
  adBadge: {
    backgroundColor: '#64748B',
    paddingHorizontal: Spacing.sm,
    paddingVertical: 2,
    borderRadius: Border.radius.sm,
  },
  adBadgeText: {
    fontSize: 10,
    color: '#FFFFFF',
    fontWeight: '700',
  },
});
