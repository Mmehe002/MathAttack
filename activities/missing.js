const missingContainer = document.getElementById("missing_Container"); // Changed ID to 'missing_Container'
const missingNumberDiv = document.getElementById("missing_number"); // Changed ID to 'missing_number'
const userInput = document.getElementById("userInput");

let currentSequence = [];
let missingIndex = 0;
let correctAnswer = 0;
let attempts = 0;

function generateSequence() {
  // Simple pattern: add 2 each time
  const start = Math.floor(Math.random() * 5) + 1;
  const step = Math.floor(Math.random() * 5) + 1;

  currentSequence = [];
  for (let i = 0; i < 5; i++) {
    currentSequence.push(start + i * step);
  }

  missingIndex = Math.floor(Math.random() * currentSequence.length);
  correctAnswer = currentSequence[missingIndex];
  displaySequence();
}

function displaySequence() {
  missingNumberDiv.innerHTML = ""; // Changed to 'missingNumberDiv'

  currentSequence.forEach((num, index) => {
    const numElement = document.createElement("div");
    numElement.style.color = getColor(index);

    if (index === missingIndex) {
      numElement.innerText = "__";
      numElement.classList.add("missing");
    } else {
      numElement.innerText = num;
    }

    missingNumberDiv.appendChild(numElement); // Changed to 'missingNumberDiv'
  });
}

function getColor(index) {
  const colors = ["#ff6b6b", "#6bc5ff", "#51cf66", "#ffd43b", "#845ef7"];
  return colors[index % colors.length];
}

function submitAnswer() {
  const userValue = parseInt(userInput.value);

  if (userValue === correctAnswer) {
    missingContainer.classList.add("correct"); // Changed to 'missingContainer'
    setTimeout(() => {
      missingContainer.classList.remove("correct"); // Changed to 'missingContainer'
      nextQuestion();
    }, 600);
  } else {
    attempts++;
    missingContainer.classList.add("incorrect"); // Changed to 'missingContainer'
    setTimeout(() => {
      missingContainer.classList.remove("incorrect"); // Changed to 'missingContainer'
      if (attempts >= 2) {
        nextQuestion();
      }
    }, 600);
  }
}

function nextQuestion() {
  userInput.value = "";
  attempts = 0;
  generateSequence();
}

// Start the first sequence
generateSequence();
