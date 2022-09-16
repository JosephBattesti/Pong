import { GameObject } from "./GameObject.js";

//Paddle class for Bot and Player
export class Paddle extends GameObject {
  constructor(posX, posY, Xboundary, Yboundary, friction, accel) {
    super(posX, posY, 0, 0, 1.5, 0xffffff, Xboundary, Yboundary);
    //Mouvement variables to tune for game difficulty
    this.friction = friction;
    this.accel = accel;
    //Dimensions
    this.height = this.size;
    this.width = 0.1;
    this.depth = 1;
    this.mesh = this.buildMesh();
  }

  //Moves with friction
  move() {
    this.posY += this.speedY;
    //Speed decreases slowly. Bouncy effect
    if (this.speedY != 0) {
      this.speedY *= this.friction;
    }
  }

  update(delta) {
    super.update(delta);
    this.checkCollision();
    this.move();
    this.mesh.position.set(this.posX, this.posY, 0);
  }

  buildMesh() {
    const geometry = new THREE.BoxGeometry(
      this.width,
      this.height,
      0.5,
      10,
      10
    );
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
