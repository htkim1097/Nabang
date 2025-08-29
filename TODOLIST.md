## 25.08.20.수
- [x] 주제 선정
- [x] 관련 API 조사
- [x] FIGMA에 GUI 디자인, 흐름 설계
- [x] 상권 API 테스트
- [x] Spring boot 초기 세팅

## 25.08.21.목
- [x] ERD 작성
- [x] HomePage mustache 페이지 작성
- [x] index url 연결하기
- [x] index 홈 화면 UI 구현
- [x] 공통 레이아웃(버튼, input UI, 좌하단 Nav버튼, 좌상단 로고) 식별
- [x] header, 로고 부분 mustache 작성
- [x] Survey address 페이지 작성

## 25.08.22 금
- [x] Survey Header 분리 작성
- [x] Survey roominfo 페이지 작성
- [x] Survey roomdetail 페이지 작성
- [x] Survey 페이지들 Controller에 연결
- [x] 페이지 분류별 CSS, JS 폴더 분리

## 25.08.23 토
- [x] Survey livingindex 페이지 작성

## 25.08.25.월
- [x] RoomListPage mustache 페이지 작성
- [x] MapPage mustache 페이지 작성
- [x] Open Layer Map 도시
- [x] Naver Map Geocode API 연결(주소 검색)
- [x] 지도 우클릭 Context 메뉴 UI 구현

## 25.08.26.화
- [x] 소상공인(상권, 소음) API 데이터 테스트
- [x] 범죄 주의 구간, 침수 흔적도 wms 출력 테스트

## 25.08.28.목
- [x] RegisterModal mustache 페이지 작성
- [x] DTO, Entity 클래스 구현
- [x] DB 연결
- [x] DB에 테이블 생성
- [x] 서버에서 방 CRUD 기능 구현

## 25.08.29.금
- [x] 등록 modal UI 구현
- [x] 등록 modal 이미지 불러오기, 이미지 리스트 기능 구현
- [x] 네이버 역 지오코드 API 구독 오류남. 나중에 실행 해보기.
- [x] 방 생성 구현 -> DB 저장

- [ ] 방 생성은 됨. 값과 이미지 등의 값도 생성해서 db에 저장하기. id 연결
- [ ] 방 read 구현(지도에 도시, 리스트에 도시)




## TODO LIST
- [ ] 방 상세보기 mustache 구현
- [ ] 방 목록 pagenating 페이지 당 아이템 5개씩만 보이도록, 아이템만큼 페이지네이션 넘버링
- [ ] 시/구/동 주소지 입력 기능 구현

- [ ] 침수흔적도(재해) API 데이터 테스트 => OpenLayers에 정보는 출력되지만 그 정보를 토대로 원하는 동작은 불가.
- [ ] 범죄 주의 구간(치안) API 데이터 테스트 => OpenLayers에 정보는 출력되지만 그 정보를 토대로 원하는 동작은 불가.
- [ ] 공원(소음) API 데이터 테스트
- [ ] 좌표나 주소를 입력하면 각 생활 지수마다 점수 반환
- [ ] 방 목록 페이지에서 필터링 기능 구현
