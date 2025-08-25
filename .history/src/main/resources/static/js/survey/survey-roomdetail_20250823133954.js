document.addEventListener('DOMContentLoaded', function() {
    var slider = document.getElementById('deposit-slider');

    noUiSlider.create(slider, {
        start: [0, 23],  // 최소, 최대 시작 위치
        connect: true,  // 사이 최소 최대 바 사이 연결
        range: {
            'min': 0,
            'max': 23
        },
        step: 1,
        tooltips: [false, false],
        format: {
            // 값 표시 방법
            to: value => { 
                if (value == 0){
                    return "5평 이하";
                }
                else if (value <= 15) {
                    return (value + 5) + "평"; 
                }
                else if (value <= 22) {
                    return (20 + ((value - 15) * 5)) + "평";
                }
                else if (value == 23){
                    return "60평 초과";
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
});