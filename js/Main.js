import { SceneManager } from "./SceneManager.js";

//Add Up and down Controlls
document.onkeydown = checkKey;
function checkKey(e) {
  e = e || window.event;

  if (e.keyCode == "38") {
    Scene.PlayerMoveUp();
  } else if (e.keyCode == "40") {
    Scene.PlayerMoveDown();
  }
}
// Create Game. Lacking Menu and Game logic here. Refresh Browser to replay
const Scene = new SceneManager();
Scene.animate();
