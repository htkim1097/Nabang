document.addEventListener('DOMContentLoaded', () => {

    const target = document.getElementById("room-list-main");
    const observer = new MutationObserver((mutationsList) => {
        for (const mutation of mutationsList){
            if (mutation.type === "attributes" && mutation.attributeName === "style"){
                if (mutation.target.style["cssText"] === "display: block;"){
                    onShowPage();
                }
                else if (mutation.target.style["cssText"] === "display: none;"){
                    onHidePage();
                }
            }
        }
    })

    const config = {
        attributes: true,
        attributeFilter: ["style"],
    }
    observer.observe(target, config);



    const section = document.querySelector('.property-list-panel');

    // 외부에서 필터 파라미터 받기 (예: 설문 완료 시 필터 전달)
    // 현재 URL 쿼리로 파싱(필요하면 설문페이지에서 쿼리를 붙여 이동)
    const urlParams = new URLSearchParams(window.location.search);
    const filters = {};

    // 필요한 필터키를 URL에서 파싱, 예시로 type 사용
    if (urlParams.has('type')) {
        filters.type = urlParams.get('type');
    }

    loadRooms(filters);

    async function loadRooms(filters) {
        const queryString = new URLSearchParams(filters).toString();
        const url = queryString ? `/api/rooms?${queryString}` : '/api/rooms';

        try {
            const res = await fetch(url);
            if (!res.ok) throw new Error('방 데이터 로딩 실패');

            const rooms = await res.json();

            if (!rooms.length) {
                document.querySelector('.property-list-panel').innerHTML = `<div class="property-empty">조회된 결과가 없습니다.</div>`;
                return;
            }

            // 방별로 이미지도 비동기로 받아서 mainImage 필드 추가
            // 모든 이미지 호출이 끝난 뒤 렌더링

            await Promise.all(rooms.map(async (room) => {
                const imgRes = await fetch(`/api/room-images/${room.roomId}`);
                if (imgRes.ok) {
                    const images = await imgRes.json();

                    // imageData는 blob에서 변환한 base64 데이터일 가능성
                    if (images.length > 0) {
                        room.roomImages = images;

                        // 첫번째 이미지를 미리 메인 이미지로 설정 (서버에서 base64 문자열까지 보낸다고 가정)
                        // imageData가 base64 문자열이라면 바로 사용 가능
                        room.mainImage = `data:image/jpeg;base64,${images[0].imageData}`;
                    }
                }
            }));

            // 이후 렌더링
            renderRoomList(rooms);

        } catch (error) {
            console.error(error);
            document.querySelector('.property-list-panel').innerHTML = `<div class="property-empty">데이터를 불러오는 중 오류가 발생했습니다.</div>`;
        }
    }

    function renderRoomList(rooms) {
        const section = document.querySelector('.property-list-panel');
        const html = rooms.map(room => {
            const mainImage = room.mainImage || '/assets/images/room-logo.png';
            const fullAddress = `${room.sido} ${room.sigungu} ${room.emdong} ${room.detailAddress || ''}`;

            return `
          <div class="property-card">
            <div class="property-card-imgbox">
              <img src="${mainImage}" alt="${room.title || ''}" class="property-card-img" />
            </div>
            <div class="property-card-info">
              <div class="property-card-title">주소: ${fullAddress}</div>
              <div class="property-card-price">가격: ${room.deposit || 0} / ${room.monthlyRent || 0}</div>
              <div class="property-card-detail">층: ${room.floor || '-'}</div>
            </div>
            <button id="show-room-detail-btn" class="property-card-btn" onclick="showRoomDetail(${room.roomId})">방 자세히 보기</button>
          </div>
        `;
        }).join('');
        section.innerHTML = html;
    }
});

window.showRoomDetail = function(roomId) {
    showRoomInfoModal(roomId);
};



















function onShowPage(filterParams = {}) {

}

function onHidePage() {
    // 필요 시 초기화 작업
    const section = document.querySelector('.property-list-panel');
    section.innerHTML = '';
}
