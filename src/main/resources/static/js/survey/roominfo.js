
// 보증금 슬라이더
document.addEventListener('DOMContentLoaded', function() {
    var slider = document.getElementById('deposit-slider');

    noUiSlider.create(slider, {
        start: [0, 38],  // 최소, 최대 시작 위치
        connect: true,  // 사이 최소 최대 바 사이 연결
        range: {
            'min': 0,
            'max': 38
        },
        step: 1,
        tooltips: [false, false],
        format: {
            // 값 표시 방법
            to: value => { 
                if (value == 0){
                    return "0원";
                }
                else if (value <= 10) {
                    return Math.round(value * 100) + "만원"; 
                }
                else if (value < 19) {
                    return Math.round(1000 + ((value % 10) * 1000)) + "만원";
                }
                else if (value < 29){  // 1억 이상부터
                    return Math.round(value % 19 + 1) + "억원";
                }
                else if (value < 38){
                    return Math.round(20 + ((value % 29) * 10)) + "억원";
                }
                else if (value == 38){
                    return "∞";
                }
            },
            // 값 파싱 방법
            from: value => { 
                if (value.includes("만원")){
                    return Number(value.replace("만원", "")) * 10000; 
                }
                else if (value.includes("억원")){
                    return Number(value.replace("억원", "")) * 100000000;
                }
                else if (value.includes("원")){
                    return Number(value.replace("원", ""));
                }
                else {
                    return value;
                }
            }
        }
    });

    var valuesBox = document.getElementById('deposit-slider-values');
    slider.noUiSlider.on('update', (values, handle) => {
        valuesBox.textContent = values[0] + ' ~ ' + values[1];
    });

    const nextBtn = document.getElementById('nextBtn');

    nextBtn.addEventListener('click', (e) => {
        let surveyData = JSON.parse(sessionStorage.getItem('surveyData') || '{}');

        surveyData['roomType'] = document.getElementById('room-type').value;
        surveyData['dealType'] = document.getElementById('deal-type').value;

        // 보증금(전세금) 슬라이더 값
        const depositSlider = document.getElementById('deposit-slider');
        let depositRange = depositSlider.noUiSlider.get();

        surveyData['depositMin'] = convertDepositSliderValue(depositRange[0]);
        surveyData['depositMax'] = convertDepositSliderValue(depositRange[1]);

        // 월세 슬라이더 값
        const monthlySlider = document.getElementById('monthly-slider');
        let monthlyRange = monthlySlider.noUiSlider.get();

        surveyData['monthlyMin'] = convertMonthlySliderValue(monthlyRange[0]);
        surveyData['monthlyMax'] = convertMonthlySliderValue(monthlyRange[1]);

        sessionStorage.setItem('surveyData', JSON.stringify(surveyData));

        console.log(sessionStorage)

        window.location.href = '/survey/3';
    });

});

// 월세 슬라이더
document.addEventListener('DOMContentLoaded', function() {
    var slider = document.getElementById('monthly-slider');

    noUiSlider.create(slider, {
        start: [0, 31],  // 최소, 최대 시작 위치
        connect: true,  // 사이 최소 최대 바 사이 연결
        range: {
            'min': 0,
            'max': 31
        },
        step: 1,
        tooltips: [false, false],
        format: {
            // 값 표시 방법
            to: value => {
                if (value == 0){
                    return "0원";
                }
                else if (value <= 30) {
                    return Math.round(value * 10) + "만원";
                }
                else if (value == 31){
                    return "∞";
                }
            },
            // 값 파싱 방법
            from: value => {
                if (value.includes("만원")){
                    return Number(value.replace("만원", "")) * 10000;
                }
                else if (value.includes("원")){
                    return Number(value.replace("원", ""));
                }
                else {
                    return value;
                }
            }
        }
    });

    var valuesBox = document.getElementById('monthly-slider-values');
    slider.noUiSlider.on('update', (values, handle) => {
        valuesBox.textContent = values[0] + ' ~ ' + values[1];
    });
});

function convertMonthlySliderValue(value){
    if (value.includes("만원")){
        return Number(value.replace("만원", "")) * 10000;
    }
    else if (value.includes("원")){
        return Number(value.replace("원", ""));
    }
    else {
        return -1;
    }
}

function convertDepositSliderValue(value){
    if (value.includes("만원")){
        return Number(value.replace("만원", "")) * 10000;
    }
    else if (value.includes("억원")){
        return Number(value.replace("억원", "")) * 100000000;
    }
    else if (value.includes("원")){
        return Number(value.replace("원", ""));
    }
    else {
        return -1;
    }
}