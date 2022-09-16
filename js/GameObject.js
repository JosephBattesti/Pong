export class GameObject {

    constructor(posX,posY,speedX,speedY,size,color,height) {
      this.posX = posX;
      this.posY = posY;
      this.Yboundary=3;
      this.Xboundary=5;
      this.speedX = speedX;
      this.speedY = speedY;
      this.speed=Math.sqrt(Math.pow(speedX,2)+Math.pow(speedY,2));
      this.size=size;
      this.color=color
    }

    getMesh() {
      return this.mesh
    }


    getPosition() {
      return [this.posX,this.posY];
    }

    checkCollision() {

      if(this.posY<-this.Yboundary || this.posY>this.Yboundary){
        this.speedY=this.speedY*-1;
      }

    }


  }