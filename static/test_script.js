// for test
let questions = [
  {
    type: "multiple-choice",
    title: "Test: Basic Gameplay",
    questionText:
      "How many cards must the next player put down if the previous put a Queen?",
    choices: ["A) 1", "B) 2", "C) 3", "D) 4"],
    correctAnswer: "B) 2",
  },
  {
    type: "multiple-choice",
    title: "Test: Basic Gameplay",
    questionText: "Which player goes first in ERS",
    choices: [
      "A) Oldest",
      "B) Dealer",
      "C) Left of Dealer",
      "D) Right of Dealer",
    ],
    correctAnswer: "C) Left of Dealer",
  },
  {
    type: "input",
    title: "Test: Slap Rules",
    image: "/static/images/test/q3.png",
    questionText: "Identify the slap rule shown:",
    correctAnswer: "Royal Marriage",
  },
  {
    type: "input",
    title: "Test: Slap Rules",
    image: "/static/images/test/q4.png",
    questionText: "Identify the slap rule shown:",
    correctAnswer: "Top Bottom",
  },
  {
    type: "multiple-choice",
    title: "Test: Slap Rules",
    image: "/static/images/test/q5.png",
    questionText: "Is this a valid four in a row?",
    choices: ["A) True", "B) False"],
    correctAnswer: "A) True",
  },
  {
    type: "input",
    title: "Test: Slap Rules",
    image: "/static/images/test/queen_of_hearts.png",
    questionText:
      "How many cards must the next player put down if the previous	put a Queen ?",
    correctAnswer: "2",
  },
];
$(document).ready(function () {
  let currentQuestionIndex = 0;
  let selectedAnswer = "";

  function displayQuestion() {
    let question = questions[currentQuestionIndex];
    $("#question-title").text(question.title);
    $("#question-container").empty();

    if (question.image) {
      $("<img>")
        .attr({
          src: question.image,
          alt: "Card Image",
          class: "card-image",
        })
        .appendTo("#question-container");
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
      $("#feedback").text("Correct!").css("color", "green");
    } else {
      $("#feedback")
        .text(
          "Incorrect. The correct answer is " + question.correctAnswer + "."
        )
        .css("color", "red");
    }

    $("#submit-answer").hide();
    if (currentQuestionIndex < questions.length - 1) {
      $("#next-question").show();
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
