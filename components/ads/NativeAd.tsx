/**
 * Native Ad Component
 * Google AdMob native ad with custom styling
 */

import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { NativeAd, NativeAdView, NativeMediaView } from 'react-native-google-mobile-ads';
import { AdUnitIds } from '@/config/admob';
import { Spacing, Border, Shadow } from '@/constants/DesignSystem';

interface NativeAdComponentProps {
  style?: any;
}

export default function NativeAdComponent({ style }: NativeAdComponentProps) {
  const [nativeAd, setNativeAd] = useState<NativeAd | null>(null);
  const [isAdLoaded, setIsAdLoaded] = useState(false);

  useEffect(() => {
    const adUnitId = AdUnitIds.native;

    if (!adUnitId) {
      console.warn('Native ad unit ID not configured');
      return;
    }

    // Load native ad
    const loadNativeAd = async () => {
      try {
        const ad = await NativeAd.createForAdRequest(adUnitId, {
          requestNonPersonalizedAdsOnly: false,
        });

        setNativeAd(ad);
        console.log('Native ad loaded successfully:', {
          headline: ad.headline,
          advertiser: ad.advertiser,
          body: ad.body,
          callToAction: ad.callToAction,
        });
        setIsAdLoaded(true);
      } catch (error) {
        console.log('Native ad failed to load:', error);
        setIsAdLoaded(false);
      }
    };

    loadNativeAd();

    return () => {
      // Cleanup
      if (nativeAd) {
        nativeAd.destroy();
      }
    };
  }, []);

  if (!isAdLoaded || !nativeAd) {
    return null;
  }

  return (
    <NativeAdView style={[styles.adView, style]} nativeAd={nativeAd}>
      {/* Ad Attribution - Must be visible and inside NativeAdView */}
      <View style={styles.adAttribution}>
        <Text style={styles.adAttributionText}>Ad</Text>
      </View>

      {/* Ad Content */}
      <View style={styles.adContent}>
        {/* Ad Header with Icon and Text */}
        <View style={styles.adHeader}>
          {nativeAd.icon?.url && (
            <Image source={{ uri: nativeAd.icon.url }} style={styles.adIcon} />
          )}
          <View style={styles.adHeaderText}>
            {nativeAd.headline && (
              <Text style={styles.adHeadline} numberOfLines={1}>
                {nativeAd.headline}
              </Text>
            )}
            {nativeAd.advertiser && (
              <Text style={styles.adAdvertiser} numberOfLines={1}>
                {nativeAd.advertiser}
              </Text>
            )}
          </View>
        </View>

        {/* Ad Body */}
        {nativeAd.body && (
          <Text style={styles.adBody} numberOfLines={2}>
            {nativeAd.body}
          </Text>
        )}

        {/* Media View (Image or Video) */}
        {nativeAd.mediaContent && (
          <NativeMediaView style={styles.adMedia} />
        )}
      </View>
    </NativeAdView>
  );
}

const styles = StyleSheet.create({
  adView: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: Spacing.md,
    ...Shadow.md,
    overflow: 'hidden',
  },
  adAttribution: {
    alignSelf: 'flex-start',
    backgroundColor: '#F3F4F6',
    borderWidth: 1,
    borderColor: '#D1D5DB',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    marginBottom: Spacing.sm,
  },
  adAttributionText: {
    fontSize: 13,
    color: '#374151',
    fontWeight: '700',
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
  adContent: {
    gap: Spacing.sm,
  },
  adHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  adIcon: {
    width: 32,
    height: 32,
    borderRadius: 6,
  },
  adHeaderText: {
    flex: 1,
  },
  adHeadline: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1E293B',
    marginBottom: 1,
  },
  adAdvertiser: {
    fontSize: 11,
    color: '#64748B',
  },
  adBody: {
    fontSize: 13,
    color: '#334155',
    lineHeight: 18,
  },
  adMedia: {
    width: '100%',
    height: 140,
    borderRadius: 10,
    backgroundColor: '#F1F5F9',
  },
});
