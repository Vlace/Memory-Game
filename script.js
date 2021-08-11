const gameContainer = document.getElementById('game');
const parentofGame = document.querySelector('#parent');
const startButton = document.querySelector('#startGame');
const resetButton = document.querySelector('#resetGame');
const mySlider = document.querySelector('#myRange');

function randomColor() {
	let g = Math.floor(Math.random() * 256);
	let r = Math.floor(Math.random() * 256);
	let b = Math.floor(Math.random() * 256);
	let rColor = `rgb(${r}, ${g}, ${b})`;
	COLORS.push(rColor);
	COLORS.push(rColor);
}
let pushColorCounter = 0;
function pushColor() {
	let x = mySlider.value;

	for (i = 1; i <= x; i++) {
		randomColor();

		pushColorCounter++;
	}
	console.log(`This is how many times push color has run ${pushColorCounter}`);
}

let COLORS = [];
// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
	let counter = array.length;

	// While there are elements in the array
	while (counter > 0) {
		// Pick a random index
		let index = Math.floor(Math.random() * counter);

		// Decrease counter by 1
		counter--;

		// And swap the last element with it
		let temp = array[counter];
		array[counter] = array[index];
		array[index] = temp;
	}

	return array;
}

let shuffledColors = shuffle(COLORS);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
	for (let color of colorArray) {
		// create a new div
		const newDiv = document.createElement('div');

		// give it a class attribute for the value we are looping over
		// newDiv.classList.add(color);
		newDiv.classList.add('back');
		newDiv.style.color = color;
		// call a function handleCardClick when a div is clicked on
		newDiv.addEventListener('click', handleCardClick);

		// append the div to the element with an id of game
		gameContainer.append(newDiv);
	}
}
resetButton.addEventListener('click', function() {
	const allDivs = document.querySelectorAll('.back');
	for (let divs of allDivs) {
		divs.style.backgroundColor = 'white';
		divs.classList.remove('picked');
		divs.classList.remove('matched');
		matchedPairs = 0;
	}
});

startButton.addEventListener('click', function() {
	const allDivs = document.querySelectorAll('back');
	for (let divs of allDivs) {
		allDivs.parentNode.removeChild(divs);
	}
	if (COLORS.length > 0) {
		COLORS = [];
		shuffledColors = [];
	}

	pushColor();
	shuffledColors = shuffle(COLORS);
	createDivsForColors(shuffledColors);
});
let card1 = '';
let card2 = '';
let numPick = 0;
let matchedPairs = 0;
// TODO: Implement this function!
function handleCardClick(event) {
	// you can use event.target to see which element was clicked
	console.log('you just clicked', event.target);
	const pick = event.target;

	if (card1 != '' && !pick.classList.contains('picked')) {
		if (numPick === 1) {
			numPick++;
			card2 = pick;
			console.log('card2');
			card2.style.backgroundColor = card2.style.color;
			card2.classList.add('picked');
		}

		if (numPick === 2 && card1.style.backgroundColor != card2.style.backgroundColor) {
			setTimeout(function() {
				card1.style.removeProperty('background-color');
				card2.style.removeProperty('background-color');
				card1.classList.remove('picked');
				card2.classList.remove('picked');
				card1 = '';
				card2 = '';
				numPick = 0;
			}, 1000);
		}
		if (numPick === 2 && card1.style.backgroundColor === card2.style.backgroundColor) {
			card1.classList.add('matched');
			card2.classList.add('matched');
			matchedPairs++;
			console.log(matchedPairs);
			setTimeout(function() {
				card1 = '';
				card2 = '';
				numPick = 0;
			}, 1000);
		}
	}
	if (numPick === 0) {
		numPick++;
		card1 = pick;
		card1.style.backgroundColor = card1.style.color;
		event.target.classList.add('picked');
		console.log('card1');
		console.log(numPick);
	}
	let allDivs = document.getElementsByClassName('back');
	if (matchedPairs === pushColorCounter) {
		setTimeout(function() {
			while (allDivs.length > 0) {
				allDivs[0].parentNode.removeChild(allDivs[0]);
			}
			COLORS = [];
			pushColorCounter = 0;
			matchedPairs = 0;
			numPick = 0;
			card1 = '';
			card2 = '';
		}, 1000);
	}
}
// when the DOM loads
createDivsForColors(shuffledColors);
