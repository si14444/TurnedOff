/**
 * App Configuration
 * Dynamic Expo config with environment variable support
 */

export default ({ config }) => {
  return {
    ...config,
    name: "껐나?",
    slug: "TurnedOff",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/images/icon.png",
    scheme: "turnedoff",
    userInterfaceStyle: "automatic",
    newArchEnabled: true,
    splash: {
      image: "./assets/images/splash-icon.png",
      resizeMode: "contain",
      backgroundColor: "#ffffff",
    },
    ios: {
      supportsTablet: false,
      bundleIdentifier: "com.si14444.TurnedOff",
      infoPlist: {
        ITSAppUsesNonExemptEncryption: false,
      },
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/images/adaptive-icon.png",
        backgroundColor: "#ffffff",
      },
      edgeToEdgeEnabled: true,
      predictiveBackGestureEnabled: false,
      permissions: [
        "android.permission.CAMERA",
        "android.permission.RECORD_AUDIO",
        "android.permission.RECEIVE_BOOT_COMPLETED",
        "android.permission.WAKE_LOCK",
      ],
      package: "com.si14444.TurnedOff",
    },
    web: {
      bundler: "metro",
      output: "static",
      favicon: "./assets/images/favicon.png",
    },
    plugins: [
      "expo-router",
      [
        "expo-camera",
        {
          cameraPermission:
            "아맞다 앱이 체크리스트 항목을 사진으로 인증하기 위해 카메라 접근 권한이 필요합니다.",
        },
      ],
      [
        "expo-notifications",
        {
          icon: "./assets/images/icon.png",
          color: "#ffffff",
        },
      ],
      [
        "react-native-google-mobile-ads",
        {
          androidAppId: "ca-app-pub-3940256099942544~3347511713",
          iosAppId: process.env.EXPO_PUBLIC_GOOGLE_ADMOB_IOS_ID || "",
        },
      ],
      "expo-background-fetch",
      "expo-task-manager",
      "expo-web-browser",
    ],
    experiments: {
      typedRoutes: true,
    },
    extra: {
      // AdMob Ad Unit IDs
      EXPO_PUBLIC_IOS_BANNER_ID: process.env.EXPO_PUBLIC_IOS_BANNER_ID || "",
      EXPO_PUBLIC_IOS_NATIVE_ID: process.env.EXPO_PUBLIC_IOS_NATIVE_ID || "",
      EXPO_PUBLIC_IOS_OPENING_ID: process.env.EXPO_PUBLIC_IOS_OPENING_ID || "",
      EXPO_PUBLIC_GOOGLE_ADMOB_IOS_ID:
        process.env.EXPO_PUBLIC_GOOGLE_ADMOB_IOS_ID || "",
      // EAS Update
      eas: {
        projectId: "6126d0ae-3500-4209-aea9-b85db1b7880d",
      },
    },
    updates: {
      url: "https://u.expo.dev/6126d0ae-3500-4209-aea9-b85db1b7880d",
    },
    runtimeVersion: {
      policy: "appVersion",
    },
  };
};
