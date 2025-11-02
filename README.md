# TurnedOff

외출 전 체크리스트를 사진으로 인증하는 React Native 앱

## 📱 앱 개요

**TurnedOff**는 외출하기 전에 확인해야 할 항목들을 사진으로 인증하여 안심하고 외출할 수 있도록 돕는 앱입니다.

### 주요 기능

- ✅ **사진 인증**: 각 체크리스트 항목을 사진으로 촬영하여 확인
- 🔄 **자동 초기화**: 매일 자정에 자동으로 체크 상태 초기화
- 🗂️ **항목 관리**: 체크리스트 항목 추가, 삭제, 순서 변경
- 🎨 **디자인 시스템**: 연그레이 기반의 세련된 UI
- 🌓 **다크 모드**: 라이트/다크 모드 자동 지원

## 🏗️ 기술 스택

- **Framework**: React Native (Expo)
- **Language**: TypeScript
- **Navigation**: Expo Router
- **Storage**: AsyncStorage
- **Camera**: Expo Camera
- **File System**: Expo File System
- **Design**: Custom Design System (Semantic Colors)

## 📂 프로젝트 구조

```
TurnedOff/
├── app/                      # 화면 (Expo Router)
│   ├── (tabs)/              # 탭 네비게이션
│   │   ├── index.tsx        # 메인 체크리스트 화면
│   │   └── manage.tsx       # 항목 관리 화면
│   ├── camera.tsx           # 카메라 촬영 화면
│   ├── photo-view.tsx       # 사진 확인 화면
│   └── _layout.tsx          # 루트 레이아웃
├── components/              # 재사용 가능한 컴포넌트
├── constants/               # 디자인 시스템 & 상수
│   ├── DesignSystem.ts      # 디자인 토큰
│   └── ComponentStyles.ts   # 컴포넌트 스타일
├── services/                # 비즈니스 로직
│   └── storage.ts           # AsyncStorage 관리
├── types/                   # TypeScript 타입 정의
│   └── index.ts
└── doc/                     # 문서
    ├── 앱_기획서.md         # 기획 문서
    └── DESIGN_SYSTEM.md     # 디자인 시스템 문서
```

## 🚀 시작하기

### 필수 요구사항

- Node.js 18+
- npm 또는 yarn
- Expo CLI
- iOS Simulator (Mac) 또는 Android Emulator

### 설치

```bash
# 의존성 설치
npm install

# 개발 서버 시작
npm start
```

### 실행

```bash
# iOS에서 실행
npm run ios

# Android에서 실행
npm run android

# 웹에서 실행 (제한적 기능)
npm run web
```

## 📱 화면 구성

### 1. 메인 화면 (오늘의 체크리스트)

- 오늘 날짜 표시
- 완료 진행도 (n/m 완료)
- 체크리스트 항목 목록
  - 미확인 항목: 빈 체크박스, 터치 시 카메라 실행
  - 확인된 항목: 체크 표시, 확인 시간, 터치 시 사진 보기
- Pull to refresh로 새로고침

### 2. 항목 관리 화면

- 등록된 항목 목록 (드래그 가능)
- 항목 삭제 기능
- 새 항목 추가 입력 필드

### 3. 카메라 화면

- 실시간 카메라 프리뷰
- 전면/후면 카메라 전환
- 사진 촬영 후 확인/다시 찍기
- 확인 시 자동으로 체크리스트 업데이트

### 4. 사진 확인 화면

- 촬영한 인증 사진 전체 화면으로 보기
- 확대/축소 가능

## 🎨 디자인 시스템

앱은 **Semantic Design System**을 사용합니다:

```typescript
// 색상 사용 예시
import { Colors } from '@/constants/DesignSystem';

const theme = Colors.light;  // 또는 Colors.dark

backgroundColor: theme.surface       // 카드 배경
color: theme.onSurface              // 텍스트
borderColor: theme.outline          // 테두리
```

자세한 내용은 [`doc/DESIGN_SYSTEM.md`](doc/DESIGN_SYSTEM.md) 참조

## 💾 데이터 관리

### 저장 구조

모든 데이터는 AsyncStorage에 JSON 형태로 저장됩니다:

```typescript
// 체크리스트 항목
interface ChecklistItem {
  id: string;
  name: string;
  order: number;
  isChecked: boolean;
  checkedAt: string | null;
  photoUri: string | null;
  createdAt: string;
}
```

### 사진 저장

- 위치: `{documentDirectory}/photos/`
- 파일명: `{itemId}_{timestamp}.jpg`
- 품질: 80%
- 자동 삭제: 매일 자정 초기화 시

## 🔄 자동 초기화

매일 자정에 다음이 자동으로 실행됩니다:

1. 모든 항목의 체크 상태 초기화
2. 저장된 인증 사진 삭제
3. 마지막 초기화 날짜 업데이트

앱 실행 시마다 `checkAndResetIfNeeded()` 함수가 날짜를 확인하고 필요시 초기화합니다.

## 🛠️ 개발 가이드

### 새 화면 추가

```bash
# app/ 디렉토리에 새 파일 생성
touch app/new-screen.tsx

# _layout.tsx에 라우트 등록
```

### 디자인 시스템 사용

```typescript
import { Colors, Typography, Spacing, Border } from '@/constants/DesignSystem';
import { ButtonStyles, CardStyles } from '@/constants/ComponentStyles';

// 커스텀 스타일
const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.surface,
    padding: Spacing.lg,
    borderRadius: Border.radius.md,
  },
  text: {
    ...Typography.styles.bodyMedium,
    color: theme.onSurface,
  },
});
```

## 📝 TODO

- [ ] 드래그 앤 드롭으로 항목 순서 변경
- [ ] 항목별 알림 설정
- [ ] 통계 화면 (월별 완료율)
- [ ] iCloud/Google Drive 백업
- [ ] 위젯 지원

## 📄 라이선스

MIT License

## 👨‍💻 개발자

TurnedOff Design Team
