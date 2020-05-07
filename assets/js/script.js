var header, intro, startBtn, quiz, answerList, answer1, answer2, answer3, answer4, timer, score, leaderArray;
leaderboard, choice;

timer = document.getElementById('timer');
header = document.getElementById('header');
intro = document.getElementById('intro');
startBtn = document.getElementById('startBtn');
submitBtn = document.getElementById('submit');
initials = document.getElementById('initials');
quiz = document.getElementById('quiz');
form = document.getElementById('score-form');
result = document.getElementById('result');
leaderboard = document.getElementById('leaderboard');
leaderList = document.createElement('li');
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
correctArray = [choiceText[3], choiceText[4], choiceText[10], choiceText[12]];
questionArray = [
	'Inside which HTML element do we put the JavaScript?',
	'Where is the correct place to insert a <script> element?',
	'What is the correct way to write a JavaScript array?',
	'Which event occurs when the user clicks on an HTML element?',
];
leaderArray = [];

answerList.setAttribute('class', 'list-group flex-center');

startBtn.onclick = function startQuiz() {
	startTimer();
	header.textContent = questionArray[questionIndex];
	intro.style.display = 'none';
	startBtn.style.display = 'none';
	quiz.appendChild(answerList);
	answerList.style = '';

	for (choice = 0; choice < answerArray.length; choice++) {
		answerArray[choice].setAttribute('class', 'list-group-item list=group-item-action');
		answerArray[choice].setAttribute('type', 'button');
		answerArray[choice].setAttribute('onclick', 'nextQuestion(event)');
		answerList.appendChild(answerArray[choice]);
		answerArray[choice].textContent = choiceText[choice];
	}
};

function nextQuestion(event) {
	if (
		event.target.innerText === correctArray[0] ||
		event.target.innerText === correctArray[1] ||
		event.target.innerText === correctArray[2] ||
		event.target.innerText === correctArray[3]
	) {
		result.innerText = 'Correct!';
		setTimeout(() => {result.innerText = '';}, 1500);
	} else {
		secondsLeft = secondsLeft - 8;
		result.innerText = 'Wrong!';
		setTimeout(() => {result.innerText = '';}, 1500);
	}
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
		if (secondsLeft === 0 || choice > 16) {
			clearInterval(timerInterval);
			endQuiz();
		}
		if (secondsLeft > 0 && choice <= 16) {
			secondsLeft = secondsLeft - 1;
			timer.textContent = 'Timer: ' + secondsLeft;
		}
	}, 1000);
}

function endQuiz() {
	score = secondsLeft;
	timer.textContent = 'Timer: 0';
	header.textContent = 'Score = ' + score;
	answerList.style.display = 'none';
    scoreForm();
}

function scoreForm() {
	form.style.display = 'flex';
}

function addLeader(event) {
	event.preventDefault();
    leaderArray.push({ initials: initials.value, score: score });
    leaderboard.style.display = 'grid';
    form.style.display = 'none';
    leaderboard.children[0].appendChild(document.createElement('li'));
    leaderboard.children[0].lastChild.innerText = initials.value + " - " + score;
}

function goBack() {
	// reset timer and question index
	secondsLeft = 40;
	timer.textContent = "Timer: " + secondsLeft;
	questionIndex = 0;
	// reset elements to start page layout
	header.textContent = "Coding Quiz";
	intro.style = '';
	startBtn.style = '';
	// hide leaderboard
	leaderboard.style.display = 'none';
}


function clearBoard() {
	var leaderLength = leaderboard.querySelectorAll('li').length;
	for (i = 0; i < leaderLength; i++) {
		leaderboard.children[0].lastChild.remove();
	}
}