import { Paddle } from "./Paddle.js";

export class Bot extends Paddle {
  constructor(Xboundary, Yboundary, friction, acceleration) {
    super(-Xboundary, 0, Xboundary, Yboundary, friction, acceleration);
    this.ballPos;
  }

  moveUp() {
    this.speedY += this.accel;
  }

  moveDown() {
    this.speedY += -this.accel;
  }

  //Update ball position
  see(pos) {
    this.ballPos = pos;
  }

  update() {
    super.update();
    //follow ball Y position
    if (this.posY > this.ballPos[1]) {
      this.moveDown();
    } else if (this.posY < this.ballPos[1]) {
      this.moveUp();
    }
  }

  checkCollision() {}
}
