class Game {
  constructor() {
    this.startScreen = document.querySelector("#game-intro");
    this.gameScreen = document.querySelector("#game-screen");
    this.endScreen = document.querySelector("#game-end");
    this.gameContainer = document.querySelector("#game-container");
    this.orksElement = document.getElementById("orks");
    this.chancesElement = document.getElementById("chances");
    this.dronesElement = document.getElementById("drones");
    this.orksElementEnd = document.getElementById("orks/end");
    this.dronesElementEnd = document.getElementById("drones/end");
    this.player = new Player(350, 520, 90, 100, "images/Gamer.png");
    this.height = 600;
    this.width = 800;
    this.obstacles = [new Obstacle("images/ork.PNG", "ork")];
    this.projectiles = [];
    this.orks = 0;
    this.drones = 0;
    this.chances = 3;
    this.gameIsOver = false;
    this.gameIntervalId = null;
    this.gameLoopFrequency = 1000 / 60;
    this.counter = 0;
    this.verka = new Audio("sounds/verka.mp3");
    this.verka.volume = 0.1;
  }
  start() {
    this.verka.play();
    this.gameScreen.style.height = `${this.height}px`;
    this.gameScreen.style.width = `${this.width}px`;
    this.startScreen.style.display = "none";
    this.gameScreen.style.display = "block";

    this.gameIntervalId = setInterval(() => {
      this.gameLoop();
    }, this.gameLoopFrequency);
  }
  gameLoop() {
    this.update();
    if (this.gameIsOver === true) {
      clearInterval(this.gameIntervalId);
      console.log("you loos");
    }
  }
  update() {
    this.counter++;
    this.player.move();

    for (let i = 0; i < this.projectiles.length; i++) {
      const currentProjectile = this.projectiles[i];
      currentProjectile.move();
      for (let j = 0; j < this.obstacles.length; j++) {
        const currentObstacleInProjectileLoop = this.obstacles[j];
        const didCollideWithProjectile = currentProjectile.didCollide(
          currentObstacleInProjectileLoop
        );
        if (didCollideWithProjectile) {
          currentProjectile.element.remove();
          currentObstacleInProjectileLoop.element.remove();
          this.projectiles.splice(i, 1);
          this.obstacles.splice(j, 1);
        }
      }
    }
    for (let i = 0; i < this.obstacles.length; i++) {
      const currentObstacle = this.obstacles[i];
      currentObstacle.move();

      const didCollide = this.player.didCollide(currentObstacle);
      console.log("did it collide", currentObstacle);
      if (didCollide && currentObstacle.type === "ork") {
        this.obstacles.splice(i, 1);
        currentObstacle.element.remove();
        this.chances--;
        this.chancesElement.innerText = this.chances;
      }
      if (didCollide && currentObstacle.type === "Dron") {
        this.obstacles.splice(i, 1);
        currentObstacle.element.remove();
        this.drones++;
        this.dronesElement.innerText = this.drones;
      }
      if (currentObstacle.top > this.height + 100) {
        this.orks++;
        this.obstacles.splice(i, 1);
        this.orksElement.innerText = this.orks;
        currentObstacle.element.remove();
        i--;
      }
    }
    //gameIsOver
    if (this.chances === 0) {
      console.log("you loos");
      this.gameIsOver = true;
      this.player.element.remove();
      this.verka.pause();
      this.obstacles.forEach((oneObstacle) => {
        oneObstacle.element.remove();
      });
      this.gameScreen.style.display = "none";
      this.gameContainer.style.display = "none";
      this.endScreen.style.display = "block";
      this.orksElementEnd.innerText = this.orks;
      this.dronesElementEnd.innerText = this.drones;
    }
    if (this.counter % 180 === 0) {
      this.obstacles.push(new Obstacle("images/ork.png", "ork"));
    }
    if (this.counter % 250 === 0) {
      this.obstacles.push(new Obstacle("images/Dron.PNG", "Dron"));
    }
  }
}
