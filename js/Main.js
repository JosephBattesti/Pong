import {Player} from './Player.js';
import { Ball } from './Ball.js';
import { Bot } from './Bot.js';
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
       // left arrow
    }
    else if (e.keyCode == '39') {
       // right arrow
    }

}

const Player1 = new Player(2,0);
const Ball1 = new Ball(0,0,0.1,0.05);
const Bot1 = new Bot(-2,0);

const Scene = new SceneManager([Ball1,Player1,Bot1]);

Scene.animate();





