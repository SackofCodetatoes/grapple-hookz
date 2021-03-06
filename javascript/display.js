import Game from "./game.js";

class Display {
  constructor(){
    this.canvas = document.getElementById('game-canvas');
    this.context = this.canvas.getContext('2d');
    this.spriteSheet;
    this.viewPort = {
      x: 0,
      y: 0,
    }

    let gameConfig = {
      canvas: this.canvas,
      context: this.context,
      viewPort: this.viewPort,
      spriteSheet: this.spriteSheet,
      background: this.background,
    }
    // this.spriteSheet.onload = this.game = new Game(gameConfig);
    this.game = new Game(gameConfig);
    // this.game.initialize();


    this.render = this.render.bind(this);
  }

  render(){
    //create request animation loop
    this.context.clearRect(0, 0, this.canvas.attributes.width.value, this.canvas.attributes.height.value);
    // this.context.clearRect(0, 0, 1280, 720);
    //draw UI (title screen, instructions, game)
    // this.context.drawImage(this.background, 0, 300, 8192, 1020, -this.viewPort.x, -this.viewPort.y, 8192, 1020);

    this.game.update();
    

    requestAnimationFrame(() => this.render());
  }

}

export default Display;