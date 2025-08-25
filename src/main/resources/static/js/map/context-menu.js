const contextMenu = document.getElementById('context-menu');

// 우클릭 메뉴 띄우기
map.getViewport().addEventListener('contextmenu', function(evt) {
    evt.preventDefault();  // 기본 메뉴 차단

    // 클릭 위치의 좌표 (EPSG:3857)
    const pixel = map.getEventPixel(evt);
    const coordinate = map.getCoordinateFromPixel(pixel);

    console.log(`클릭 위치 위도: ${coordinate[1].toFixed(6)}, 경도: ${coordinate[0].toFixed(6)}`);

    // 메뉴 위치 지정
    contextMenu.style.left = evt.clientX + 'px';
    contextMenu.style.top = evt.clientY + 'px';
    contextMenu.style.display = 'block';

    // 좌표 저장 (클릭한 위치)
    contextMenu.dataset.coordinate = coordinate;

});

// 지도 클릭 시 메뉴 숨기기
map.on('click', () => {
    contextMenu.style.display = 'none';
});

// 드래그 시 메뉴 숨기기
map.on('pointerdrag', () => {
    contextMenu.style.display = 'none';
});

// 상세보기 버튼 클릭 이벤트
document.getElementById('detail-btn').addEventListener('click', () => {
    console.log("방 상세보기 기능을 추가해주세요..")
});

// 방 추가하기 버튼 클릭 이벤트
document.getElementById('add-btn').addEventListener('click', () => {
    console.log("방 추가하기 기능을 추가해주세요..")
});
