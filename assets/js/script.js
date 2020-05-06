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
choiceText = [
	'<javascript>',
	'<js>',
	'<scripting>',
	'<script>',
	'The <body> section',
	'After the <body> section',
	'The <head> section',
	'Both the <head> and <body> section are correct',
	'var colors = (1:"red", 2:"green", 3:"blue")',
	'var colors = 1 = ("red"), 2 = ("green"), 3 = ("blue")',
	'var colors = ["red", "green", "blue"]',
	'var colors = "red", "green", "blue"',
	'onclick',
	'onmouseclick',
	'onchange',
	'onmouseover',
];
questionArray = [
	'Inside which HTML element do we put the JavaScript?',
	'Where is the correct place to insert a <script> element?',
	'What is the correct way to write a JavaScript array?',
	'Which event occurs when the user clicks on an HTML element?',
];

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
		if (choice > 16) {
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
}

function endQuiz() {
	score = secondsLeft;
	header.textContent = 'Score = ' + score;
	answerList.remove();
	scoreForm();
}

function scoreForm() {
	form.style.display = 'flex';
}
