import { SpecialEffects } from './effects';
import { CandyZone } from './candyZone';

let mainWrapper = document.getElementById('main-wrapper');
mainWrapper.style.backgroundImage = 'url(\'./images/background.jpg\')';
mainWrapper.style.backgroundSize = '100% 100%';
mainWrapper.style.width = '800px';
mainWrapper.style.height = '640px';

// let upperCanvas = document.getElementById('upperCanvas');
// let upCtx = upperCanvas.getContext('2d');

// currently unused prperties:
// this.selectedPosX and this.selectedPosY from CandyZone

// things used but could be removed:
// this.selectedRow and this.selectedCol from Candyone, this.dX and dY used for animateSwap could
// be replaced with shift like in falling animation. you'd have to reset shift at end of swapping,

// I need a function to activate striped candies

// I need to determine what if i mix two color bombs or two striped candies. And what if a color-bomb
// gets destroyed by match or striped candy without swapping(may be make a destroy bomb function).

// Currently when i need to update score that is outside of CandyZone i need to this.lowerContext.restore(); because
// i have clipped inside the CandyZone. For some reason restoring inside the function that applies
// this.lowerContext.clip wasn't enough.

// Draw background
// this.lowerContext.fillStyle = 'rgb(97, 160, 233)';
// this.lowerContext.fillRect(0, 0, this.lowerCanvas.width, this.lowerCanvas.height);



class GameWorld {
  constructor(){
    this.lowerCanvas = document.getElementById('myCanvas');
    //this.lowerCanvas.width = parseInt(mainWrapper.style.width);
    //this.lowerCanvas.height = parseInt(mainWrapper.style.height);
    this.lowerContext = this.lowerCanvas.getContext('2d');
    this.width = parseInt(mainWrapper.style.width);
    this.height = parseInt(mainWrapper.style.height);
    this.x = 25;
    this.y = 25;
    this.backgroundColor = 'rgb(28, 231, 231)';
    this.gameOver = false;
    this.nextLevelButton = {
      x: this.x + 40,
      y: this.y + this.height - 40,
      width: 100,
      height: 40,
      fontProperties: '20px serif',
      text: 'Next Level',
      backgroundColor: 'rgb(101, 102, 102)',
      textColor: 'rgb(228, 238, 241)'
    };
    this.buttons = [
      { x: 20, y: 80, height: 20, text: 'Start'},
      { x: 20, y: 110, height: 20, text: 'Restart'}
    ];

    this.score = 0;
    this.transitionTime = 0;
    this.totalTransitionTime = 0.5;
    this.transitionState = 0;
    this.lastFrame = 0;

    this.playArea = '';
    this.levels = [1, 2, 3];
    this.level = 0;
    this.levelTargetScores = [2000, 4000, 6000];
    this.levelTargetScore = 0;
    this.currentLevelCompleted = false;
    this.stage = 0;
    this.header = {
      // give header properties
      background: 'rgb(84, 84, 84)',
      textColor: 'rgb(198, 211, 218)',
      width: this.width - 40,
      height: 40,
      x: 0,
      y: 0,
      fillHeader: () => {
        this.lowerContext.beginPath();
        this.lowerContext.fillStyle = this.header.background;
        // this.lowerContext.fillStyle = 'red';
        this.lowerContext.fillRect(this.x + this.header.x, this.y + this.header.y, this.header.width, this.header.height);
        this.lowerContext.fillStyle = this.header.textColor;
        this.lowerContext.font = '20px serif';
        this.lowerContext.fillText('Score: ' + this.score, this.x + this.header.x + 20, this.y + this.header.y + this.header.height - 15);
        // y coordinate for filltext is the bottom of text not top.
        this.lowerContext.fillText('Level: ' + this.level, this.x + this.header.x + 300, this.y + this.header.y + this.header.height - 15);
        this.lowerContext.closePath();
      }
    };

    this.levelCompleted = false;
    this.upperCanvas = '';
    this.spef = '';

  }

  drawButton(button) {
    this.lowerContext.beginPath();
    this.lowerContext.fillStyle = button.backgroundColor;
    this.lowerContext.fillRect(button.x, button.y, button.width, button.height);
    this.lowerContext.fillStyle = button.textColor;
    this.lowerContext.font = button.fontProperties;
    this.lowerContext.fillText(button.text, button.x + (button.width - this.lowerContext.measureText(button.text).width) / 2, button.y + 25);
  }

  displayScore() {
    this.lowerContext.restore();
    // this.lowerContext.rect(0, 0, this.lowerCanvas.width, this.lowerCanvas.height);
    //
    // this.lowerContext.clip();
    this.lowerContext.beginPath();
    this.lowerContext.fillStyle = this.header.background;
    this.lowerContext.fillRect(this.x + this.header.x, this.y + this.header.y, 200, this.header.height);
    this.lowerContext.closePath();

    this.lowerContext.fillStyle = this.header.textColor;
    let text = 'Score: ' + this.score;
    this.lowerContext.fillText(text, this.x + this.header.x + 20, this.y + this.header.y + this.header.height - 15);
    // console.log(text, this.x + this.header.x + 20, this.y + this.header.y + this.header.height - 15);
    // console.log(text);
  }

