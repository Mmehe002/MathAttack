const container = document.getElementById("container");
    const targetDisplay = document.getElementById("target");
    const blocksDiv = document.getElementById("blocks");

    // adding variables first in order to initialise them later on 
    let blocks = [];
    let selected = [];
    let target = 0;
    let attempts = 0;

    // creating the function to generate the blocks with numbers 
    function generateBlocks() {
      blocks = [];
      selected = [];
      attempts = 0;
      container.classList.remove('shake', 'grow-shrink');

      // using a for loop to create 6 random values to use 
      for (let i = 0; i < 6; i++) {
        // using math.random to generate a random number and adding one so the smallest number starts at 1
        const value = Math.floor(Math.random() * 20) + 1;
        const type = Math.random() > 0.5 ? 'add' : 'subtract';
        blocks.push({ value, type, used: false });
      }


      target = blocks.reduce((sum, b) => {
        return sum + (b.type === 'add' ? b.value : -b.value);
      }, 0);

      renderBlocks();
    }

    function renderBlocks() {
      targetDisplay.textContent = target;
      blocksDiv.innerHTML = "";

      blocks.forEach((block, i) => {
        const btn = document.createElement("button");
        btn.className = `block ${block.type}`;
        btn.textContent = (block.type === 'add' ? '+' : '-') + block.value;
        btn.disabled = block.used;

        btn.onclick = () => {
          if (!block.used) {
            block.used = true;
            const signedVal = block.type === 'add' ? block.value : -block.value;
            selected.push(signedVal);
            btn.disabled = true;
          }
        };

        blocksDiv.appendChild(btn);
      });
    }

    function checkAnswer() {
      // here we use if statements to see if the user has selected the blocks and made the correct answer
      const total = selected.reduce((a, b) => a + b, 0);
      // if correct we make the container grow and shrink to signify it is correct and then generate new numbers
      if (total === target) {
        container.classList.add('grow-shrink');
        setTimeout(generateBlocks, 800);
      } else {
        // if incorrect we shake the container and then generate new numbers but only if the user has used all of their attempts
        if (attempts === 0) {
          container.classList.add('shake');
          attempts++;
          setTimeout(() => container.classList.remove('shake'), 600);
        } else {
          generateBlocks();
        }
      }
    }

    generateBlocks();