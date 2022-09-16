import { Paddle } from "./Paddle.js";

// 👇️ named export
export class Bot extends Paddle {

    constructor(posX,posY) {
      super(posX,posY,0,0,1,0xffffff);
      this.id='bot';
      this.ballPos=[];
      this.accel=0.01;
      this.friction=0.9;
      this.posX=-this.Xboundary+this.width;
    }

    moveUp(){
      this.speedY+=this.accel;
    }

    moveDown(){
      this.speedY+=-this.accel;
    }

    see(pos){
        this.ballPos=pos;
    }

    update(){

        super.update();
            if(this.posY>this.ballPos[1]){
                this.moveDown();
            }else if(this.posY<this.ballPos[1]){
                this.moveUp();
            }
        }

    checkCollision(){

    }

    }

