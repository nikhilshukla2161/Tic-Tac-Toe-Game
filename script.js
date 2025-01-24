// Welcome message in the console
console.log("Welcome to Tic Tac Toe");

// Creating audio objects for different sound effects
let music = new Audio("assets/sound/music.mp3"); // Background music
let audioTurn = new Audio("assets/sound/ting.mp3"); // Sound for each turn
let gameover = new Audio("assets/sound/gameover.mp3"); // Sound for game over

// Initial turn setup and game over flag
let turn = "X"; // X starts the game
let isgameover = false; // Game over flag

// Function to change the current turn
const changeTurn = () => {
  return turn === "X" ? "0" : "X"; // If it's X's turn, change it to O, else change to X
};

// Function to check if there's a winner
const checkWin = () => {
  let boxtext = document.getElementsByClassName("boxtext"); // Get all the box texts
  let wins = [
    // Possible winning combinations and line style information
    [0, 1, 2, 5, 5, 0],
    [3, 4, 5, 5, 15, 0],
    [6, 7, 8, 5, 25, 0],
    [0, 3, 6, -5, 15, 90],
    [1, 4, 7, 5, 15, 90],
    [2, 5, 8, 15, 15, 90],
    [0, 4, 8, 5, 15, 45],
    [2, 4, 6, 5, 15, 135],
  ];

  // Loop through each winning combination and check if there's a match
  wins.forEach((e) => {
    if (
      boxtext[e[0]].innerText === boxtext[e[1]].innerText &&
      boxtext[e[2]].innerText === boxtext[e[1]].innerText &&
      boxtext[e[0]].innerText !== "" // Check if all three boxes have the same text and are not empty
    ) {
      // If a win is detected, display the winner and show winning line
      document.querySelector(".info").innerText =
        boxtext[e[0]].innerText + " Won"; // Display the winner (X or O)
      isgameover = true; // Set the game as over
      document
        .querySelector(".imgbox")
        .getElementsByTagName("img")[0].style.width = "200px"; // Show the winner image
      document.querySelector(
        ".line"
      ).style.transform = `translate(${e[3]}vw, ${e[4]}vw) rotate(${e[5]}deg)`; // Position and rotate the winning line
      document.querySelector(".line").style.width = "20vw"; // Make the winning line visible
    }
  });
};

// Game Logic for handling user clicks on the boxes
let boxes = document.getElementsByClassName("box"); // Get all boxes on the board
Array.from(boxes).forEach((element) => {
  let boxtext = element.querySelector(".boxtext"); // Get the text inside the box
  element.addEventListener("click", () => {
    // Add event listener for click on each box
    if (boxtext.innerText === "") {
      // Only allow clicking on an empty box
      boxtext.innerText = turn; // Set the current player's symbol (X or O)
      turn = changeTurn(); // Change the turn to the other player
      audioTurn.play(); // Play the turn sound
      checkWin(); // Check if there is a winner after the move
      if (!isgameover) {
        document.getElementsByClassName("info")[0].innerText =
          "Turn for " + turn; // Update the message with the new player's turn
      }
    }
  });
});

// Add onclick listener to reset button to restart the game
reset.addEventListener("click", () => {
  // Reset all boxes to empty
  let boxtexts = document.querySelectorAll(".boxtext");
  Array.from(boxtexts).forEach((element) => {
    element.innerText = "";
  });
  turn = "X"; // Reset the turn to X
  isgameover = false; // Reset the game over flag
  document.querySelector(".line").style.width = "0vw"; // Hide the winning line
  document.getElementsByClassName("info")[0].innerText = "Turn for " + turn; // Reset the turn message
  document.querySelector(".imgbox").getElementsByTagName("img")[0].style.width =
    "0px"; // Hide the winner image
});
