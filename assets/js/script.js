var header,
	intro,
	startBtn,
	submitBtn,
	quiz,
	form,
	result,
	hiscoreEl,
	hiscoreNum,
	hiscoreName,
	leaderList,
	answerList,
	answer1,
	answer2,
	answer3,
	answer4,
	timer,
	score,
	leaderboard,
	timerInterval,
	timeout,
	questionNum,
	randomQuestion;

// grab and create elements
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
hiscoreEl = document.getElementById('hiscore');
hiscoreNum = document.getElementById('hiscoreNum');
hiscoreName = document.getElementById('hiscoreName');
leaderList = document.createElement('li');
answerList = document.createElement('div');
answer1 = document.createElement('button');
answer2 = document.createElement('button');
answer3 = document.createElement('button');
answer4 = document.createElement('button');

var secondsLeft = 10;
var timePenalty = 0;
var choice = 0;
var questionIndex = 0;
// Quiz array full of questions, answers, and choices
var quizData = [
	{
		question: 'Inside which HTML element do we put the JavaScript?',
		answer: '<script>',
		choices: ['<javascript>', '<js>', '<scripting>', '<script>'],
	},
	{
		question: 'Where is the correct place to insert a <script> element?',
		answer: 'The <body> section',
		choices: [
			'The <body> section',
			'After the <body> section',
			'The <head> section',
			'Both the <head> and <body> section are correct',
		],
	},
	{
		question: 'What is the correct way to write a JavaScript array?',
		answer: 'var colors = ["red", "green", "blue"]',
		choices: [
			'var colors = (1:"red", 2:"green", 3:"blue")',
			'var colors = 1 = ("red"), 2 = ("green"), 3 = ("blue")',
			'var colors = ["red", "green", "blue"]',
			'var colors = "red", "green", "blue"',
		],
	},
	{
		question: 'Which event occurs when the user clicks on an HTML element?',
		answer: 'onclick',
		choices: ['onclick', 'onmouseclick', 'onchange', 'onmouseover'],
	},
	{
		question: 'Using the ______ statement is how you test for a specific condition.',
		answer: 'if',
		choices: ['select', 'if', 'switch', 'for'],
	},
	{
		question: 'Which method of an Array object adds and/or removes elements from an array?',
		answer: 'splice',
		choices: ['reverse', 'shift', 'slice', 'splice'],
	},
	{
		question: 'Which is not a primitive data type in JavaScript?',
		answer: 'character',
		choices: ['boolean', 'character', 'string', 'number'],
	},
	{
		question: 'Which is not a logical operator?',
		answer: '&',
		choices: ['!', '&', '&&', '||'],
	},
	{
		question: 'Which of these operators compares two variables by value AND type?',
		answer: '===',
		choices: ['=', '==', '===', 'None of the above'],
	},
	{
		question: 'What is the value of the following expression: 8 % 3',
		answer: '2',
		choices: ['5', '2', '24', 'null'],
	},
];
var answerArray = [answer1, answer2, answer3, answer4];
var leaderArray = [];
var totalChoices = 0;
// fill array with all available choices for endquiz conditional
for (p = 0; p < quizData.length; p++) {
	totalChoices += quizData[p].choices.length;
}
// call high score from local storage, if none exists do not display high score element
if (localStorage.getItem('hiScore') === null) {
	hiscoreEl.style.display = 'none';
} else {
	hiscoreNum.innerText = JSON.parse(localStorage.getItem('hiScore')).hiscore;
	hiscoreName.innerText = JSON.parse(localStorage.getItem('hiScore')).initials;
}
// add attributes to new answer list div
answerList.setAttribute('class', 'list-group flex-center');
// randomize order of questions
function randomize() {
	// clear arrays
	questionNum = [];
	randomQuestion = [];
	// fill question number array according to length of quizData/number of questions
	for (i = 0; i < quizData.length; i++) {
		questionNum.push(i);
	}
	// fill randomQuestion array and remove the selected number question from originaly array each iteration
	while (randomQuestion.length < quizData.length) {
		var randomNum = Math.floor(Math.random() * questionNum.length);
		randomQuestion.push(questionNum[randomNum]);
		questionNum.splice(randomNum, 1);
	}
}
// start quiz on start button click
startBtn.onclick = function startQuiz() {
	randomize();
	score = 0;
	startTimer();
	header.textContent = quizData[randomQuestion[0]].question;
	intro.style.display = 'none';
	startBtn.style.display = 'none';
	quiz.appendChild(answerList);
	answerList.style = '';
	hiscoreEl.style.display = 'none';
	// append answer list with answer buttons until meeting the answerArray length
	for (choice = 0; choice < answerArray.length; choice++) {
		answerArray[choice].setAttribute('class', 'list-group-item list=group-item-action');
		answerArray[choice].setAttribute('type', 'button');
		answerArray[choice].setAttribute('onclick', 'answerClick(event)');
		answerList.appendChild(answerArray[choice]);
		answerArray[choice].textContent = quizData[randomQuestion[0]].choices[choice];
	}
};
// scoring and result text conditionals
// 10 pts for a correct answer + 1pt for every second left on the question
// if wrong, reduce the next question timer by 1 second. This effect stacks until a correct answer is made.
function answerClick(event) {
	if (event.target.innerText === quizData[randomQuestion[questionIndex]].answer) {
		result.innerText = 'Correct!';
		score += 10 + secondsLeft;
		timePenalty = 0;
		timeout = setTimeout(() => {
			result.innerText = '';
		}, 1500);
	} else {
		result.innerText = 'Wrong! Time Penalty!';
		timePenalty += 1;
		timeout = setTimeout(() => {
			result.innerText = '';
		}, 1500);
	}
	nextQuestion();
}
// move to next question and answers in quizData using the random question numbers as indices
function nextQuestion() {
	secondsLeft = 10 - timePenalty;
	startTimer();
	if (questionIndex < quizData.length - 1) {
		header.textContent = quizData[randomQuestion[++questionIndex]].question;
	}
	for (n = 0; n < answerArray.length; n++) {
		choice++;
		// if reaches the final choice, end the quiz
		if (choice > totalChoices) {
			endQuiz();
			return;
		}
		answerArray[n].textContent = quizData[randomQuestion[questionIndex]].choices[n];
	}
}
// start the question timer
// I initially had it as a full quiz timer, 
// but I wanted an extra challenge and I liked this scoring system better,
// so I went with a timer each question.
function startTimer() {
	timer.textContent = 'Timer: ' + secondsLeft;
	clearInterval(timerInterval);
	timerInterval = setInterval(function () {
		// if the time runs out on question, move to next question
		if (secondsLeft === 1 && choice < totalChoices) {
			result.innerText = "Time's Up!";
			timeout = setTimeout(() => {
				result.innerText = '';
			}, 1500);
			nextQuestion();
		}
		// if the timer runs out on the last question, end quiz
		if (secondsLeft === 1 && choice === totalChoices) {
			clearInterval(timerInterval);
			endQuiz();
		}
		// decrement seconds left if not the last question and time is left
		if (secondsLeft > 0 && choice <= totalChoices) {
			secondsLeft = secondsLeft - 1;
			timer.textContent = 'Timer: ' + secondsLeft;
		}
	}, 1000);
}
// clear question and answers
function endQuiz() {
	timer.textContent = 'Timer: 0';
	header.textContent = 'Score = ' + score;
	answerList.style.display = 'none';
	scoreForm();
}
// display score and input for leaderboard
function scoreForm() {
	form.style.display = 'flex';
	// if local storage has a high score, display it here
	if (localStorage.getItem('hiScore') === null) {
	} else {
		hiscoreEl.style = '';
	}
}
// submit user's input to array and local storage
function addLeader(event) {
	event.preventDefault();
	leaderArray.push({ initials: initials.value, score: score });
	var hiScore = {
		initials: initials.value,
		hiscore: Math.max.apply(
			Math,
			leaderArray.map(function (o) {
				return o.score;
			})
		),
	};
	// if no high score exist in local storage, add new score and display
	if (localStorage.getItem('hiScore') === null) {
		localStorage.setItem('hiScore', JSON.stringify(hiScore));
		hiscoreNum.innerText = hiScore.hiscore;
		hiscoreName.innerText = hiScore.initials;
	}
	// if new score is greater than one in local storage, replace it display
	if (score > JSON.parse(localStorage.getItem('hiScore')).hiscore) {
		localStorage.removeItem('hiScore');
		localStorage.setItem('hiScore', JSON.stringify(hiScore));
		hiscoreNum.innerText = hiScore.hiscore;
		hiscoreName.innerText = hiScore.initials;
	}
	leaderboard.style.display = 'grid';
	form.style.display = 'none';
	// add list item to list element and write initals and score
	leaderboard.children[0].appendChild(document.createElement('li'));
	leaderboard.children[0].lastChild.innerText = initials.value + ' - ' + score;
}
// return to beginning of quiz
function goBack() {
	// reset timer and question index
	secondsLeft = 10;
	timer.textContent = 'Timer: ' + secondsLeft;
	questionIndex = 0;
	// reset elements to start page layout
	header.textContent = 'Coding Quiz';
	intro.style = '';
	startBtn.style = '';
	// hide leaderboard
	leaderboard.style.display = 'none';
	hiscoreEl.style = '';
}
// clear the leaderboard (not the localStorage high score)
function clearBoard() {
	var leaderLength = leaderArray.length;
	for (i = 0; i < leaderLength; i++) {
		leaderboard.children[0].lastChild.remove();
	}
}
// display leaderboard for link in top left of window
function viewLeaderboard() {
	timer.textContent = 'Timer: 0';
	header.textContent = 'Leader Board';
	intro.style.display = 'none';
	startBtn.style.display = 'none';
	answerList.style.display = 'none';
	leaderboard.style.display = 'grid';
}
