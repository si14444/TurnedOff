/**
 * App Open Ad Component
 * Shows ad when app is opened or resumed from background
 */

import { useEffect, useRef } from 'react';
import { AppState, AppStateStatus } from 'react-native';
import { AppOpenAd, AdEventType, TestIds } from 'react-native-google-mobile-ads';
import { AdUnitIds } from '@/config/admob';

let appOpenAd: AppOpenAd | null = null;
let isAdLoading = false;
let isAdShowing = false;

// Load the ad
const loadAd = () => {
  if (isAdLoading || appOpenAd) {
    return;
  }

  isAdLoading = true;

  const adUnitId = AdUnitIds.appOpen || TestIds.APP_OPEN;

  appOpenAd = AppOpenAd.createForAdRequest(adUnitId, {
    requestNonPersonalizedAdsOnly: false,
  });

  appOpenAd.addAdEventListener(AdEventType.LOADED, () => {
    console.log('App open ad loaded');
    isAdLoading = false;
  });

  appOpenAd.addAdEventListener(AdEventType.ERROR, (error) => {
    console.log('App open ad failed to load:', error);
    isAdLoading = false;
    appOpenAd = null;
  });

  appOpenAd.addAdEventListener(AdEventType.OPENED, () => {
    console.log('App open ad opened');
    isAdShowing = true;
  });

  appOpenAd.addAdEventListener(AdEventType.CLOSED, () => {
    console.log('App open ad closed');
    isAdShowing = false;
    appOpenAd = null;
    // Load next ad
    loadAd();
  });

  appOpenAd.load();
};

// Show the ad
const showAd = () => {
  if (appOpenAd && !isAdShowing) {
    appOpenAd.show();
  } else if (!isAdLoading) {
    loadAd();
  }
};

/**
 * Hook to manage App Open Ads
 * Automatically loads and shows ads when app becomes active
 */
export const useAppOpenAd = () => {
  const appState = useRef(AppState.currentState);

  useEffect(() => {
    // Load ad on mount
    loadAd();

    // Handle app state changes
    const subscription = AppState.addEventListener('change', (nextAppState: AppStateStatus) => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === 'active'
      ) {
        // App has come to foreground
        showAd();
      }

      appState.current = nextAppState;
    });

    return () => {
      subscription.remove();
    };
  }, []);

  return {
    loadAd,
    showAd,
  };
};
