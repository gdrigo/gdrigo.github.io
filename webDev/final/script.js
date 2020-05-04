//AGE MANAGEMENT

//most important object.  Hold all the attributes associated with an age(actual age, availabe outfits, look, etc)
function Age(ageNum, stageOfLife, question, choices = []) {
	this.ageNum = ageNum;
	this.stageOfLife = stageOfLife;
	this.question = question;
	this.choices = choices;
}

//Setting ages
let ages = [];
ages.push(new Age(0, "Baby", "What's your first action for this world?", ["Cry Up a Storm","Not a Thing","Having Regrets"]));
ages.push(new Age(3, "Toddler", "insertQuestion", ["choice1","choice2","choice3"]));
ages.push(new Age(7, "Child", "insertQuestion", ["choice1","choice2","choice3"]));
ages.push(new Age(10, "Child", "insertQuestion", ["choice1","choice2","choice3"]));
ages.push(new Age(13, "Teen", "insertQuestion", ["choice1","choice2","choice3"]));
ages.push(new Age(16, "Teen", "insertQuestion", ["choice1","choice2","choice3"]));
ages.push(new Age(18, "Teen", "insertQuestion", ["choice1","choice2","choice3"]));
ages.push(new Age(21, "Young Adult", "insertQuestion", ["choice1","choice2","choice3"]));
ages.push(new Age(25, "Adult", "insertQuestion", ["choice1","choice2","choice3"]));
ages.push(new Age(35, "Adult", "insertQuestion", ["choice1","choice2","choice3"]));
ages.push(new Age(45, "Adult", "insertQuestion", ["choice1","choice2","choice3"]));
ages.push(new Age(55, "Adult", "insertQuestion", ["choice1","choice2","choice3"]));
ages.push(new Age(65, "Elder", "insertQuestion", ["choice1","choice2","choice3"]));
ages.push(new Age(75, "Elder", "insertQuestion", ["choice1","choice2","choice3"]));
ages.push(new Age(85, "Elder", "insertQuestion", ["choice1","choice2","choice3"]));
ages.push(new Age(103, "Elder", "insertQuestion", ["choice1","choice2","choice3"]));

let currAgeInd = 0;
let currAge = ages[0].ageNum;

function ageUp() {
	updateHistory();
	currAgeInd++;
	currAge = ages[currAgeInd].ageNum; //updates age

	if(currAgeInd < ages.length) { //there's still possible ages to live 
		loadAgeSettings(currAge); //updates next question (changes customizable options)
	}
	else { //kill them! hehehe
		triggerDeath();
	}
}

$('#ageUpButton').click(e => ageUp());

function loadAgeSettings(currAge) {
	//trigger questions
	loadQuestion(currAge);
	//changes customizable options
}

let questions = [];
function loadQuestion(currAge) {
	//changes the text of the #question p tag, clears out the buttons from the #choices and adds new ones for eahc choice

	//change #question text
	$('#question').text(ages[currAgeInd].question);

	//clear buttons
	$('#choices').empty();

	//add new buttons for each choice (also needs single click func)
	for(let i=0; i<ages[currAgeInd].choices.length; i++) {

  		// 1. Create the button
		let button = document.createElement("BUTTON");
		button.setAttribute("class", "choiceBtn");
		button.innerHTML = ages[currAgeInd].choices[i];

		// 2. Append somewhere
		var choiceList = document.getElementById("choices");
		choiceList.appendChild(button);

		// 3. Add event handler
		button.addEventListener ("click", function() {
			// alert("did something");
		  	let currActiveBtns = document.getElementsByClassName("active");
		  	if (currActiveBtns.length > 0) {
		  		currActiveBtns[0].className = currActiveBtns[0].className.replace(" active", "");
		  	}
		  	this.className += " active";
		});
	}

}	

function updateHistory() {
	let currActiveBtn = document.getElementsByClassName("active")[0]; //most recent choice button clicked by user
	if (!currActiveBtn) {
		alert("You must make a life decision before aging up!");
	}
	else {
		let historyLine = document.createElement("P");
		historyLine.innerHTML = currAge + " - " + currActiveBtn.innerHTML;

		let histLst = document.getElementById('historyList');
		histLst.appendChild(historyLine);
	}
			
}

let deathTrigger = 0;

loadQuestion(currAge);
// function triggerDeath() {}




