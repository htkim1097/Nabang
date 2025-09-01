
const crimeStatsParam = {
    name:'치안사고통계(전체)',
    serverUrl: 'http://www.safemap.go.kr/openApiService/wms/getLayerData.do',
    layername: 'A2SM_CRMNLSTATS',
    style: 'A2SM_CrmnlStats_Tot',
};

const fludMarkParam = {
    name: "침수흔적도",
    serverUrl: "http://www.safemap.go.kr/openApiService/wms/getLayerData.do",
    layername: "A2SM_FLUDMARKS",
    styles: "A2SM_FludMarks"
};

const crimeHotspotParam = {
    name:'범죄주의구간(전체)',
    serverUrl:'http://www.safemap.go.kr/openApiService/wms/getLayerData.do',
    layername:'A2SM_CRMNLHSPOT_TOT',
    styles:'A2SM_CrmnlHspot_Tot_Tot'
};

const parkApiParam = {
    serverUrl: "https://api.data.go.kr/openapi/tn_pubr_public_cty_park_info_api",
    pageNo: "1",
    numOfRows: "100",
    type: "json"
};

const storeApiParam = {
    serverUrl: "http://apis.data.go.kr/B553077/api/open/sdsc2/storeListInRadius",
    pageNo: "1",
    numOfRows: "500",
    cx: "",
    cy: "",
    type: "json",
};

const contextMenu = document.getElementById('context-menu');

// 우클릭 메뉴 띄우기
map.getViewport().addEventListener('contextmenu', function(evt) {
    evt.preventDefault();

    const pixel = map.getEventPixel(evt);
    const coordinate = map.getCoordinateFromPixel(pixel);

    // 메뉴 위치 지정
    contextMenu.style.left = evt.clientX + 'px';
    contextMenu.style.top = evt.clientY + 'px';
    contextMenu.style.display = 'block';

    // 좌표 저장 (문자열로 저장 가능)
    contextMenu.dataset.coordinate = coordinate.join(',');
});

// 메뉴 닫기
map.on('click', () => {
    contextMenu.style.display = 'none';
});
map.on('pointerdrag', () => {
    contextMenu.style.display = 'none';
});

// 상세보기 버튼 클릭
document.getElementById('detail-btn').addEventListener('click', async e => {
    // 저장된 좌표 불러오기
    const coordStr = contextMenu.dataset.coordinate;
    if (!coordStr) {
        alert('좌표 정보를 찾을 수 없습니다.');
        return;
    }

    const coordinate = coordStr.split(',').map(Number);
    const [lon, lat] = toLatLon(coordinate[0], coordinate[1]);

    contextMenu.style.display = 'none';

    await openInfoModal(lat, lon)
});

// 방 추가하기 버튼 클릭
document.getElementById('add-btn').addEventListener('click', () => {
    // 저장된 좌표 불러오기
    const coordStr = contextMenu.dataset.coordinate;
    if (!coordStr) {
        alert('좌표 정보를 찾을 수 없습니다.');
        return;
    }
    const coordinate = coordStr.split(',').map(Number);
    console.log(toLatLon(coordinate[0], coordinate[1]));
    openRegisterModal(toLatLon(coordinate[0], coordinate[1]));

    contextMenu.style.display = 'none';
});

async function openRegisterModal(coord) {
    const modal = document.getElementById('roomRegisterModal');
    const form = modal.querySelector("form");
    const addressInput = form.querySelector("input[name='address']");

    modal.dataset.coord = coord;

    if (addressInput) {
        addressInput.value = await coordsToStringAddress(form, coord);
    }
    modal.style.display = 'block';
}

async function coordsToStringAddress(form, coord) {
    const url = "/api/geocode/reverse?coord=" + coord;

    try {
        const res = await fetch(url);
        if (!res.ok) {
            throw new Error("네트워크 응답 실패");
        }

        const data = await res.json();
        const region = data.results[0].region;

        return region.area1.name + " " + region.area2.name + " " + region.area3.name + " " + region.area4.name;
    } catch (e) {
        alert(e);
        return null;
    }
}

