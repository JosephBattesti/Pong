import {Player} from './Player.js';
import { Ball } from './Ball.js';
import { Bot } from './Bot.js';

export class SceneManager {
    constructor() {
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
        this.animationID;

        this.Player = new Player(2,0);
        this.Ball = new Ball(0,0,0.1,0.05);
        this.Bot = new Bot(-2,0);

        this.playerScore=0;
        this.botScore=0;

        this.gameObjects=[this.Player,this.Ball,this.Bot];

        this.Xboundary=this.gameObjects[0].Xboundary;
        this.Yboundary=this.gameObjects[0].Yboundary;
        
        for(let go of this.gameObjects){
            this.scene.add(go.getMesh()); 
        }

        this.addBoundary();

    }

    animate() {
            this.animationID=requestAnimationFrame( this.animate.bind(this) );
            this.update();
            this.renderer.render( this.scene, this.camera );
            console.log(this.playerScore);

            if(this.playerScore>1 || this.botScore>1){
                if(this.playerScore>this.botScore){
                document.getElementById("gameover").innerHTML = "You Win"; 
                }else{
                document.getElementById("gameover").innerHTML = "You Lost"; 
                }
                cancelAnimationFrame( this.animationID );
            }
    }

    update() {

        this.Bot.see(this.Ball.getPosition());

        this.checkBallCollision(this.Player);
        this.checkBallCollision(this.Bot);
        this.checkPoint();
        

        for(let go of this.gameObjects){
            go.update();
        }

    }

    checkBallCollision(padd){
        if(this.Ball.dist(padd.getPosition())<this.Ball.height*1.5){
            this.Ball.changeDirection();
            return true;
        } else { return false }
    }

    checkPoint(){
        if(this.Ball.posX<-this.Xboundary){
            this.Ball.spawn();
            this.playerScore+=1;
            document.getElementById("scoreboard").innerHTML = "BOT: " + this.botScore + " - YOU: " + this.playerScore; 
            } else if (this.Ball.posX>this.Xboundary){
            this.Ball.spawn();
            this.botScore+=1;
            document.getElementById("scoreboard").innerHTML = "BOT: " + this.botScore + " - YOU: " + this.playerScore; 
            }
    }

    PlayerMoveUp(){
        this.Player.moveUp();
    }

    PlayerMoveDown(){
        this.Player.moveDown();
    }

    addBoundary(){
        const geometry = new THREE.CylinderGeometry( 0.05, 0.05, this.Yboundary*2, 32 );
        const material = new THREE.MeshLambertMaterial( {color: 0xffff00} );
        const cylinder = new THREE.Mesh( geometry, material );
        cylinder.position.z=0;
        const c2=cylinder.clone();
        const c3=cylinder.clone();
        c3.scale.y=this.Xboundary/this.Yboundary;
        c3.rotation.z+=Math.PI/2;
        const c4=c3.clone();
        cylinder.position.x=this.Xboundary;
        c2.position.x=-this.Xboundary;
        c3.position.y=this.Yboundary;
        c4.position.y=-this.Yboundary;
        this.scene.add( cylinder,c2,c3,c4);
    }
  }