

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
// ages.push(new Age(0, "baby", "QuestionZeroQuestionZeroQuestionZeroQuestionZeroQuestionZero", ["Choice1","Choice2","Choice3"]));
ages.push(new Age(3, "toddler", "Your vegan parent is trying to feed you mashed avocado. What will you do?", ["Cry","Eat It","Slap the Spoon"]));
ages.push(new Age(7, "child", "The school bully tries to tackle you. What do you do?", ["Tell a Teacher","Fight Back","Thanos Snap Them"]));
ages.push(new Age(10, "child", "Your science teacher introduces the basic physics concepts to you. What do you do?", ["I'm basically Isaac Newton","Yeah, I get it","Huh?"]));
ages.push(new Age(13, "teen", "You're about to have your first kiss with a kid named...Alex?! What do you do? ", ["KISS THEM","Um ew","Alex is MY name, NO WAY!"]));
ages.push(new Age(16, "teen", "What high school clique do you join?", ["Geeks!","Jocks","Goths"]));
ages.push(new Age(18, "teen", "It's time to figure out your post high school plans. What do you do?", ["Apply to college","Take a gap year","I'll figure it out"]));
ages.push(new Age(21, "adult", "You're 21! What do you do?", ["You know ;)","Age is just a number","Goin' Clubbin'"]));
ages.push(new Age(25, "adult", "It's time to choose your career field!", ["Architecture","Computer Science","Graphic Design"]));
ages.push(new Age(35, "adult", "You just had a baby boy. What do you name him?", ["Greg!","Alex Jr","X Æ A-12"]));
ages.push(new Age(55, "adult", "Your hair is receding. What do you do?", ["C'est la vie","My hair isn't receding(I'm in denial)","Change my wig over there --->>"]));
ages.push(new Age(65, "elder", "You're at that age! What do you do?", ["Finally Retire!","Age is just a number","I love what I do so I'm gonna keep working!"]));
ages.push(new Age(85, "elder", "What do you wanna do today?", ["Go to the library","Hang with my grandkids","Run a marathon!"]));
ages.push(new Age(103, "elder", "You're getting pretty old. How are you feeling?", ["Never felt better!","A feel fine","..........."]));

let currAgeInd = 0;
let currAge = ages[0].ageNum;

function ageUp() {
	currAgeInd++;

	if(currAgeInd < ages.length) { //there's still possible ages to live 
		loadAgeSettings(currAgeInd); //updates next question and changes customizable options
		$('#currAge').text(" " + ages[currAgeInd].ageNum);
	}
	else { //kill them! hehehe
		triggerDeath();
	}
}

$('#ageUpButton').click(e => updateHistory());

function loadAgeSettings(currAgeInd) {
	//trigger questions
	loadQuestion(currAgeInd);
	//changes customizable options if charater enters new stage in life
	if(currAgeInd != 0 && (ages[currAgeInd].stageOfLife != ages[currAgeInd-1].stageOfLife)) {
		loadImages(ages[currAgeInd].stageOfLife);
	}
	else if (currAgeInd == 0) { //for first stage
		loadImages(ages[0].stageOfLife);
	}
}

// let questions = [];
function loadQuestion(currAgeInd) {
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
		  	let currActiveBtns = document.getElementsByClassName("active");
		  	if (currActiveBtns.length > 0) {
		  		currActiveBtns[0].className = currActiveBtns[0].className.replace(" active", "");
		  	}
		  	this.className += " active";
		});
	}

}

