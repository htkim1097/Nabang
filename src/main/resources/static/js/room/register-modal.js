// 추가된 이미지
let images = [];

// 이미지 추가 버튼
let fileInput = null;

// 모달 닫기 버튼
let regCloseBtn = null;

// 이미지 추가 제한
let limitImages = 5;

document.getElementById("roomRegisterModal").addEventListener("change", e => {
    console.log(e.target);
});

document.getElementById("submit-btn").addEventListener("click", async e => {
    e.preventDefault();

    const form = document.getElementById("registerRoomForm");
    const formData = new FormData(form);
    const plainFormData = Object.fromEntries(formData.entries());

    plainFormData.roomType = Number(plainFormData.roomType);
    plainFormData.deposit = Number(plainFormData.deposit);
    plainFormData.monthlyRent = Number(plainFormData.monthlyRent);
    plainFormData.roomSize = Number(plainFormData.roomSize);
    plainFormData.totalFloor = Number(plainFormData.floor);
    plainFormData.type = Number(plainFormData.type);
    plainFormData.dealType = Number(plainFormData.dealType);

    console.log(plainFormData.dealType)


    try {
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
        alert("매물 저장 완료");

    } catch (e) {
        alert(e);
    }
});

document.addEventListener('DOMContentLoaded', e => {

    fileInput = document.getElementById("file-input");
    regCloseBtn = document.getElementById("reg-close-btn");

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
        initInput();

        const parentModal = document.getElementById("roomRegisterModal");

        if (parentModal && parentModal.style.display !== "none") {
            parentModal.style.display = "none";
        }
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