  updateScore() {
    for(let i = 0; i < this.playArea.matches.length; i++) {
      let matchLen = this.playArea.matches[i].length;
      this.score += (matchLen) * (matchLen - 1) * 10;
    }
  }

  setTargetScoreAndLevel(stage) {
    this.level = this.levels[stage];
    this.levelTargetScore = this.levelTargetScores[this.level];
  }

  init() {
    //Set inital stage to zero
    this.stage = 0;

    this.createCanvas();

    this.spef = new SpecialEffects(this.upperCanvas);

    // New game
    this.newGame();

    // add event listeners
    this.lowerCanvas.onmousedown = (event) => {
      if(this.playArea.gameState == 'stable') {

          let pos = this.playArea.getMousePosition(this.lowerCanvas, event);
          if((pos.x >= 0) && (pos.y >= 0) && (pos.x < this.playArea.width) && (pos.y <= this.playArea.height)) {
            if(this.playArea.selectedOnce == false) {
              this.playArea.selectedOnce = true;
              this.playArea.dragging = true;
              this.playArea.selectedCol = Math.floor(pos.x / this.playArea.tileWidth);
              this.playArea.selectedRow = Math.floor(pos.y / this.playArea.tileHeight);
              this.playArea.selectedPosX = pos.x;
              this.playArea.selectedPosY = pos.y;
              this.playArea.selectedTile = this.playArea.tiles[this.playArea.selectedRow][this.playArea.selectedCol];
              this.playArea.selectedImage = this.playArea.loadedImages[this.playArea.selectedTile.type];
              this.playArea.drawSelectedBorder(this.playArea.selectedTile.row, this.playArea.selectedTile.column);
            } else {
              this.playArea.selectedOnce = false;
              let newCol = Math.floor(pos.x / this.playArea.tileWidth);
              let newRow = Math.floor(pos.y / this.playArea.tileHeight);

              if(((Math.abs(newCol - this.playArea.selectedTile.column) == 1) && (Math.abs(newRow - this.playArea.selectedTile.row) == 0))
                || ((Math.abs(newRow - this.playArea.selectedTile.row) == 1) && (Math.abs(newCol - this.playArea.selectedTile.column) == 0))) {

                  this.playArea.swappingTile = this.playArea.tiles[newRow][newCol];
                  this.playArea.swappingImage = this.playArea.loadedImages[this.playArea.swappingTile.type];

                  this.playArea.gameState = 'changing';
                  this.playArea.swappingState = true;
                  // this will start animateSwap function from the main loop.
                  this.playArea.removeSelectedBorder(this.playArea.selectedTile.row, this.playArea.selectedTile.column);
              } else {
                this.playArea.removeSelectedBorder(this.playArea.selectedTile.row, this.playArea.selectedTile.column);
                this.playArea.selectedOnce = true;
                this.playArea.dragging = true;
                this.playArea.selectedCol = Math.floor(pos.x / this.playArea.tileWidth);
                this.playArea.selectedRow = Math.floor(pos.y / this.playArea.tileHeight);
                this.playArea.selectedPosX = pos.x;
                this.playArea.selectedPosY = pos.y;
                this.playArea.selectedTile = this.playArea.tiles[this.playArea.selectedRow][this.playArea.selectedCol];
                this.playArea.selectedImage = this.playArea.loadedImages[this.playArea.selectedTile.type];
                this.playArea.drawSelectedBorder(this.playArea.selectedTile.row, this.playArea.selectedTile.column);
              }
            }

          }
      }
    }

    this.lowerCanvas.onmouseup = (event) => {
      if(this.playArea.gameState == 'stable'){
        let pos = this.playArea.getMousePosition(this.lowerCanvas, event);
        if((pos.x >= 0) && (pos.y >= 0) && (pos.x < this.playArea.width) && (pos.y <= this.playArea.height)) {
          this.playArea.dragging = false;
        }
      }
    }

    // this.lowerCanvas.onmousemove = (event) => {
    //   if(this.playArea.gameState == 'stable') {
    //     if(this.playArea.dragging == true) {
    //       let pos = this.playArea.getMousePosition(this.lowerCanvas, event);
    //       if((pos.x >= 0) && (pos.y >= 0) && (pos.x < this.playArea.width) && (pos.y <= this.playArea.height)) {
    //         let col = Math.floor(pos.x / this.playArea.tileWidth);
    //         let row = Math.floor(pos.y / this.playArea.tileHeight);
    //         this.lowerContext.beginPath();
    //         this.lowerContext.fillStyle = this.playArea.backgrndColor;
    //         let beginX = this.playArea.x + (this.playArea.selectedCol * this.playArea.tileWidth);
    //         let beginY = this.playArea.y + (this.playArea.selectedRow * this.playArea.tileHeight)
    //         this.lowerContext.clearRect(beginX, beginY, this.playArea.tileWidth, this.playArea.tileHeight);
    //         this.lowerContext.fillRect(beginX, beginY, this.playArea.tileWidth, this.playArea.tileHeight);
    //         let dX = pos.x - this.playArea.selectedPosX;
    //         let dY = pos.y - this.playArea.selectedPosY;
    //         if(dX > ((this.playArea.tileWidth - 2) / 2)) {
    //           console.log('switch')
    //         }
    //
    //         // this.playArea.drawTiles();
    //         // this.lowerContext.drawImage(this.playArea.selectedImage, beginX + 2 + dX, beginY + 2 + dY, this.playArea.tileWidth-4, this.playArea.tileHeight -4);
    //         this.lowerContext.closePath();
    //         // console.log('moving co-ordinates');
    //         // console.log(pos.x, pos.y);
    //         // console.log(row, col);
    //       }
    //     }
    //   }
    // }

    // Enter main loop
    this.main(0);
  }

