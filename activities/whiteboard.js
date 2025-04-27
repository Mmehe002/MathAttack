const canvas = document.getElementById("whiteboard");
const ctx = canvas.getContext("2d");
const colorPicker = document.getElementById("colorPicker");
const penSize = document.getElementById("penSize");

let drawing = false;

// canvas.addEventListener("mousedown", () => (drawing = true));
// canvas.addEventListener("mouseup", () => (drawing = false));
// canvas.addEventListener("mouseout", () => (drawing = false));

canvas.addEventListener("mousedown", () => {
  drawing = true;
  ctx.beginPath(); 
  // when the mouse is clicked down it will draw
});

// making it so when the mouse isnt clicked it will not draw
canvas.addEventListener("mouseup", () => {
  drawing = false;
  ctx.beginPath(); 
});

// resetting the cursor when out of bounds
canvas.addEventListener("mouseout", () => {
  drawing = false;
  ctx.beginPath();
});


canvas.addEventListener("mousemove", draw);

function draw(e) {
  if (!drawing) return;
  ctx.lineWidth = penSize.value;
  ctx.lineCap = "round";
  ctx.strokeStyle = colorPicker.value;

  ctx.lineTo(e.offsetX, e.offsetY);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(e.offsetX, e.offsetY);
}

function generateQ(){
  const value1 = Math.floor(Math.random() * 10) + 1;
  const value2 = Math.floor(Math.random() * 10) + 1;
  // removed some of the opertators as it was making the code not generate new questions 
  //it would also take a lot of clicks to generate a new question
  const operators = ['+', '*'];
  const chosen_operator = operators[Math.floor(Math.random() * operators.length)];

  //assigning the random values to variables to be read and outputted to the page
  let number1 = value1;
  let number2 = value2;

    const question = `${number1} ${chosen_operator} ${number2}`;
    document.getElementById("target").innerText = `Solve: ${question}`;

}

function clearCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

// adding the feature which allows you to save the whiteboard drawing as an image
function saveCanvas() {
  const link = document.createElement("a");
  link.download = "whiteboard.png";
  link.href = canvas.toDataURL();
  link.click();
}

// Calculator
let calcOpen = false;

function toggleCalculator() {
  const calc = document.getElementById("calculator");
  calcOpen = !calcOpen;
  calc.style.display = calcOpen ? "block" : "none";
}

function pressCalc(val) {
  const display = document.getElementById("calcDisplay");
  if (val === "=") {
    try {
      display.value = eval(display.value);
    } catch {
      display.value = "Error";
    }
  } else {
    display.value += val;
  }
}

const calcButtonsContainer = document.getElementById("calcButtons");
const calcValues = ["7","8","9","/","4","5","6","*","1","2","3","-","0",".","=","+","C"];

calcValues.forEach(val => {
  const btn = document.createElement("button");
  btn.innerText = val;
  btn.onclick = val === "C" ? clearCalc : () => pressCalc(val);
  calcButtonsContainer.appendChild(btn);
});


function clearCalc() {
  document.getElementById("calcDisplay").value = "";
}
