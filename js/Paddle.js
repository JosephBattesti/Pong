import { GameObject } from "./GameObject.js";

// 👇️ named export
export class Paddle extends GameObject {

    constructor(posX,posY) {

      super(posX,posY,0,0,1,0xFFFFFF);
      this.mesh=this.buildMesh();
      this.friction=0.98;
      this.accel=0.05;
      this.height=0.5;
      this.width=0.1;
      this.depth=1;
      

    }

    move() {
      this.posY +=this.speedY;

      if (this.speedY!=0){
        this.speedY*=this.friction;
      }

      }

    update() {
      this.checkCollision();
      this.move();
      this.mesh.position.set(this.posX,this.posY,0);
    }


    buildMesh() {
      const geometry = new THREE.BoxGeometry( 0.1, 1, 0.5,10,10 );
      const material = new THREE.MeshLambertMaterial({color: this.color})
      let mesh = new THREE.Mesh( geometry, material );
      const wireframe=new THREE.WireframeGeometry(geometry);
      const line = new THREE.LineSegments(wireframe);
      line.material.depthTest=false;
      line.material.opacity=0.1;
      line.material.transparent=true;
      mesh.add( line );
      return mesh;
    }

  }