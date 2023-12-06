const questionAnswer = document.querySelectorAll('.questionAnswer');
const lines1PlusClick = document.querySelectorAll('.line1Plus');
const answer = document.querySelectorAll('.answer');

questionAnswer.forEach((questionAnswerEach, index) => {
    questionAnswerEach.addEventListener('click', () => {
        let calcHeight = `auto`;
        let calcHeightOriginal = '12vh';

        lines1PlusClick[index].classList.toggle('line1PlusClick');
        // answer[index].classList.toggle('expanded');
        if (answer[index].style.display == 'block'){
            answer[index].style.display = 'none';
        } else {
            answer[index].style.display = 'block';
        }
        if (questionAnswerEach.style.height == calcHeight) {
            questionAnswerEach.style.height = calcHeightOriginal ;
        } else{
            questionAnswerEach.style.height = calcHeight;
        }
    });
});