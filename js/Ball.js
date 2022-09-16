import { GameObject } from "./GameObject.js";


export class Ball extends GameObject {

    constructor(posX,posY,speedX,speedY) {
      super(posX,posY,speedX,speedY,0.5,0xffffff);
      this.id='ball';  
      this.collide = false; 
      this.height=0.2;
      this.mesh=this.buildMesh();
    }

    move() {
        this.posX +=this.speedX;
        this.posY +=this.speedY;
      }

    blink() {
      this.mesh.material.color.setHex( 0xffffff );


    }

    see(pos){
      this.otherPositions=pos;
    }

    dist(pos2){
      let pos1=this.getPosition();
      return Math.sqrt(Math.pow(pos1[0]-pos2[0],2)+Math.pow(pos1[1]-pos2[1],2));
    }

    spawn(){
      this.posX=0;
      this.posY=0;
      let angle=Math.random()*2*Math.PI;
      this.speedY=this.speed*Math.sin(angle);
      this.speedX=this.speed*Math.cos(angle);
    }

    changeDirection(){
      this.speedX=this.speedX*-1;
    }


    update() {
      this.mesh.rotation.x += 0.01;
      this.mesh.rotation.y += 0;
      this.checkCollision();
      this.move();
      this.mesh.position.set(this.posX,this.posY,0);
    }
    

    buildMesh(){
      const geometry = new THREE.SphereGeometry( this.height, 16, 16 );
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