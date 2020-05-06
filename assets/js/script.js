var header, intro, startBtn, quiz, answerList, answer1, answer2, answer3, answer4, timer, score;

timer = document.getElementById('timer');
header = document.getElementById('header');
intro = document.getElementById('intro');
startBtn = document.getElementById('startBtn');
quiz = document.getElementById('quiz');
form = document.getElementById('score-form');
answerList = document.createElement('div');
answer1 = document.createElement('button');
answer2 = document.createElement('button');
answer3 = document.createElement('button');
answer4 = document.createElement('button');
var secondsLeft = 40;
var choice = 0;
var questionIndex = 0;

answerArray = [answer1, answer2, answer3, answer4];
choiceText = ['example answer', 'example answer2', 'example answer3', 'example answer4', 'example answer5', 'example answer6', 'example answer7', 'example answer8', 'example answer9', 'example answer10', 'example answer11', 'example answer12', 'example answer13', 'example answer14', 'example answer15', 'example answer16',];
questionArray = ['What is a method?', 'What is a function?', 'What is the difference between let and var?', 'What is an array?'];

answerList.setAttribute('class', 'list-group flex-center');

startBtn.onclick = function startQuiz() {
	startTimer();
	header.textContent = questionArray[questionIndex];
	intro.remove();
	startBtn.remove();
	quiz.appendChild(answerList);

	for (choice = 0; choice < answerArray.length; choice++) {
		answerArray[choice].setAttribute('class', 'list-group-item list=group-item-action');
        answerArray[choice].setAttribute('type', 'button');
        answerArray[choice].setAttribute('onclick', 'nextQuestion()');
        answerList.appendChild(answerArray[choice]);
		answerArray[choice].textContent = choiceText[choice];
    }
};

function nextQuestion() {
    header.textContent = questionArray[++questionIndex];
    for (n = 0; n < answerArray.length; n++) {
        answerArray[n].textContent = choiceText[choice];
        choice++;
        if (choice > 16){
            endQuiz();
        }
	}
}

function startTimer() {
	var timerInterval = setInterval(function () {
		secondsLeft = secondsLeft - 1;
		timer.textContent = 'Timer: ' + secondsLeft;

		if (secondsLeft === 0 || choice > 16) {
            clearInterval(timerInterval);
            endQuiz();
		}
	}, 1000);
};

function endQuiz() {
    score = secondsLeft;
    header.textContent = 'Score = ' + score;
    answerList.remove();
    scoreForm();
}

function scoreForm() {
    form.style.display = "flex";
}