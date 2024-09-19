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

// Messages to display for each "No" click
const noMessages = [
    "Are you sure?",
    "Pookie please",
    "Don't do this to me :(",
    "You're breaking my heart",
];

let noClickCount = 0; // Start with index 0 for noMessages
const MAX_NO_CLICKS = noMessages.length; // Number of noMessages

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
  if (noClickCount < MAX_NO_CLICKS) {
    // Change image and update message for each "No" click
    changeImage(11 + noClickCount); // Start from cat-11.jpg
    titleElement.innerHTML = noMessages[noClickCount];
    noClickCount++;
  } else {
    // Show the final "No" image and message
    changeImage("no");
    titleElement.innerHTML = "Oke :(";
    buttonsContainer.classList.add("hidden"); // Hide buttons once the final image is shown
  }
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
  } else if (image === "yes") {
    catImg.src = `img/cat-yes.jpg`; // Ensure this file exists for the "Yes" scenario
  } else if (image === "no") {
    catImg.src = `img/cat-no.jpg`; // Ensure this file exists for the final "No" scenario
  } else {
    catImg.src = `img/cat-${image}.jpg`; // Change image based on the counter
  }
}
