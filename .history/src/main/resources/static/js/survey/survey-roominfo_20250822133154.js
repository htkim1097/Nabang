document.addEventListener('DOMContentLoaded', function() {
    var slider = document.getElementById('deposit-slider');
    noUiSlider.create(slider, {
        start: [0, 1000000],  // 최소, 최대 시작 위치
        connect: true,  // 사이 최소 최대 바 사이 연결
        range: {
            'min': 0,
            'max': 1000000
        },
        step: 100,
        tooltips: [false, false],
        format: {
            to: value => { 
                if (value == 1000000){
                    return "∞";
                }
                else if (value >= 10000){
                    return Math.round(value / 1000) + "억원";
                }
                else {
                    return Math.round(value) + "만원"; 
                }
            },
            from: value => { 
                if (value.includes("만원")){
                    return Number(value.replace("만원", "")); 
                }
                else if (value.includes("억원")){
                    return Number(value.replace("억원", ""));
                }
            }
        }
    });

    var valuesBox = document.getElementById('deposit-slider-values');
    slider.noUiSlider.on('update', (values, handle) => {
        valuesBox.textContent = values[0] + ' ~ ' + values[1];
    });
});

// document.getElementById('submitBtn').addEventListener('click', function() {
//     var slider = document.getElementById('deposit-slider');
//     var range = slider.noUiSlider.get();   // [최소값, 최대값]
//     // 예: 서버로 전송 또는 화면에 출력
//     console.log(range); // [ '1000000원', '40000000원' ]
// });