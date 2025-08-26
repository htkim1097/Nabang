const test_lat = 36.3484975908032;
const test_lon = 127.382156862011;

// 맵 생성 및 초기 설정
var map = new ol.Map({
    target: 'map',
    layers: [
        new ol.layer.Tile({
            source: new ol.source.OSM()
        })
    ],
    view: new ol.View({
        center: ol.proj.fromLonLat([test_lon, test_lat]),
        zoom: 17
    })
});

// 주소 검색 버튼 이벤트
document.getElementById('btnSearch').addEventListener('click', () => {
    const address = document.getElementById('address').value;

    if (!address) {
        alert('주소를 입력하세요.');
        return;
    }

    url = `/api/geocode?address=${address}`

    // Nominatim OpenStreetMap geocoding API 호출
    fetch(url)
        .then(response => response.json())
        .then(data => {
            console.log(url)
            if (!data.addresses || data.addresses.length === 0) {
                alert('검색결과가 없습니다.');
                return;
            }

            const firstResult = data.addresses[0];
            const lon = parseFloat(firstResult.x || firstResult.lon || firstResult.longitude);
            const lat = parseFloat(firstResult.y || firstResult.lat || firstResult.latitude);

            // OpenLayers 지도 이동
            map.getView().animate({
                center: ol.proj.fromLonLat([lon, lat]),
                zoom: 16,
                duration: 1000
            });
        })
        .catch(err => alert('검색 중 오류가 발생했습니다.'));

    initComponets();
});

// 주소 검색 버튼 Enter key 등록
document.getElementById('address').addEventListener('keyup', (event) => {
    if (event.key === 'Enter' || event.keyCode === 13) {
        // 엔터 키가 눌렸을 때 실행할 코드
        document.getElementById('btnSearch').click();  // 클릭 이벤트 호출

        const address = document.getElementById('address');

        initComponets();
    }
});

function initComponets() {
    address.value = '';
    document.getElementById('context-menu').style.display = 'none';
}