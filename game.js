/*
Write the JavaScript for the game here
*/

var readyToPlay = false;
var userName = "";
var numberOfQuestionsAnsweredCorrectly = 0;
var numberOfQuestionsAnsweredWrong = 0;
var score = 0;
var quiz;

function startGame() {
  readyToPlay = true;
  $("#initial_screen").hide();
  $("#question_screen").show();
  $("#display_name").text(userName);
  $("#display_score").text(score);
  populateQuiz();
  
  var whichQuestionToDisplay = getRandomQuestion();
  populateQuestion(whichQuestionToDisplay);
  //console.log(whichQuestionToDisplay);
}

/*
Populates the given question on the screen
*/
function populateQuestion(questionToPopulate) {
  $("#question_body").text("Question: " + questionToPopulate.question);
  //console.log("populating question: " + questionToPopulate.question);
  var c = $("#options");
  for(var i = 0; i < questionToPopulate.choices.length; ++i) {
    var choiceId = i;
    var choiceBody = questionToPopulate.choices[i];
    
    var intputGroupAddOn = $('<span class="input-group-addon">').append($('<input type="checkbox" id="choice_id_' + choiceId + '">'));
    var inputGroup = $('<div class="input-group">');
    
    inputGroup.append(intputGroupAddOn);
    inputGroup.append($('<input type="text" class="form-control " value="' + choiceBody + '">'));
    var colLg = $('<div class="col-lg-6">').append(inputGroup);
    var row = $('<div class="row" style="margin-bottom: 10px;">').append(colLg);
    $("#question_choices").prepend(row);
  }
  
}

function populateQuiz() {
  quiz = [{
    question: "Alzheimer’s disease is not fatal.",
    choices: ["true", "false"],
    message: "Alzheimer's disease has no survivors.",
    correctAnswer: false,
    }, {
    question: "Alzheimer's has occurred only at ages older than:",
    choices: ["33", "37", "42", "55", "None of the above."],
    message: "Alzheimer's has been recorded to happen at ages as young as 30.",
    correctAnswer: "None of the above.",
    }, {
    question: "Alzheimer's is the biggest killer in the UK?",
    choices: ["true", "false"],
    correctAnswer: true,
    message: "Alzheimer's is the biggest killer in the UK.",

    }, {
    question: "The most prominent symptoms of Alzheimer's disease include memory loss, gradual loss of speech, and/or difficulties with any physical movements?",
    choices: ["true", "false"],
    correctAnswer: true,
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
  displayInitialScreen();
});

/*
randomly pics an index in the range [0, quiz.length-1]
*/
function getRandomQuestion() {
  var whichIndex = Math.floor(Math.random() * quiz.length);
  return quiz[whichIndex];
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