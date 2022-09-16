export class GameObject {
  //General class for all objects in game
  constructor(posX, posY, speedX, speedY, size, color, Xboundary, Yboundary) {
    this.posX = posX;
    this.posY = posY;
    this.speedX = speedX;
    this.speedY = speedY;
    this.speed = Math.sqrt(Math.pow(speedX, 2) + Math.pow(speedY, 2));
    this.size = size;
    this.Xboundary = Xboundary;
    this.Yboundary = Yboundary;
    this.color = color;
    this.delta = 0;
  }
  //The 3D mesh is in each object
  getMesh() {
    return this.mesh;
  }

  getPosition() {
    return [this.posX, this.posY];
  }
  //Collisions with top and bottom boundaries. Other collisions in sceneManager
  checkCollision() {
    if (this.posY < -this.Yboundary || this.posY > this.Yboundary) {
      this.speedY = this.speedY * -1;
    }
  }
  //Update thakes ellapsed time
  update(delta) {
    this.delta = delta;
  }
}
