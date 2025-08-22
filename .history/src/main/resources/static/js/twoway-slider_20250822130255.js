document.addEventListener('DOMContentLoaded', function() {
    var slider = document.getElementById('deposit-slider');
    noUiSlider.create(slider, {
        start: [1000000, 40000000], // 최소값, 최대값 초기 설정
        connect: true,              // 색상으로 범위 표시
        range: {
            'min': 0,
            'max': 100000000
        },
        step: 1000000,              // 단위(예: 100만원)
        tooltips: [true, true],     // 조절자에 값 표시
        format: {
            to: function(value) { return Math.round(value) + '원'; },
            from: function(value) { return Number(value.replace('원','')); }
        }
    });

    var valuesBox = document.getElementById('deposit-slider-values');
    slider.noUiSlider.on('update', function(values, handle) {
        // values[0] = 최소, values[1] = 최대
        valuesBox.textContent = values + ' ~ ' + values[1];
    });
});

// document.getElementById('submitBtn').addEventListener('click', function() {
//     var slider = document.getElementById('deposit-slider');
//     var range = slider.noUiSlider.get();   // [최소값, 최대값]
//     // 예: 서버로 전송 또는 화면에 출력
//     console.log(range); // [ '1000000원', '40000000원' ]
// });