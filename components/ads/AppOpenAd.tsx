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
let hasShownAdThisSession = false;

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
    // Don't auto-load next ad immediately
    // Will load on next app foreground
  });

  appOpenAd.load();
};

// Show the ad
const showAd = () => {
  // Only show once per session
  if (hasShownAdThisSession) {
    console.log('App open ad already shown this session');
    return;
  }

  if (appOpenAd && !isAdShowing) {
    appOpenAd.show();
    hasShownAdThisSession = true;
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
  const isInitialLaunch = useRef(true);

  useEffect(() => {
    let initialTimer: ReturnType<typeof setTimeout>;
    let showTimer: ReturnType<typeof setTimeout>;

    // Small delay to ensure AdMob is initialized before first load
    initialTimer = setTimeout(() => {
      if (isInitialLaunch.current && !hasShownAdThisSession) {
        isInitialLaunch.current = false;
        // Load and show ad on initial launch
        loadAd();
        // Wait a bit for ad to load before showing
        showTimer = setTimeout(() => {
          showAd();
        }, 1500);
      }
    }, 500);

    // Handle app state changes - only for background/foreground, not initial launch
    const subscription = AppState.addEventListener('change', (nextAppState: AppStateStatus) => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === 'active' &&
        !hasShownAdThisSession
      ) {
        // App has come to foreground - only show if not shown yet
        if (!appOpenAd && !isAdLoading) {
          loadAd();
          setTimeout(() => {
            showAd();
          }, 1000);
        } else {
          showAd();
        }
      }

      appState.current = nextAppState;
    });

    return () => {
      if (initialTimer) clearTimeout(initialTimer);
      if (showTimer) clearTimeout(showTimer);
      subscription.remove();
    };
  }, []);

  return {
    loadAd,
    showAd,
  };
};
