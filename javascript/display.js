const Game = require("./game.js");
const Player = require("./player.js");
const GameEntity = require("./game_entity.js");
const PLAYER_KEYS = ['w', 'a', 's', 'd', " "];

class Display {
  constructor(game){
    this.game = game;  
    this.game = this.game  
    this.playerInput = {
      a: false,
      d: false,
      w: false,
      s: false,
      Space: false,
    }
    this.keyBind();
    this.getInput = this.getInput.bind(this);

  }
  //source of inspiration for omni-directional movement/fluidity
  //https://stackoverflow.com/questions/12273451/how-to-fix-delay-in-javascript-keydown
  keyBind() {
    document.addEventListener('keydown', (event) => {
      const keyName = event.key;
      if (PLAYER_KEYS.includes(event.key)) {
        this.playerInput[event.key] = true;
      }
    });
    document.addEventListener('keyup', (event) => {
      if (PLAYER_KEYS.includes(event.key)) {
        this.playerInput[event.key] = false;
      }
    });
  }
  getInput() {
    if (this.playerInput['a'] === true) {
      this.game.entities.newPlayer.x -= this.game.entities.newPlayer.move_spd;
    }
    if (this.playerInput['d'] === true) {
      this.game.entities.newPlayer.x += this.game.entities.newPlayer.move_spd;
    }
    if (this.playerInput['w'] === true) {
      this.game.entities.newPlayer.y -= this.game.entities.newPlayer.move_spd;
    }
    if (this.playerInput['s'] === true) {
      this.game.entities.newPlayer.y += this.game.entities.newPlayer.move_spd;
    }
  }

  
  render(){  
    const canvas = this.game.canvas;

    const context = this.game.context;
    let newPlayer = this.game.entities.newPlayer;
    let staticEntity = this.game.entities.staticEntity;
    let move_dir = this.game.entities.move_dir;
    let entities = this.game.entities;
    let getInput = this.getInput;
    
    setInterval(function () {
      context.clearRect(0, 0, 640, 480);

      context.fillStyle = 'orange'; //background 
      context.fillRect(0, 0, 640, 480);
      getInput();
      
    //Test Purposes
      if (entities.staticEntity.y > 200) {
        move_dir = -2;
      } else if (entities.staticEntity.y < 100) {
        move_dir = 2;
      }

      entities.staticEntity.y += move_dir;

      for(let i = 0; i < Object.values(entities).length; i++){
        requestAnimationFrame(Object.values(entities)[i].draw);
      }
      // requestAnimationFrame(entities.staticEntity.draw);
      // requestAnimationFrame(entities.newPlayer.draw);

    }, 1000 / 60);
  }
}

module.exports = Display;