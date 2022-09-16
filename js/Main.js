import {SceneManager} from './SceneManager.js';

document.onkeydown = checkKey;
function checkKey(e) {

    e = e || window.event;

    if (e.keyCode == '38') {
        // up arrow
        console.log('up')
        Scene.PlayerMoveUp();
    }
    else if (e.keyCode == '40') {
        // down arrow
        Scene.PlayerMoveDown();
        console.log('down')
    }
    else if (e.keyCode == '37') {
        Scene.animate();
    }
    else if (e.keyCode == '39') {
       // right arrow
    }

}

const Scene = new SceneManager();
Scene.animate();