async function openInfoModal(lat, lon){
    try {
        // 좌표 주변 방 검색 API 호출 (필요시 서버 API 구현)
        // 예: /api/rooms/near?lon=...&lat=...&radius=...

        console.log(lat, lon);

        const radius = 0.001; // 미터 단위나 위경도 차이 단위, 적절히 조정
        const url = `/api/rooms/near?lon=${lon}&lat=${lat}&radius=${radius}`;
        const res = await fetch(url);
        if (!res.ok) throw new Error('주변 방 검색 실패');

        const nearbyRooms = await res.json();

        if (nearbyRooms.length === 0) {
            alert('해당 위치 주변에 매물이 없습니다.');
            return;
        }

        // 가까운 방 중 첫번째 방 선택 (필요 시 거리 계산 후 선택 가능)
        const roomId = nearbyRooms[0].roomId;

        // 상세 모달 열기
        await showRoomInfoModal(roomId);

    } catch (error) {
        console.error(error);
        alert('상세정보를 불러오는 중 오류가 발생했습니다.');
    }
}

 async function showRoomInfoModal(roomId) {
        try {
            const resRoom = await fetch(`/api/rooms/${roomId}`);
            if (!resRoom.ok) throw new Error('상세정보 로드 실패');
            const room = await resRoom.json();

            const resImgs = await fetch(`/api/room-images/${roomId}`);
            let images = [];
            if (resImgs.ok) {
                images = await resImgs.json();
            }

            fillModal(room, images);
            modal.style.display = 'block';

        } catch (e) {
            alert('상세정보를 불러오는 중 오류가 발생했습니다.');
            console.error(e);
        }
    };

// 인근 상점 개수 확인
function fetchStore(param, coordinate, radius) {
    fetch('/api/data/store-key')
        .then(res => res.text())
        .then(apiKey => {
            param.cx = coordinate[1];
            param.cy = coordinate[0];

            console.log("x" + param.cx)
            console.log("y" + param.cy)

            let url = `${param.serverUrl}?serviceKey=${apiKey}&pageNo=${param.pageNo}&numOfRows=${param.numOfRows}&radius=${radius}&cx=${param.cx}&cy=${param.cy}&type=${param.type}`;

            fetch(url)
                .then(response => response.text())  // JSON이 안 올 경우 원본 텍스트를 봅니다.
                .then(text => {
                    console.log('응답 원본:', text);
                    try {
                        const data = JSON.parse(text);
                        // 정상 JSON 처리

                        // 소음지수에 활용할 때는 10 ~ 20m로, 상권지수에 활용할 때는 300m
                        console.log('상가 리스트 개수:', data.body.totalCount);

                    } catch (e) {}
                })
                .catch(error => {
                    console.error('API 호출 오류:', error);
                });
        })
        .catch((e) => alert(e));
}

function fetchPark(param){
    fetch("/api/data/store-key")
        .then(res => res.text())
        .then(apiKey => {
            let url = `${param.serverUrl}?serviceKey=${apiKey}&pageNo=${param.pageNo}&numOfRows=${param.numOfRows}&type=${param.type}`;
            console.log('응답 원본:', text);
            try {
                const data = JSON.parse(text);
                // 정상 JSON 처리

                console.log(data);

            } catch (e) {}
        })
        .catch(error => {
            console.error('API 호출 오류:', error);
        }).catch((e) => alert(e));
}

function addWmsLayer(map, param, coordinate){
    fetch('/api/data/safemap-key')
        .then(res => res.text())
        .then(apiKey => {
            const wmsSource = new ol.source.TileWMS({
                url: `${param.serverUrl}?apikey=${apiKey}`,
                params: {
                    'LAYERS': param.layername,
                    'STYLES': param.style,
                    'FORMAT': 'image/png',
                    'TRANSPARENT': true
                },
                serverType: 'geoserver'
            });

            const wmsLayer = new ol.layer.Tile({
                source: wmsSource,
                opacity: 0.8,
                zIndex: 10
            });

            map.addLayer(wmsLayer);
        })
        .catch((e) => alert(e));
}

function getFeatureToLayer(wmsSource, coordinate){
    const viewResolution = map.getView().getResolution();

    const url = wmsSource.getFeatureInfoUrl(
        coordinate,
        viewResolution,
        map.getView().getProjection(),
        {
            'INFO_FORMAT': 'application/json',
            'FEATURE_COUNT': 5
        }
    );

    if (url) {
        fetch(url)
            .then(response => response.json())
            .then(data => {
                console.log('GetFeatureInfo Response:', data);
                if (data.features && data.features.length > 0) {
                    const feature = data.features[0];
                    alert(`좌표: ${coordinate}\n피처 정보: ${JSON.stringify(feature.properties, null, 2)}`);
                } else {
                    alert('해당 위치에 피처가 없습니다.');
                }
            })
            .catch(() => {
                alert('GetFeatureInfo 요청 실패');
            });
    }
}

function toLatLon(x, y) {
    var lon = (x / 20037508.34) * 180;
    var lat = (y / 20037508.34) * 180;
    lat = 180/Math.PI * (2 * Math.atan(Math.exp(lat * Math.PI / 180)) - Math.PI / 2);
    return [lon, lat];
}

//fetchStore(storeApiParam, toLatLon(coordinate[0], coordinate[1]), 300)
//addWmsLayer(map, crimeHotspotParam, coordinate);