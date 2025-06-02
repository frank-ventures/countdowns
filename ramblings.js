// --- --- --- ---
// -- Ramblings --
// --- --- --- ---

let ms = Date.now(); // Get the time right now in milliseconds

// Define some variables for easy math and tidy code.
const second = 1000;
const minute = second * 60;
const hour = minute * 60;
const day = hour * 24;
const year = day * 365;

// This is years since the timer began, January 1, 1970.
let years = Math.round(Date.now() / year);

// This is how you calculate 5 minutes
const plus5mins = Math.round(Date.now() + minute);
console.log("This shows 1 minutes:, ", ((plus5mins - ms) / second) * 5);
let fiveMinutes = ((plus5mins - ms) / second) * 5;
console.log("five mins is", fiveMinutes);
console.log("Timer minus 30 seconds ", (plus5mins - ms) / minute - second * 30);
console.log("Now is ", Date.now());
console.log("5 mins time is ", Math.round(Date.now() + minute * 5));

setInterval(() => {
  fiveMinutes = fiveMinutes - 1;
  console.log(fiveMinutes);
}, 1000);

function startCountdown() {
  const coundownDuration = 300;
  const elapsedTime = Math.floor(Date.now() / 1000);
  console.log("elapsed is", elapsedTime);
  const remainingtime = coundownDuration - elapsedTime;

  const minutes = Math.floor(remainingtime / 1000 / 60);
  console.log(minutes);
  const seconds = Math.floor((remainingtime / 1000) % 60);
  console.log(seconds);
  const countdownElement = document.getElementById("countdown");
  countdownElement.textContent = minutes + ":" + seconds;
}

startCountdown();
