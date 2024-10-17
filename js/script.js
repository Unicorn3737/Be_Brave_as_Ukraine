window.onload = function () {
  const startButton = document.getElementById("start-button");
  const restartButton = document.getElementById("restart-button");
  let ourGame;
  startButton.addEventListener("click", function () {
    startGame();
  });
  restartButton.addEventListener("click", () => {
    window.location.reload();
  });
  document.addEventListener("keydown", (event) => {
    if (event.code === "ArrowRight") {
      ourGame.player.directionX = 3;
    }
    if (event.code === "ArrowLeft") {
      ourGame.player.directionX = -3;
    }
    if (event.code === "ArrowUp") {
      ourGame.player.directionY = -3;
    }
    if (event.code === "ArrowDown") {
      ourGame.player.directionY = 3;
    }
    if (event.code === "Space") {
      ourGame.projectiles.push(
        new Projectile(ourGame.player.left + 35, ourGame.player.top - 40)
      );
    }
  });
  document.addEventListener("keyup", () => {
    ourGame.player.directionX = 0;
    ourGame.player.directionY = 0;
  });
  function startGame() {
    console.log("start game");
    ourGame = new Game();
    ourGame.start();
  }
};
