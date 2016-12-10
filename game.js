/*
Write the JavaScript for the game here
*/

var readyToPlay = false;
var userName = "";
var numberOfQuestionsAnsweredCorrectly = 0;
var numberOfQuestionsAnsweredWrong = 0;
var score = 0;
var quiz;
var currentQuestion; //holds the question object currently being displayed to the user
var currentQuestionId; //hold the id of the current question
var alreadyAnsweredQuestionIdsSet = {};
var numberOfQuestionsToShow = 4;

/*
Function being called when the game is at its end
*/
function endGame() {
	$("#end_screen").show();
	$("#question_screen").hide();
	$("#initial_screen").hide();
	$("#display_name2").text(userName);
	$("#display_score2").text(score);
}

/*
Gives the initial start of the game
*/
function startGame() {
  readyToPlay = true;
  $("#initial_screen").hide();
  $("#question_screen").show();
  $("#end_screen").hide();
  $("#display_name").text(userName);
  $("#display_score").text(score);
  populateQuiz();
  
  var whichQuestionToDisplay = getRandomQuestion();
  populateQuestion(quiz[whichQuestionToDisplay], whichQuestionToDisplay);
  //console.log(whichQuestionToDisplay);
  $("#next_question").click(function() {
    var isCorrectAnswer = checkAnswerIsCorrect();
	if(isCorrectAnswer) {
		alert("Correct answer: " + currentQuestion.message);
		++numberOfQuestionsAnsweredCorrectly;
	} else {
		alert("Wrong answer: " + currentQuestion.message);
		++numberOfQuestionsAnsweredWrong;
	}
	updateScore();
	
	if(numberOfQuestionsToShow == (numberOfQuestionsAnsweredCorrectly + numberOfQuestionsAnsweredWrong)) {
		endGame();
	} else {
		displayNextQuestion();
	}
  });
}

function updateScore() {
	score = numberOfQuestionsAnsweredCorrectly - numberOfQuestionsAnsweredWrong;
}

function displayNextQuestion() {
	$("#display_score").text(score);
	$('#question_choices .row').remove();
	var whichQuestionToDisplay = getRandomQuestion();
    populateQuestion(quiz[whichQuestionToDisplay], whichQuestionToDisplay);
}

function getSelectedAnswers() {
	return $('#question_choices input:checked');
}

/*
Returns true if the user answered the question correctly, false otherwise
*/
function checkAnswerIsCorrect() {
	var selectedAnswersIds = [];
	var correctAnswerIds = [];
	getSelectedAnswers().each(function() {
		selectedAnswersIds.push($(this).val());
	});
	for(var i = 0; i < currentQuestion.choices.length; ++i) {
		if(currentQuestion.choices[i].isCorrect) correctAnswerIds.push(i);
	}
	if(selectedAnswersIds.length != correctAnswerIds.length) return false;
	selectedAnswersIds.sort();
	correctAnswerIds.sort();
	for(var i = 0; i < selectedAnswersIds.length; ++i) {
		if(selectedAnswersIds[i] != correctAnswerIds[i]) return false;
	}
	return true;
}

/*
Populates the given question on the screen
*/
function populateQuestion(questionToPopulate, id) {
  currentQuestion = questionToPopulate;
  currentQuestionId = id;
  alreadyAnsweredQuestionIdsSet[id.toString()] = true;
  $("#question_body").text("Question: " + questionToPopulate.question);
  //console.log("populating question: " + questionToPopulate.question);
  var c = $("#options");
  for(var i = 0; i < questionToPopulate.choices.length; ++i) {
    var choiceId = i;
    var choiceBody = questionToPopulate.choices[i].body;
    
    var intputGroupAddOn = $('<span class="input-group-addon">').append($('<input type="checkbox" name="answers" value="' + choiceId + '">'));
    var inputGroup = $('<div class="input-group input-group-lg">');
    
    inputGroup.append(intputGroupAddOn);
    inputGroup.append($('<input type="text" class="form-control " value="' + choiceBody + '">'));
    var colLg = $('<div class="col-lg-6">').append(inputGroup);
    var row = $('<div class="row" style="margin-bottom: 10px;">').append(colLg);
    $("#question_choices").prepend(row);
  }
  
}

function populateQuiz() {
  quiz = [{
		question: "The Alzheimer’s disease is fatal.",
		choices: [
			{body: "true", isCorrect: true},
			{body: "false", isCorrect: false}
		],
		message: "The Alzheimer's disease has no survivors.",
    },
	{
		question: "The Alzheimer's disease has occurred only at ages older than:",
		choices: [
			{body: "33", isCorrect: false},
			{body: "37", isCorrect: false},
			{body: "42", isCorrect: false},
			{body: "55", isCorrect: false},
			{body: "None of the below.", isCorrect: true}
		],
		message: "Alzheimer's has been recorded to happen at ages as young as 30.",
		correctAnswer: "None of the below.",
    },
	{
		question: "Alzheimer's is the biggest killer in the UK.",
		choices: [
			{body: "true", isCorrect: true},
			{body: "false", isCorrect: false}
		],
		message: "Alzheimer's is the biggest killer in the UK; it is responsible for more deaths than cancer and heart diseases combined.",

    },
	{
		question: "The most prominent symptoms of the Alzheimer's disease include memory loss, gradual loss of speech, and/or difficulties with any physical movements.",
		choices: [
			{body: "true", isCorrect: true},
			{body: "false", isCorrect: false}
		],
		message: "Alzheimer's has many more symptoms that the average person is aware of."
  }];
}

function displayInitialScreen() {
  $("#initial_screen").show();
  $("#play_button").click(function() {
    userName = $("#user_name").val();
    startGame();
  });
}

