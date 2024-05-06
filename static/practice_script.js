let correct_score = 0;
let incorrect_score = 0;
// sample card object
// {
//     value: "2",
//     suit: "diamonds",
//     image: "/static/images/cards/2_of_diamonds.png",
//   },
let current_cards = [];
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
    "Jack",
    "Queen",
    "King",
  ];

  let randomSuit = suits[Math.floor(Math.random() * suits.length)];
  let randomValue = values[Math.floor(Math.random() * values.length)];

  // add current card to current_cards
  let random_card = {
    value: randomValue,
    suit: randomSuit,
    image: `/static/images/cards/${randomValue}_of_${randomSuit}.png`,
  };
  current_cards.push(random_card);
}

function renderCards() {
  const cardContainer = document.getElementById("card-container");
  cardContainer.innerHTML = "";

  if (current_cards.length > 5) {
    let firstCardElement = createCardElement(current_cards[0], 0, 0, 0);
    cardContainer.appendChild(firstCardElement);

    let ellipsisElement = document.createElement("div");
    ellipsisElement.classList.add("ellipsis");
    ellipsisElement.style.zIndex = 2;
    ellipsisElement.style.transform = `translateY(${-180 * 1}px) translateX(${
      30 * 1
    }px)`;

    cardContainer.appendChild(ellipsisElement);

    const lastThreeCards = current_cards.slice(-3);
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
    current_cards.forEach((card, index) => {
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

$(document).ready(function () {
  getRandomCard();
  getRandomCard();
  getRandomCard();
  getRandomCard();
  getRandomCard();
  getRandomCard();
  console.log("current cards", current_cards);
  renderCards();
  getRandomCard();

  //   setTimeout(() => renderCards(), 1000);
});
