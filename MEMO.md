# 프로젝트 네이밍 가이드

## 1. 기본 원칙

- **일관성 유지**: 프로젝트 내 모든 네이밍은 일관된 스타일을 적용하여 유지보수성과 협업 효율을 높인다.
- **가독성 중시**: 이름은 의미가 명확하고, 읽기 쉬워야 한다.
- **영문 소문자 중심**: 대부분 소문자를 사용하며, 구분 시 스타일에 따라 하이픈(-)을 구분자로 쓴다.

---

## 2. 자바 백엔드 네이밍

### 2.1 패키지명

- 모두 소문자
- 단어 구분 시 점(.)으로 구분
- 예: `com.example.roomapp.controller.api.v1`

### 2.2 클래스명

- **파스칼 케이스(PascalCase)** 사용
- 역할을 명확히 구분하는 접미사 사용 권장 (Controller, Service, Repository, Dto 등)
- 예:
    - 컨트롤러: `RoomController`, `RoomApiController`
    - 서비스: `RoomService`, `OpenApiService`
    - 리포지토리: `RoomRepository`
    - DTO: `RoomDto`, `RoomFilterDto`

### 2.3 메서드명

- 소문자로 시작, 카멜케이스 사용
- 동사로 시작하는 명령형 권장 (getRooms, createRoom, updateRoom)

### 2.4 변수명

- 카멜케이스
- 명확한 의미를 가진 단어 조합

---

## 3. REST API URL 네이밍

- 소문자 + 하이픈(-) 사용 (kebab-case) **통일**
- 동사 대신 명사 사용 권장
- 리소스 중심 URL 작성
- 버전 관리 포함: `/api/v1/rooms`

예:
- GET `/api/v1/rooms` — 방 목록 조회
- POST `/api/v1/rooms/filter` — 필터 조건 기반 조회
- GET `/api/v1/safety-index` — 안전 지수 정보 조회

---

## 4. `resources` 폴더 내 네이밍

### 4.1 폴더명

- 소문자 + 하이픈 사용 (kebab-case) **통일**
- 예:
    - `static/`, `templates/`, `common-templates/`, `room-list/`

### 4.2 템플릿 파일명 (`*.mustache`)

- 소문자 + 하이픈 (kebab-case) **통일**
- 접두어 혹은 접미어로 화면 역할 명시 권장
- 예:
    - `index.mustache`
    - `room-list.mustache`
    - `room-detail.mustache`

### 4.3 정적 리소스 파일명 (CSS, JS, 이미지)

- 소문자 + 하이픈 (kebab-case) **통일**
- 확장자 명시 필수
- 예:
    - `main-style.css`
    - `list.js`
    - `logo.png`

---

## 5. 데이터베이스 객체 네이밍 (테이블, 컬럼)

- 소문자 + 언더스코어 (snake_case)
- 테이블명은 복수형 권장 (예: `rooms`, `locations`)
- 컬럼명도 명확하고 일관된 의미 부여

예:
- 테이블: `rooms`, `safety_indices`
- 컬럼: `room_id`, `room_type`, `deal_status`

---

## 6. 기타 권장 사항

- 약어 남용 금지 (필요 시 공식 약어만 허용)
- 공통 응답 포맷 및 예외 처리 클래스 명확하게 네이밍 (`ApiResponse`, `ErrorResponse`)
- 테스트 클래스명은 대상 클래스명 + `Test` 접미사 (`RoomServiceTest`)