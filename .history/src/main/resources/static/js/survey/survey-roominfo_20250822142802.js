document.addEventListener('DOMContentLoaded', function() {
    var slider = document.getElementById('deposit-slider');
    noUiSlider.create(slider, {
        start: [0, 40],  // 최소, 최대 시작 위치
        connect: true,  // 사이 최소 최대 바 사이 연결
        range: {
            'min': 0,
            'max': 40
        },
        step: 1,
        tooltips: [false, false],
        format: {
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
                else if (value < 39){
                    return Math.round(20 + ((value % 29) * 10)) + "억원";
                }
                else if (value == 39){
                    return "∞";
                }
            },
            from: value => { 
                if (value.includes("만원")){
                    return Number(value.replace("만원", "")); 
                }
                else if (value.includes("억원")){
                    return Number(value.replace("억원", ""));
                }
                else {
                    try {
                        return Number(value);
                    }
                    catch (e) {
                        console.log("슬라이더 값 에러")
                    }
                }
            }
        }
    });

    var valuesBox = document.getElementById('deposit-slider-values');
    slider.noUiSlider.on('update', (values, handle) => {
        valuesBox.textContent = values[0] + ' ~ ' + values[1];
    });
});

function convertValue(value){


}

// document.getElementById('submitBtn').addEventListener('click', function() {
//     var slider = document.getElementById('deposit-slider');
//     var range = slider.noUiSlider.get();   // [최소값, 최대값]
//     // 예: 서버로 전송 또는 화면에 출력
//     console.log(range); // [ '1000000원', '40000000원' ]
// });