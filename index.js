const container = document.getElementsByClassName("container")[0];
const images = [
  {
    name: "fries",
    img: "images/fries.png",
  },
  {
    name: "cheeseburger",
    img: "images/cheeseburger.png",
  },
  {
    name: "hotdog",
    img: "images/hotdog.png",
  },
  {
    name: "icecream",
    img: "images/ice-cream.png",
  },
  {
    name: "milkshake",
    img: "images/milkshake.png",
  },
  {
    name: "pizza",
    img: "images/pizza.png",
  },
];

let cards = images.concat([...images]);

function shuffle(cards) {
  let currentIndex = cards.length;
  let randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex != 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [cards[currentIndex], cards[randomIndex]] = [
      cards[randomIndex],
      cards[currentIndex],
    ];
  }
}

shuffle(cards);
let isBlocked = false;
for (let i = 0; i < cards.length; i++) {
  let card = document.createElement("div");
  card.className = "unflipped-card";
  card.innerHTML = `<img src= "${cards[i].img}"/>`;
  card.setAttribute("pic-name", cards[i].name);
  card.onclick = flipCard;

  container.appendChild(card);
}
let chosenCards = [];

function flipCard(e) {
  if (chosenCards.length != 2 && !isBlocked) {
    e.target.className = "flipped-card";
    chosenCards.push(e.target);
    if (chosenCards.length == 2) {
      isBlocked = true;
      setTimeout(checkForMatch, 1000);
    }
  }
}
function checkForMatch() {
  let firstCard = chosenCards[0];
  let secondCard = chosenCards[1];
  let isMatched =
    firstCard.getAttribute("pic-name") === secondCard.getAttribute("pic-name");

  if (isMatched) {
    chosenCards = [];
    firstCard.className += " selected";
    secondCard.className += " selected";
  } else {
    firstCard.className = "unflipped-card";
    secondCard.className = "unflipped-card";
    chosenCards = [];
  }
  isBlocked = false;
}
