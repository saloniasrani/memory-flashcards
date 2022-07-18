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

for (let i = 0; i < cards.length; i++) {
  let card = document.createElement("div");
  card.className = "unflipped-card";
  card.innerHTML = `<img src= "${cards[i].img}"/>`;
  card.setAttribute("pic-id", i);
  card.addEventListener("click", flipCard);
  card.onclick = (e) => {
    card.className = "flipped-card";
    console.log(card.getAttribute("pic-id"));
    // flipCard();
  };

  container.appendChild(card);
}
let chosenCards = [];
let chosenCardId = [];
function flipCard() {
  if (chosenCards.length != 2) {
    let cardid = this.getAttribute("pic-id");
    console.log(cards[cardid].name);
    chosenCards.push(cards[cardid].name);
    chosenCardId.push(cardid);
    //   console.log(chosenCards[0]);
    //   console.log(chosenCards[1]);

    if (chosenCards.length == 2) setTimeout(checkForMatch, 400);
  }
}
function checkForMatch() {
  let firstCard = chosenCards[0];
  let secondCard = chosenCards[1];
  if (firstCard === secondCard) alert("You found a Match!");
  else {
    alert("no match found");
    // cards[chosenCardId[0]].className = "unflipped-card";
    chosenCards = [];
  }
}
