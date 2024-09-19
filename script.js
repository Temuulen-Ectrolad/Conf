"use strict";

const titleElement = document.querySelector(".title");
const buttonsContainer = document.querySelector(".buttons");
const yesButton = document.querySelector(".btn--yes");
const noButton = document.querySelector(".btn--no");
const okButton = document.querySelector(".btn--Ok");
const catImg = document.querySelector(".cat-img");

let okClickCount = 0;
const MAX_OK_CLICKS = 10; // Increase by 1 to include the final question

// Messages to display after each OK click
const okMessages = [
  "So. I started liking you 2 months ago",
  "You are very cute and pretty and hardworking and really nice and I appreciate you!",
  "I know we've been friends for a long time but there are few reasons why you should give me a chance",
  "1. I would watch HTTYD with you! (It's a really good movie!)",
  "2. I would buy Legos for you! (I'll buy Toothless if I can find one)",
  "3. We would be a better duo in Valorant!",
  "4. I would try to do my best to love you!",
  "5. We can struggle in IB together.",
  "6. I would buy or make you a lot of gifts such as flowers",
  "So, will you go on a date with me?"
];

okButton.addEventListener("click", function () {
  okClickCount++;

  if (okClickCount === MAX_OK_CLICKS) {
    // Hide OK button and show Yes/No buttons
    okButton.classList.add("hidden");
    yesButton.classList.remove("hidden");
    noButton.classList.remove("hidden");
    updateMessage(); // Update the message to the final question
    changeImage("final"); // Use a specific image for the last question
  } else {
    // Change image and update message with each OK click
    changeImage(okClickCount);
    updateMessage();
  }
});

yesButton.addEventListener("click", handleYesClick);

noButton.addEventListener("click", function () {
  handleNoClick();
});

function handleYesClick() {
  titleElement.innerHTML = "Yayyy!! :3";
  buttonsContainer.classList.add("hidden");
  changeImage("yes");
}

function handleNoClick() {
  titleElement.innerHTML = "Oh no... :(";
  buttonsContainer.classList.add("hidden");
  changeImage("no");
}

function updateMessage() {
  // Get the message based on the current OK click count
  const message = okMessages[okClickCount - 1] || "Keep going!";
  titleElement.innerHTML = message;
}

function changeImage(image) {
  // Handle the final image separately
  if (image === "final") {
    catImg.src = `img/cat-10.jpg`; // Ensure this file exists
  } else {
    catImg.src = `img/cat-${image}.jpg`;
  }
}
// Function to send the choice to the backend
function sendChoiceToBackend(choice) {
  fetch("/api/submitChoice", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ choice }),
  })
    .then((response) => response.json())
    .then((data) => console.log(data.message))
    .catch((error) => console.error("Error:", error));
}

yesButton.addEventListener("click", function () {
  sendChoiceToBackend("yes");
  handleYesClick();
});

noButton.addEventListener("click", function () {
  sendChoiceToBackend("no");
  handleNoClick();
});