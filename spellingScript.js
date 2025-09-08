
let words = ["chair","pencil","paper","board","books","crayon","eraser","class","cloud","stars","moon","sunny","maths","angle","algebra","equal","seven","eight","three","twelve","monday","friday","sunday","january","august","april","orange","purple","yellow","circle","square","triangle","sphere","onion","carrot","potato","tomato","beans","cabbage"];
const feedback = document.getElementById("speechbox");
let currentIndex = 0;
let mistakes = 0;

document.getElementById("csvFileInput").addEventListener("change", function (event) {
  const file = event.target.files[0];
  const reader = new FileReader();

  reader.onload = function (e) {
    const text = e.target.result;

    // Split the CSV text into lines, then into array of words
    words = text.trim().split('\n').map(line => line.trim());

    if (words.length > 0) {
      feedback.innerHTML = "CSV loaded! Ready to begin.";
      currentIndex = 0;
      showSpellingProper(); // Start your game with the first word
    } else {
      feedback.innerHTML = "CSV file was empty.";
    }
  };

  reader.onerror = function () {
    feedback.innerHTML = "Error reading file.";
  };

  reader.readAsText(file);
});

function showForms() {
  document.getElementById("forms").style.display="block";
  document.getElementById("row1").style.display="none";
  document.getElementById("row2").style.display="none";
}


const csvFile = document.getElementById("csvFileInput");
const submit = document.getElementById("submitbutton");

function activatecsv() {
  csvFile.removeAttribute("disabled", true);
}

function showSpellingProper() {

  document.getElementById("forms").style.display="none";
  document.getElementById("row1").style.display="flex";
  document.getElementById("mispel").style.display="block";
  document.getElementById("row3").style.display="flex";

  feedback.innerHTML = "Hmm... How do you spell this word?";

  setTimeout(() => {
    speak(words[currentIndex]);
  }, 700)
}

function isMobile() {
  return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
}

let fullScrn = document.getElementById("fullscreen");
let elem = document.documentElement;

function toggleFullScreen() {

  if (fullScrn.checked) {
      if (elem.requestFullscreen) {
        elem.requestFullscreen();
      } else if (elem.webkitRequestFullscreen) { /* Safari */
        elem.webkitRequestFullscreen();
      } else if (elem.msRequestFullscreen) { /* IE11 */
        elem.msRequestFullscreen();
      }
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.webkitExitFullscreen) { /* Safari */
      document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) { /* IE11 */
      document.msExitFullscreen();
    }
  }
}

fullScrn.addEventListener ('change',toggleFullScreen);

 document.getElementById('submitbutton').addEventListener('click', function() {
    if (isMobile()) {
      fullScrn.checked = true;
      toggleFullScreen();
    }
});

function speak(text) {
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "en-US";
  speechSynthesis.speak(utterance);
}

function stateWords() {
  speechSynthesis.cancel()
  speak(words[currentIndex]);

}

const form = document.getElementById("input");

form.addEventListener("submit", function(event){
  event.preventDefault()
});

  const input = document.getElementById("inputbox");
  const bird = document.getElementById("birdie");
  const bubble = document.getElementById("speechbox"); 

function nextIndex() {
    bird.animate([
      { transform : 'rotate(2deg)'},
      { transform : 'rotate(-4deg)' },
      { transform : 'rotate(4deg)' },
      { transform : 'rotate(-4deg)' },
      { transform : 'rotate(4deg)' },
      { transform : 'rotate(-2deg)' }
    ], 700)

    bubble.animate([
      { transform : 'rotate(0.3deg)'},
      { transform : 'rotate(-0.6deg)' },
      { transform : 'rotate(0.6deg)' },
      { transform : 'rotate(-0.6deg)' },
      { transform : 'rotate(0.6deg)' },
      { transform : 'rotate(-0.3deg)' }
    ], 700)
}

function checkinput () {

  if (input.value.toLowerCase().trim() === words[currentIndex]) {  
    
    const goodJob = new SpeechSynthesisUtterance('Correct, Great Job!') ;
    goodJob.lang = "en-GB"; 
    goodJob.pitch = "1.70";
    currentIndex++;
    feedback.innerHTML = "Correct, Great Job!";
    speechSynthesis.speak(goodJob);
    document.getElementById("speechbox").style.background=" rgba(207, 250, 243, 1)";
    nextIndex();
    
     hintTimeout = setTimeout(() => {
      document.getElementById("speechbox").style.background=" rgb(229, 253, 253)";
      feedback.innerHTML = "Hmm... How do you spell this word?"
    }, 1000)
    
    if (currentIndex < words.length) {
      setTimeout(() => {
      input.value = "";
      speak(words[currentIndex]);
      }, 1000);
    } else {
      clearTimeout(hintTimeout)
      const correct = new SpeechSynthesisUtterance('Well Done!');
      correct.lang = "en-GB";
      correct.pitch = "1.70"
      speechSynthesis.speak(correct);
      feedback.innerHTML = "You answered everything correctly!";
      document.getElementById("speechbox").style.background=" rgba(207, 250, 243, 1)";
      input.disabled = true;

      setTimeout (() => {
        input.value = "";
      }, 1000)
    } 
  } else {
    const incorrect = new SpeechSynthesisUtterance('Sorry, that is incorrect!');
    incorrect.lang = "en-GB";
    incorrect.pitch = "1.70";

    document.getElementById("speechbox").style.background="rgba(253, 229, 229, 1)";
    feedback.innerHTML = "Sorry, that is incorrect!";

    speechSynthesis.cancel()
    speechSynthesis.speak(incorrect);
    
    mistakes++;
    document.getElementById("mistakecount").innerHTML = mistakes + " " + "Mistakes";
    document.getElementById("mistakecount").style.background="rgba(253, 229, 229, 1)";

    nextIndex();

    hintTimeout2 = setTimeout(() => {
      document.getElementById("speechbox").style.background=" rgb(229, 253, 253)";
      feedback.innerHTML = "Hmm... How do you spell this word?"
    }, 1000)
  }
}