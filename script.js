function changeClass(className, instructionText) {
    const startButton = document.getElementById('startButton');
    startButton.classList.remove('breatheIn');
    startButton.classList.remove('holdBreath');
    startButton.classList.remove('breatheOut');
    startButton.classList.add(className);

    const instructions = document.querySelector('.breathingInstructions');
    instructions.textContent = instructionText;
    instructions.classList.remove('breatheIn');
    instructions.classList.remove('breatheOut');
    instructions.classList.add(className);
}

let intervalId;
let isPaused = false;
let cycleCount = 0;

function startBreathing() {
    const startButton = document.getElementById('startButton');
    const pauseButton = document.querySelector('.pauseButton');
    const timerDisplay = document.getElementById('timer');
    const startTime = Date.now();
    timerDisplay.textContent = '0:00';


    const breatheInSeconds = 10;
    const holdBreathSeconds = 5;
    const breatheOutSeconds = 10;

    let secondsElapsed = 0;
    intervalId = setInterval(() => {
        secondsElapsed++;
        let elapsedSeconds = Math.floor((Date.now() - startTime) / 1000);
        let minutes = Math.floor(elapsedSeconds / 60);
        let seconds = elapsedSeconds % 60;
        timerDisplay.textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;

        if (secondsElapsed <= breatheInSeconds) {
            startButton.textContent = `${breatheInSeconds - secondsElapsed}`;
            this.changeClass("breatheIn", "Breathe In...");

        } else if (secondsElapsed <= (breatheInSeconds + holdBreathSeconds)) {

            startButton.textContent = `${(breatheInSeconds + holdBreathSeconds) - secondsElapsed}`;
            this.changeClass("holdBreath", "Hold");

        } else if (secondsElapsed <= (breatheInSeconds + holdBreathSeconds + breatheOutSeconds)) {
            startButton.textContent = `${(breatheInSeconds + holdBreathSeconds + breatheOutSeconds ) - secondsElapsed}`;
            this.changeClass("breatheOut", "Breathe Out...");

        } else {
            cycleCount++;
            this.animateCycles(cycleCount);
            secondsElapsed = -1;
        }
    }, 1000);

   setTimeout(() => {
    pauseButton.style.display = 'inline-block'; // Show the pause button when the start button is clicked
   }, 1000);
}

function toggleBreathing() {
    const pauseButton = document.querySelector('.pauseButton');
    if (isPaused) {
        isPaused = false;
        startBreathing();
        const completedCycles = document.getElementById('completedCycles');
        completedCycles.textContent = ''; // Clear the text content of the completedCycles element
        pauseButton.textContent = "Stop 🛑";
        pauseButton.classList.remove('green');
        pauseButton.classList.add('red');
    } else {
        isPaused = true;
        clearInterval(intervalId);
        pauseButton.textContent = "Restart 🔄";
        pauseButton.classList.remove('red');
        pauseButton.classList.add('green');

        const completedCycles = document.getElementById('completedCycles');
        completedCycles.textContent = `You completed ${cycleCount} ${cycleCount === 1 ? 'cycle' : 'cycles'} ${cycleCount > 0 ? '🎉' : ''}`; // Update the text content of the completedCycles element

    }
}
document.querySelector('.pauseButton').addEventListener('click', toggleBreathing);

function animateCycles(cycleNumber) {
    const cycleCountElement = document.querySelector('.cycleCount');
    cycleCountElement.textContent = `Cycles completed: ${cycleCount}`;
    cycleCountElement.classList.add('shake');

    setTimeout(() => {
        cycleCountElement.classList.remove('shake');
    }, 1000);
}
