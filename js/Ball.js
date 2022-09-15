import { GameObject } from "./GameObject.js";


export class Ball extends GameObject {

    constructor(posX,posY,speedX,speedY) {
      super(posX,posY,speedX,speedY,0.5,0xffffff);
      this.id='ball';  
      this.collide = false; 
      this.mesh=this.buildMesh();
      this.otherPositions=[];
      this.score=[0,0];
    }

    move() {
        this.posX +=this.speedX;
        this.posY +=this.speedY;
      }

    blink() {

    }

    see(pos){
      this.otherPositions=pos;
    }

    dist(pos2){
      let pos1=this.getPosition();
      return Math.sqrt(Math.pow(pos1[0]-pos2[0],2)+Math.pow(pos1[1]-pos2[1],2));
    }


    checkCollision() {

      super.checkCollision();
      for (let pos of this.otherPositions){
        if(this.dist(pos)<this.size*2){
          this.speedX=this.speedX*-1;
          this.collide=true;
        }
      }
      if(this.posX<-this.Xboundary){
        this.spawn();
        this.score[0]+=1;
      } else if (this.posX>this.Xboundary){
        this.spawn();
        this.score[1]+=1;
      }
    }

    spawn(){
      this.posX=0;
      this.posY=0;
      let angle=Math.random()*2*Math.PI;
      console.log(this.speed);
      this.speedY=this.speed*Math.sin(angle);
      this.speedX=this.speed*Math.cos(angle);
    }


    update() {
      this.mesh.rotation.x += 0.01;
      this.mesh.rotation.y += 0;
      this.checkCollision();
      this.move();
      this.mesh.position.set(this.posX,this.posY,0);
    }
    

    buildMesh(){
      const geometry = new THREE.SphereGeometry( 0.5, 16, 16 );
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