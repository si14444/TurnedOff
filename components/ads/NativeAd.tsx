import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect, useState } from "react";
import { Platform, StyleSheet, Text, View } from "react-native";
import Constants from "expo-constants";

// Google Mobile Ads Native Ad imports
import {
  NativeAd as GoogleNativeAd,
  NativeAdView,
  NativeAsset,
  NativeAssetType,
  NativeMediaView,
  TestIds,
} from "react-native-google-mobile-ads";

const adUnitId = __DEV__
  ? TestIds.NATIVE
  : Platform.select({
      ios:
        Constants.expoConfig?.extra?.EXPO_PUBLIC_IOS_NATIVE_ID ||
        process.env.EXPO_PUBLIC_IOS_NATIVE_ID ||
        "",
      android: "",
    }) || "";

function NativeAdComponentInner() {
  const [nativeAd, setNativeAd] = useState<GoogleNativeAd | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (!adUnitId) {
      console.warn("[NativeAd] No ad unit ID configured");
      return;
    }

    let ad: GoogleNativeAd | null = null;

    // Create and load native ad
    const loadAd = async () => {
      try {
        console.log("[NativeAd] Loading ad...");
        ad = await GoogleNativeAd.createForAdRequest(adUnitId, {
          requestNonPersonalizedAdsOnly: true,
        });

        console.log("[NativeAd] Ad loaded successfully");
        console.log("[NativeAd] Headline:", ad.headline);
        console.log("[NativeAd] Body:", ad.body);
        console.log("[NativeAd] Advertiser:", ad.advertiser);

        setNativeAd(ad);
        setIsLoaded(true);
      } catch (error) {
        console.error("[NativeAd] Failed to load:", error);
      }
    };

    loadAd();

    // Cleanup
    return () => {
      if (ad) {
        console.log("[NativeAd] Destroying ad");
        ad.destroy();
      }
    };
  }, []);

  if (!adUnitId || !isLoaded || !nativeAd) {
    return null;
  }

  return (
    <LinearGradient
      colors={["#FFFFFF", "#F2F2F2", "#E5E5E5"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      <NativeAdView nativeAd={nativeAd} style={styles.nativeAd}>
        {/* Main Media View with rounded corners */}
        <View style={styles.mediaContainer}>
          <NativeMediaView style={styles.mediaView} />

          {/* Ad Attribution Badge - 오버레이 */}
          <View style={styles.adBadgeContainer}>
            <LinearGradient
              colors={["rgba(120, 120, 120, 0.95)", "rgba(60, 60, 60, 0.9)"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.adBadge}
            >
              <Text style={styles.adBadgeText}>AD</Text>
            </LinearGradient>
          </View>
        </View>

        {/* Ad Content Container */}
        <View style={styles.contentContainer}>
          {/* Required: Headline (제목) */}
          {nativeAd.headline && (
            <NativeAsset assetType={NativeAssetType.HEADLINE}>
              <Text style={styles.headline} numberOfLines={2}>
                {nativeAd.headline}
              </Text>
            </NativeAsset>
          )}

          {/* Required: Body (설명) */}
          {nativeAd.body && (
            <NativeAsset assetType={NativeAssetType.BODY}>
              <Text style={styles.body} numberOfLines={2}>
                {nativeAd.body}
              </Text>
            </NativeAsset>
          )}

          {/* Advertiser */}
          {nativeAd.advertiser && (
            <View style={styles.advertiserRow}>
              <View style={styles.advertiserIcon}>
                <Text style={styles.advertiserIconText}>📢</Text>
              </View>
              <View style={styles.advertiserAsset}>
                <NativeAsset assetType={NativeAssetType.ADVERTISER}>
                  <Text style={styles.advertiser} numberOfLines={1}>
                    {nativeAd.advertiser}
                  </Text>
                </NativeAsset>
              </View>
            </View>
          )}
        </View>
      </NativeAdView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    minHeight: 190,
    borderRadius: 12,
    overflow: "hidden",
    marginVertical: 6,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 2,
  },
  nativeAd: {
    width: "100%",
    minHeight: 190,
  },
  mediaContainer: {
    width: "100%",
    height: 130,
    minHeight: 130,
    position: "relative",
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center",
  },
  mediaView: {
    width: "100%",
    height: 130,
    minHeight: 130,
    minWidth: 130,
  },
  adBadgeContainer: {
    position: "absolute",
    top: 6,
    left: 6,
  },
  adBadge: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.15,
    shadowRadius: 2,
    elevation: 1,
  },
  adBadgeText: {
    fontSize: 8,
    fontWeight: "700",
    color: "#FFFFFF",
    letterSpacing: 0.4,
  },
  contentContainer: {
    padding: 10,
    backgroundColor: "transparent",
    gap: 4,
  },
  headline: {
    fontSize: 14,
    fontWeight: "700",
    lineHeight: 18,
    marginBottom: 1,
  },
  body: {
    fontSize: 11,
    lineHeight: 15,
    marginBottom: 1,
  },
  advertiserRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginTop: 2,
  },
  advertiserIcon: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: "rgba(16, 185, 129, 0.1)",
    alignItems: "center",
    justifyContent: "center",
  },
  advertiserIconText: {
    fontSize: 9,
  },
  advertiserAsset: {
    flex: 1,
  },
  advertiser: {
    fontSize: 10,
    fontWeight: "600",
  },
});

// Export memoized component to prevent unnecessary re-renders
export const NativeAdComponent = React.memo(NativeAdComponentInner);
