import { GameObject } from "./GameObject.js";

export class Ball extends GameObject {
  constructor(speed, Xboundary, Yboundary) {
    super(0, 0, 0, 0, 0.5, 0xffffff, Xboundary, Yboundary);
    // Speed magnitude. Can be adapted for game dificulty
    this.speed = speed;
    //Height is raidus
    this.height = 0.15;
    this.mesh = this.buildMesh();
    //Blink variabales
    this.blinking = true;
    this.time = 0;
    this.blinkTime = 2;
    this.blinkPeriod = 0.1;
    //Initialize ball
    this.spawn();
  }

  move() {
    this.posX += this.speedX;
    this.posY += this.speedY;
  }

  //Blink method makes the ball bling for blinkTime seconds every blinkPeriod
  blink() {
    if (this.time < this.blinkTime) {
      this.time += this.delta;
      if ((this.time % this.blinkPeriod).toFixed(2) == this.blinkPeriod) {
        this.alternateColor();
        this.mesh.material.color.setHex(this.color);
      }
    } else {
      this.blinking = false;
      this.time = 0;
      this.color = 0xffffff;
      this.mesh.material.color.setHex(this.color);
    }
  }

  alternateColor() {
    if (this.color == 0xffffff) {
      this.color = 0xff0000;
    } else {
      this.color = 0xffffff;
    }
  }
  // Re apear method
  spawn() {
    this.posX = 0;
    this.posY = 0;
    let angle =
      (Math.random() * 2 * Math.PI) / 5 -
      Math.PI / 5 +
      Math.round(Math.random()) * Math.PI;
    this.speedY = this.speed * Math.sin(angle);
    this.speedX = this.speed * Math.cos(angle);
    this.update();
    this.blinking = true;
  }
  //This method checks if the ball is in contact with the side of the paddle
  checkCollisionWith(padd) {
    let pos = padd.getPosition();

    if (
      Math.abs(pos[0] - this.posX) < this.height + padd.width / 2 &&
      Math.abs(pos[1] - this.posY) < padd.height
    ) {
      let collisionPos = this.posY - pos[1];
      this.changeDirection(collisionPos);
    }
  }

  //Changes direction as a function of where the collision happened on the paddle
  changeDirection(collisionPos) {
    //Define a range for the bounce angle
    let maxAng = Math.PI / 3;
    let minAng = maxAng - (2 * Math.PI) / 3;
    //Consider if it's bot's or player's paddle and rotates
    if (this.posX > 0) {
      let temp = maxAng;
      maxAng = minAng + Math.PI;
      minAng = temp + Math.PI;
    }
    //linear map between angle and collision position on the paddle
    let newAngle = this.map_range(collisionPos, -1, 1, minAng, maxAng);
    //Calculate new speed components
    this.speedY = this.speed * Math.sin(newAngle);
    this.speedX = this.speed * Math.cos(newAngle);
  }

  map_range(value, low1, high1, low2, high2) {
    return low2 + ((high2 - low2) * (value - low1)) / (high1 - low1);
  }

  update(delta) {
    super.update(delta);
    if (this.blinking) {
      this.blink();
    } else {
      // rotate for esthetique
      this.mesh.rotation.x += 0.01;
      this.mesh.rotation.y += 0;
      this.checkCollision();
      this.move();
      this.mesh.position.set(this.posX, this.posY, 0);
    }
  }

  buildMesh() {
    const geometry = new THREE.SphereGeometry(this.height, 16, 16);
    const material = new THREE.MeshLambertMaterial({ color: this.color });
    let mesh = new THREE.Mesh(geometry, material);
    const wireframe = new THREE.WireframeGeometry(geometry);
    const line = new THREE.LineSegments(wireframe);
    line.material.depthTest = false;
    line.material.opacity = 0.1;
    line.material.transparent = true;
    mesh.add(line);
    return mesh;
  }
}
