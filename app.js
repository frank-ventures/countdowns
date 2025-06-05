// DOM
const minuteDisplay = document.getElementById("minute-display");
const secondDisplay = document.getElementById("second-display");
const timerForm = document.getElementById("timer-form");

// Initial variables
let initialTimeInSeconds;
let currentTime;
let remainingMinutes;
let remainingSeconds;

const second = 1;
const minute = second * 60;
const hour = minute * 60;
const day = hour * 24;
const year = day * 365;

let timer;

const presetTimers = [
  {
    title: "one-minute",
    time: 60,
    label: "01:00",
  },
  {
    title: "two-minute",
    time: 120,
    label: "02:00",
  },
  {
    title: "three-minute",
    time: 180,
    label: "03:00",
  },
  {
    title: "five-minute",
    time: 300,
    label: "05:00",
  },
  {
    title: "ten-minute",
    time: 600,
    label: "10:00",
  },
];

// Put our preset timers onto the DOM
const presetTimerButtons = document.getElementById("preset-timer-buttons");

const animatedShape = document.getElementById("animatedShape");

presetTimers.forEach((button) => {
  const newButton = document.createElement("button");
  newButton.innerText = button.label;
  newButton.id = button.title;
  newButton.addEventListener("click", () => {
    timerInitialiser(button.time);
  });
  newButton.classList = "buttons";
  presetTimerButtons.append(newButton);
});

function timerInitialiser(timeInSeconds) {
  initialTimeInSeconds = timeInSeconds;
  currentTime = timeInSeconds;
  remainingMinutes = Math.floor(initialTimeInSeconds / 60);
  remainingSeconds = initialTimeInSeconds - remainingMinutes * 60;
  minuteDisplay.textContent = remainingMinutes.toString().padStart(2, "0");
  secondDisplay.textContent = remainingSeconds.toString().padStart(2, "0");
  document.title = `${remainingMinutes
    .toString()
    .padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`;
  animatedShape.style.setProperty("--gradientpercent", "100%");
  clearInterval(timer);
  timer = setInterval(intervalTimer, 1000);
}

timerForm.addEventListener("submit", (event) => {
  event.preventDefault();
  // Get the stuff out of our form
  const formData = new FormData(timerForm);
  const formDataObject = Object.fromEntries(formData);
  const { minutes, seconds } = formDataObject;

  // Convert the form entries into a seconds format, which the timer understands
  const correctMinutes = minutes * 60;
  const fullTime = parseInt(correctMinutes) + parseInt(seconds);

  timerInitialiser(fullTime);
});

function intervalTimer() {
  if (currentTime > 0) {
    currentTime = currentTime - 1;
  }

  remainingMinutes = Math.floor(currentTime / 60);
  remainingSeconds = currentTime - remainingMinutes * 60;
  document.title = `${remainingMinutes
    .toString()
    .padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`;

  minuteDisplay.textContent = remainingMinutes.toString().padStart(2, "0");
  secondDisplay.textContent = remainingSeconds.toString().padStart(2, "0");

  let timePercentage = (currentTime / initialTimeInSeconds) * 100;
  animatedShape.style.setProperty("--gradientpercent", timePercentage + "%");

  if (currentTime == 0) {
    clearInterval(timer);
  }
}
