let timerInterval;
let hours = 0;
let minutes = 25;
let seconds = 0;
let timerRunning = false;

document.getElementById("startBtn").addEventListener("click", startTimer);
document.getElementById("pauseBtn").addEventListener("click", pauseTimer);
document.getElementById("resetBtn").addEventListener("click", resetTimer);

function startTimer() {
  if (!timerRunning) {
    hours = parseInt(document.getElementById("hours").value);
    minutes = parseInt(document.getElementById("minutes").value);
    seconds = parseInt(document.getElementById("seconds").value);
    if (hours < 0 || minutes < 0 || seconds < 0) {
      alert("Please enter valid values (greater than or equal to 0).");
      return;
    }
    if (hours === 0 && minutes === 0 && seconds === 0) {
      alert("Please enter a valid duration (greater than 0).");
      return;
    }
    updateDisplay();
    timerInterval = setInterval(updateTimer, 1000);
    timerRunning = true;
    document.getElementById("startBtn").style.display = "none";
    document.getElementById("pauseBtn").style.display = "inline-block";
    document.getElementById("resetBtn").style.display = "inline-block";
    document.querySelector(".input-group").style.display = "none"; // Hide entire input group
    updateTitle(); // Update title with remaining time
  }
}

function pauseTimer() {
  clearInterval(timerInterval);
  timerRunning = false;
  document.getElementById("startBtn").style.display = "inline-block";
  document.getElementById("pauseBtn").style.display = "none";
}

function resetTimer() {
  clearInterval(timerInterval);
  timerRunning = false;
  hours = parseInt(document.getElementById("hours").value);
  minutes = parseInt(document.getElementById("minutes").value);
  seconds = parseInt(document.getElementById("seconds").value);
  updateDisplay();
  document.getElementById("startBtn").style.display = "inline-block";
  document.getElementById("pauseBtn").style.display = "none";
  document.getElementById("resetBtn").style.display = "none";
  document.querySelector(".input-group").style.display = "flex"; // Show entire input group
  document.title = "Focus Timer"; // Reset title
}

function updateTimer() {
  if (hours === 0 && minutes === 0 && seconds === 0) {
    clearInterval(timerInterval);
    timerRunning = false;
    alert("Focus session complete!");
    return;
  }
  if (seconds === 0) {
    if (minutes === 0) {
      hours--;
      minutes = 59;
    } else {
      minutes--;
    }
    seconds = 59;
  } else {
    seconds--;
  }
  updateDisplay();
  updateTitle(); // Update title with remaining time
}

function updateDisplay() {
  document.getElementById("timer").innerText = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

function updateTitle() {
  document.title = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')} | Focus Timer`;
}
