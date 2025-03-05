// const TIME_LEFT = 1 * 60 + 3; // 1 minutes + 3 seconds
const TIME_LEFT = 25 * 60; // 25 minutes
let interval_ID;
let isPaused = false;
let timeLeft = TIME_LEFT; // 25 minutes in seconds

const timeDisplay = document.getElementById('timer');
const startButton = document.getElementById('start');
const pauseButton = document.getElementById('pause');
const stopButton = document.getElementById('stop');

function updateDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    timeDisplay.textContent = `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    if (timeLeft < 60) {
        timeDisplay.style.color = 'red';
        timeDisplay.style.borderRadius = '5px';
        timeDisplay.style.backgroundColor = 'black';
        timeDisplay.style.border = '5px solid gray';
    } else {
        timeDisplay.style.color = 'white';
        timeDisplay.style.borderRadius = '0';
        timeDisplay.style.backgroundColor = 'transparent';
        timeDisplay.style.border = 'none';
    }
}

/*
// What would happen if the setInterval was created outside of a function instead of inside
let interval_I1 = setInterval(() => {
        timeLeft--;
        updateDisplay();
        if (timeLeft <= 0) {
            clearInterval(interval_ID);
            alert('Take a break');
            pauseButton.disabled = true; 
        }                
    }, 1000);
*/

function startTimer() {
    clearInterval(interval_ID);
    startButton.disabled = true;
    pauseButton.disabled = false;
    stopButton.disabled = false;
    interval_ID = setInterval(() => {
        timeLeft--;
        updateDisplay();
        if (timeLeft <= 0) {
            clearInterval(interval_ID);
            alert('Take a break');
            pauseButton.disabled = true; 
        }                
    }, 1000);
}

function pauseTimer() {
    if (isPaused) { // Resume the timer
        isPaused = false;
        pauseButton.textContent = 'Pause';
        startTimer();
    } else { // Pause the timer
        isPaused = true;
        pauseButton.textContent = 'Resume';
        clearInterval(interval_ID);
    }
}

function stopTimer() {
    clearInterval(interval_ID);
    timeLeft = TIME_LEFT; 
    updateDisplay();
    startButton.disabled = false;
    pauseButton.disabled = true;
    stopButton.disabled = true;
    pauseButton.textContent = 'Pause';
    isPaused = false;
}

startButton.addEventListener('click', startTimer);
pauseButton.addEventListener('click', pauseTimer);
stopButton.addEventListener('click', stopTimer);

updateDisplay();