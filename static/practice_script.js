import { practice_rounds } from "./default_practice.js";

let correct_score = 0;
let incorrect_score = 0;
// sample card object
// {
//     value: "2",
//     suit: "diamonds",
//     image: "/static/images/cards/2_of_diamonds.png",
//   },
let current_cards_displayed = [];
let current_card_index = 0;
let current_question_index = 0;

let card_width = 150;
let card_height = 217.8;

function getRandomCard() {
  const suits = ["hearts", "diamonds", "clubs", "spades"];
  const values = [
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "jack",
    "queen",
    "king",
  ];

  let randomSuit = suits[Math.floor(Math.random() * suits.length)];
  let randomValue = values[Math.floor(Math.random() * values.length)];

  // add current card to current_cards
  let random_card = {
    value: randomValue,
    suit: randomSuit,
    image: `/static/images/cards/${randomValue}_of_${randomSuit}.png`,
  };
  current_cards_displayed.push(random_card);
}

function renderCards() {
  const cardContainer = document.getElementById("card-container");
  cardContainer.innerHTML = "";

  if (current_cards_displayed.length > 5) {
    let firstCardElement = createCardElement(
      current_cards_displayed[0],
      0,
      0,
      0
    );
    cardContainer.appendChild(firstCardElement);

    let ellipsisElement = document.createElement("div");
    ellipsisElement.classList.add("ellipsis");
    ellipsisElement.style.zIndex = 2;
    ellipsisElement.style.transform = `translateY(${-180 * 1}px) translateX(${
      30 * 1
    }px)`;

    cardContainer.appendChild(ellipsisElement);

    const lastThreeCards = current_cards_displayed.slice(-3);
    lastThreeCards.forEach((card, index) => {
      let curYTranslate = -180 * (index + 1) + (card_height - 180);
      let curXTranslate = 30 * (index + 2);
      let cardElement = createCardElement(
        card,
        index + 2,
        curXTranslate,
        curYTranslate
      );
      cardContainer.appendChild(cardElement);
    });
  } else {
    current_cards_displayed.forEach((card, index) => {
      let curYTranslate = -180 * index;
      let curXTranslate = 30 * index;
      let cardElement = createCardElement(
        card,
        index,
        curXTranslate,
        curYTranslate
      );
      cardContainer.appendChild(cardElement);
    });
  }
}

function createCardElement(card, index, xTranslate, yTranslate) {
  const cardElement = document.createElement("div");
  cardElement.classList.add("card");

  let cardImgElement = document.createElement("img");
  cardImgElement.src = card.image;
  cardImgElement.alt = `${card.value}_of_${card.suit}`;
  cardImgElement.class = "card-image";
  cardElement.appendChild(cardImgElement);

  cardElement.style.zIndex = index + +1;
  cardElement.style.transform = `translateY(${yTranslate}px) translateX(${xTranslate}px)`;

  // hover effect to bring the card to the front
  cardElement.addEventListener("mouseover", () => {
    cardElement.style.zIndex = 100;
    cardElement.style.transform = `scale(1.05) translateY(${yTranslate}px) translateX(${xTranslate}px)`;
  });

  cardElement.addEventListener("mouseout", () => {
    cardElement.style.zIndex = index + 1;
    cardElement.style.transform = `translateY(${yTranslate}px) translateX(${xTranslate}px)`;
  });

  return cardElement;
}

function defaultPracticeMode() {
  $("#last-question").hide();
  $("#score-correct").text(correct_score);
  $("#score-incorrect").text(incorrect_score);

  // first practice question
  displayPracticeRound(0);

  // next round button
  $("#next-round-button").click(function () {
    current_question_index++;
    if (current_question_index < practice_rounds.length) {
      displayPracticeRound(current_question_index);
    } else {
      $("#last-question").show();
      $("#next-round-button").hide();
      $("#slap-button").hide();
    }
  });
}

function displayPracticeRound(prac_index) {
  $("#next-card-button").show();
  $("#end-round-button").hide();
  $("#next-round-button").hide();
  $("#feedback-container").empty();
  $("#feedback-container").hide();

  current_card_index = 0;
  let current_practice_cards = practice_rounds[prac_index]["cards"];
  console.log("current_practice_cards", current_practice_cards);
  current_cards_displayed = [];
  current_cards_displayed.push(current_practice_cards[current_card_index]);
  console.log("current cards", current_cards_displayed);
  renderCards();

  // go to next card
  $("#next-card-button")
    .off("click")
    .on("click", function () {
      current_card_index++;
      console.log("current_card_index here ", current_card_index);
      console.log(
        "current_practice_cards[current_card_index]here",
        current_practice_cards[current_card_index]
      );
      current_cards_displayed.push(current_practice_cards[current_card_index]);
      console.log("current cards here", current_cards_displayed);

      if (current_card_index < current_practice_cards.length - 1) {
        console.log("current_card_index", current_card_index);
        renderCards();
      } else {
        renderCards();
        $("#next-card-button").hide();
        $("#end-round-button").show();
      }
    });

  // check if slap is right
  $("#slap-button")
    .off("click")
    .on("click", function () {
      let round = practice_rounds[prac_index];
      let isCorrect = false;

      if (round.is_slap === "True" && current_card_index == round.slap_index) {
        isCorrect = true;
      }

      if (isCorrect) {
        correct_score += 1;
        let feedback_text = `Correct! This is the ${round.slap_rule} rule.`;
        $("#score-correct").text(correct_score);
        $("#feedback-container")
          .text(feedback_text)
          .css("background-color", "#d9ead3");
        $("#feedback-container").show();
      } else {
        incorrect_score += 1;
        let feedback_text = "";
        if (round.is_slap === "True") {
          feedback_text = `Incorrect. You missed the ${round.slap_rule} rule.`;
        } else {
          feedback_text = `Incorrect. This is not a slap rule.`;
        }
        $("#score-incorrect").text(incorrect_score);
        $("#feedback-container")
          .text(feedback_text)
          .css("background-color", "#e6b8af");
        $("#feedback-container").show();
      }
      $("#next-card-button").hide();
      $("#end-round-button").hide();
      $("#next-round-button").show();
    });

  // end round button - if no slap rule/ you missed a slap rule
  $("#end-round-button")
    .off("click")
    .on("click", function () {
      let round = practice_rounds[prac_index];
      let isCorrect = false;

      if (round.is_slap === "False") {
        isCorrect = true;
      }

      if (isCorrect) {
        correct_score += 1;
        let feedback_text = `Correct! There are no slap rules this round.`;
        $("#score-correct").text(correct_score);
        $("#feedback-container")
          .text(feedback_text)
          .css("background-color", "#d9ead3");
        $("#feedback-container").show();
      } else {
        incorrect_score += 1;
        let feedback_text = `Incorrect. You missed the ${round.slap_rule} rule.`;
        $("#score-incorrect").text(incorrect_score);
        $("#feedback-container")
          .text(feedback_text)
          .css("background-color", "#e6b8af");
        $("#feedback-container").show();
      }
      $("#next-card-button").hide();
      $("#end-round-button").hide();
      $("#next-round-button").show();
    });
}

$(document).ready(function () {
  // console.log("practice_questions", practice_questions);
  // getRandomCard();
  // getRandomCard();
  // getRandomCard();
  // getRandomCard();
  // getRandomCard();
  // getRandomCard();
  // console.log("current cards", current_cards);
  // renderCards();
  // getRandomCard();

  defaultPracticeMode();
});
