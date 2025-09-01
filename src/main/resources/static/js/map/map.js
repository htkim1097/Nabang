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

// 집 아이콘
const roomIcon = new ol.style.Style({
    image: new ol.style.Icon({
        anchor: [0.5, 1],
        src: '/assets/images/room-logo.png',
        scale: 0.05
    }),
});

// 지도 이동/확대/축소 후 호출
map.on('moveend', async () => {
     await updateVisibleRooms();
});

document.addEventListener('visibilitychange', async () => {
    if (document.visibilityState === 'visible') {
        await updateVisibleRooms();
    }
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

async function updateVisibleRooms() {
    // 실제 보이는 맵 영역
    const extent = map.getView().calculateExtent(map.getSize());
    const bottomLeft = ol.proj.toLonLat([extent[0], extent[1]]);
    const topRight = ol.proj.toLonLat([extent[2], extent[3]]);

    const response = await fetch(`/api/rooms`);

    if (response.ok){
        const allRooms = await response.json();

        // 범위 내 매물 필터링
        const visibleRooms = allRooms.filter(room => {
            return (
                room.longitude >= bottomLeft[0] &&
                room.longitude <= topRight[0] &&
                room.latitude >= bottomLeft[1] &&
                room.latitude <= topRight[1]
            );
        });

        const vectorSource = new ol.source.Vector();
        const vectorLayer = new ol.layer.Vector({
            source: vectorSource,
        });

        // 기존 마커 클리어
        vectorSource.clear();

        // 필터된 매물 마커 생성
        visibleRooms.forEach(room => {
            const feature = new ol.Feature({
                geometry: new ol.geom.Point(ol.proj.fromLonLat([room.longitude, room.latitude])),
                roomId: room.roomId,
            });
            feature.setStyle(roomIcon);
            vectorSource.addFeature(feature);
        });

        if (map.getLayers().getArray().includes(vectorLayer)) {
            map.removeLayer(vectorLayer);
        }

        map.addLayer(vectorLayer);
    } else {
        console.error("서버에서 매물 데이터를 불러오지 못했습니다.");
    }
}