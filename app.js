// DOM
const minuteDisplay = document.getElementById("minute-display");
const secondDisplay = document.getElementById("second-display");
const timerForm = document.getElementById("timer-form");

// Sound
const audioSelection = [
  {
    asset: new Audio("./assets/ready-steady-cook-one-minute.mp3"),
    timeToStartAt: 60,
  },
  {
    asset: new Audio("./assets/ready-steady-cook-thirty-secs.mp3"),
    timeToStartAt: 36,
  },
  {
    asset: new Audio("./assets/deep-countdown-blast-off.mp3"),
    timeToStartAt: 10,
  },
  {
    asset: new Audio("./assets/deep-countdown.mp3"),
    timeToStartAt: 10,
  },
  {
    asset: new Audio("./assets/countdown-theme.mp3"),
    timeToStartAt: 32,
  },
  {
    asset: new Audio("./assets/apollo-11.mp3"),
    timeToStartAt: 15,
  },
];

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
  const soundToPlay = setAudio();
  soundToPlay ? soundToPlay.asset.pause() : "";

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
  timer = setInterval(() => intervalTimer(soundToPlay), 1000);
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

function intervalTimer(soundToPlay) {
  if (currentTime > 0) {
    currentTime = currentTime - 1;
  }
  if (currentTime == soundToPlay.timeToStartAt) {
    soundToPlay.asset.play();
  }

  remainingMinutes = Math.floor(currentTime / 60);
  remainingSeconds = currentTime - remainingMinutes * 60;
  document.title = `${remainingMinutes
    .toString()
    .padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`;

  minuteDisplay.textContent = remainingMinutes.toString().padStart(2, "0");
  secondDisplay.textContent = remainingSeconds.toString().padStart(2, "0");

  if (currentTime == 0) {
    document.title = `Time's Up!`;
  }

  let timePercentage = (currentTime / initialTimeInSeconds) * 100;
  animatedShape.style.setProperty("--gradientpercent", timePercentage + "%");

  if (currentTime == 0) {
    clearInterval(timer);
  }
}

function setAudio() {
  const randomNumber = Math.floor(Math.random() * audioSelection.length);
  return audioSelection[randomNumber];
}
