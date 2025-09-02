document.addEventListener('DOMContentLoaded', () => {
    const doneBtn = document.getElementById('survey-done-btn');

    doneBtn.addEventListener('click', () => {
        let surveyData = JSON.parse(sessionStorage.getItem('surveyData') || '{}');

        surveyData['noise'] = document.querySelector('input[name="noise"]:checked')?.value || '';
        surveyData['safety'] = document.querySelector('input[name="safety"]:checked')?.value || '';
        surveyData['store'] = document.querySelector('input[name="store"]:checked')?.value || '';
        // surveyData['security'] = document.querySelector('input[name="security"]:checked')?.value || '';

        sessionStorage.setItem('surveyData', JSON.stringify(surveyData));

        const queryString = new URLSearchParams(surveyData).toString();

        console.log(queryString)

        window.location.href = `/room/roomList?${queryString}`;
    });
});
