/**
 * Banner Ad Component
 * Google AdMob banner ad component
 */

import React from 'react';
import { View, StyleSheet } from 'react-native';
import { BannerAd, BannerAdSize, TestIds } from 'react-native-google-mobile-ads';
import { AdUnitIds } from '@/config/admob';

interface BannerAdComponentProps {
  size?: BannerAdSize;
  style?: any;
}

export default function BannerAdComponent({
  size = BannerAdSize.ANCHORED_ADAPTIVE_BANNER,
  style
}: BannerAdComponentProps) {
  const adUnitId = AdUnitIds.banner || TestIds.BANNER;

  if (!adUnitId) {
    console.warn('Banner ad unit ID not configured');
    return null;
  }

  return (
    <View style={[styles.container, style]}>
      <BannerAd
        unitId={adUnitId}
        size={size}
        requestOptions={{
          requestNonPersonalizedAdsOnly: false,
        }}
        onAdLoaded={() => {
          console.log('Banner ad loaded');
        }}
        onAdFailedToLoad={(error) => {
          console.log('Banner ad failed to load:', error);
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
