document.addEventListener('DOMContentLoaded', e => {
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
        hasElevator: document.getElementById('viewHasElevator'),
        hasParking: document.getElementById('viewHasParking'),
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
        fields.hasElevator.checked = room.elevator || false;
        fields.hasParking.checked = room.parking || false;
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
});

