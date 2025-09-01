document.getElementById('survey-done-btn').addEventListener('click', () => {
    const filterParams = {
        type: 1,
        dealType: 2
    };
    const queryString = new URLSearchParams(filterParams).toString();

    window.location.href = `/room/roomList?${queryString}`;
});