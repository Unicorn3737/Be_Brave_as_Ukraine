class Obstacle {
  constructor(img, type) {
    this.gameScreen = document.querySelector("#game-screen");
    this.positionsX = [120, 550];
    this.randomIndex = Math.floor(Math.random() * this.positionsX.length);
    this.left = this.positionsX[this.randomIndex];
    this.top = -20;
    this.width = 70;
    this.height = 70;
    this.type = type;
    this.element = document.createElement("img");
    this.element.style.position = "absolute";
    this.element.src = img;
    this.element.style.height = `${this.height}px`;
    this.element.style.width = `${this.width}px`;
    this.element.style.top = `${this.top}px`;
    this.element.style.left = `${this.left}px`;
    this.gameScreen.appendChild(this.element);
  }
  move() {
    this.top += 3;
    this.updatePosition();
  }
  updatePosition() {
    this.element.style.top = `${this.top}px`;
    this.element.style.left = `${this.left}px`;
  }
}
