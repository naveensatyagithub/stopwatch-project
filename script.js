// Load sound
const beepSound = new Audio('beep.mp3');

// Clock Function
function updateClock() {
  const now = new Date();
  const time = now.toLocaleTimeString();
  document.getElementById("clock").textContent = time;
}
setInterval(updateClock, 1000);
updateClock(); // Initial call

// Stopwatch Logic
let stopwatchInterval;
let elapsedTime = 0;

function formatTime(ms) {
  const totalSeconds = Math.floor(ms / 1000);
  const hours = String(Math.floor(totalSeconds / 3600)).padStart(2, "0");
  const minutes = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, "0");
  const seconds = String(totalSeconds % 60).padStart(2, "0");
  return `${hours}:${minutes}:${seconds}`;
}

function updateStopwatchDisplay() {
  document.getElementById("stopwatch").textContent = formatTime(elapsedTime);
}

function startStopwatch() {
  if (!stopwatchInterval) {
    beepSound.play(); // Play sound
    const startTime = Date.now() - elapsedTime;
    stopwatchInterval = setInterval(() => {
      elapsedTime = Date.now() - startTime;
      updateStopwatchDisplay();
    }, 100);
  }
}

function stopStopwatch() {
  if (stopwatchInterval) {
    beepSound.play(); // Play sound
    clearInterval(stopwatchInterval);
    stopwatchInterval = null;
  }
}

function resetStopwatch() {
  beepSound.play(); // Play sound
  stopStopwatch();
  elapsedTime = 0;
  updateStopwatchDisplay();
}

// Initial display
updateStopwatchDisplay();
let countdownInterval;

function startCountdown() {
  const min = parseInt(document.getElementById('timerMinutes').value) || 0;
  const sec = parseInt(document.getElementById('timerSeconds').value) || 0;
  let timeLeft = (min * 60 + sec) * 1000;

  if (timeLeft <= 0) {
    alert("Set a time greater than 0!");
    return;
  }

  clearInterval(countdownInterval);
  updateCountdownDisplay(timeLeft);

  countdownInterval = setInterval(() => {
    timeLeft -= 1000;
    if (timeLeft <= 0) {
      clearInterval(countdownInterval);
      document.getElementById("countdownDisplay").textContent = "TIME'S UP!";
      beepSound.play(); // Play sound on completion
    } else {
      updateCountdownDisplay(timeLeft);
    }
  }, 1000);
}

function updateCountdownDisplay(ms) {
  const totalSeconds = Math.floor(ms / 1000);
  const minutes = String(Math.floor(totalSeconds / 60)).padStart(2, "0");
  const seconds = String(totalSeconds % 60).padStart(2, "0");
  document.getElementById("countdownDisplay").textContent = `${minutes}:${seconds}`;
}

