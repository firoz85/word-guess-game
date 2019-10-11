// Web-page onload
window.onload = function () {

    var alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h',
          'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's',
          't', 'u', 'v', 'w', 'x', 'y', 'z'];
    
    var categories;         // Array of topics
    var word ;              // Selected word
    var guess ;             // Geuss
    var geusses = [ ];      // Stored geusses
    var lives ;             // Lives
    var counter ;           // Count correct geusses
    var loseCounter = 0;
    var winCounter = 0;
  
    // Get elements
    var showLives = document.getElementById("mylives"); 
    var showCat = document.getElementById("catagoryName");  
    var showLose = document.getElementById("loseCount");
    var showWin = document.getElementById("winCount");
    var showRandom = document.getElementById("randomWord"); 
  
  
    // create alphabet ul
    var buttons = function () {
      myButtons = document.getElementById('buttons');
      letters = document.createElement('ul');
  
      for (var i = 0; i < alphabet.length; i++) {
        letters.id = 'alphabet';
        list = document.createElement('li');
        list.id = 'letter';
        list.innerHTML = alphabet[i];
        check();
        myButtons.appendChild(letters);
        letters.appendChild(list);
      }
    }
      
        
    // Create geusses ul
     result = function () {
      wordHolder = document.getElementById('hold');
      
      correct = document.createElement('ul');
      for (var i = 0; i < word.length; i++) {
        correct.setAttribute('id', 'my-word');
        guess = document.createElement('li');
        guess.setAttribute('class', 'guess');
        if (word[i] === "-") {
          guess.innerHTML = "-";
          space = 1;
        } else {
          guess.innerHTML = "_";
        }
        geusses.push(guess);
        wordHolder.appendChild(correct);
        correct.appendChild(guess);              
      }
    }
    
    
        // Animate man
    var animate = function () {
      var drawMe = lives ;
      drawArray[drawMe]();
    }
  
    
     // Hangman
    canvas =  function(){
  
      myStickman = document.getElementById("stickman");
      context = myStickman.getContext('2d');
      context.beginPath();
      context.strokeStyle = "#fff";
      context.lineWidth = 2;
    };
    
      head = function(){
        myStickman = document.getElementById("stickman");
        context = myStickman.getContext('2d');
        context.beginPath();
        context.arc(60, 25, 10, 0, Math.PI*2, true);
        context.stroke();
      }
      
    draw = function($pathFromx, $pathFromy, $pathTox, $pathToy) {
      
      context.moveTo($pathFromx, $pathFromy);
      context.lineTo($pathTox, $pathToy);
      context.stroke(); 
  }
  
     frame1 = function() {
       draw (0, 150, 150, 150);
     };
     
     frame2 = function() {
       draw (10, 0, 10, 600);
     };
    
     frame3 = function() {
       draw (0, 5, 70, 5);
     };
    
     frame4 = function() {
       draw (60, 5, 60, 15);
     };
    
     torso = function() {
       draw (60, 36, 60, 70);
     };
    
     rightArm = function() {
       draw (60, 46, 100, 50);
     };
    
     leftArm = function() {
       draw (60, 46, 20, 50);
     };
    
     rightLeg = function() {
       draw (60, 70, 100, 100);
     };
    
     leftLeg = function() {
       draw (60, 70, 20, 100);
     };
    
    drawArray = [rightLeg, leftLeg, rightArm, leftArm,  torso,  head, frame4, frame3, frame2, frame1]; 
  
  
    // OnClick Function
     check = function () {
      list.onclick = function () {
        var geuss = (this.innerHTML);
        this.setAttribute("class", "active");
        this.onclick = null;
        for (var i = 0; i < word.length; i++) {
          if (word[i] === geuss) {
            geusses[i].innerHTML = geuss;
            counter += 1;
          }            
        }
        //console.log(geuss); 
        var j = (word.indexOf(geuss));
        if (j === -1) {
          lives -= 1;
          comments();
          animate();
        } else {
          comments();
        }
      }
    }
    
   
     // Show lives
    comments = function () {
      showLives.innerHTML = "Number of Guesses Remaining: " + lives;
      if (lives < 1) {
        showLives.innerHTML = "Game Over - You Lose!";
        loseCounter += 1;
        showLose.innerHTML = "Lose : " + loseCounter;
        showRandom.innerHTML = "Random Word: " + word;
        document.getElementById("buttons").style.display = "none";
        document.getElementById("randomWord").style.display = "block";
      }
      var didIWin = false;
      for (var i = 0; i < geusses.length; i++) {
        if (counter === geusses.length) {
          showLives.innerHTML = "You Win!";          
          didIWin = true;       
        }
      }
      if (didIWin == true) {
      winCounter++;
      showWin.innerHTML = "Win : " + winCounter;
      document.getElementById("buttons").style.display = "none";
      document.getElementById("randomWord").style.display = "none";
      }
    }     

    // Play
    play = function () {

      categories = ["sydney", "perth", "canberra", "melbourne", "brisbane"];      
      word = categories[Math.floor(Math.random() * categories.length)];
      //word = word.replace(/\s/g, "-");
      console.log(word);
      buttons();
  
      /* Start Clue part*/
      hints = ["Capital city of NSW", "Capital city of WA", "Capital city of Australia", "Capital city of Victoria", "Capital city of Queensland"];
      var hintIndex = categories.indexOf(word);
      showCat.innerHTML = "Clue: - " +  hints [hintIndex];
      /* End Clue part */

      geusses = [ ];
      lives = 10;
      counter = 0;
      space = 0;
      result();
      comments();
      canvas();
    }
  
   // play();
        
   
     // Reset
  
    document.getElementById('reset').onclick = function() {
      correct.parentNode.removeChild(correct);
      letters.parentNode.removeChild(letters);
      document.getElementById("buttons").style.display = "block";
      context.clearRect(0, 0, 400, 400);
      play();
    }
  }  
   

  // Start game
function startGame() {
  document.getElementById('home').className = "h"
  play();
}