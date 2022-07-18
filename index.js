const container = document.getElementsByClassName("container")[0];
const message = document.getElementsByClassName("welcome")[0];
const timer = document.getElementsByClassName("timer")[0];
const win = (document.getElementsByClassName("win")[0].style.visibility =
  "hidden");

let startTime;
let interval;

function startTimer() {
  interval = setInterval(() => {
    const distance = new Date() - startTime;
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);
    const milliseconds = Math.floor((distance % 10000) / 100);
    timer.innerHTML = `${seconds} : ${milliseconds}`;
  }, 10);
}

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
let firstClick = false;
let gameOver = 12;
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
    if (!firstClick) {
      firstClick = true;
      startTime = new Date();
      startTimer();
    }
    e.target.className = "flipped-card";
    chosenCards.push(e.target);
    if (chosenCards.length === 2) {
      isBlocked = true;
      setTimeout(checkForMatch, 700);
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
    gameOver += 2;
  } else {
    firstCard.className = "unflipped-card";
    secondCard.className = "unflipped-card";
    chosenCards = [];
  }
  if (gameOver === cards.length) {
    clearInterval(interval);
    const win = (document.getElementsByClassName("win")[0].style.visibility =
      "visible");
    // const para = document.createElement("p");
    // const node = document.createTextNode("Click here to play again");
    // para.appendChild(node);
  }
  isBlocked = false;
}
