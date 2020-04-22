let song = []; //will hold all sounds the user adds to song

// Constructor function for Sound objects
function Sound(audio="", duration=0, buttonID="", image = "", zone = "", alt = "") {   
	this.audio = new Audio(audio); 
	this.audio.volume = 0.3;  
	this.duration = duration;   
	this.buttonID = buttonID;   
	this.image = image;   
	this.zone = zone;   
	this.alt = alt;  
}


//Create Sound objects
let monkey = new Sound("assets/sounds/monkeyCry.mp3", 4300, "#monkeyButton", "monkey.png", "#monkeyZone" ); 
// let monkey = new Sound("assets/sounds/monkeyCry.mp3", 4300, "#monkeyButton");
let bird = new Sound("assets/sounds/birds.mp3", 4552, "#birdButton", "bird.png", "#birdZone");
let tiger = new Sound("assets/sounds/tiger.mp3", 4552, "#tigerButton", "tiger.png", "#tigerZone");
let rain = new Sound("assets/sounds/rain.mp3", 4552, "#rainButton", "rain.png", "#rainZone");
let coconut = new Sound("assets/sounds/coconut.mp3", 4552, "#coconutButton", "coconut.png", "#coconutZone");
let frog = new Sound("assets/sounds/frog.mp3", 4552, "#frogButton", "frog.png", "#frogZone");
let snake = new Sound("assets/sounds/snake.mp3", 4552, "#snakeButton", "snake.png", "#snakeZone");
let insect = new Sound("assets/sounds/insect.mp3", 4552, "#insectButton", "insect.png", "#insectZone");
let owl = new Sound("assets/sounds/owl.mp3", 4552, "#owlButton", "owl.png", "#owlZone");
let elephant= new Sound("assets/sounds/elephant.mp3", 4552, "#elephantButton", "elephant.png", "#elephantZone");





//Adding single click actions. 
//Specific sound plays when button clicked. (and icon will popup. not yet implemented) 
$('#monkeyButton').click(e => playSound(monkey));
$('#birdButton').click(e => playSound(bird));
$('#playbackButton').click(function() {
	playSong();
});
// $('#undoButton').click(e => undoSoundAddition());

$('#clearButton').click(e => clearSong());


//Adding double click actions. 
//Adds specified sounds to the song when button dblclicked. (Accompanying animation not yet decided)
$('#monkeyButton').dblclick(function() {
  addToSong(monkey);
});

$('#birdButton').dblclick(function() {
  addToSong(bird);
});




//FUNCTONS

//plays specificed sound
function playSound(sound) { 	
	sound.audio.play(); 	
	displayImage(sound); 
}

function displayImage (sound)  { 
	console.log($(sound.zone).length);
	if ($(sound.zone).is(':empty')) { //adds image into zone if its empty. Else scales up image in zone
		var soundIcon = document.createElement("IMG");  
		 // soundIcon.setAttribute("id", ound.image);      
		soundIcon.setAttribute("src", sound.image);      
		// soundIcon.setAttribute("width", "100%");      
		soundIcon.setAttribute("height", "100%");      
		soundIcon.setAttribute("alt", sound.alt);  
		soundIcon.setAttribute("currScale", 1);  
		$(sound.zone).append(soundIcon); 
	}
	else { //scale up image
		let currScale = $(sound.zone).children('img')[0].getAttribute("currScale");
		let newScale = ($(sound.zone).children('img')[0].getAttribute("currScale")) * 1.3;
		$(sound.zone).children('img')[0].setAttribute("currScale", newScale);//update scale attribute
		$(sound.zone).children('img')[0].style.transform = "scale(" + newScale + ")";
	}
	
}

//adds sound to song array and adds icon to staff
function addToSong(sound) {
	song.push(sound);

	//adds to staff
	var soundIcon = document.createElement("IMG");  
	soundIcon.setAttribute("src", sound.image);      
	// soundIcon.setAttribute("width", "100%");      
	// soundIcon.setAttribute("height", "100%");      
	soundIcon.setAttribute("alt", sound.alt);  
	$("#notes").append(soundIcon); 

	//adds to staff
	// $("#notes").append("<li>Appended item</li>");

}

let delayBeforePlaying; //amount of time before each sound starts to play...will hold duration of prev sound in the sequence
//iterates through song array playing each sound
function playSong() {
	clearZones();
	for (let i =0; i<song.length; i++) { 
	    if(!song[i-1]) { //this is the first sound in song so we want a delay of 0
	    	setTimeout(function(){playSound(song[i])}, 0);
	    	delayBeforePlaying = 0; // resets this variable each time the song starts
	    }
	    else {
	    	delayBeforePlaying = delayBeforePlaying + song[i-1].duration; //updates the amount of time to delay before playing the next song..equal to the total length of all the previous sounds combined
	    	setTimeout(function(){playSound(song[i])}, delayBeforePlaying);
	    }
	}
}

// //undoes last sound added to sound
// function undoSoundAddition() {
//     song.pop();
//     $("#notes").pop();
// }

//clears out all the zone images before playing song
function clearZones() {
	$(".soundIcon").empty();
}

//clears song array
function clearSong() {
    song.length = 0;
    $("#notes").empty();
