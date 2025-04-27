const drag_container = document.getElementById('drag_container');
const targetSpan = document.getElementById('target');
const numbersDiv = document.querySelector('.numbers');
const slots = document.querySelectorAll('[data-slot]');
// creating the variables to be used later 
let attempts = 0;
let target = 0;

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
// generating the questions using randomising the numbers and operators 
function generateQuestion() {
    attempts = 0;
    drag_container.classList.remove('shake', 'grow-shrink');
    slots.forEach(slot => slot.textContent = '');
    numbersDiv.innerHTML = '';

    const n1 = getRandomInt(1, 10);
    const n2 = getRandomInt(1, 10);
    const ops = ['+', '-', '*', '/'];
    const op = ops[getRandomInt(0, 3)];

    // making sure the numbers are not decimal and rounding the results
    let result = eval(`${n1}${op}${n2}`);
    if (!Number.isInteger(result)) {
        result = Math.round(result);
    }

    target = result;
    targetSpan.textContent = target;

    const nums = new Set([n1, n2]);
    while (nums.size < 8) {
        nums.add(getRandomInt(1, 20));
    }

    Array.from(nums).forEach(n => {
        const drag_btn = document.createElement('div');
        drag_btn.className = 'drag_btn number';
        drag_btn.textContent = n;
        drag_btn.setAttribute('draggable', true);
        drag_btn.setAttribute('data-value', n);
        numbersDiv.appendChild(drag_btn);  
    });

    initDragEvents();
}

function initDragEvents() {
    document.querySelectorAll('.drag_btn').forEach(drag_btn => {  
        drag_btn.ondragstart = e => {
            e.dataTransfer.setData('text/plain', drag_btn.dataset.value);
        };
    });

    slots.forEach(slot => {
        slot.ondragover = e => {
            e.preventDefault();
            slot.classList.add('highlight');
        };
        slot.ondragleave = () => {
            slot.classList.remove('highlight');
        };
        slot.ondrop = e => {
            e.preventDefault();
            slot.classList.remove('highlight');
            const data = e.dataTransfer.getData('text/plain');
            slot.textContent = data;
        };
    });
}

function checkEquation() {
    const val1 = slots[0].textContent;
    const op = slots[1].textContent;
    const val2 = slots[2].textContent;

    if (!val1 || !op || !val2) return;

    let answer = 0;
    try {
        answer = eval(`${val1}${op}${val2}`);
    } catch {
        answer = null;
    }

    if (!Number.isInteger(answer)) answer = Math.round(answer);

    if (answer === target) {
        drag_container.classList.add('grow-shrink');
        setTimeout(generateQuestion, 1000);
    } else {
        if (attempts === 0) {
            drag_container.classList.add('shake');
            attempts++;
            setTimeout(() => drag_container.classList.remove('shake'), 600);
        } else {
            drag_container.classList.add('shake');
            setTimeout(() => {
                drag_container.classList.remove('shake');
                generateQuestion();
            }, 600);
        }
    }
}

generateQuestion();
