let correctAnswer, attempts;

        function generateQuestion() {
            attempts = 3; // Reset attempts
            let num1 = Math.floor(Math.random() * 50) + 1;
            let num2 = Math.floor(Math.random() * 50) + 1;
            let operators = ['+', '-', '*', '/'];
            let operator = operators[Math.floor(Math.random() * operators.length)];
            
            if (num1 < num2) {
                [num1, num2] = [num2, num1];
            }

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
            choicesArray.sort(() => Math.random() - 0.5); // Shuffle choices randomly
            
            let buttonsHtml = "";
            choicesArray.forEach(choice => {
                buttonsHtml += `<button class="choice-card" onclick="checkAnswer(${choice})">${choice}</button>`;
            });
            document.getElementById("choices").innerHTML = buttonsHtml;
        }

        function checkAnswer(choice) {
            if (choice === correctAnswer) {
                alert("Correct!");
                generateQuestion();
            } else {
                attempts--;
                document.getElementById("attempts").innerText = "Attempts left: " + attempts;
                if (attempts === 0) {
                    alert("Game Over! Try again.");
                    generateQuestion();
                } else {
                    alert("Try again!");
                }
            }
        }

        window.onload = generateQuestion;


        