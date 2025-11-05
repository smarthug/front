# DCInside Clone - Frontend

디시인사이드 클론 프로젝트의 프론트엔드 애플리케이션입니다.

## 기술 스택

- **React 19** - UI 라이브러리
- **Vite** - 빌드 툴
- **React Router v6** - 라우팅
- **TanStack Query (React Query)** - 서버 상태 관리
- **Zustand** - 클라이언트 상태 관리 (인증)
- **Axios** - HTTP 클라이언트
- **Tailwind CSS** - 스타일링

## 프로젝트 구조

```
src/
├── api/              # API 클라이언트 및 엔드포인트
│   ├── client.js     # Axios 인스턴스 (JWT 인터셉터)
│   ├── auth.js       # 인증 API
│   ├── galleries.js  # 갤러리 API
│   ├── posts.js      # 게시글 API
│   └── comments.js   # 댓글 API
├── components/       # React 컴포넌트
│   ├── ui/          # 기본 UI 컴포넌트 (Button, Card, Input 등)
│   └── common/      # 공통 컴포넌트 (Header, PostCard, CommentList)
├── hooks/           # React Query 커스텀 훅
│   ├── useAuth.js
│   ├── useGalleries.js
│   ├── usePosts.js
│   └── useComments.js
├── pages/           # 페이지 컴포넌트
│   ├── GalleryListPage.jsx
│   ├── GalleryDetailPage.jsx
│   ├── PostDetailPage.jsx
│   ├── PostWritePage.jsx
│   ├── HotFeedPage.jsx
│   ├── LoginPage.jsx
│   └── RegisterPage.jsx
├── store/           # Zustand 스토어
│   └── authStore.js # 인증 상태 관리
├── types/           # TypeScript 타입 정의 (JSDoc)
│   └── index.js
└── utils/           # 유틸리티 함수
```

## 주요 기능

### 1. 익명 게시 시스템
- 로그인 없이 닉네임으로 게시글/댓글 작성 가능
- 로그인 유저는 자동으로 author 설정

### 2. React Query 캐싱 전략
```javascript
// 갤러리 목록 - 5분 캐시
['galleries']

// 특정 갤러리 - 5분 캐시
['galleries', slug]

// 게시글 목록 - 1분 캐시
['posts', { gallery: slug }]

// 특정 게시글 - 1분 캐시
['posts', postId]

// 핫 게시글 - 2분 캐시
['posts', 'hot']

// 댓글 목록 - 30초 캐시
['comments', postId]
```

### 3. Optimistic Updates
- 게시글/댓글 추천/비추천 시 즉시 UI 업데이트
- 에러 발생 시 자동 롤백
- 댓글 작성 시 optimistic update 적용

### 4. JWT 인증
- Axios 인터셉터를 통한 자동 토큰 첨부
- 401 에러 시 자동 토큰 리프레시
- Zustand persist로 로그인 상태 유지

## 라우트

| 경로 | 설명 |
|------|------|
| `/` | 갤러리 목록 |
| `/hot` | 핫게시물 피드 |
| `/login` | 로그인 |
| `/register` | 회원가입 |
| `/g/:slug` | 갤러리 상세 (게시글 목록) |
| `/g/:slug/write` | 게시글 작성 |
| `/g/:slug/:postId` | 게시글 상세 |
| `/g/:slug/:postId/edit` | 게시글 수정 |

## 환경 변수

`.env` 파일을 생성하고 다음 변수를 설정하세요:

```env
VITE_API_BASE_URL=http://localhost:8000/api
```

## 시작하기

### 의존성 설치
```bash
npm install
```

### 개발 서버 실행
```bash
npm run dev
```

### 프로덕션 빌드
```bash
npm run build
```

### 빌드 미리보기
```bash
npm run preview
```

## API 클라이언트

### Axios 인터셉터
- **Request Interceptor**: JWT 토큰 자동 첨부
- **Response Interceptor**: 401 에러 시 토큰 자동 리프레시

```javascript
// 예시: API 호출
import apiClient from './api/client'

const response = await apiClient.get('/posts/')
```

## 상태 관리

### 서버 상태 (React Query)
- 데이터 페칭, 캐싱, 동기화
- Optimistic updates
- 자동 백그라운드 리페칭

### 클라이언트 상태 (Zustand)
- 인증 상태 (토큰, 유저 정보)
- LocalStorage에 자동 저장

## UI 컴포넌트

### 기본 컴포넌트
- `Button` - 버튼 (variants: default, secondary, outline, ghost, destructive)
- `Card` - 카드 레이아웃
- `Input` - 입력 필드
- `Textarea` - 텍스트 영역
- `Badge` - 배지
- `Skeleton` - 로딩 스켈레톤

### 공통 컴포넌트
- `Header` - 사이트 헤더
- `PostCard` - 게시글 카드
- `CommentList` - 댓글 목록 (대댓글 지원)

## 개발 가이드

### 새로운 페이지 추가
1. `src/pages/`에 페이지 컴포넌트 생성
2. `src/App.jsx`에 라우트 추가

### 새로운 API 엔드포인트 추가
1. `src/api/`에 API 함수 추가
2. `src/hooks/`에 React Query 훅 생성
3. 페이지 컴포넌트에서 훅 사용

### 타입 정의 (JSDoc)
```javascript
/**
 * @typedef {Object} Post
 * @property {number} id
 * @property {string} title
 * @property {string} content
 */
```

## 주의사항

1. **익명 게시**: 닉네임은 필수 입력
2. **이미지 업로드**: FormData 사용
3. **에러 처리**: React Query의 error 객체 활용
4. **인증**: 토큰 만료 시 자동 리프레시

## 라이센스

MIT
