let song = []; //will hold all sounds the user adds to song

// Constructor function for Sound objects
function Sound(audio="", duration=0, ID="", image = "", zone = "", alt = "") {  
	this.audio = new Audio(audio); 
	this.audio.volume = 0.3;  
	this.duration = duration;  
	this.buttonID = ID + "Button";  
	this.image = image;  
	this.zone = zone;  
	this.alt = alt;  
	this.imgID = ID + "Img";
}


//Create Sound objects
let monkey = new Sound("assets/sounds/monkeyCry.mp3", 4300, "#monkey", "assets/icons/monkey.png", "#monkeyZone" ); 
let bird = new Sound("assets/sounds/birds.mp3", 4552, "#bird", "assets/icons/bird.png", "#birdZone");
let tiger = new Sound("assets/sounds/tiger.mp3", 3200, "#tiger", "assets/icons/tiger.png", "#tigerZone");
let rain = new Sound("assets/sounds/rain.wav", 4000, "#rain", "assets/icons/rain.png", "#rainZone");
let coconut = new Sound("assets/sounds/coconut.wav", 6865, "#coconut", "assets/icons/coconut.png", "#coconutZone");
let frog = new Sound("assets/sounds/frog.mp3", 4219, "#frog", "assets/icons/frog.png", "#frogZone");
let snake = new Sound("assets/sounds/snake.mp3", 2200, "#snake", "assets/icons/snake.png", "#snakeZone");
let insect = new Sound("assets/sounds/crickets.wav", 2989, "#insect", "assets/icons/insect.png", "#insectZone");
let owl = new Sound("assets/sounds/owl.wav", 4393, "#owl", "assets/icons/owl.png", "#owlZone");
let elephant= new Sound("assets/sounds/elephant.wav", 4200, "#elephant", "assets/icons/elephant.png", "#elephantZone");


//Adding single click actions.
//Specific sound plays when button clicked. (and icon will popup. not yet implemented)
$('#monkeyButton').click(e => playSound(monkey));
$('#birdButton').click(e => playSound(bird));
$('#tigerButton').click(e => playSound(tiger));
$('#rainButton').click(e => playSound(rain));
$('#coconutButton').click(e => playSound(coconut));
$('#frogButton').click(e => playSound(frog));
$('#snakeButton').click(e => playSound(snake));
$('#insectButton').click(e => playSound(insect));
$('#owlButton').click(e => playSound(owl));
$('#elephantButton').click(e => playSound(elephant));
$('#playbackButton').click(function() {
	playSong();
});
$('#undoButton').click(e => undoSoundAddition());

$('#clearButton').click(e => clearSong());

// $('#monkeyButton').click(e => scaleImage(monkey));

function scaleImage(sound) {

	$(document).ready(function () {
        var small={width: "200px",height: "116px"};
        var large={width: "400px",height: "232px"};
        var count=1; 
        $(sound.imgID).css(small).on('click',function () { 
            $(sound.imgID).animate((count==1)?large:small);
            count = 1-count;
        });
    });

	console.log(sound.imgID);



	
	}
	// while (i<2) {
	// 	if (i = 0) {
	// 		$("sound.image").css("transform", "scale(1.3)");
	// 		$("sound.image").css("transition-duration", "1.5s");
	// 		i++;
	// 	}
	// 	if (i = 1 ) {
	// 		$("sound.image").css("transform", "scale(1)");
	// 		$("sound.image").css("transition-duration", "1.5s");
	// 		i++;
	// 	}
	// }



//Adding double click actions.
//Adds specified sounds to the song when button dblclicked. (Accompanying animation not yet decided)
$('#monkeyButton').dblclick(function() {
  addToSong(monkey);
});

$('#birdButton').dblclick(function() {
  addToSong(bird);
});
$('#tigerButton').dblclick(function() {
  addToSong(tiger);
});
$('#rainButton').dblclick(function() {
  addToSong(rain);
});
$('#coconutButton').dblclick(function() {
  addToSong(coconut);
});
$('#frogButton').dblclick(function() {
  addToSong(frog);
});
$('#snakeButton').dblclick(function() {
  addToSong(snake);
});
$('#insectButton').dblclick(function() {
  addToSong(insect);
});

$('#owlButton').dblclick(function() {
  addToSong(owl);
});
$('#elephantButton').dblclick(function() {
  addToSong(elephant);
});




//FUNCTONS

//plays specificed sound
function playSound(sound) { 
sound.audio.play(); 
displayImage(sound); 
}

function displayImage (sound)  {
	// console.log($(sound.zone).length);
	if ($(sound.zone).is(':empty')) { //adds image into zone if its empty. Else scales up image in zone
		var soundIcon = document.createElement("IMG");  
		// soundIcon.setAttribute("id", ound.image);     
		soundIcon.setAttribute("src", sound.image);    
		soundIcon.setAttribute("id", sound.imgID);     
		// soundIcon.setAttribute("width", "100%");     
	soundIcon.setAttribute("height", "100%");     
	soundIcon.setAttribute("alt", sound.alt);  
	soundIcon.setAttribute("currScale", 1);  
	$(sound.zone).append(soundIcon); 
	}
	else { //scale image up and down
		// scaleImage(sound);
		// let scale = 1;

		//scale up
		// while(scale<8) {
		// 	setTimeout(function(){
		// 		$(sound.zone).children('img')[0].style.transform = "scale(" + scale + ")";
		// 		scale+=0.1;
		// 	}, 1000);	
		// }
		let currScale = $(sound.zone).children('img')[0].getAttribute("currScale");
		let newScale = ($(sound.zone).children('img')[0].getAttribute("currScale")) * 1.1;
		$(sound.zone).children('img')[0].setAttribute("currScale", newScale);//update scale attribute
		$(sound.zone).children('img')[0].style.transform = "scale(" + newScale + ")";
		
	}

}

//adds sound to song array and adds icon to staff
function addToSong(sound) {
	song.push(sound);

	//adds to staff
	var liObj = document.createElement("LI");
	var soundIcon = document.createElement("IMG");  
	soundIcon.setAttribute("src", sound.image);     
	// soundIcon.setAttribute("width", "100%");     
	soundIcon.setAttribute("height", "100%");     
	soundIcon.setAttribute("alt", sound.alt);  
	liObj.append(soundIcon);
	$("#notes").append(liObj); 
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

//undoes last sound added to sound
function undoSoundAddition() {
    song.pop();
    $('li:last-child').remove();
    // $("p:last-child")
    // $("#notes").pop();
}

//clears out all the zone images before playing song
function clearZones() {
$(".soundIcon").empty();
}

//clears song array
function clearSong() {
    song.length = 0;
    $("#notes").empty();
}

$('#infoButton').click (e => displayInfo());
function displayInfo() {
	$("#infoButton").click(function() {
	    $("#infoBox").toggle();
	  });
	}