
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
    modal.dataset.coordsEpsg3875 = coordinate;
    console.log(modal.dataset.coordsEpsg3875)

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

        if (!resRoom.ok) {
            throw new Error('상세정보 로드 실패');
        }

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
}

function toLatLon(x_lon, y_lat) {
    var lon = (x_lon / 20037508.34) * 180;
    var lat = (y_lat / 20037508.34) * 180;
    lat = 180/Math.PI * (2 * Math.atan(Math.exp(lat * Math.PI / 180)) - Math.PI / 2);
    return [lon, lat];
}

const modal = document.getElementById('roomInfoModal');
const closeBtn = document.getElementById('info-close-btn');
const mainImage = document.getElementById('viewMainRoomImage');
const thumbContainer = document.getElementById('thumbImagesContainer');

// 필드 엘리먼트들
const fields = {
    address: document.getElementById('viewAddress'),
    detailAddress: document.getElementById('viewDetailAddress'),
    typeStr: document.getElementById('viewTypeStr'),
    dealTypeStr: document.getElementById('viewDealTypeStr'),
    deposit: document.getElementById('viewDeposit'),
    monthlyRent: document.getElementById('viewMonthlyRent'),
    roomSize: document.getElementById('viewRoomSize'),
    totalFloor: document.getElementById('viewTotalFloor'),
    isElevator: document.getElementById('viewHasElevator'),
    isParking: document.getElementById('viewHasParking'),
    hasOption: document.getElementById('viewHasOption'),
    desc: document.getElementById('viewDesc')
};

closeBtn.addEventListener('click', (e) => {
    hideModal();
});

window.addEventListener('click', (e) => {
    if (e.target === modal) {
        hideModal();
    }
});

function hideModal() {
    modal.style.display = 'none';
    clearModal();
}

function clearModal() {
    mainImage.src = '';
    thumbContainer.innerHTML = '';
    for (const key in fields) {
        if (key.startsWith('has')) {
            fields[key].checked = false;
        } else {
            fields[key].value = '';
        }
    }
}

function fillModal(room, images) {

    console.log(room)

    fields.address.value = `${room.sido} ${room.sigungu} ${room.emdong}`;
    fields.detailAddress.value = room.detailAddress || '';
    fields.typeStr.value = translateRoomType(room.roomType);
    fields.dealTypeStr.value = translateDealType(room.dealType);
    fields.deposit.value = room.deposit || '';
    fields.monthlyRent.value = room.monthlyRent || '';
    fields.roomSize.value = room.roomSize || '';
    fields.totalFloor.value = room.floor || '';
    fields.isElevator.checked = room.elevator || false;
    fields.isParking.checked = room.parking || false;
    fields.hasOption.checked = room.hasOption || false;
    fields.desc.value = room.description || '';

    mainImage.src = images.length ? `data:image/jpeg;base64,${images[0].imageData}` : '/assets/images/room-logo.png';

    thumbContainer.innerHTML = '';
    images.forEach((img, i) => {
        const imgEl = document.createElement('img');
        imgEl.src = `data:image/jpeg;base64,${img.imageData}`;
        imgEl.className = 'thumb-image';
        imgEl.alt = `방 이미지 ${i+1}`;

        imgEl.onclick = () => {
            mainImage.src = imgEl.src;
        };

        thumbContainer.appendChild(imgEl);
    });
}

function translateRoomType(type) {
    switch (type) {
        case 1: return '원룸';
        case 2: return '투룸';
        case 3: return '아파트';
        default: return '기타';
    }
}

function translateDealType(dealType) {
    switch (dealType) {
        case 1: return '월세';
        case 2: return '전세';
        case 3: return '매매';
        default: return '기타';
    }
}


