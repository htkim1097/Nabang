# 프로젝트 설명
부동산 매물 등록 및 Open API를 활용한 특화 검색 웹 페이지.
치안, 소음, 재난(침수), 상권에 대한 점수를 부여하여 사용자가 필터링한 정보대로 매물 리스트 업.

- 치안 : 주변 경찰서의 신고수로 판별. 신고수가 적을수록 점수 상승(+ 반경 Nm 내 CCTV, 경찰서 개수)
- 재난(침수) : 침수 흔적도 여부. 횟수 증가 시 점수 하락
- 상권 : n개의 가게가 될 때의 원의 반경을 통해 점수 측정. 반경이 클수록 점수 하락.
- 소음 : 반경 20m 내 음식점, 주점, 편의점, 공원의 수에 따라 점수 측정. 많을수록 점수 하락.

# 사용 Open API
1. 치안
    - 경찰서 신고 횟수, 경찰서 개수
      - 생활 안전 정보(https://safemap.go.kr/opna/data/dataList.do)
    - cctv 개수
   
2. 재난(침수)
    - 침수 흔적도
      - 생활 안전 정보(https://safemap.go.kr/opna/data/dataList.do)
    - 강수량
    - 태풍 횟수
   
3. 상권
    - 가게 정보
      - 소상공인시장진흥공단_상가(상권)정보_API(https://www.data.go.kr/data/15012005/openapi.do#/API%20%EB%AA%A9%EB%A1%9D/storeListInRadius)

4. 소음
    - 음식점, 주점, 편의점 등
      - 소상공인시장진흥공단_상가(상권)정보_API(https://www.data.go.kr/data/15012005/openapi.do#/API%20%EB%AA%A9%EB%A1%9D/storeListInRadius)
    - 공원

# 실행 방법