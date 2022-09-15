import { Paddle } from "./Paddle.js";

// 👇️ named export
export class Player extends Paddle {

    constructor(posX,posY) {
      super(posX,posY,0,0,1,0xffffff);
      this.id='player';
      this.posX=this.Xboundary;
    }

    moveUp(){
      this.speedY+=this.accel;
    }

    moveDown(){
      this.speedY+=-this.accel;
    }

  }