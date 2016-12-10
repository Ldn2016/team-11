/*
Write the JavaScript for the game here
*/

var readyToPlay = false;
var userName = "";

function startGame() {
	readyToPlay = true;
	$("#initial_screen").hide();
	$("#question_screen").show();
}

function displayInitialScreen() {
	$("#initial_screen").show();
	$("#play_button").click(function() {
	  userName = $("#user_name").val();
	  alert(userName + " starting the game!");
	  startGame();
	});
}

$(document).ready(function() {
	$("#initial_screen").hide();
	$("#question_screen").hide();
	displayInitialScreen();
});


// `input` will be defined elsewhere, it's a means


var quiz = [{
    question: "Alzheimer’s disease is not fatal.",
    choices: [true, false],
    message: "Alzheimer's disease has no survivors.",
    correctAnswer: false,
	}, {
    question: "Alzheimer's has occurred only at ages older than:",
    choices: [33, 37, 42, 55, "None of the above."],
    message: "Alzheimer's has been recorded to happen at ages as young as 30.",
    correctAnswer: "None of the above.",
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
  

