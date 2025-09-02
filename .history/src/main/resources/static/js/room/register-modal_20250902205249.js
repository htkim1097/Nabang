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

// 추가된 이미지
let images = [];

// 이미지 추가 버튼
let fileInput = null;

// 모달 닫기 버튼
let regCloseBtn = null;

// 이미지 추가 제한
let limitImages = 5;

document.getElementById("submit-btn").addEventListener("click", async e => {
    try {
        e.preventDefault();

        const form = document.getElementById("registerRoomForm");
        const formData = new FormData(form);

        const modal = document.getElementById("roomRegisterModal");
        const coord = modal.dataset.coord.split(",");

        const lat = coord[1];
        const lon = coord[0];

        const address = form.querySelector("input[name='address']").value;

        formData.append("emdong", address.split(" ")[2]);
        formData.append("sido", address.split(" ")[0]);
        formData.append("sigungu", address.split(" ")[1]);
        formData.append("latitude", lat);
        formData.append("longitude", lon);
        formData.append("isElevator", form.querySelector("input[name='isElevator']").checked);
        formData.append("isParking", form.querySelector("input[name='isParking']").checked);

        const plainFormData = Object.fromEntries(formData.entries());

        plainFormData.elevator = form.querySelector("input[name='isElevator']").checked;
        plainFormData.parking = form.querySelector("input[name='isParking']").checked;
        plainFormData.hasOption = form.querySelector("input[name='hasOption']").checked;

        plainFormData.roomType = Number(plainFormData.roomType);
        plainFormData.deposit = Number(plainFormData.deposit);
        plainFormData.monthlyRent = Number(plainFormData.monthlyRent);
        plainFormData.roomSize = Number(plainFormData.roomSize);
        plainFormData.floor = Number(plainFormData.floor);
        plainFormData.type = Number(plainFormData.type);
        plainFormData.dealType = Number(plainFormData.dealType);

        // 상권 근접 정도
        let storeScore = 0;

        if (await getStoreConunt(lat, lon, 1000) > 500) {
            storeScore = 1;
        }
        else {
            storeScore = 2;
        }

        plainFormData.storeScore = storeScore;

        // 소음 정도
        let noiseScore = 0;

        if (await getStoreConunt(lat, lon, 10) > 3) {
            noiseScore = 1;
        }
        else {
            noiseScore = 0;
        }

        plainFormData.noiseSaftyScore = noiseScore;

        // let disasterScore = 0;

        // const data = fetchSafeMap(map, fludMarkParam, [lon, lat]);
        console.log(dddd(map, modal.dataset.coordsEpsg3875));

        // plainFormData.disasterSaftyScore = disasterScore;

        // 기존 서버 저장 요청
        const response = await fetch("/api/rooms", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(plainFormData),
        });

        if (!response.ok) {
            alert("서버 저장 중 오류 발생");
            return;
        }

        const savedRoom = await response.json();
        console.log("저장된 방 정보:", savedRoom);

        // 이미지 방 생성 후 업로드 처리 (기존 코드 유지)
        for (let i = 0; i < images.length; i++) {
            const base64Data = images[i].replace(/^data:image\/\w+;base64,/, "");

            const imageObj = {
                roomId: savedRoom.roomId,
                imageData: base64Data
            };

            const response = await fetch("/api/room-images", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(imageObj)
            });

            if (!response.ok) {
                alert("이미지 저장 중 오류 발생");
                return;
            }
        }

        alert("매물 저장 완료");
        document.getElementById("roomRegisterModal").style.display = "none";
        updateVisibleRooms();

    } catch (e) {
        alert("오류 발생: " + e.message);
        console.error(e);
    }
});

