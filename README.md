# 경주 관광 가이드 (Gyeongju Tourism Guide)

2025 관광데이터 활용 공모전 출품작 - 천년 고도 경주의 아름다운 문화유산을 소개하는 웹앱

## 🏛️ 프로젝트 개요

경주의 풍부한 문화유산과 관광 정보를 효과적으로 제공하는 반응형 웹 애플리케이션입니다. 한국관광공사 TourAPI와 카카오 API를 활용하여 신뢰성 있는 관광 정보를 제공합니다.

## ✨ 주요 기능

- 📍 **관광지 정보**: TourAPI 기반 경주 관광지 상세 정보
- 🗺️ **지도 서비스**: 카카오맵 연동 위치 정보 및 길찾기
- 🔍 **검색 기능**: 관광지명, 주소 기반 검색
- 🌐 **다국어 지원**: 한국어/영어 지원
- ♿ **접근성**: WCAG 2.1 AA 준수
- 📱 **반응형 디자인**: 모바일 최적화

## 🛠️ 기술 스택

- **Frontend**: Next.js 14 (App Router), TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes, Server Actions
- **Database**: Supabase (PostgreSQL)
- **APIs**: 한국관광공사 TourAPI, Kakao API (지도/로컬)
- **Deployment**: Vercel
- **i18n**: next-intl

## 📋 사전 요구사항

1. **API 키 발급**:

   - [한국관광공사 TourAPI](https://www.data.go.kr/data/15101578/openapi.do) 서비스키
   - [카카오 개발자](https://developers.kakao.com/) REST API 키, 지도 API 키
   - [Supabase](https://supabase.com/) 프로젝트 생성

2. **개발 환경**:
   - Node.js 18.17 이상
   - npm 또는 yarn

## 🚀 설치 및 실행

### 1. 프로젝트 클론 및 의존성 설치

```bash
# 의존성 설치
npm install

# 또는 yarn 사용
yarn install
```

### 2. 환경 변수 설정

```bash
# .env.example을 .env.local로 복사
cp .env.example .env.local
```

`.env.local` 파일에 실제 API 키 입력:

```env
# TourAPI (한국관광공사)
TOUR_API_KEY=your_actual_tour_api_key

# Kakao API
KAKAO_REST_API_KEY=your_kakao_rest_api_key
NEXT_PUBLIC_KAKAO_MAP_KEY=your_kakao_map_api_key

# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# App Config
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 3. 데이터베이스 설정

Supabase 대시보드에서 SQL 에디터를 열고 `supabase/migrations/001_create_attractions_table.sql` 파일의 내용을 실행합니다.

### 4. 개발 서버 실행

```bash
npm run dev
# 또는
yarn dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000) 접속

## 🧪 테스트

### 기본 기능 테스트

```bash
# 타입 체크
npm run type-check

# 린트 검사
npm run lint

# 빌드 테스트
npm run build
```

### 수동 테스트 체크리스트

- [ ] 홈페이지 로딩 확인
- [ ] 관광지 목록 API 호출 확인
- [ ] 검색 기능 동작 확인
- [ ] 다국어 전환 확인 (한국어 ↔ 영어)
- [ ] 모바일 반응형 확인
- [ ] 키보드 내비게이션 확인

## 📦 배포

### Vercel 배포

1. [Vercel](https://vercel.com)에 프로젝트 연결
2. 환경 변수 설정 (`.env.local`의 모든 변수)
3. 자동 배포 완료

### 환경 변수 설정 (Vercel)

Vercel 대시보드 → Settings → Environment Variables에서 설정:

```
TOUR_API_KEY=your_actual_tour_api_key
KAKAO_REST_API_KEY=your_kakao_rest_api_key
NEXT_PUBLIC_KAKAO_MAP_KEY=your_kakao_map_api_key
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
NEXT_PUBLIC_APP_URL=https://your-domain.vercel.app
```

## 📊 성능 최적화

- **ISR (Incremental Static Regeneration)**: 관광지 데이터 캐싱
- **이미지 최적화**: Next.js Image 컴포넌트 사용
- **API 캐싱**: 응답 캐시 헤더 설정
- **번들 최적화**: 동적 임포트 및 코드 스플리팅

## ♿ 접근성 준수사항

- 시맨틱 HTML 구조
- ARIA 레이블 및 역할 정의
- 키보드 내비게이션 지원
- 색상 대비 4.5:1 이상 유지
- 스크린 리더 호환성
- Skip to main content 링크

## 📄 데이터 출처 및 라이선스

- **한국관광공사 TourAPI**: 공공누리 제1유형 (출처표시)
- **카카오 API**: 카카오 API 이용약관 준수
- 본 애플리케이션은 공공데이터를 활용한 비영리 목적의 공모전 출품작입니다.

## 🤝 기여하기

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📞 문의

프로젝트 관련 문의사항이 있으시면 이슈를 등록해 주세요.

---

**2025 관광데이터 활용 공모전 출품작**  
경주의 아름다운 문화유산을 디지털로 만나보세요 🏛️
