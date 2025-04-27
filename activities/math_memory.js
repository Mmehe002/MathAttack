const gameContainer = document.getElementById("mem_container"); // Changed to match new ID

let cards = [];
let flippedCards = [];
let matchedPairs = 0;
const totalPairs = 6; 
// making the total pais 6 so i get 12 cards and an even number 

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

// function generateProblems is used to generate questions and answers for the memory game 
function generateProblems() {
  const problems = [];

  for (let i = 0; i < totalPairs; i++) {
    const num1 = Math.floor(Math.random() * 9) + 1; 
    // generating a random number between 1 and 9 and adding 1 so we dont get 0
    const num2 = Math.floor(Math.random() * 9) + 1; 
    problems.push({
      problem: `${num1} + ${num2}`,
      answer: (num1 + num2).toString()
    });
  }

  return problems;
}


function createCards() {
  const problems = generateProblems();
  
  problems.forEach(({ problem, answer }) => {
    cards.push({ type: "problem", text: problem });
    cards.push({ type: "answer", text: answer });
  });
  
  shuffle(cards);

  cards.forEach((cardData, index) => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.dataset.type = cardData.type;
    card.dataset.text = cardData.text;
    card.innerText = "";

    card.addEventListener("click", () => flipCard(card));

    gameContainer.appendChild(card); // This appends to the new container
  });
}

// adding the flipcard so when you click on a card it will turn around and show whats on there
function flipCard(card) {
  if (card.classList.contains("flipped") || card.classList.contains("matched") || flippedCards.length === 2) {
    return;
  }

  card.classList.add("flipped");
  card.innerText = card.dataset.text;
  flippedCards.push(card);

  // using an if statement to see if the 2 chosen card are a match
  if (flippedCards.length === 2) {
    checkForMatch();
  }
}

function checkForMatch() {
  const [card1, card2] = flippedCards;

  const isMatch = (
    (card1.dataset.type === "problem" && card2.dataset.type === "answer" && eval(card1.dataset.text) == card2.dataset.text)
    ||
    (card2.dataset.type === "problem" && card1.dataset.type === "answer" && eval(card2.dataset.text) == card1.dataset.text)
  );

  if (isMatch) {
    card1.classList.add("matched");
    card2.classList.add("matched");
    flippedCards = [];
    matchedPairs++;

    if (matchedPairs === totalPairs) {
      setTimeout(() => {
        alert("🎉 You matched all pairs!");
        resetGame();
      }, 500);
    }
  } else {
    gameContainer.classList.add("shake");
    setTimeout(() => {
      gameContainer.classList.remove("shake");
      card1.classList.remove("flipped");
      card2.classList.remove("flipped");
      card1.innerText = "";
      card2.innerText = "";
      flippedCards = [];
    }, 700);
  }
}

// making the game run in a loop by resetting when the card are all matched
function resetGame() {
  gameContainer.innerHTML = "";
  cards = [];
  flippedCards = [];
  matchedPairs = 0;
  createCards();
}

// Start
createCards();