function dddd(map, coordsEpsg3875){

    const param = {
        name: "침수흔적도",
        serverUrl: "http://www.safemap.go.kr/openApiService/wms/getLayerData.do",
        layername: "A2SM_FLUDMARKS",
        styles: "A2SM_FludMarks"
    };

    fetch('/api/data/safemap-key')
        .then(res => res.text())
        .then(apiKey => {
            const wmsSource = new ol.source.TileWMS({
                headers: {
                    "Access-Control-Allow-Origin": "*"
                },
                url: `${param.serverUrl}?apikey=${apiKey}`,
                params: {
                    'LAYERS': param.layername,
                    'STYLES': param.styles,
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

            // coordinate 해당 좌표의 피처 정보 불러오기
            return getFeatureToLayer(wmsSource, coordsEpsg3875);

        })
        .catch((e) => alert(e));
}


function getFeatureToLayer(wmsSource, coordsEpsg3875){
    const viewResolution = map.getView().getResolution();
    
    // const espg4326 = ol.proj.transform(coordinate, "EPSG:3875", "EPSG:4326");
    // console.log(coordinate);
    // console.log(espg4326)
    // 127.39554451052163, 36.339042287692095

    const url = wmsSource.getFeatureInfoUrl(
        coordsEpsg3875,
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
                if (data.features) {
                    return data.features;
                }
            })
            .catch(() => {
                return null;
            });
    }
    return null;
}








async function getStoreConunt(lat, lon, radius) {
    const param = {
        serverUrl: "http://apis.data.go.kr/B553077/api/open/sdsc2/storeListInRadius",
        pageNo: "1",
        numOfRows: "1000",
        type: "json",
    };

    try {
        const apiKey = await fetch("/api/data/store-key").then(res => res.text());

        const url = `${param.serverUrl}?serviceKey=${apiKey}&pageNo=${param.pageNo}&cx=${lon}&cy=${lat}&numOfRows=${param.numOfRows}&type=${param.type}&radius=${radius}`;

        const response = await fetch(url);
        if (!response.ok) {
            console.error('API 요청 실패:', response.status);
            return -1;
        }

        const data = await response.json();
        const storeCnt = data.body?.totalCount ?? -1;
        console.log('상가 개수:', storeCnt);
        return storeCnt;

    } catch (error) {
        console.error('API 호출 오류:', error);
        return -1;
    }
}

document.addEventListener('DOMContentLoaded', e => {

    map.on('click', function(evt) {

        var coordinate = ol.proj.transform(evt.coordinate, 'EPSG:3857', 'EPSG:4326');
        //let coordinate = evt.coordinate;
        console.log(evt.coordinate);
        console.log(coordinate);
    })

    fileInput = document.getElementById("file-input");
    regCloseBtn = document.getElementById("reg-close-btn");

    const target = document.getElementById("roomRegisterModal");
    const observer = new MutationObserver((mutationsList) => {
        for (const mutation of mutationsList){
            if (mutation.type === "attributes" && mutation.attributeName === "style"){
                if (mutation.target.style["cssText"] === "display: block;"){
                    onShowModal();
                }
                else if (mutation.target.style["cssText"] === "display: none;"){
                    onHideModal();
                }
            }
        }
    })

    const config = {
        attributes: true,
        attributeFilter: ["style"],
    }

    observer.observe(target, config);

    // 이미지를 불러왔을 때 이벤트
    fileInput.addEventListener("change", e => {
        const file = e.target.files[0];
        // 파일을 잘못 불러오고나 이미지가 아닐 때
        if (!file && !file.type.startsWith("image/")) {
            return;
        }
        const reader = new FileReader();
        reader.onload = e => {
            if (!e.target || !e.target.result) {
                alert("이미지 불러오기 실패")
                return;
            }
            // 이미지를 images에 저장
            images.push(e.target.result)

            if (images.length >= 5){
                document.getElementById("room-image-add-btn").style.display = "none";
            }
            // images 렌더 함수에서 images에 있는 이미지들을 한번에 렌더
            renderImages(images);
        };
        // img, video 등에서 바로 사용가능한 Base64 형태의 데이터로 인코딩하는 함수
        reader.readAsDataURL(file);
    });

    // 이미지 추가 버튼 이벤트
    document.getElementById("room-image-add-btn").addEventListener("click", e => {
        fileInput.value = "";
        fileInput.click();
    });

    // 모달창 닫기 버튼 이벤트
    regCloseBtn.addEventListener("click", e => {
        document.getElementById("roomRegisterModal").style.display = "none";
    });
});

function renderImages(images) {
    // image-cont 객체 불러오기
    const imageCont = document.getElementById("image-cont");
    imageCont.innerHTML = "";

    for (let i = 0; i < images.length; i++){
        // 이미지 미리보기 박스
        const previewDiv = document.createElement("div");
        previewDiv.className = "room-image-box";

        // img 요소 생성 및 설정
        const img = document.createElement("img");
        img.alt = "방 미리보기 이미지";
        img.src = images[i];
        img.className = "room-image-thumb";
        previewDiv.appendChild(img);

        // 이미지 삭제 버튼
        const delBtn = document.createElement("button");
        delBtn.type = "button";
        delBtn.className = "image-del-btn";
        delBtn.innerHTML = "×"
        delBtn.addEventListener("click", e => {
            images.splice(i, 1);
            previewDiv.remove();
            document.getElementById("room-image-add-btn").style.display = "flex";

            renderImages(images);
        });
        previewDiv.appendChild(delBtn);

        // 이미지 컨테이너에 담기
        imageCont.appendChild(previewDiv);
    }
}

function initInput() {
    document.getElementById("image-cont").innerHTML = "";
    document.getElementById("registerRoomForm").reset();
    images = [];
}

function onHideModal() {
    initInput();
}

function onShowModal(){

}