document.addEventListener('DOMContentLoaded', function() {
    var slider = document.getElementById('roomsize-slider');

    noUiSlider.create(slider, {
        start: [0, 23],  // 최소, 최대 시작 위치
        connect: true,
        range: {'min': 0, 'max': 23},
        step: 1,
        tooltips: [false, false],
        format: {
            to: value => {
                if (value == 0){
                    return "5평 이하";
                }
                else if (value <= 15) {
                    return Math.round(value + 5) + "평";
                }
                else if (value <= 22) {
                    return Math.round(20 + ((value - 15) * 5)) + "평";
                }
                else if (value == 23){
                    return "60평 초과";
                }
            },
            from: value => {
                return value
            }
        }
    });

    var valuesBox = document.getElementById('roomsize-slider-values');
    slider.noUiSlider.on('update', (values, handle) => {
        valuesBox.textContent = values[0] + ' ~ ' + values[1];
    });

    const nextBtn = document.getElementById('nextBtn');

    nextBtn.addEventListener('click', function() {
        let surveyData = JSON.parse(sessionStorage.getItem('surveyData') || '{}');

        const roomSizeRange = slider.noUiSlider.get();
        surveyData['roomSizeMin'] = convertSliderValue(roomSizeRange[0]);
        surveyData['roomSizeMax'] = convertSliderValue(roomSizeRange[1]);

        surveyData['floor'] = document.getElementById('floor').value;
        surveyData['isElevator'] = document.getElementById('isElevator').checked;
        surveyData['isParking'] = document.getElementById('isParking').checked;
        surveyData['hasOption'] = document.getElementById('hasOption').checked;

        sessionStorage.setItem('surveyData', JSON.stringify(surveyData));

        console.log(sessionStorage)

        window.location.href = '/survey/4';
    });
});

function convertSliderValue(value){
    if (value.includes("이하")){
        return 0;
    }
    else if (value.includes("초과")) {
        return 100000;
    }
    else if (value.includes("평")){
        return Number(value.replace("평", ""));
    }
}
