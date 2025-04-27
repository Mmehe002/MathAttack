let correctAnswer, attempts;

        function generateQuestion() {
            attempts = 3;
            let container = document.querySelector('.game-container');
            container.classList.add('scale-in-out');
            setTimeout(() => container.classList.remove('scale-in-out'), 500);
            
            let num1 = Math.floor(Math.random() * 50) + 1;
            let num2 = Math.floor(Math.random() * 50) + 1;
            let operators = ['+', '-', '*', '/'];
            let operator = operators[3];

            if (num1 < num2) {[num1, num2] = [num2, num1]};
            
            if (operator === '/' && num1 % num2 !== 0) {
                num1 = num2 * Math.floor(Math.random() * 10) + 1;
            }
            
            correctAnswer = eval(`${num1} ${operator} ${num2}`);
            if (!Number.isInteger(correctAnswer) || correctAnswer >= 100) {
                return generateQuestion();
            }
            
            document.getElementById("target").innerText = `Solve: ${num1} ${operator} ${num2} = ?`;
            document.getElementById("attempts").innerText = "Attempts left: " + attempts;
            populateChoices();
        }

        function populateChoices() {
            let choices = new Set();
            choices.add(correctAnswer);
            while (choices.size < 4) {
                let randomChoice = Math.floor(Math.random() * 100);
                if (randomChoice !== correctAnswer) {
                    choices.add(randomChoice);
                }
            }
            let choicesArray = Array.from(choices);
            choicesArray.sort(() => Math.random() - 0.5);
            
            let buttonsHtml = "";
            choicesArray.forEach(choice => {
                buttonsHtml += `<button class="choice-card" onclick="checkAnswer(this, ${choice})">${choice}</button>`;
            });
            document.getElementById("choices").innerHTML = buttonsHtml;
        }

        function checkAnswer(button, choice) {
            if (choice === correctAnswer) {
                button.style.backgroundColor = 'green';
                button.style.color = 'white';
                setTimeout(generateQuestion, 500);
            } else {
                button.style.backgroundColor = 'red';
                button.style.color = 'white';
                document.querySelector('.game-container').classList.add('shake');
                setTimeout(() => {
                    button.style.backgroundColor = '';
                    button.style.color = '';
                    document.querySelector('.game-container').classList.remove('shake');
                }, 1000);
                attempts--;
                document.getElementById("attempts").innerText = "Attempts left: " + attempts;
                if (attempts === 0) {
                    setTimeout(generateQuestion, 1000);
                }
            }
        }

        window.onload = generateQuestion;