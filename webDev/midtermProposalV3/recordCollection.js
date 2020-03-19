/////////////////////
//FOR recordlist.html

//adds the album and artist names to the sides of the grid of albums when one is hovered over 
function showDetails(albumName, artistName, textColor) {
  let artistNS = document.getElementById("artistNameSpace");
  let albumNS = document.getElementById("albumNameSpace");

  //add artistName to artistNameSpace div
  let artistPara = document.createElement("p");
  let artistText = document.createTextNode(artistName);
  artistPara.appendChild(artistText);
  artistNS.appendChild(artistPara);

  //add albumName to albumNameSpace div
  let albumPara = document.createElement("p");
  let albumText = document.createTextNode(albumName);
  albumPara.appendChild(albumText);
  albumNS.appendChild(albumPara);

  //add styling to album and artist names
  addStyling(artistNS.firstChild, textColor);
  addStyling(albumNS.firstChild, textColor);
}

//makes the album name and artist the color of the album cover
function  addStyling(artistOrAlbumText, textColor) {
  let artistNS = document.getElementById("artistNameSpace");
  let albumNS = document.getElementById("albumNameSpace");

  artistOrAlbumText.style.color = textColor;
  artistOrAlbumText.style.writingMode = "vertical-rl";
  artistOrAlbumText.style.textOrientation = "sideways";
  artistOrAlbumText.style.textAlign = "center";
  artistOrAlbumText.style.fontSize = "4vw";
}

function removeDetails() {
  let artistNS = document.getElementById("artistNameSpace");
  let albumNS = document.getElementById("albumNameSpace");

  while (artistNS.firstChild){
    artistNS.removeChild(artistNS.firstChild); 
  }

  while (albumNS.firstChild){
    albumNS.removeChild(albumNS.firstChild); 
  }
}
//Link to onomouseover and onmouseleave: https://www.w3schools.com/jsref/event_onmouseover.asp



//////////////////////////////
//FOR whenicomehome.html


function playSong(songNum, album) {
  let filepath = "assets/" + album + "/songs/" + songNum + ".mp3";
  // console.log(filepath);
  var audioTag = document.getElementById("audioTag");
  audioTag.src = filepath;
  audioTag.load();

  // Add active class to the current button (highlight it)
  // var header = document.getElementById("tracks");
  // var songs = document.getElementsByClassName("track");
  //grey out all tracks
  

  // for (var i = 0; i < songs.length; i++) {
  //   songs[i].style.color = "grey";
  // }


  // this.style.color = 'white';
    // songs[i].addEventListener("click", function() {
    // var current = document.getElementsByClassName("active");
    // current[0].className = current[0].className.replace(" active", "");
    // this.className += " active";
    // });
  
  
}

//code adapted from https://developer.mozilla.org/en-US/docs/Web/HTML/Element/audio