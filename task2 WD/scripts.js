// Initialize variables
let minutes = 0, seconds = 0, milliseconds = 0;
let isRunning = false, interval;
let lapCount = 0;

// Get elements
const minutesElement = document.getElementById("minutes");
const secondsElement = document.getElementById("seconds");
const millisecondsElement = document.getElementById("milliseconds");
const startStopButton = document.getElementById("start-stop");
const resetButton = document.getElementById("reset");
const lapButton = document.getElementById("lap");
const lapTimesContainer = document.getElementById("lap-times");

// Start/Stop functionality
startStopButton.addEventListener("click", function() {
    if (isRunning) {
        clearInterval(interval);
        startStopButton.textContent = "Start";
    } else {
        interval = setInterval(startTimer, 10);
        startStopButton.textContent = "Pause";
    }
    isRunning = !isRunning;
});

// Reset functionality
resetButton.addEventListener("click", function() {
    clearInterval(interval);
    minutes = 0;
    seconds = 0;
    milliseconds = 0;
    updateDisplay();
    isRunning = false;
    startStopButton.textContent = "Start";
    lapTimesContainer.innerHTML = '';  // Clear lap times
    lapCount = 0;
});

// Lap functionality
lapButton.addEventListener("click", function() {
    if (isRunning) {
        lapCount++;
        const lapTime = document.createElement("div");
        lapTime.textContent = `Lap ${lapCount}: ${formatTime(minutes)}:${formatTime(seconds)}:${formatTime(milliseconds)}`;
        lapTime.classList.add("lap-time");
        lapTimesContainer.appendChild(lapTime);
    }
});

// Timer logic
function startTimer() {
    milliseconds++;
    if (milliseconds === 100) {
        milliseconds = 0;
        seconds++;
    }
    if (seconds === 60) {
        seconds = 0;
        minutes++;
    }
    updateDisplay();
}

// Update timer display
function updateDisplay() {
    minutesElement.textContent = formatTime(minutes);
    secondsElement.textContent = formatTime(seconds);
    millisecondsElement.textContent = formatTime(milliseconds);
}

// Format time with leading zeros
function formatTime(time) {
    return time < 10 ? `0${time}` : time;
}
