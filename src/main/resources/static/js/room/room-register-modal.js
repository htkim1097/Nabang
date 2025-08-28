// 추가된 이미지
let images = [];

let fileInput = document.getElementById("file-input");

// 모달 닫기 버튼
const regCloseBtn = document.getElementById("reg-close-btn");

document.addEventListener('DOMContentLoaded', function() {
    fileInput = document.getElementById("file-input");

    fileInput.addEventListener("change", (e) => {
        const files = e.target.files;

        console.log(files)

        if (!files) return;

        for (let i = 0; i < files.length && images.length < 5; i++) {
            const file = files[i];

            if (!file.type.startsWith('image/')) continue; // 이미지 파일만 처리

            const reader = new FileReader();

            reader.onload = function(evt) {
                if (evt.target && evt.target.result) {
                    images.push(evt.target.result); // base64 문자열 저장
                    renderImageCont();
                }
            };

            reader.readAsDataURL(file);
        }
    });

    document.body.addEventListener('click', function(e) {

        // 이미지 추가
        if (e.target.closest('#room-image-add-btn')) {
            fileInput.value = '';
            fileInput.click();
        }

        // 이미지 삭제
        if (e.target.classList.contains('image-del-btn')) {
            const idx = Array.from(document.querySelectorAll('.image-del-btn')).indexOf(e.target);
            if (idx > -1) {
                images.splice(idx, 1);
                renderImageCont();
            }
        }

        renderImageCont()
    });

    regCloseBtn.addEventListener("click", e => {
        const parentModal = document.getElementById("roomRegisterModal");

        if (parentModal && parentModal.style.display !== "none"){
            parentModal.style.display = "none";
        }
    });
});

function renderImageCont() {
    const canAddImage = images.length < 5;

    const template = document.getElementById('roomImageTemplate').innerHTML;

    const html = Mustache.render(template, { images, canAddImage });
    document.querySelector('.room-image-cont').innerHTML = html;

    // fileInput = document.getElementById("file-input");

    // 이벤트 바인딩 재설정 필요 (예: 삭제 버튼)
}