  newGame() {

    this.setTargetScoreAndLevel(this.stage);
    // Create current level
    this.createLevel(this.level);

    // set initial score to zero
    this.score = 0;

    // Reset game over
    this.gameover = false;

  }


  // Main loop
  main(tframe) {
      // Request animation frames
      let self = this;
      var animationID = window.requestAnimationFrame((tframe) => {
        self.main(tframe);
      });
      // if i directly pass self.main inside requestAnimationFrame it won't work.
      // I had to keep self.main() inside a function(){}, for some reason.

      // console.log('tframe: ',tframe);

      // codes that could update/change state of game go here

      if((this.playArea.tilesAreFalling == false) && (this.playArea.pauseTiles == false)) {
        if(this.playArea.swappingState == true) {
          this.playArea.animateSwap(this.playArea.selectedTile, this.playArea.swappingTile);
        }
      }

      if((this.playArea.swappingState == false && this.playArea.tilesAreFalling == false)
        && (this.playArea.pauseTiles == false)) {
        this.playArea.findMatches();
        if((this.playArea.matches.length > 0) || (this.playArea.specialActivation == true)) {
          this.updateScore();
          this.displayScore();
          this.playArea.replaceMatches();
          this.playArea.enableAnimatedFall();
        } else {
          this.playArea.gameState = 'stable';
          if(this.score >= this.levelTargetScore) {
            console.log('level completed');
            window.cancelAnimationFrame(animationID);
            this.currentLevelCompleted = true;
            this.lowerCanvas.onmousedown = (event) => {
              // do nothing for now
            }
          }
          if(this.playArea.canMove() == false) {
            console.log('no move left need to reshuffle the tiles');
            // this.gameOver = true;
            window.cancelAnimationFrame(animationID);
            this.lowerCanvas.onmousedown = (event) => {
              // do nothing for now
            }
          }
        }
      }

      if((this.playArea.swappingState == false) && (this.playArea.pauseTiles == false)) {
        // finished swapping and other animations, so start fall animation if matches were found
        if(this.playArea.tilesAreFalling == true) {
          this.playArea.animateTileFall();
        }
      }

      if(this.playArea.pauseTiles == true) {
        this.playArea.pauseForAnimation();
      }

  }

  createLevel(level) {
    this.playArea = new CandyZone(this, this.lowerCanvas);
    this.playArea.init();
    this.levelTargetScore = this.levelTargetScores[level-1];
    let done = false;

    // Keep generating levels until it is correct
    while (!done) {

      // Generate random tiles for the level
      this.playArea.getRandomTiles();

      // Remove and replace the matches
      this.playArea.removeAllMatches();

      // Done when there is a valid move
      if (this.playArea.canMove) {
          done = true;
      }
    }
    // draw visuals
    this.render();

    if(this.swappingState == false && this.tilesAreFalling == false) {
      this.gameState = 'stable';
    }

  }

  drawWorld() {
    this.lowerContext.beginPath();
    // this.lowerContext.fillStyle = this.backgroundColor;
    // this.lowerContext.fillRect(this.x , this.y, this.width, this.height);
    this.lowerContext.closePath();
  }

  render() {
    this.drawWorld();
    this.header.fillHeader();
    this.playArea.drawArea();
    this.playArea.drawTiles();
  }

  createCanvas() {
    this.upperCanvas = document.createElement('canvas');
    // this.upperCanvas.classList.add('upper-canvas');
    this.upperCanvas.style.position = 'absolute';
    this.upperCanvas.style.top = '0';
    this.upperCanvas.style.left = '0';
    this.upperCanvas.width = parseInt(mainWrapper.style.width);
    this.upperCanvas.height = parseInt(mainWrapper.style.height);
  }

  appendCanvas() {
    mainWrapper.appendChild(this.upperCanvas);
  }

  removeCanvas() {
    mainWrapper.removeChild(this.upperCanvas);
  }

}

let world = new GameWorld();
world.init();
