export class SceneManager {
    constructor(gameObjects) {
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setSize( window.innerWidth, window.innerHeight );
        this.renderer.setPixelRatio(devicePixelRatio);
        const light = new THREE.PointLight(0xffee88, 2, 100, 2);
        light.position.set( 0, 5, 0 );
        this.scene.add(light);
        document.body.appendChild( this.renderer.domElement )
        this.camera.position.z = 5;
        this.gameObjects=gameObjects;
        this.addBoundary();
        
        for(let go of this.gameObjects){
            this.scene.add(go.getMesh()); 
        }

    }

    animate() {
        requestAnimationFrame( this.animate.bind(this) );
        this.update();
        this.renderer.render( this.scene, this.camera );
    }

    update() {

        let padPos = this.gameObjects.filter(x => x.id != 'ball').map(x => x.getPosition());
        const Ball = this.gameObjects.find(x => x.id === 'ball')
        Ball.see(padPos);
        score=Ball.getScore();
        

        let ballPos = this.gameObjects.find(x => x.id === 'ball').getPosition();
        this.gameObjects.find(x => x.id === 'bot').see(ballPos);
               
        for(let go of this.gameObjects){
            go.update();
        }

      }

    PlayerMoveUp(){
        this.gameObjects.find(x => x.id === 'player').moveUp();
    }

    PlayerMoveDown(){
        this.gameObjects.find(x => x.id === 'player').moveDown();
    }

    addBoundary(){
        let Xboundary=this.gameObjects[0].Xboundary;
        let Yboundary=this.gameObjects[0].Yboundary;
        const geometry = new THREE.CylinderGeometry( 0.05, 0.05, Yboundary*2, 32 );
        const material = new THREE.MeshLambertMaterial( {color: 0xffff00} );
        const cylinder = new THREE.Mesh( geometry, material );
        cylinder.position.z=0;
        const c2=cylinder.clone();
        const c3=cylinder.clone();
        c3.scale.y=Xboundary/Yboundary;
        c3.rotation.z+=Math.PI/2;
        const c4=c3.clone();
        cylinder.position.x=Xboundary;
        c2.position.x=-Xboundary;
        c3.position.y=Yboundary;
        c4.position.y=-Yboundary;
        this.scene.add( cylinder,c2,c3,c4);
        
    }
  }