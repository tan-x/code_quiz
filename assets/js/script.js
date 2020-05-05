var header, intro, startBtn, quiz, answerList, answer1, answer2, answer3, answer4;

header = document.getElementById('header');
intro = document.getElementById('intro');
startBtn = document.getElementById('startBtn');
quiz = document.getElementById('quiz');
answerList = document.createElement('div');
answer1 = document.createElement('button');
answer2 = document.createElement('button');
answer3 = document.createElement('button');
answer4 = document.createElement('button');

answerArray = [answer1, answer2, answer3, answer4];
choiceText = ['example asnwer', 'example answer2', 'example answer3', 'example answer4'];

answerList.setAttribute('class', 'list-group');

startBtn.onclick = function startQuiz() {
	header.textContent = 'What is a method?';
	intro.remove();
	startBtn.remove();
	quiz.appendChild(answerList);

	for (i = 0; i < answerArray.length; i++) {
		answerArray[i].setAttribute('class', 'list-group-item list=group-item-action');
		answerArray[i].setAttribute('type', 'button');
		answerList.appendChild(answerArray[i]);
		answerArray[i].textContent = choiceText[i];
	}
};
