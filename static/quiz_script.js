// for quiz
let questions = [
  {
    type: "multiple-choice",
    title: "Quiz: Basic Gameplay",
    image: "/static/images/quiz/queen_of_hearts.png",
    questionText:
      "How many cards must the next player put down if the previous put a Queen?",
    choices: ["1", "2", "3", "4"],
    correctAnswer: "2",
  },
  {
    type: "multiple-choice",
    title: "Quiz: Basic Gameplay",
    questionText: "Which player goes first in ERS?",
    image: "/static/images/play-2.png",
    choices: ["Oldest", "Dealer", "Left of Dealer", "Right of Dealer"],
    correctAnswer: "Left of Dealer",
  },
  {
    type: "input",
    title: "Quiz: Slap Rules",
    image: "/static/images/quiz/q3.png",
    questionText: "Identify the slap rule shown:",
    correctAnswer: "Royal Marriage",
  },
  {
    type: "input",
    title: "Quiz: Slap Rules",
    image: "/static/images/quiz/q4.png",
    questionText: "Identify the slap rule shown:",
    correctAnswer: "Top Bottom",
  },
  {
    type: "multiple-choice",
    title: "Quiz: Slap Rules",
    image: "/static/images/quiz/q5.png",
    questionText: "Is this a valid four in a row?",
    choices: ["True", "False"],
    correctAnswer: "True",
  },
];

let correct_score = 0;
let incorrect_score = 0;

$(document).ready(function () {
  let currentQuestionIndex = 0;
  let selectedAnswer = "";
  $("#last-question").hide();
  function displayQuestion() {
    let question = questions[currentQuestionIndex];
    $("#question-title").text(question.title);
    $("#score-correct").text(correct_score);
    $("#score-incorrect").text(incorrect_score);

    $("#question-container").empty();
    $("#img-location").empty();
    if (question.image) {
      $(".gameplay-cont").removeClass("no-image");
      $("<img>")
        .attr({
          src: question.image,
          alt: "Card Image",
          class: "card-image",
        })
        .appendTo("#img-location");
    } else {
      $(".gameplay-cont").addClass("no-image");
    }
    $("<p>").text(question.questionText).appendTo("#question-container");

    if (question.type === "multiple-choice") {
      let $form = $("<form>").attr("id", "answer-form");
      question.choices.forEach(function (choice, index) {
        let $label = $("<label>").addClass("radio-option");
        let $radio = $("<input>").attr({
          type: "radio",
          name: "answer",
          value: choice,
          id: "choice" + index,
        });
        $radio.on("change", function () {
          selectedAnswer = $(this).val();
          $(".radio-option").removeClass("selected");
          $(this).closest(".radio-option").addClass("selected");
        });

        $label.append($radio);
        $label.append(choice);
        $form.append($label);
      });
      $form.appendTo("#question-container");
    } else if (question.type === "input") {
      $("<input>")
        .attr({
          type: "text",
          id: "user-input",
          class: "user-input",
          placeholder: "Type your answer here...",
        })
        .appendTo("#question-container");
    }

    $("#submit-answer").show();
    $("#next-question").hide();

    $("#feedback").empty();
    selectedAnswer = "";
  }

  displayQuestion(); // display the first question

  // for multiple choice questions
  $("#quiz-container").on("click", "#answer-list li", function () {
    $("#answer-list li").removeClass("selected");
    $(this).addClass("selected");
    selectedAnswer = $(this).text();
  });

  // check answer is right
  $("#submit-answer").click(function () {
    let question = questions[currentQuestionIndex];
    let isCorrect = false;

    if (question.type === "multiple-choice") {
      console.log("selectedAnswer", selectedAnswer);
      isCorrect = selectedAnswer === question.correctAnswer;
    } else if (question.type === "input") {
      selectedAnswer = $("#user-input").val();
      isCorrect =
        selectedAnswer.trim().toLowerCase() ===
        question.correctAnswer.toLowerCase();
    }
    if (isCorrect) {
      correct_score += 1;
      $("#score-correct").text(correct_score);
      $("#feedback").text("Correct!").css("color", "green");
      $("#user-input").css("background-color", "#deebd8");
      $(".radio-option").each(function () {
        if (
          $(this).find("input[type='radio']:checked").val() ===
          question.correctAnswer
        ) {
          $(this).addClass("correct");
        }
      });
    } else {
      incorrect_score += 1;
      $("#score-incorrect").text(incorrect_score);
      $("#feedback")
        .text(
          "Incorrect. The correct answer is " + question.correctAnswer + "."
        )
        .css("color", "red");
      $("#user-input").css("background-color", "#eecdcd");
      $(".radio-option").each(function () {
        if ($(this).find("input[type='radio']:checked").val()) {
          $(this).addClass("wrong");
        }
      });
    }

    $("#submit-answer").hide();
    if (currentQuestionIndex < questions.length - 1) {
      $("#next-question").show();
    } else if (currentQuestionIndex == questions.length - 1) {
      $("#last-question").show();
    }
  });

  // go to next question
  $("#next-question").click(function () {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
      displayQuestion();
    } else {
      // End of quiz
      $("#quiz-container").html("<h2>Quiz Complete!</h2>");
    }
  });

  $("<style>")
    .prop("type", "text/css")
    .html(".selected { border-color: #007bff; }")
    .appendTo("head");
});
