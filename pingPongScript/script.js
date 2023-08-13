const paddleTop = document.getElementById("paddle-top");
const paddleBottom = document.getElementById("paddle-bottom");
const ball = document.querySelector(".ball");

let scoreTop = 0;
let scoreBottom = 0;

// Event listener to move the paddles
document.addEventListener("keydown", (event) => {
    const keyPressed = event.key;
    const paddleSpeed = 20;

    if (keyPressed === "ArrowLeft") {
        movePaddles(-paddleSpeed);
    } else if (keyPressed === "ArrowRight") {
        movePaddles(paddleSpeed);
    }
});

function movePaddles(speed) {
    const paddleLeft = parseInt(paddleTop.style.left) || 0;

    if (paddleLeft + speed >= 0 && paddleLeft + speed <= 300) {
        paddleTop.style.left = paddleLeft + speed + "px";
        paddleBottom.style.left = paddleLeft + speed + "px";
    }
}
// Ball movement logic
let ballLeft = 195;
let ballTop = 95;
let ballXSpeed = 5;
let ballYSpeed = 5;

function moveBall() {
  ballLeft += ballXSpeed;
  ballTop += ballYSpeed;

  // Ball collisions with walls
  if (ballLeft <= 0 || ballLeft >= 390) {
      ballXSpeed = -ballXSpeed;
  }

  // Ball collisions with paddles
  if (collisionWithPaddle(paddleTop) || collisionWithPaddle(paddleBottom)) {
      ballYSpeed = -ballYSpeed;
  }

  // Ball scoring and resetting
  if (ballTop <= 0) {
      ballTop = 0;
      ballYSpeed = -ballYSpeed;
      scoreBottom++;
      updateScores();
      checkWin();
  } else if (ballTop >= 190) {
      ballTop = 190;
      ballYSpeed = -ballYSpeed;
      scoreTop++;
      updateScores();
      checkWin();
  }

  ball.style.left = ballLeft + "px";
  ball.style.top = ballTop + "px";

  requestAnimationFrame(moveBall);
}


function collisionWithPaddle(paddle) {
  const paddleLeft = parseInt(paddle.style.left);
  const paddleRight = paddleLeft + 100;
  const paddleTop = parseInt(paddle.style.top);
  const paddleBottom = paddleTop + 10;

  return (
      ballTop >= paddleTop &&
      ballTop <= paddleBottom &&
      ballLeft >= paddleLeft &&
      ballLeft <= paddleRight
  );
}


function updateScores() {
    document.getElementById("score-top").textContent = `Player 1: ${scoreTop}`;
    document.getElementById("score-bottom").textContent = `Player 2: ${scoreBottom}`;
}

function checkWin() {
    if (scoreTop >= 10) {
        alert("Player 1 wins!");
        resetGame();
    } else if (scoreBottom >= 10) {
        alert("Player 2 wins!");
        resetGame();
    }
}

function resetGame() {
    scoreTop = 0;
    scoreBottom = 0;
    updateScores();
    ballLeft = 195;
    ballTop = 95;
}

// Start the game
updateScores();
moveBall();
