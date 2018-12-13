// load gifs on the temp page, make the main page timer function when it runs out, create and end game function that displays results and clears/ resets the game/
// add the first question to the switch statement
var b;
var start = false;  
var timeLeft = 20;
var timeLeft2 = 3;
var correctAnswer;
var correctTally = 0;
var incorrectTally = 0;
var outOfTime = 0;
var winningArray = ["assets/images/winning1.gif", "assets/images/winning2.gif", "assets/images/winning3.gif", "assets/images/winning4.gif", 
"assets/images/winning5.gif", "assets/images/winning6.gif"];
var losingArray = ["assets/images/losing1.gif", "assets/images/losing2.gif", "assets/images/losing3.gif", "assets/images/losing4.gif", 
"assets/images/losing5.gif", "assets/images/losing6.gif"];
var imageCount = 0;
var arrayCounter = 0;


// section contains ojects used in questions and answer 
var obj1 = {
	question: "Which of the following is NOT a nucleotide ?",
	response1: "Thymine",
	response2: "Adenine",
	response3: "Lysosine",
	response4: "Cytosine",
};

var obj2 = {
	question: "What is the smallest unit of measurement ?",
	response1: "Millimeter",
	response2: "Plank length",
	response3: "Head of pin",
	response4: "Quark length",

};

var obj3 = {
	question: "Which of the following is NOT one of the four lobes of the brain ?",
	response1: "Parietal",
	response2: "Corporal",
	response3: "Frontal",
	response4: "Temporal",

};

var obj4 = {
	question: "Which best decribes the second law of thermodynamics ?",
	response1: "Entropy, when in a open system, will decrease over time",
	response2: "Entropy, when in an open system, will increase over time",
	response3: "Entropy, when in a closed system, will decrease over time",
	response4: "Entropy, when in a closed system, will increase over time",

};

var obj5 = {
	question: "Which chemical compound has the highest specific heat (takes the most energy to raise 1 degree) ?",
	response1: "H2O (water)",
	response2: "NaCl (salt)",
	response3: "H2SO4 (sulfuric acid)",
	response4: "CH4 (methane)",
	
};

var obj6 = {
	question: "How long ago did the earth form ?",
	response1: "106.7 million years",
	response2: "2.3 billion years",
	response3: "4.6 billion years",
	response4: "10,000 years",
	
};

var questionArray = [obj1, obj2, obj3, obj4, obj5, obj6];


$(document).ready(function(){

// when pressed starts the game dynamicaly loads the timer/ removes start button and appends the objects

window.addEventListener("keydown", function (event) {
  if (start == false) {

  switch (event.key) {
    case "Enter":
    	  
    	 $("#startButton").remove();
    	 
		 $("#timeDisplayed").html(timeLeft);
			countDown();
			nextQuestion();
			start=true;
	break;
	
		}
	}
});



// count down timer which is also linked to the decrement function 
function countDown(){
	counter = setInterval(decrement, 1000);
};
// is called by the countDown function decrements by 1 and updates the html 
function decrement(){
	if (timeLeft > 0) {
		timeLeft--;
		$("#timeDisplayed").html(timeLeft);
	 } else if ( timeLeft == 0 ){
	 		$("#questionDisplayed").empty();
	   		 $("#a1,#a2,#a3,#a4").empty();
			  $("#questionDisplayed").append("Out of Time !");
			  $("#gifHolder").html('<img src='+losingArray[imageCount]+ ' width="300px"/>');
				incorrectTally++;
				imageCount++;
				outOfTime++;
				arrayCounter++;
				cancelTimer();
		        countDown2();
	}	
	
};


// establishes a counter for the temp page and calls/resets the main timer
function countDown2() {
	counter2 = setInterval(tempPage, 1000);
};
function tempPage() {
	if (timeLeft2 > 0) {
		timeLeft2--;
	} else if (timeLeft2 == 0){
		cancelTimer2();
		endGame();
		nextQuestion();
		countDown();
		
		timeLeft2=3;
		timeLeft=21;
		
		
	}
};

// clears current questions/answer -- displays the next question and sets the correct answer variable to valid answer
function nextQuestion(){
	$("#questionDisplayed").empty();
	$("#gifHolder").empty();

	
	$("#questionDisplayed").append(questionArray[arrayCounter].question);
		
		$("#a1").append(questionArray[arrayCounter].response1);
		$("#a2").append(questionArray[arrayCounter].response2);
		$("#a3").append(questionArray[arrayCounter].response3);
		$("#a4").append(questionArray[arrayCounter].response4);

		switch (arrayCounter){
			case 0:
			correctAnswer = obj1.response3;
			break;
			case 1:
			correctAnswer = obj2.response2;
			break;
			case 2:
			correctAnswer = obj3.response2;
			break;
			case 3: 
			correctAnswer = obj4.response4;
			break;
			case 4: 
			correctAnswer = obj5.response1;
			break;
			case 5: 
			correctAnswer = obj6.response3;
			break;


		}
}


// evaluates answer chosen to correct answer and displays coreesponding feedback / correct-incorrect

	$("#a1,#a2,#a3,#a4").on("click", function(){
			answerChosen = $(this).text();
		if (arrayCounter < 6) { 
			
					$("#questionDisplayed").empty();
				    $("#a1,#a2,#a3,#a4").empty();
				
			if (answerChosen == correctAnswer) {
				$("#questionDisplayed").append("You got that correct");
				$("#gifHolder").html('<img src='+winningArray[imageCount]+ ' width="300px" height="300px"/>');
				correctTally++;

			}else if (answerChosen !== correctAnswer){
				$("#questionDisplayed").append("You got that incorrect");
				$("#gifHolder").html('<img src='+losingArray[imageCount]+ ' width="300px" height="300px"/>');
				incorrectTally++;
			}

				cancelTimer();
				countDown2();
				arrayCounter++;
				console.log("arrary number", arrayCounter);
				imageCount++;

			console.log("correct:", correctTally);
			console.log("incorrect:", incorrectTally);
	    }	
	
	});


// stops the main timer
function cancelTimer(){
	clearTimeout(counter)
}

// stops the temp page timer
function cancelTimer2(){
	clearTimeout(counter2)
}

// when the last question is answered it stops the game 

function endGame(){
if (arrayCounter == 6) {
	console.log("game over");
		 $("#timeDisplayed").empty();
		$("#timeDisplayed").append("GAME OVER");
		$("#a1").append("Correct answers : " + correctTally);
		$("#a2").append("Incorrect answers : " + incorrectTally);
		$("#a3").append("Ran out of time " + outOfTime + " times");
		$("#a1,#a2,#a3").css('font-size','50px');	
				b = $('<button>');
				b.addClass("restart");
				b.text("Play Again ? ");
				b.css('font-size','50px');
				$("#restartButton").append(b);
				
  	$('#restartButton').on("click", function(){

		console.log("restarting");

	correctTally = 0;
	incorrectTally = 0;
	outOfTime = 0;
	imageCount = 0;
	start = false;
	arrayCounter = 0;
	timeLeft = 20;
	timeLeft2 = 3;
	$('#restartButton').empty();
	$("#questionDisplayed").empty();
	$("#a1,#a2,#a3,#a4").empty();
	$("#a1,#a2,#a3").css('font-size','25px');
	$("#timeDisplayed").html(timeLeft);
			countDown();
			nextQuestion();

});

	}
}







// if (arrayCounter == 6 ) {
// }



});