function loadImages(lifeStage) { //loads pics of custom tab. lifestages:toddler, child, teen, young adult, adult, elder
	//load skin
	for (let i=0; i<6; i++) {
		$('.skinPicPrev')[i].src = 'assets/avatar/'+lifeStage+'/skin/' + (i+1) + 'prev.png';
	}
	//load hair
	for (let i=0; i<3; i++) {
		$('.hairPicPrev')[i].src = 'assets/avatar/'+lifeStage+'/hair/' + (i+1) + 'prev.png';
	}
	//load tops, bottoms, shoes
	for (let i=0; i<3; i++) {
		$('.topPicPrev')[i].src = 'assets/avatar/'+lifeStage+'/top/' + (i+1) + 'prev.png';
		$('.bottomPicPrev')[i].src = 'assets/avatar/'+lifeStage+'/bottom/' + (i+1) + 'prev.png';
		$('.shoesPicPrev')[i].src = 'assets/avatar/'+lifeStage+'/shoes/' + (i+1) + 'prev.png';
	}

	//load character default outfit
	$('#skinPic').attr('src', 'assets/avatar/'+lifeStage+'/skin/4.png');
	$('#hairPic').attr('src', 'assets/avatar/'+lifeStage+'/hair/1.png');
	$('#shoesPic').attr('src', 'assets/avatar/'+lifeStage+'/shoes/3.png');
	$('#bottomPic').attr('src', 'assets/avatar/'+lifeStage+'/bottom/1.png');
	$('#topPic').attr('src', 'assets/avatar/'+lifeStage+'/top/1.png');
}	

function updateHistory() {
	let currActiveBtn = document.getElementsByClassName("active")[0]; //most recent choice button clicked by user
	if (!currActiveBtn) {
		alert("You must make a life decision before aging up!");
	}
	else {
		ageUp();
		let historyLine = document.createElement("P");
		historyLine.innerHTML = ages[currAgeInd-1].ageNum + " - " + currActiveBtn.innerHTML;

		let histLst = document.getElementById('historyList');
		histLst.appendChild(historyLine);
	}	
}

function triggerDeath() {
	$('.questionBox').remove();
	$('.customLookBox').remove();
	$('#ageUpButton').remove();
	// document.getElementById("historyBox").style.height = "95vh";
	$('#historyBox').height('85vh');
	// $('.rightCol').append(<div class="deathNoteBox box">)
	$("#dNB").css("visibility", "visible");

}


loadAgeSettings(0);


//ALLOWS THE MAIN CHARACTER'S ELEMENTS TO BE CHANGED WHEN A SELECTION IS MADE IN THE PALETTE. ex. src of .skinPic is changed to the pic thst the src of #skinPicPrev is previewing
$('.skinPicPrev').on('click',function(){
	$('#' + $(this).attr("class").slice(0,-4)).attr('src', $(this).attr("src").slice(0,-8) + ".png");
;})
$('.hairPicPrev').on('click',function(){
	$('#' + $(this).attr("class").slice(0,-4)).attr('src', $(this).attr("src").slice(0,-8) + ".png");
;})
$('.shoesPicPrev').on('click',function(){
	$('#' + $(this).attr("class").slice(0,-4)).attr('src', $(this).attr("src").slice(0,-8) + ".png");
;})
$('.bottomPicPrev').on('click',function(){
	$('#' + $(this).attr("class").slice(0,-4)).attr('src', $(this).attr("src").slice(0,-8) + ".png");
;})
$('.topPicPrev').on('click',function(){
	$('#' + $(this).attr("class").slice(0,-4)).attr('src', $(this).attr("src").slice(0,-8) + ".png");
;})


let name = "";

function getName() {
	// name = document.getElementById('nameInput').value;
	homepageAnimations(0); 
}

 // $('#mainContent').siblings().hide();
// $('#mainContent').parents().siblings().hide()

// executed when disc on homepage is clicked
function homepageAnimations() {
  //fade out disc and white background
  // let disc = document.getElementById("homepageDisc");
  let overlay = document.getElementById("overlay");
  let card = document.getElementById("introCard");
  
  //fades out disc on homepage
  let fadeCard = setInterval(function () {
        if (!card.style.opacity) {
            card.style.opacity = 1;
          }
        if (card.style.opacity > 0) {
            card.style.opacity -= 0.01;
        } else {
            clearInterval(fadeCard);
        }
    }, 5);

  //fades out white overalay on homepage
  let fadeOverlay = setInterval(function () {
        if (!overlay.style.opacity) {
            overlay.style.opacity = 1;
        }
        if (overlay.style.opacity > 0) {
            overlay.style.opacity -= 0.01;
        } else {
            clearInterval(fadeOverlay);
        }
    }, 20);
  //adapted from code on https://stackoverflow.com/questions/2060539/javascript-fade-element-from-specidied-opacity-to-specified-opacity?noredirect=1&lq=1
  setTimeout(function(){ $('#overlay').remove(); }, 3000);
}

