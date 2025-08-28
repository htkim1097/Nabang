const infoCloseBtn = document.getElementById("info-close-btn");

infoCloseBtn.addEventListener("click", e => {
    const parentModal = document.getElementById("roomInfoModal");

    if (parentModal && parentModal.style.display !== "none"){
        parentModal.style.display = "none";
    }
});