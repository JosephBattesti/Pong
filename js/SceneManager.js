import { Player } from "./Player.js";
import { Ball } from "./Ball.js";
import { Bot } from "./Bot.js";

export class SceneManager {
  constructor() {
    [this.scene, this.camera, this.renderer] = this.generateSceneTrio();

    //Add a light on top
    const light = new THREE.PointLight(0xffee88, 2, 100, 2);
    light.position.set(0, 5, 0);
    this.scene.add(light);

    //Create Boundary
    this.Yboundary = 3;
    this.Xboundary = 5;
    this.addBoundary();

    //Create GameObjects
    //Las two arguments in Player and Bot are friction and Acceleration. The can be tuned to the desired game difficulty
    this.Player = new Player(this.Xboundary, this.Yboundary, 0.98, 0.02);
    this.Bot = new Bot(this.Xboundary, this.Yboundary, 0.95, 0.004);
    this.Ball = new Ball(0.1, this.Xboundary, this.Yboundary);
    this.gameObjects = [this.Player, this.Ball, this.Bot];

    //Initialize scores
    this.playerScore = 0;
    this.botScore = 0;
    this.maxScore = 3;

    for (let go of this.gameObjects) {
      this.scene.add(go.getMesh());
    }

    //Keep track of time for blinking and other future time related features
    this.clock = new THREE.Clock();
    this.time = 0;
    this.animationID;
  }

  //Animate with three.js
  animate() {
    this.animationID = requestAnimationFrame(this.animate.bind(this));
    this.update();
    this.renderer.render(this.scene, this.camera);
  }

  //Update Game state
  update() {
    const delta = this.clock.getDelta();
    this.checkGameOver();
    //Bot follows ball
    this.Bot.see(this.Ball.getPosition());
    //Check ball status
    this.Ball.checkCollisionWith(this.Player);
    this.Ball.checkCollisionWith(this.Bot);
    this.checkPoint();
    //Update game object status
    for (let go of this.gameObjects) {
      go.update(delta);
    }
  }

  //Check game over and update html text
  checkGameOver() {
    if (this.playerScore >= this.maxScore || this.botScore >= this.maxScore) {
      if (this.playerScore > this.botScore) {
        document.getElementById("gameover").innerHTML =
          "You Win : Refresh to play";
      } else {
        document.getElementById("gameover").innerHTML =
          "You Lost : Refresh to play ";
      }
      cancelAnimationFrame(this.animationID);
    }
  }
  // Check point. Maybe move inside Ball class
  checkPoint() {
    if (this.Ball.posX < -this.Xboundary * 1.2) {
      this.Ball.spawn();
      this.playerScore += 1;
      document.getElementById("scoreboard").innerHTML =
        "BOT: " + this.botScore + " - YOU: " + this.playerScore;
    } else if (this.Ball.posX > this.Xboundary) {
      this.Ball.spawn();
      this.botScore += 1;
      document.getElementById("scoreboard").innerHTML =
        "BOT: " + this.botScore + " - YOU: " + this.playerScore;
    }
  }
  //MovePLayer
  PlayerMoveUp() {
    this.Player.moveUp();
  }

  PlayerMoveDown() {
    this.Player.moveDown();
  }
  //Add boundary for esthetics. 4 Cylinders
  addBoundary() {
    const geometry = new THREE.CylinderGeometry(
      0.05,
      0.05,
      this.Yboundary * 2,
      32
    );
    const material = new THREE.MeshLambertMaterial({ color: 0xffff00 });
    const cylinder = new THREE.Mesh(geometry, material);
    cylinder.position.z = 0;
    const c2 = cylinder.clone();
    const c3 = cylinder.clone();
    c3.scale.y = this.Xboundary / this.Yboundary;
    c3.rotation.z += Math.PI / 2;
    const c4 = c3.clone();
    cylinder.position.x = this.Xboundary;
    c2.position.x = -this.Xboundary;
    c3.position.y = this.Yboundary;
    c4.position.y = -this.Yboundary;
    this.scene.add(cylinder, c2, c3, c4);
  }

  generateSceneTrio() {
    const stage = new THREE.Scene();
    const camer = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camer.position.z = 5;
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth * 0.8, window.innerHeight * 0.8);
    renderer.setPixelRatio(devicePixelRatio);
    document.body.appendChild(renderer.domElement);

    return [stage, camer, renderer];
  }
}
