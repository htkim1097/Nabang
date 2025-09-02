let addressData = [];

if (!sessionStorage.getItem('surveyData')) {
    sessionStorage.setItem('surveyData', '{}');
}

fetch('/data/korea_administrative_district.json')
    .then(res => res.json())
    .then(data => {
        addressData = data.data;

        console.log(addressData);

        setSiDoOptions();
    });

const sidoSelect = document.getElementById('sido');
const sigunguSelect = document.getElementById('sigungu');

function setSiDoOptions() {
    sidoSelect.innerHTML = '<option value="0">전체</option>';
    addressData.forEach(sido => {
        const opt = document.createElement('option');

        opt.value = Object.keys(sido)[0];
        opt.text = Object.keys(sido)[0];
        sidoSelect.appendChild(opt);
    });

}

sidoSelect.addEventListener('change', function() {
    const selectedSiDo = sidoSelect.value;
    sigunguSelect.innerHTML = '<option value="0">전체</option>';

    if (!selectedSiDo) return;

    const sidoItem = Object.values(addressData.find(sido => Object.keys(sido)[0] === selectedSiDo))[0];

    if (sidoItem) {
        sidoItem.forEach(sigungu => {
            const opt = document.createElement('option');
            opt.value = sigungu;
            opt.text = sigungu;
            sigunguSelect.appendChild(opt);
        });
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const nextBtn = document.getElementById('nextBtn');
    const nextPageUrl = '/survey/2';

    nextBtn.addEventListener('click', (e) => {
        saveCurrentPageData();
        location.href = nextPageUrl;
    });
});

function saveCurrentPageData() {
    let surveyData = JSON.parse(sessionStorage.getItem('surveyData') || '{}');

    surveyData['sido'] = document.getElementById('sido').value;
    surveyData['sigungu'] = document.getElementById('sigungu').value;

    sessionStorage.setItem('surveyData', JSON.stringify(surveyData));
    console.log(sessionStorage)
}

