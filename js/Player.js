import { Paddle } from "./Paddle.js";

// 👇️ named export
export class Player extends Paddle {
  constructor(Xboundary, Yboundary, friction, acceleration) {
    super(Xboundary, 0, Xboundary, Yboundary, friction, acceleration);
  }
  moveUp() {
    this.speedY += this.accel;
  }
  moveDown() {
    this.speedY += -this.accel;
  }
}