/*
Starting point of the app
*/
$(document).ready(function() {
  $("#initial_screen").hide();
  $("#question_screen").hide();
  $("#end_screen").hide();
  displayInitialScreen();
});

/*
randomly pics an index in the range [0, quiz.length-1] that does NOT
appear in the alreadyAnsweredQuestionIdsSet map as a key to avoid picking the same
question again
*/
function getRandomQuestion() {
	var counter = 0;
	while(counter < 100) {
		var whichIndex = Math.floor(Math.random() * quiz.length);
		if(!(whichIndex.toString() in alreadyAnsweredQuestionIdsSet)) {
			return whichIndex;
		}
		++counter;
	}
  return 0;
}

// `input` will be defined elsewhere, it's a means

/*
Plausible Questions:
(*AD = Alzheimer's Disease)
- Most common form of dementia (ans: alzheimer's disease)
    other possible: vascular demntia,
                    parkinson's disease,
                    huntington's disease,
                    dementia with Lewy bodies.
    Message: "more than 850,000 people have dimentia in the UK alone."

- Who has a higher risk of AD (ans: women)
    other possible: men, equally the same
    message: "Women are nearly twice as likely to develop AD than men."

- What are the two protiens responsible for dimentia?
      amyloid (ans)
      tau (ans)
      TDP-43
      Actin 5C

- Is there a cure for AD?
      true
      false (ans)
  message: although there are treatments that can ease symptoms, there is no
  cure for dimentia.

- How much does dimentia effect the global economy?
      $818 billion (ans)
      $765 billion
      $560 million
      $300 thousand
  message: as of March 2016 dimentia costs the global economy
  $818 billion, a figure that is continuously rising.

-

-
*/


var quiz = [{
    question: "Alzheimer’s disease is not fatal.",
    choices: [true, false],
    message: "Alzheimer's disease has no survivors.",
    correctAnswer: false,
  }, {
    question: "Alzheimer's has occurred only at ages older than:",
    choices: [33, 37, 42, 55, "None of the below."],
    message: "Alzheimer's has been recorded to happen at ages as young as 30.",
    correctAnswer: "None of the below.",
  }, {
    question: "Alzheimer's is the biggest killer in the UK?",
    choices: [true, false],
    correctAnswer: true,
    message: "Alzheimer's is the biggest killer in the UK.",

  }, {
    question: "The most prominent symptoms of Alzheimer's disease include memory loss, gradual loss of speech, and/or difficulties with any physical movements?",
    choices: [true, false],
    correctAnswer: true,
    message: "Alzheimer's has many more symptoms that the average person is aware of."
  }];

  var questionCounter = 0; //Tracks question number
  var selections = []; //Array containing user choices
  var quiz = $('#quiz'); //Quiz div object

  // Display initial question
  displayNext();

  // Click handler for the 'next' button
  $('#next').on('click', function (e) {
    e.preventDefault();

    // Suspend click listener during fade animation
    if(quiz.is(':animated')) {
      return false;
    }
    choose();

    // If no user selection, progress is stopped
    if (isNaN(selections[questionCounter])) {
      alert('Please make a selection!');
    } else {
      questionCounter++;
      displayNext();
    }
  });

  // Click handler for the 'prev' button
  $('#prev').on('click', function (e) {
    e.preventDefault();

    if(quiz.is(':animated')) {
      return false;
    }
    choose();
    questionCounter--;
    displayNext();
  });

  // Click handler for the 'Start Over' button
  $('#start').on('click', function (e) {
    e.preventDefault();

    if(quiz.is(':animated')) {
      return false;
    }
    questionCounter = 0;
    selections = [];
    displayNext();
    $('#start').hide();
  });

  // Animates buttons on hover
  $('.button').on('mouseenter', function () {
    $(this).addClass('active');
  });
  $('.button').on('mouseleave', function () {
    $(this).removeClass('active');
  });

  // Creates and returns the div that contains the questions and
  // the answer selections
  function createQuestionElement(index) {
    var qElement = $('<div>', {
      id: 'question'
    });

    var header = $('<h2>Question ' + (index + 1) + ':</h2>');
    qElement.append(header);

    var question = $('<p>').append(questions[index].question);
    qElement.append(question);

    var radioButtons = createRadios(index);
    qElement.append(radioButtons);

    return qElement;
  }

  // Creates a list of the answer choices as radio inputs
  function createRadios(index) {
    var radioList = $('<ul>');
    var item;
    var input = '';
    for (var i = 0; i < questions[index].choices.length; i++) {
      item = $('<li>');
      input = '<input type="radio" name="answer" value=' + i + ' />';
      input += questions[index].choices[i];
      item.append(input);
      radioList.append(item);
    }
    return radioList;
  }

  // Reads the user selection and pushes the value to an array
  function choose() {
    selections[questionCounter] = +$('input[name="answer"]:checked').val();
  }

  // Displays next requested element
  function displayNext() {
    quiz.fadeOut(function() {
      $('#question').remove();

      if(questionCounter < questions.length){
        var nextQuestion = createQuestionElement(questionCounter);
        quiz.append(nextQuestion).fadeIn();
        if (!(isNaN(selections[questionCounter]))) {
          $('input[value='+selections[questionCounter]+']').prop('checked', true);
        }

        // Controls display of 'prev' button
        if(questionCounter === 1){
          $('#prev').show();
        } else if(questionCounter === 0){

          $('#prev').hide();
          $('#next').show();
        }
      }else {
        var scoreElem = displayScore();
        quiz.append(scoreElem).fadeIn();
        $('#next').hide();
        $('#prev').hide();
        $('#start').show();
      }
    });
  }
