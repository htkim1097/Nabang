noUiSlider.create(document.getElementById('deposit-range'), {
    start: [1000000, 90000000],  // 초기 [최소, 최대]
    connect: true,
    step: 1000000,
    range: {
        'min': 0,
        'max': 100000000
    },
    format: {
      to: v => Math.round(v).toLocaleString() + '원',
      from: Number
    }
});

document.getElementById('deposit-range').noUiSlider.on('update', function(values, handle) {
    document.getElementById('deposit-range-value').innerHTML = values.join(' ~ ');
});

console.log("qweqweqeqw")