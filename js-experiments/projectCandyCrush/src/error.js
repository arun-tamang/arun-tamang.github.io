let mainWrapper = document.getElementById('main-wrapper');
mainWrapper.style.backgroundImage = 'url(\'./images/background.jpg\')';
mainWrapper.style.backgroundSize = '100% 100%';
mainWrapper.style.width = '800px';
mainWrapper.style.height = '640px';

let canvas = document.getElementById('myCanvas');
//canvas.width = parseInt(mainWrapper.style.width);
//canvas.height = parseInt(mainWrapper.style.height);
let ctx = canvas.getContext('2d');

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

// Currently when i need to update score that is outside of CandyZone i need to ctx.restore(); because
// i have clipped inside the CandyZone. For some reason restoring inside the function that applies
// ctx.clip wasn't enough.

// Draw background
// ctx.fillStyle = 'rgb(97, 160, 233)';
// ctx.fillRect(0, 0, canvas.width, canvas.height);

function reverseSort(a,b) {
    return b - a;
}


class Tile {

  constructor() {
    this.type = '';
    this.shift = 0;
    this.row = 0;
    this.column = 0;
    // this.image = '';
  }

}

class StripedLineAnimation {
  constructor(xCor,yCor, horizontal, type, context, ends) {
    this.context = context;
    this.horizontal = horizontal;
    this.stop = false;
    if(this.horizontal == true) {
      this.startRight = {x:xCor - 50, y:yCor};
      this.startLeft = {x:xCor + 50, y: yCor};
      this.endRight = {x:xCor + 50, y: yCor};
      this.endLeft = {x:xCor - 50, y: yCor};
      this.tileEndLeft = ends[0];
      this.tileEndRight = ends[1];
      this.type = type;
      // horizontal lines
    } else {
      this.startDown = {x: xCor, y: yCor - 50};
      this.startTop = {x: xCor, y: yCor + 50};
      this.endDown = {x: xCor, y: yCor + 50};
      this.endTop = {x: xCor, y: yCor - 50};
      this.tileEndTop = ends[2];
      this.tileEndDown = ends[3];
      this.type = type;
    }
    if(this.type == 0) {
      this.color = ['rgba(250, 225, 81, 1)', 'rgba(250, 225, 81, 0)',
        'rgba(250, 225, 81, 1)', 'rgba(250, 225, 81, 0)',
        'rgba(255, 182, 32, 1)', 'rgba(255, 182, 32, 0)',
        'rgba(240, 249, 195, 1)', 'rgba(240, 249, 195, 0)',
        'rgba(255, 249, 228, 1)', 'rgba(255, 249, 228, 0)',
         'rgba(255, 243, 187, 1)', 'rgba(255, 243, 187, 0)'];
    } else if(this.type == 1) {
      this.color = ['rgba(255, 143, 8, 1)', 'rgba(255, 143, 8, 0)',
      'rgba(252, 159, 19, 1)', 'rgba(252, 159, 19, 0)',
      'rgba(245, 154, 2, 1)', 'rgba(245, 154, 2, 0)',
      'rgba(255, 236, 198, 1)', 'rgba(255, 236, 198, 0)',
      'rgba(255, 245, 200, 1)', 'rgba(255, 245, 200, 0)',
      'rgba(249, 235, 200, 1)', 'rgba(249, 235, 200, 0)'];
    } else if(this.type == 2) {
      this.color = ['rgba(238, 11, 10, 1)', 'rgba(238, 11, 10, 0)',
      'rgba(255, 5, 7, 1)', 'rgba(255, 5, 7, 0)',
      'rgba(252, 0, 5, 1)', 'rgba(252, 0, 5, 0)',
      'rgba(255, 225, 221, 1)', 'rgba(255, 225, 221, 0)',
      'rgba(247, 228, 219, 1)', 'rgba(247, 228, 219, 0)',
      'rgba(210, 133, 123, 1)', 'rgba(210, 133, 123, 0)'];
    } else if(this.type == 3) {
      this.color = ['rgba(197, 21, 252, 1)', 'rgba(197, 21, 252, 0)',
      'rgba(194, 16, 232, 1)', 'rgba(194, 16, 232, 0)',
      'rgba(184, 13, 252, 1)', 'rgba(184, 13, 252, 0)',
      'rgba(251, 246, 252, 1)', 'rgba(251, 246, 252, 0)',
      'rgba(255, 227, 255, 1)', 'rgba(255, 227, 255, 0)',
      'rgba(255, 236, 255, 1)', 'rgba(255, 236, 255, 0)'];
    } else if(this.type == 4) {
      this.color = ['rgba(18, 194, 255, 1)', 'rgba(18, 194, 255, 0)',
      'rgba(30, 176, 252, 1)', 'rgba(30, 176, 252, 0)',
      'rgba(0, 76, 187, 1)', 'rgba(0, 76, 187, 0)',
      'rgba(214, 248, 255, 1)', 'rgba(214, 248, 255, 0)',
      'rgba(247, 254, 246, 1)', 'rgba(247, 254, 246, 0)',
      'rgba(209, 255, 253, 1)', 'rgba(209, 255, 253, 0)'];
    } else if(this.type == 5) {
      this.color = ['rgba(38, 236, 0, 1)', 'rgba(38, 236, 0, 0)',
      'rgba(44, 203, 0, 1)', 'rgba(44, 203, 0, 0)',
      'rgba(35, 187, 4, 1)', 'rgba(35, 187, 4, 0)',
      'rgba(215, 255, 187, 1)', 'rgba(215, 255, 187, 0)',
      'rgba(192, 255, 164, 1)', 'rgba(192, 255, 164, 0)',
      'rgba(193, 255, 147, 1)', 'rgba(193, 255, 147, 0)'];
    }
  }

  init() {
    // switch(this.case) {
    //
    // }
  }

  drawLineShape(x1, y1, x2, y2, position, last) {
    let grd = this.context.createLinearGradient(x2, y2, x1, y1);

    // grd.addColorStop(0, "white");
    // grd.addColorStop(0.5, "blue");
    // grd.addColorStop(1, color);
    let delIndex = 0;
    if(last == true) {
      delIndex = 6;
    }
    let divide = 1;
    if(position == 'middle') {
      divide = 2;
      grd.addColorStop(0, this.color[2+delIndex]);
      this.context.shadowColor = this.color[2+delIndex];
      grd.addColorStop(1, this.color[3+delIndex]);
    } else if ( position == 'bottom') {
      divide = 1.3;
      grd.addColorStop(0, this.color[4+delIndex]);
      this.context.shadowColor = this.color[4+delIndex];
      grd.addColorStop(1, this.color[5+delIndex]);
    } else if(position == 'top') {
      divide = 3.2;
      grd.addColorStop(0, this.color[0+delIndex]);
      this.context.shadowColor = this.color[0+delIndex];
      grd.addColorStop(1, this.color[1+delIndex]);
    }
    let height = 0;
    let one = 0;
    let two = 0;
    if(this.horizontal == true) {
      height = Math.abs(x2 - x1) / 60;
      one = x1;
      two = x2;
    } else {
      height = Math.abs(y2 - y1) / 60;
      one = y1;
      two = y2;
    }
    // height = 8;
    // this.context.shadowColor = grd;
    this.context.shadowBlur = 20 ;
    this.context.beginPath();
    this.context.moveTo(x1, y1);
    this.context.lineTo(x2, y2);
    if(this.horizontal == true) {
      if(two > one) {
        this.context.bezierCurveTo(x2, y2, x2 + (6 + height), y2-(6 + height) / divide, x2, y2 - (6 + height));
      } else {
        this.context.bezierCurveTo(x2, y2, x2-(6 + height), y2-(6 + height) / divide, x2, y2 - (6 + height));
      }
    } else {
      if(two > one) {
        this.context.bezierCurveTo(x2, y2, x2 - (6 + height) / divide, y2 + (6 + height), x2 - (6 + height), y2);
      } else {
        this.context.bezierCurveTo(x2, y2, x2-(6 + height) / divide, y2-(6 + height), x2- (6 + height), y2);
      }
    }

    this.context.fillStyle = grd;
    this.context.fill();
    this.context.closePath();
  }

  drawHorizontalLines() {
    if(this.startRight.x <= this.tileEndRight) {
      // you might want to clip region before drawing these lines
      let ht = Math.abs(this.startRight.x - this.endRight.x) / 40;
      this.endRight.x += 15;
      this.startRight.x += 5;
      this.drawLineShape(this.startRight.x, this.startRight.y - 5, this.endRight.x, this.endRight.y -7 - ht, 'top', true);
      this.drawLineShape(this.startRight.x,this.startRight.y , this.endRight.x, this.endRight.y, 'middle', true);
      this.drawLineShape(this.startRight.x,this.startRight.y + 5, this.endRight.x, this.endRight.y + 7 + ht,'bottom', true);
    }
    if(this.startLeft.x >= this.tileEndLeft) {
      let ht = Math.abs(this.startLeft.x - this.endLeft.x) / 40;
      this.endLeft.x -= 15;
      this.startLeft.x -= 5;
      this.drawLineShape(this.startLeft.x, this.startLeft.y - 5, this.endLeft.x, this.endLeft.y -7 - ht, 'top');
      this.drawLineShape(this.startLeft.x,this.startLeft.y , this.endLeft.x, this.endLeft.y, 'middle');
      this.drawLineShape(this.startLeft.x,this.startLeft.y + 5, this.endLeft.x, this.endLeft.y + 7 + ht, 'bottom');
    }
    if((this.startRight.x > this.tileEndRight) && (this.startLeft.x < this.tileEndLeft)) {
      // stop this drawing function
      this.stop = true;
    }
  }

  drawVerticalLines() {
    if(this.startDown.y <= this.tileEndDown) {
      // you might want to clip region before drawing these lines
      let ht = Math.abs(this.startDown.y - this.endDown.y) / 40;
      this.endDown.y += 15;
      this.startDown.y += 5;
      this.drawLineShape(this.startDown.x - 5, this.startDown.y, this.endDown.x -7 - ht, this.endDown.y,'top');
      this.drawLineShape(this.startDown.x,this.startDown.y , this.endDown.x, this.endDown.y, 'middle');
      this.drawLineShape(this.startDown.x + 5,this.startDown.y, this.endDown.x + 7 + ht, this.endDown.y, 'bottom');
    }
    if(this.startTop.y >= this.tileEndTop) {
      let ht = Math.abs(this.startTop.y - this.endTop.y) / 40;
      this.endTop.y -= 15;
      this.startTop.y -= 5;
      this.drawLineShape(this.startTop.x - 5, this.startTop.y, this.endTop.x -7 - ht, this.endTop.y, 'top', true);
      this.drawLineShape(this.startTop.x,this.startTop.y , this.endTop.x, this.endTop.y, 'middle', true);
      this.drawLineShape(this.startTop.x + 5,this.startTop.y, this.endTop.x + 7 + ht, this.endTop.y, 'bottom', true);
    }
    if((this.startDown.y > this.tileEndDown) && (this.startTop.y < this.tileEndTop)) {
      // stop this drawing function
      this.stop = true;
    }
  }

  drawLines() {
    // this.context.clearRect(0, 0, this.context.canvas.width, this.context.canvas.height);
    if(this.horizontal == true) {
      this.drawHorizontalLines();
      return this.stop;
    } else {
      this.drawVerticalLines();
      return this.stop;
    }
  }

}

class SpecialEffects {
  constructor(parent, canvas) {
    this.context = canvas.getContext('2d');
    this.parent = parent;
  }

  drawScore(i, j, score, dx, dy) {
    let cor = this.parent.playArea.getTileCoordinates(this.parent.playArea.tiles[i][j]);
    let wide = this.context.measureText(score).width;
    let size = 35;
    this.context.font = size + 'px Berkshire Swash';
    this.context.fillStyle = 'rgb(254, 108, 108)';
    this.context.shadowColor = 'rgb(254, 108, 108)';
    this.context.shadowBlur = 10;
    this.context.fillText(score, cor.x - (wide / 2) + dx, cor.y + (size / 2) + dy);
  }

  drawFloatingScores(alpha, dt) {
    this.clearEffects();
    for(let i = 0; i < this.parent.playArea.scoresToDraw.length; i++) {
      this.context.save();
      this.context.globalAlpha = alpha;
      this.drawScore(this.parent.playArea.scoresToDraw[i][0], this.parent.playArea.scoresToDraw[i][1], this.parent.playArea.scoresToDraw[i][2], 0 , - (dt/50));
      this.context.restore();
    }
  }

  createLineAnimation(xCor,yCor, horizontal, type) {
    let endLeft = this.parent.playArea.x;
    let endRight = this.parent.playArea.x + this.parent.playArea.width;
    let endTop = this.parent.playArea.y;
    let endDown = this.parent.playArea.y + this.parent.playArea.height;
    let ends = [endLeft, endRight, endTop, endDown];
    // console.log('ends');
    // console.log(ends);

    this.lineAnimation = new StripedLineAnimation(xCor,yCor, horizontal, type, this.context, ends);
    return this.lineAnimation;
  }

  drawStar(x, y, r, p, m){
    this.context.save();
    this.context.beginPath();
    this.context.translate(x, y);
    this.context.moveTo(0,0-r);
    for (var i = 0; i < p; i++)
    {
        this.context.rotate(Math.PI / p);
        this.context.lineTo(0, 0 - (r*m));
        this.context.rotate(Math.PI / p);
        this.context.lineTo(0, 0 - r);
    }
    this.context.fillStyle = '#ffff1a';
    this.context.shadowColor = '#ffff00';
    this.context.shadowBlur = 40;
    this.context.fill();
    this.context.restore();
  }

  drawLightning(a, b, numLines) {

    let minSegmentLength = 5;
    let color = "rgb(163, 245, 245)";
    let roughness = 2;
    let maxDifference = 50;
    this.context.strokeStyle = color;
    this.context.shadowColor = color;

    this.context.fillStyle = color;
    this.context.lineWidth = 2;
    let render = (initial, final) => {
      this.context.globalCompositeOperation = "lighter";
      this.context.shadowBlur = 15;
      let lightning = createLightning(initial, final);
      this.context.beginPath();
      this.context.moveTo(lightning[0].x, lightning[0].y);
      for (let i = 0; i < lightning.length; i++) {
        this.context.lineTo(lightning[i].x, lightning[i].y);
      }
      this.context.stroke();
    }
    function createLightning(first,last) {
      let dx = Math.abs(first.x - last.x);
      let dy = Math.abs(first.y - last.y);
      let lightning = [];
      if(dy>=dx) {
        let segmentLength = Math.abs(first.y - last.y);
        lightning.push({x: first.x, y: first.y});
        lightning.push({x: last.x, y: last.y});
        let currDiff = dy / 10;
        while (segmentLength > minSegmentLength) {
          let newSegments = [];
          for (let i = 0; i < lightning.length - 1; i++) {
            let start = lightning[i];
            let end = lightning[i + 1];
            let midX = (start.x + end.x) / 2;
            let newX = midX + (Math.random() * 2 - 1) * currDiff;
            newSegments.push(start, {x: newX, y: (start.y + end.y) / 2});
          }

          newSegments.push(lightning.pop());
          lightning = newSegments;
          currDiff /= roughness;
          segmentLength /= 2;
        }
      } else {
        let segmentLength = Math.abs(first.x - last.x);
        lightning.push({x: first.x, y: first.y});
        lightning.push({x: last.x, y: last.y});
        let currDiff = dx / 10;
        while (segmentLength > minSegmentLength) {
          let newSegments = [];
          for (let i = 0; i < lightning.length - 1; i++) {
            let start = lightning[i];
            let end = lightning[i + 1];
            let midY = (start.y + end.y) / 2;
            let newY = midY + (Math.random() * 2 - 1) * currDiff;
            newSegments.push(start, {x: (start.x + end.x) / 2, y: newY});
          }
          newSegments.push(lightning.pop());
          lightning = newSegments;
          currDiff /= roughness;
          segmentLength /= 2;
        }
      }
      return lightning;
    }

    for(let i = 0; i < numLines; i++) {
      render(a, b);
    }

  }

  clearEffects() {
    this.context.clearRect(0, 0, this.context.canvas.width, this.context.canvas.height);
  }

}

class CandyZone {

  constructor(parent) {
    this.parent = parent;
    this.x = 300;
    this. y = 100;
    this.tileWidth = 50;
    this.tileHeight = 50;
    this.numRows = 6;
    this.numCols = 8;
    this.width = this.numCols * this.tileWidth;
    this.height = this.numRows * this.tileHeight;
    // this.backgrndColor = 'rgb(101, 154, 209)';
    this.backgrndColor = 'rgba(13, 60, 149, 0.63)';
    this.tiles = []; // tiles is a 2d array of all squares/tiles
    this.tileImages = ['./images/Yellow.png',
                       './images/Orange.png',
                       './images/Red.png',
                       './images/Purple.png',
                       './images/Blue.png',
                       './images/Green.png',
                       './images/Striped_yellow_h.png',
                       './images/Striped_orange_h.png',
                       './images/Striped_red_h.png',
                       './images/Striped_purple_h.png',
                       './images/Striped_blue_h.png',
                       './images/Striped_green_h.png',
                       './images/Striped_yellow_v.png',
                       './images/Striped_orange_v.png',
                       './images/Striped_red_v.png',
                       './images/Striped_purple_v.png',
                       './images/Striped_blue_v.png',
                       './images/Striped_green_v.png',
                       './images/Colour_bomb.png'];



    this.img1 = document.createElement('img');
    this.img2 = document.createElement('img');
    this.img3 = document.createElement('img');
    this.img4 = document.createElement('img');
    this.img5 = document.createElement('img');
    this.img6 = document.createElement('img');
    this.img7 = document.createElement('img');
    this.img8 = document.createElement('img');
    this.img9 = document.createElement('img');
    this.img10 = document.createElement('img');
    this.img11 = document.createElement('img');
    this.img12 = document.createElement('img');
    this.img13 = document.createElement('img');
    this.img14 = document.createElement('img');
    this.img15 = document.createElement('img');
    this.img16 = document.createElement('img');
    this.img17 = document.createElement('img');
    this.img18 = document.createElement('img');
    this.img19 = document.createElement('img');
    this.img1.src = './images/Yellow.png';
    this.img2.src = './images/Orange.png';
    this.img3.src = './images/Red.png';
    this.img4.src = './images/Purple.png';
    this.img5.src = './images/Blue.png';
    this.img6.src = './images/Green.png';
    this.img7.src = './images/Striped_yellow_h.png';
    this.img8.src = './images/Striped_orange_h.png';
    this.img9.src = './images/Striped_red_h.png';
    this.img10.src = './images/Striped_purple_h.png';
    this.img11.src = './images/Striped_blue_h.png';
    this.img12.src = './images/Striped_green_h.png';
    this.img13.src = './images/Striped_yellow_v.png';
    this.img14.src = './images/Striped_orange_v.png';
    this.img15.src = './images/Striped_red_v.png';
    this.img16.src = './images/Striped_purple_v.png';
    this.img17.src = './images/Striped_blue_v.png';
    this.img18.src = './images/Striped_green_v.png';
    this.img19.src = './images/Colour_bomb.png';

    this.loadedImages = [this.img1, this.img2, this.img3, this.img4, this.img5, this.img6, this.img7,
                        this.img8, this.img9, this.img10, this.img11, this.img12, this.img13, this.img14,
                        this.img15, this.img16, this.img17, this.img18, this.img19];

    this.matches = [];
    this.dragging = false;
    this.selectedOnce = false;
    // variable to store the selected tile
    this.selectedTile = new Tile();
    this.selectedImage = document.createElement('img');
    this.selectedRow = 0;
    this.selectedCol = 0;
    this.selectedPosX = 0;
    this.selectedPosY = 0;
    // variable to store the tile with which the user wants to swap the selectedTile
    this.swappingTile = new Tile();
    this.swappingRow = 0;
    this.swappingCol = 0;
    this.swapAllowed = false;
    this.swappingImage = document.createElement('img');

    this.dX = 0; // used for animation
    this.dY = 0;

    this.gameStates = ['initial', 'changing', 'stable'];
    this.gameState = this.gameStates[0];

    this.swappingState = false;
    this.firstSwap = true;

    this.tilesToAnimate = [];
    this.newTilesToAnimate = [];
    this.tilesAreFalling = false;
    this.tilesToStop = [];
    this.currentMove = [];

    this.specialCandyInserted = false;

    // I need a variable to start shifting tiles and start animation for special activation like
    // color bomb where match of at least three is not required.
    this.specialActivation = false;
    this.stripesToActivate = [];
    this.pauseTiles = false;

    this.lightningEffect = false;
    this.lightningOrigin = '';
    // this.lightningTiles = [];
    this.lightningTileCoordinates = [];

    this.stripeEffect = false;
    this.stripedAnimationList = [];

    this.fadeCandyList = [];

    this.scoreLightning = false;
    this.scoreStriped = false;
    this.stripesToScore = 0;

    this.scoresToDraw = [];
  }

  getRandomTiles() {
    // console.log('random tiles types');
    for (let i=0; i<this.numRows; i++) {
      for (let j=0; j<this.numCols; j++) {
        // Define a tile type and a shift parameter for animation
        // this.tiles[i][j].type = Math.floor(Math.random() * this.loadedImages.length);
        this.tiles[i][j].type = Math.floor(Math.random() * 6);
        this.tiles[i][j].row = i;
        this.tiles[i][j].column = j;
        // this.tiles[i][j].image = this.loadedImages[this.tiles[i][j].type];
      }
    }
  }

  // Remove matches and insert new tiles
  removeAllMatches() {
    // Check for matches
    this.findMatches();

    // While there are matches left
    while (this.matches.length > 0) {

      // Remove matches
      this.replaceMatches();

      if(this.gameState == 'changing') {
        // falling animation
        this.enableAnimatedFall();
      } else {
        // shift tiles without animation
        this.shiftTiles();
      }

      // Check if there are matches left
      this.findMatches();
    }

    // if(this.swappingState == false && this.tilesAreFalling == false) {
    //   this.gameState = 'stable';
    // }
  }

  swapTileTypes(tile1, tile2) {
      let temp = tile1.type;
      tile1.type = tile2.type;
      tile2.type = temp;
  }

  drawArea() {
    this.clearRegion(this.x, this.y, this.width, this.height)
  }

  drawSelectedBorder(row, column) {
    ctx.beginPath();
    ctx.strokeStyle = 'rgba(227, 229, 229, 0.8)';
    ctx.lineWidth = 3;
    ctx.strokeRect(this.x + column * this.tileWidth + 2, this.y + row * this.tileHeight + 2, this.tileWidth - 4, this.tileHeight - 4);
    ctx.closePath();
  }

  removeSelectedBorder(row, column) {
    this.clearRegion(this.x + column * this.tileWidth, this.y + row * this.tileHeight, this.tileWidth, this.tileHeight);
    let img = this.loadedImages[this.tiles[row][column].type];
    ctx.drawImage(img, this.x + column * this.tileWidth + 2, this.y + row * this.tileHeight + 2, this.tileWidth - 4, this.tileHeight - 4);
  }

  getTileCoordinates(tile) {
    let xCor = this.x + tile.column * this.tileWidth + this.tileWidth / 2;
    let yCor = this.y + tile.row * this.tileHeight + this.tileHeight / 2;
    return {x: xCor, y: yCor};
  }

  drawTiles() {
    this.drawArea();
    if(this.gameState == 'initial'){
      for (let i=0; i<this.numRows; i++) {
        for (let j=0; j<this.numCols; j++) {
          let img = document.createElement('img');
          if(this.tileImages[this.tiles[i][j].type] == undefined){
            console.log('tileImages', this.tiles[i][j].type, i, j, 'is undefined');
          } else {
            // img= this.loadedImages[this.tiles[i][j].type];
            // ctx.drawImage(img, this.x + j * this.tileWidth + 2, this.y + i * this.tileHeight + 2, this.tileWidth-4, this.tileHeight -4);
            img.src = this.tileImages[this.tiles[i][j].type];
          }
          img.onload = () => {
              ctx.drawImage(img, this.x + j * this.tileWidth + 2, this.y + i * this.tileHeight + 2, this.tileWidth-4, this.tileHeight -4);
          }
        }
      }
    } else {
      for (let i=0; i<this.numRows; i++) {
        for (let j=0; j<this.numCols; j++) {
          if(this.tileImages[this.tiles[i][j].type] == undefined){
            console.log('tileImages', this.tiles[i][j].type, i, j, 'is undefined');
          } else {
            let img= this.loadedImages[this.tiles[i][j].type];
            ctx.drawImage(img, this.x + j * this.tileWidth + 2, this.y + i * this.tileHeight + 2, this.tileWidth-4, this.tileHeight -4);
          }
        }
      }
    }

  }

  drawStaticCandy(tile) {
    let img = this.loadedImages[tile.type];
    let beginX = this.x + tile.column * this.tileWidth;
    let beginY = this.y + tile.row * this.tileHeight;
    this.clearRegion(beginX, beginY, this.tileWidth, this.tileHeight);
    ctx.drawImage(img, beginX + 2, beginY + 2, this.tileWidth -4, this.tileHeight - 4);
  }

  fadeCandy(tile, img, alpha) {
    // let img = this.loadedImages[tile.type];
    let beginX = this.x + tile.column * this.tileWidth;
    let beginY = this.y + tile.row * this.tileHeight;
    this.clearRegion(beginX, beginY, this.tileWidth, this.tileHeight);
    ctx.save();
    ctx.globalAlpha = alpha;
    ctx.drawImage(img, beginX + 2, beginY + 2, this.tileWidth -4, this.tileHeight - 4);
    ctx.restore();
  }

  fadeMultipleCandies(alpha) {
    // ctx.save();
    // ctx.globalAlpha = alpha;
    for(let i = this.fadeCandyList.length - 1; i >= 0; i--) {
      if(this.fadeCandyList[i][1] == -1) {
        this.fadeCandyList.splice(i,1);
      } else {
        let img = this.loadedImages[this.fadeCandyList[i][1]];
        this.fadeCandy(this.fadeCandyList[i][0], img, alpha);
      }
    }
    // ctx.restore();
  }

  clearCandy(tile) {
    // function to clear candy image and keep background only.
    ctx.beginPath();
    let beginX = this.x + (tile.column * this.tileWidth);
    let beginY = this.y + (tile.row * this.tileHeight);
    ctx.clearRect(beginX, beginY, this.tileWidth, this.tileHeight);
    ctx.fillStyle = this.backgrndColor;
    ctx.fillRect(beginX, beginY, this.tileWidth, this.tileHeight);
    ctx.closePath();
  }

  clearRegion(x, y, width, height) {
    ctx.beginPath();
    ctx.clearRect(x, y, width, height);
    ctx.fillStyle = this.backgrndColor;
    ctx.fillRect(x, y, width, height);
    ctx.closePath();
  }

  findMatches() {
    // Reset matches
    this.matches = []

    // Find horizontal matches
    for (let i=0; i<this.numRows; i++) {
      // Start checking first row from first column
      let matchLength = 1;
      for (let j=0; j<this.numCols; j++) {
        let evaluateMatchLength = false;

        if (j == this.numCols-1) {
          // Last column
          evaluateMatchLength = true;
        } else {
            // Check the type of the next tile
            if(((this.tiles[i][j].type == this.tiles[i][j+1].type) ||
              (this.tiles[i][j].type == this.tiles[i][j+1].type + 6) ||
              (this.tiles[i][j].type == this.tiles[i][j+1].type - 6) ||
              (this.tiles[i][j].type == this.tiles[i][j+1].type + 12) ||
              (this.tiles[i][j].type == this.tiles[i][j+1].type - 12))
              && (this.tiles[i][j].type != -1)) {
              matchLength++;
            } else {
              // Different type
              evaluateMatchLength = true;
            }
        }

        // Check if there was a match
        if (evaluateMatchLength) {
            if (matchLength >= 3) {
              // Found a horizontal match
              this.matches.push({ row:i, column: j+1-matchLength,
                length: matchLength, horizontal: true });
            }

            matchLength = 1;
        }
      }
    }

    // Find vertical matches
    for (let j=0; j<this.numCols; j++) {
        // Start with first column and first row
        let matchLength = 1;
        for (let i=0; i<this.numRows; i++) {
          let evaluateMatchLength = false;

          if (i == this.numRows-1) {
            // Last tile
            evaluateMatchLength = true;
          } else {
            // Check the type of the next tile
            if (((this.tiles[i][j].type == this.tiles[i+1][j].type) ||
            (this.tiles[i][j].type == this.tiles[i+1][j].type + 6) ||
            (this.tiles[i][j].type == this.tiles[i+1][j].type - 6) ||
            (this.tiles[i][j].type == this.tiles[i+1][j].type + 12) ||
            (this.tiles[i][j].type == this.tiles[i+1][j].type - 12))
             && (this.tiles[i][j].type != -1)) {
              // Same type as the previous tile, increase matchLength
              matchLength += 1;
            } else {
              // Different type
              evaluateMatchLength = true;
            }
          }

          // Check if there was a match
          if (evaluateMatchLength) {
            if (matchLength >= 3) {
              // Found a vertical match
              this.matches.push({ row:i+1-matchLength, column: j,
                              length: matchLength, horizontal: false });
            }

            matchLength = 1;
          }
      }
    }
  }

  replaceMatches() {
    // this function also defines shift for each tile.
    for(let i = 0; i < this.matches.length; i ++) {
      if(this.matches[i].horizontal == true) {
        let limit = this.matches[i].column + this.matches[i].length;
        let rowValue = this.matches[i].row;
        // push in scoresToDraw to display floating numbers inside the CandyZone
        if(this.matches[i].length == 3) {
          this.scoresToDraw.push([rowValue, limit - 2, '60']);
        } else if(this.matches[i].length == 4) {
          this.scoresToDraw.push([rowValue, limit - 3, '120']);
        } else if(this.matches[i].length >= 5) {
          let matchLen = this.matches[i].length;
          let score = (matchLen) * (matchLen - 1) * 10;
          this.scoresToDraw.push([rowValue, limit - Math.round(matchLen / 2) - 1, score + '']);
        }
        for(let index = (this.matches[i].column); index < limit; index ++) {
          // if you want different result in 4 matches with already striped candy, you'll have
          // to move below two if conditions inside if(length==4) and other conditions for other
          // lengths (5 and default(3)). Currently 6 matches is also color bomb.
          if((6 <= this.tiles[rowValue][index].type) && (this.tiles[rowValue][index].type <= 11)) {
            this.activateStriped(this.tiles[rowValue][index]);
            // above activate could be replaced by removeRow
            break;
          } else if((12 <= this.tiles[rowValue][index].type) && (this.tiles[rowValue][index].type <= 17)) {
            this.activateStriped(this.tiles[rowValue][index]);
            // above activate could be replaced by removeColumn
            // vertical stripe so don't break for horizontal match
          }
          if(this.matches[i].length == 4 && this.gameState != 'initial') {
            if(this.currentMove.indexOf(this.tiles[rowValue][index]) != -1) {
              console.log('4 match striped candy is ', rowValue, index);
              this.tiles[rowValue][index].type += 12;
              this.specialCandyInserted = true;
              // currently the program doesn't draw tiles that don't shift and that are not of type -1
              // so draw here because if you don't it won't change image to striped and you can only see
              // the change once you drawTiles() in the console
              this.drawStaticCandy(this.tiles[rowValue][index]);
            } else {
              if((index == limit - 1) && (this.specialCandyInserted == false)) {
                // none of the tiles in length 4 match were in current move so insert striped at third position
                this.tiles[rowValue][index - 1].type = this.tiles[rowValue][index].type + 12;
                // Also you need to draw striped candy just like above.
                this.drawStaticCandy(this.tiles[rowValue][index - 1]);
                // finally change the last tile's type to -1.
                this.fadeCandyList.pop();
                this.fadeCandyList.push([this.tiles[rowValue][index], this.tiles[rowValue][index].type]);
                this.tiles[rowValue][index].type = -1;
              } else {
                this.fadeCandyList.push([this.tiles[rowValue][index], this.tiles[rowValue][index].type]);
                this.tiles[rowValue][index].type = -1;
              }
            }
          } else if(this.matches[i].length >= 5 && this.gameState != 'initial'){
            if(this.currentMove.indexOf(this.tiles[rowValue][index]) != -1) {
              this.tiles[rowValue][index].type = 18;
              this.specialCandyInserted = true;
              this.drawStaticCandy(this.tiles[rowValue][index]);
            } else {
              if((index == limit - 1) && (this.specialCandyInserted == false)) {
                // none of the tiles in length 5 match were in current move so insert colour-bomb at fourth position
                this.tiles[rowValue][index - 1].type = 18;
                // Also you need to draw striped candy just like above.
                this.drawStaticCandy(this.tiles[rowValue][index - 1]);
                // finally change the last tile's type to -1.
                this.fadeCandyList.pop();
                this.fadeCandyList.push([this.tiles[rowValue][index], this.tiles[rowValue][index].type]);
                // by adding fadeCandyList, now you have to remove (rowValue, index-1) tile from fadeCandyList
                // or else special candy will be overriden by fading non-striped candy.
                this.tiles[rowValue][index].type = -1;
              } else {
                this.fadeCandyList.push([this.tiles[rowValue][index], this.tiles[rowValue][index].type]);
                this.tiles[rowValue][index].type = -1;
              }
            }
          } else {
            if(this.gameState != 'initial') {
              this.fadeCandyList.push([this.tiles[rowValue][index], this.tiles[rowValue][index].type]);
            }
            this.tiles[rowValue][index].type = -1;
          }
        }
      }
      else {
        // this is vertical match
        let limit = this.matches[i].row + this.matches[i].length;
        let colValue = this.matches[i].column;
        if(this.matches[i].length == 3) {
          this.scoresToDraw.push([limit - 2, colValue, '60']);
        } else if(this.matches[i].length == 4) {
          this.scoresToDraw.push([limit - 3, colValue, '120']);
        } else if(this.matches[i].length >= 5) {
          let matchLen = this.matches[i].length;
          let score = (matchLen) * (matchLen - 1) * 10;
          this.scoresToDraw.push([limit - Math.round(matchLen / 2) - 1, colValue, score + '']);
        }
        for(let index = (this.matches[i].row); index < limit; index ++) {
          if((6 <= this.tiles[index][colValue].type) && (this.tiles[index][colValue].type <= 11)) {
            this.activateStriped(this.tiles[index][colValue]);
            // above activate could be replaced by removeRow
            // horizontal stripe so don't break for vertical match
          } else if((12 <= this.tiles[index][colValue].type) && (this.tiles[index][colValue].type <= 17)) {
            this.activateStriped(this.tiles[index][colValue]);
            // above activate could be replaced by removeColumn
            break;
          }
          if(this.matches[i].length == 4 && this.gameState != 'initial') {
            if(this.currentMove.indexOf(this.tiles[index][colValue]) != -1) {
              console.log('4 match striped candy is ', index, colValue);
              this.tiles[index][colValue].type += 6;
              this.specialCandyInserted = true;
              // draw that image now
              this.drawStaticCandy(this.tiles[index][colValue]);
            } else {
              if((index == limit - 1) && (this.specialCandyInserted == false)) {
                // none of the tiles in length 4 match were in current move so insert striped at third position
                this.tiles[index - 1][colValue].type = this.tiles[index][colValue].type + 6;
                this.drawStaticCandy(this.tiles[index - 1][colValue]);
                this.fadeCandyList.push([this.tiles[index][colValue], this.tiles[index][colValue].type]);
                this.tiles[index][colValue].type = -1;
              } else {
                this.fadeCandyList.push([this.tiles[index][colValue], this.tiles[index][colValue].type]);
                this.tiles[index][colValue].type = -1;
              }
            }
          } else if(this.matches[i].length >= 5 && this.gameState != 'initial'){
            if(this.currentMove.indexOf(this.tiles[index][colValue]) != -1) {
              this.tiles[index][colValue].type = 18;
              this.specialCandyInserted = true;
              this.drawStaticCandy(this.tiles[index][colValue]);
            } else {
              if((index == limit - 1) && (this.specialCandyInserted == false)) {
                // none of the tiles in length 5 match were in current move so insert colour-bomb at fourth position
                this.tiles[index - 1][colValue].type = 18;
                // Also you need to draw striped candy just like above.
                this.drawStaticCandy(this.tiles[index - 1][colValue]);
                // finally change the last tile's type to -1.
                this.fadeCandyList.push([this.tiles[index][colValue], this.tiles[index][colValue].type]);
                this.tiles[index][colValue].type = -1;
              } else {
                this.fadeCandyList.push([this.tiles[index][colValue], this.tiles[index][colValue].type]);
                this.tiles[index][colValue].type = -1;
              }
            }
          } else {
            if(this.gameState != 'initial') {
              this.fadeCandyList.push([this.tiles[index][colValue], this.tiles[index][colValue].type]);
            }
            this.tiles[index][colValue].type = -1;
          }
        }
      }
      this.specialCandyInserted = false;
    }

    // empty currentMove here as currently currentMove is not used elsewhere
    this.currentMove = [];

    // Calculate how much a tile should be shifted downwards
    for (let j=0; j<this.numCols; j++) {
      let shift = 0;
      for (let i=this.numRows-1; i>=0; i--) {
        // Loop from bottom-row to top-row of jth column
        if (this.tiles[i][j].type == -1) {
          // Tile is to be removed, increase shift for tiles above it
          shift++;
          this.tiles[i][j].shift = 0;
        } else {
          // Set the shift
          this.tiles[i][j].shift = shift;
        }
      }
    }
  }

  shiftTiles() {
    for(let j = 0; j < this.numCols; j++) {
      // let rowsShifted = false;
      let newTiles = 0;
      for(let i = this.numRows - 1; i >= 0; i--) {
        if(this.tiles[i][j].type != -1) {
          let tileShift = this.tiles[i][j].shift;
          if(this.tiles[i][j].shift > 0) {
            // rowsShifted = true;
            this.tiles[i+tileShift][j].type = this.tiles[i][j].type;
          }
        } else if(this.tiles[i][j].type == -1) {
          newTiles++;
        }
        // Reset shift
        this.tiles[i][j].shift = 0;
      }
      if(newTiles > 0) {
        for( let i = 0; i < newTiles; i++){
          // this.tiles[i][j].type = Math.floor(Math.random() * this.loadedImages.length);
          this.tiles[i][j].type = Math.floor(Math.random() * 6);
        }
      }
      // this.drawTiles();
    }
    // this.drawTiles();
  }

  enableAnimatedFall() {
    for(let j = 0; j < this.numCols; j++) {
      let newTiles = 0;
      for(let i = this.numRows - 1; i >= 0; i--) {
        if(this.tiles[i][j].type != -1) {
          let tileShift = this.tiles[i][j].shift;
          if(this.tiles[i][j].shift > 0) {
            this.tiles[i+tileShift][j].type = this.tiles[i][j].type;
            //animation start for that tile
            let shiftValue = this.tiles[i][j].shift;
            this.tiles[i][j].shift = 0;
            this.tilesToAnimate.push([this.tiles[i][j], shiftValue, this.tiles[i][j].type]);
            // this.tilesAreFalling = true;
            this.gameState = 'changing';
            // animateTileFall(this.tiles[i][j], shiftValue);
          }
        } else if(this.tiles[i][j].type == -1) {
          this.tilesAreFalling = true;
          // let newType = Math.floor(Math.random() * this.tileImages.length);
          let newType = Math.floor(Math.random() * 6);
          // this.tiles[newTiles][j].type = newType;
          this.tiles[i][j].shift = - (newTiles+1);
          // give row number 'i' as the shift value
          let destinationRow = newTiles;
          // this.newTilesToAnimate.push([this.tiles[i][j], 0, newType, destinationColumn]);
          this.newTilesToAnimate = [[this.tiles[i][j], 0, newType, destinationRow]].concat(this.newTilesToAnimate);
          newTiles++;
          // clear matched tiles with background fill
          this.clearCandy(this.tiles[i][j]);
        }
        // Reset shift
        // this.tiles[i][j].shift = 0;
      }
      if(newTiles > 0) {
        for( let i = 0; i < newTiles; i++){
          // give row number 'i' as the shift value
          this.newTilesToAnimate[i][0].shift = -(newTiles + i);
        }

        // you need to pause a little so that you can see the emptied tiles
        this.pauseTiles = true;
      }
    }
  }

  animateTileFall() {
    ctx.save();
    ctx.rect(this.x, this.y, this.width, this.height);
    ctx.clip();

    if((this.tilesToAnimate.length == 0) && (this.newTilesToAnimate.length == 0)) {
      this.tilesAreFalling = false;
      this.specialActivation = false;
      return;
    }

    for(let i = 0; i < this.tilesToAnimate.length; i++) {
      let beginX = this.x + (this.tilesToAnimate[i][0].column * this.tileWidth);
      let beginY = this.y + (this.tilesToAnimate[i][0].row * this.tileHeight);
      let img = this.loadedImages[this.tilesToAnimate[i][2]];
      let thisTile = this.tilesToAnimate[i][0];
      let thisShift = this.tilesToAnimate[i][1];
      // above two variables needed because for some reason i got error of cannot read property 0 of undefined and property 1 of undefined. this may be due to splicing.

      if(thisTile.shift > thisShift) {
        this.clearRegion(beginX, beginY + Math.round(thisTile.shift * this.tileHeight), this.tileWidth, this.tileHeight);
        ctx.drawImage(img, beginX + 2, beginY + thisShift * this.tileHeight + 2, this.tileWidth - 4, this.tileHeight - 4);
        this.tilesToStop.push(i);
      } else {
        this.clearRegion(beginX, beginY + Math.round(thisTile.shift * this.tileHeight), this.tileWidth, this.tileHeight);
        ctx.drawImage(img, beginX + 2, beginY + 4 + thisTile.shift * this.tileHeight, this.tileWidth - 4, this.tileHeight - 4);
        thisTile.shift += 0.08;
      }
    }

    this.tilesToStop.sort(reverseSort);
    for(let i = 0; i < this.tilesToStop.length; i++) {
      this.tilesToAnimate.splice(this.tilesToStop[i], 1);
    }
    this.tilesToStop = [];

    for(let i = 0; i < this.newTilesToAnimate.length; i++) {
      let beginX = this.x + (this.newTilesToAnimate[i][0].column * this.tileWidth);
      let beginY = this.y + (this.newTilesToAnimate[i][3] * this.tileHeight);
      let img = this.loadedImages[this.newTilesToAnimate[i][2]];
      let thisType = this.newTilesToAnimate[i][2];
      let thisTile = this.newTilesToAnimate[i][0];
      let thisShift = this.newTilesToAnimate[i][1];
      let thisDestinationRow = this.newTilesToAnimate[i][3];
      // above two variables needed because for some reason i got error of cannot read property 0 of undefined and property 1 of undefined. this may be due to splicing.

      if(thisTile.shift > thisShift) {
        this.tiles[thisDestinationRow][thisTile.column].type = thisType;
        this.clearRegion(beginX, beginY + Math.round(thisTile.shift * this.tileHeight), this.tileWidth, this.tileHeight);
        ctx.drawImage(img, beginX + 2, this.y + thisDestinationRow * this.tileHeight + 2, this.tileWidth-4, this.tileHeight -4);
        this.tilesToStop.push(i);
      } else {
        this.clearRegion(beginX, beginY + Math.round(thisTile.shift * this.tileHeight), this.tileWidth, this.tileHeight);
        ctx.drawImage(img, beginX + 2, beginY + 4 + thisTile.shift * this.tileHeight, this.tileWidth - 4, this.tileHeight - 4);
        thisTile.shift += 0.08;
      }
    }

    this.tilesToStop.sort(reverseSort);
    for(let i = 0; i < this.tilesToStop.length; i++) {
      this.newTilesToAnimate.splice(this.tilesToStop[i], 1);
    }
    this.tilesToStop = [];

    ctx.restore();

  }

  canMove() {
    // Reset moves
    this.possibleMove = {};

    // Check horizontal moves
    for(let i = 0; i < this.numRows; i++) {
      for(let j = 0; j < this.numCols - 1; j++) {
        this.swapTileTypes(this.tiles[i][j], this.tiles[i][j+1]);
        this.findMatches();
        this.swapTileTypes(this.tiles[i][j], this.tiles[i][j+1]);

        if(this.matches.length > 0) {
          this.possibleMove = {tile1: this.tiles[i][j], tile2: this.tiles[i][j+1],
                                matchLength: this.matches[0].length, horizontal: true};
          // matchLength could be used to indicate the tiles that will form a match in future.
          // Reset matches
          this.matches = [];
          return true;
          // this implies that our game will first search for horizontal moves and if not found only
          // then move on to vertical moves.
        }
      }
    }

    // Check vertical moves
    for(let j = 0; j < this.numCols; j++) {
      for(let i = 0; i < this.numRows - 1; i++) {
        this.swapTileTypes(this.tiles[i][j], this.tiles[i+1][j]);
        this.findMatches();
        this.swapTileTypes(this.tiles[i][j], this.tiles[i+1][j]);

        if(this.matches.length > 0) {
          this.possibleMove = {tile1: this.tiles[i][j], tile2: this.tiles[i+1][j],
                                matchLength: this.matches[0].length, horizontal: false};
          // matchLength could be used to indicate the tiles that will form a match in future.
          this.matches = [];
          return true;
        }
      }
    }
    return false;
  }

  getMousePosition(canvas, event) {
    let self = this;
    let rect = canvas.getBoundingClientRect();
    return {x: event.clientX - rect.left - self.x, y: event.clientY - rect.top - self.y};
  }

  removeType(tile) {
    let thisType = tile.type;
    for(let i = 0; i < this.numRows; i++) {
      for(let j = 0; j < this.numCols; j++) {
        if(this.tiles[i][j].type == thisType) {
          if(this.gameState != 'initial') {
            this.fadeCandyList.push([this.tiles[i][j], this.tiles[i][j].type]);
          }
          this.tiles[i][j].type = -1;
          // this.lightningTiles.push(this.tiles[i][j]);
          let coordinate = this.getTileCoordinates(this.tiles[i][j]);
          this.lightningTileCoordinates.push(coordinate);
        }
      }
    }
  }

  removeRow(row) {
    for(let i = 0; i < this.numCols; i++) {
      if((12 <= this.tiles[row][i].type) && (this.tiles[row][i].type <= 17)) {
        // a vertical striped candy
        // this.removeColumn(i);
        this.activateStriped(this.tiles[row][i]);
      } else {
        if(this.gameState != 'initial') {
          this.fadeCandyList.push([this.tiles[row][i], this.tiles[row][i].type]);
        }
        this.tiles[row][i].type = -1;
      }
    }
  }

  removeColumn(column) {
    for(let j=0; j < this.numRows; j++) {
      if((6 <= this.tiles[j][column].type) && (this.tiles[j][column].type <= 11)) {
        // a horizontal striped candy
        // this.removeRow(j);
        this.activateStriped(this.tiles[j][column]);
      } else {
        if(this.gameState != 'initial') {
          this.fadeCandyList.push([this.tiles[j][column], this.tiles[j][column].type]);
        }
        this.tiles[j][column].type = -1;
      }
    }
  }

  replaceWithStriped(tile) {
    let thisType = tile.type;
    let del = 0;
    let sign = 1;
    let alternate = false;
    if(thisType >= 12) {
      // vertical stripe
      del = 12;
      sign = -1;
    } else {
      // horizontal stripe
      del = 6;
      sign = 1;
    }
    for(let i = 0; i < this.numRows; i++) {
      for(let j = 0; j < this.numCols; j++) {
        if(this.tiles[i][j].type == thisType - del) {
          alternate = !alternate;
          if(alternate == true) {
            this.tiles[i][j].type = thisType;
          } else {
            this.tiles[i][j].type = thisType + sign * 6;
          }
          this.drawStaticCandy(this.tiles[i][j]);
          // this.activateStriped(this.tiles[i][j]);
          // this.stripesToScore++;
          this.stripesToActivate.push(this.tiles[i][j]);
        }
      }
    }
    for(let i = 0; i < this.stripesToActivate.length; i++) {
      this.activateStriped(this.stripesToActivate[i]);
    }
    this.pauseTiles = true;
    // finally remove current striped tile as it won't be activateStriped
    if(this.gameState != 'initial') {
      this.fadeCandyList.push([tile, tile.type]);
    }
    tile.type = -1;
  }

  activateStriped(tile) {
    this.scoreStriped = true;
    this.stripesToScore++;
    if((6 <= tile.type) && (tile.type <= 11)) {
      let typ = tile.type;
      //horizontal striped candy. remove all candies in this row
      this.removeRow(tile.row);
      this.stripeEffect = true;
      let coordinate = this.getTileCoordinates(tile);
      this.stripedAnimationList.push({point: coordinate, horizontal: true, type: (typ - 6)});
    }
    if((12 <= tile.type) && (tile.type <= 17)) {
      let typ = tile.type;
      // vertical striped candy.
      this.removeColumn(tile.column);
      this.stripeEffect = true;
      let coordinate = this.getTileCoordinates(tile);
      this.stripedAnimationList.push({point: coordinate, horizontal: false, type: (typ - 12)});
    }
  }

  // activateMultipleStriped(tile) {
  //
  // }

  destroyAllCandies() {
    for(let i = 0; i < this.numRows; i++) {
      for(let j = 0; j < this.numCols; j++) {
        this.fadeCandyList.push([this.tiles[i][j], this.tiles[i][j].type]);
        this.tiles[i][j].type = -1;
      }
    }
  }

  // prepareForLightning() {
  //   for(let i = 0; i < this.lightningTiles.length; i++) {
  //     let coordinate = this.getTileCoordinates(this.lightningTiles[i]);
  //     this.lightningTileCoordinates.push(coordinate);
  //   }
  // }

  activateColorBomb(bombTile, otherTile) {
    this.fadeCandyList.push([bombTile, bombTile.type]);
    bombTile.type = -1;
    // Now check if another candy is normal candy
    if((0 <= otherTile.type) && (otherTile.type <= 5)) {
      this.lightningOrigin = this.getTileCoordinates(bombTile);
      this.removeType(otherTile);
      // this.prepareForLightning();
      this.lightningEffect = true;
      this.scoreLightning = true;
    } else if((6 <= otherTile.type) && (otherTile.type<= 17)) {
      console.log('swapped with striped');
      this.replaceWithStriped(otherTile);
      // this.activateStriped(otherTile);
    } else if(otherTile.type == 18) {
      // both are colorbomb so destroy all tiles
      this.destroyAllCandies();
    }
    // this.colorBombAnimation(bombTile, otherTile);
  }

  animateSwap(tile1, tile2) {
    let endSwap = () => {
      this.swappingState = false;
      this.dX = 0;
      this.dY = 0;
    }
    let checkTwoTiles = () => {
      if(tile1.type == 18) {
        this.activateColorBomb(tile1, tile2);

        this.firstSwap = true;
        this.specialActivation = true;
        // the move is valid as match was found so store the move.
        this.currentMove = [tile1, tile2];
        // this move needs to be reset after all effects are done
        endSwap();
      } else if(tile2.type == 18) {
        this.activateColorBomb(tile2, tile1);

        this.firstSwap = true;
        this.specialActivation = true;
        // the move is valid as match was found so store the move.
        this.currentMove = [tile1, tile2];
        // this move needs to be reset
        endSwap();
      } else if(((6 <= tile1.type) && (tile1.type <= 17)) && ((6 <= tile2.type) && (tile2.type <= 17))) {
        // both are striped candies
        if(((6 <= tile1.type) && (tile1.type <= 11)) && ((12 <= tile2.type) && (tile2.type <= 17))) {
          // this.removeRow(tile1.row);
          // this.removeColumn(tile2.column);
          this.activateStriped(tile1);
          this.activateStriped(tile2);
        } else if(((6 <= tile2.type) && (tile2.type <= 11)) && ((12 <= tile1.type) && (tile1.type <= 17))) {
          this.activateStriped(tile1);
          this.activateStriped(tile2);
        } else {
          // if both of same stripe-direction randomly remove row and column
          let choose = Math.floor(Math.random() * 2); // generate 0 or 1
          if(choose == 0) {
            let typ1 = tile1.type;
            let typ2 = tile2.type;
            if(typ1 >=12) {
              typ1 = typ1 - 12;
            } else if(6 <= typ1 <=11) {
              typ1 = typ1 - 6;
            }
            //horizontal striped candy. remove all candies in this row
            this.removeRow(tile1.row);
            this.stripeEffect = true;
            let coordinate = this.getTileCoordinates(tile1);
            this.stripedAnimationList.push({point: coordinate, horizontal: true, type: typ1});
            if(typ2 >=12) {
              typ2 = typ2 - 12;
            } else if(6 <= typ2 <=11) {
              typ2 = typ2 - 6;
            }
            // vertical striped candy.
            this.removeColumn(tile2.column);
            this.stripeEffect = true;
            coordinate = this.getTileCoordinates(tile2);
            this.stripedAnimationList.push({point: coordinate, horizontal: false, type: typ2});
          } else {
            let typ2 = tile2.type;
            let typ1 = tile1.type;
            if(typ2 >=12) {
              typ2 = typ2 - 12;
            } else if(6 <= typ2 <=11) {
              typ2 = typ2 - 6;
            }
            this.removeRow(tile2.row);
            this.stripeEffect = true;
            let coordinate = this.getTileCoordinates(tile2);
            this.stripedAnimationList.push({point: coordinate, horizontal: true, type: typ2});
            if(typ1 >=12) {
              typ1 = typ1 - 12;
            } else if(6 <= typ1 <=11) {
              typ1 = typ1 - 6;
            }
            this.removeColumn(tile1.column);
            this.stripeEffect = true;
            coordinate = this.getTileCoordinates(tile1);
            this.stripedAnimationList.push({point: coordinate, horizontal: false, type: typ1});
          }
        }
        this.firstSwap = true;
        this.specialActivation = true;
        // the move is valid as match was found so store the move.
        this.currentMove = [tile1, tile2];
        // this move needs to be reset
        endSwap();
      } else {
        if(this.firstSwap == true) {
          this.firstSwap = false;
          this.findMatches();
          if (this.matches.length == 0) {
            // swap animation is again needed here
            this.dX = 0;
            this.dY = 0;
            this.gameState = 'changing';
            this.swappingState = true;
          } else {
            this.firstSwap = true;
            // the move is valid as match was found so store the move.
            this.currentMove = [tile1, tile2];
            // this move needs to be reset
            endSwap();
          }
        } else if(this.firstSwap == false) {
          this.firstSwap = true;
          // console.log('final swap');
          endSwap();
        }
      }
    }

    this.clearCandy(tile1);
    this.clearCandy(tile2);
    // here clearRegion is not used because, we wouldn't see overlapping candies.

    let beginX1 = this.x + (tile1.column * this.tileWidth);
    let beginY1 = this.y + (tile1.row * this.tileHeight);
    let beginX2 = this.x + (tile2.column * this.tileWidth);
    let beginY2 = this.y + (tile2.row * this.tileHeight);

    if(tile1.row == tile2.row) {
      // horizontal swapping
      let direction = tile2.column - tile1.column;
      ctx.drawImage(this.selectedImage, beginX1 + 2 + this.dX * direction, beginY1 + 2, this.tileWidth-4, this.tileHeight -4);
      ctx.drawImage(this.swappingImage, beginX2 + 2 - this.dX * direction, beginY2 + 2, this.tileWidth-4, this.tileHeight -4);
      this.dX += this.tileWidth / 20;
      if(this.dX >= this.tileWidth + 2) {
        //finally swapTileTypes and selected and swapping images
        this.swapTileTypes(tile1, tile2);
        let temp = this.swappingImage;
        this.swappingImage = this.selectedImage;
        this.selectedImage = temp;
        checkTwoTiles();
      }
    }

    if(tile1.column == tile2.column) {
      // vertical swapping
      let direction = tile2.row - tile1.row;
      ctx.drawImage(this.selectedImage, beginX1 + 2, beginY1 + 2 + this.dY * direction, this.tileWidth-4, this.tileHeight -4);
      ctx.drawImage(this.swappingImage, beginX2 + 2, beginY2 + 2 - this.dY * direction, this.tileWidth-4, this.tileHeight -4);
      this.dY += this.tileHeight / 20;
      if(this.dY >= this.tileWidth + 2) {
        this.swapTileTypes(tile1, tile2);
        let temp = this.swappingImage;
        this.swappingImage = this.selectedImage;
        this.selectedImage = temp;
        checkTwoTiles();
      }
    }
  }

  init() {
    // Initialize the two-dimensional tile array
    for (let i=0; i<this.numRows; i++) {
      this.tiles[i] = [];
      for (let j=0; j<this.numCols; j++) {
        this.tiles[i][j] = new Tile();
      }
    }

    // add event listeners
    canvas.onmousedown = (event) => {
      if(this.gameState == 'stable') {

          let pos = this.getMousePosition(canvas, event);
          if((pos.x >= 0) && (pos.y >= 0) && (pos.x < this.width) && (pos.y <= this.height)) {
            if(this.selectedOnce == false) {
              this.selectedOnce = true;
              this.dragging = true;
              this.selectedCol = Math.floor(pos.x / this.tileWidth);
              this.selectedRow = Math.floor(pos.y / this.tileHeight);
              this.selectedPosX = pos.x;
              this.selectedPosY = pos.y;
              this.selectedTile = this.tiles[this.selectedRow][this.selectedCol];
              this.selectedImage = this.loadedImages[this.selectedTile.type];
              this.drawSelectedBorder(this.selectedTile.row, this.selectedTile.column);
            } else {
              this.selectedOnce = false;
              let newCol = Math.floor(pos.x / this.tileWidth);
              let newRow = Math.floor(pos.y / this.tileHeight);

              if(((Math.abs(newCol - this.selectedTile.column) == 1) && (Math.abs(newRow - this.selectedTile.row) == 0))
                || ((Math.abs(newRow - this.selectedTile.row) == 1) && (Math.abs(newCol - this.selectedTile.column) == 0))) {

                  this.swappingTile = this.tiles[newRow][newCol];
                  this.swappingImage = this.loadedImages[this.swappingTile.type];

                  this.gameState = 'changing';
                  this.swappingState = true;
                  // this will start animateSwap function from the main loop.
                  this.removeSelectedBorder(this.selectedTile.row, this.selectedTile.column);
              } else {
                this.removeSelectedBorder(this.selectedTile.row, this.selectedTile.column);
                this.selectedOnce = true;
                this.dragging = true;
                this.selectedCol = Math.floor(pos.x / this.tileWidth);
                this.selectedRow = Math.floor(pos.y / this.tileHeight);
                this.selectedPosX = pos.x;
                this.selectedPosY = pos.y;
                this.selectedTile = this.tiles[this.selectedRow][this.selectedCol];
                this.selectedImage = this.loadedImages[this.selectedTile.type];
                this.drawSelectedBorder(this.selectedTile.row, this.selectedTile.column);
              }
            }

          }
      }
    }

    canvas.onmouseup = (event) => {
      if(this.gameState == 'stable'){
        let pos = this.getMousePosition(canvas, event);
        if((pos.x >= 0) && (pos.y >= 0) && (pos.x < this.width) && (pos.y <= this.height)) {
          this.dragging = false;
        }
      }
    }

    // canvas.onmousemove = (event) => {
    //   if(this.gameState == 'stable') {
    //     if(this.dragging == true) {
    //       let pos = this.getMousePosition(canvas, event);
    //       if((pos.x >= 0) && (pos.y >= 0) && (pos.x < this.width) && (pos.y <= this.height)) {
    //         let col = Math.floor(pos.x / this.tileWidth);
    //         let row = Math.floor(pos.y / this.tileHeight);
    //         ctx.beginPath();
    //         ctx.fillStyle = this.backgrndColor;
    //         let beginX = this.x + (this.selectedCol * this.tileWidth);
    //         let beginY = this.y + (this.selectedRow * this.tileHeight)
    //         ctx.clearRect(beginX, beginY, this.tileWidth, this.tileHeight);
    //         ctx.fillRect(beginX, beginY, this.tileWidth, this.tileHeight);
    //         let dX = pos.x - this.selectedPosX;
    //         let dY = pos.y - this.selectedPosY;
    //         if(dX > ((this.tileWidth - 2) / 2)) {
    //           console.log('switch')
    //         }
    //
    //         // this.drawTiles();
    //         // ctx.drawImage(this.selectedImage, beginX + 2 + dX, beginY + 2 + dY, this.tileWidth-4, this.tileHeight -4);
    //         ctx.closePath();
    //         // console.log('moving co-ordinates');
    //         // console.log(pos.x, pos.y);
    //         // console.log(row, col);
    //       }
    //     }
    //   }
    // }
  }


}


class GameWorld {
  constructor(){
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
        ctx.beginPath();
        ctx.fillStyle = this.header.background;
        // ctx.fillStyle = 'red';
        ctx.fillRect(this.x + this.header.x, this.y + this.header.y, this.header.width, this.header.height);
        ctx.fillStyle = this.header.textColor;
        //
		    // let newFont = new FontFace('Berkshire Swash', 'url("https://fonts.googleapis.com/css?family=Berkshire+Swash")');
        // newFont.load().then(() => {
        //   //Ready to use the font in a canvas context
		    //   ctx.font = '20px Berkshire Swash';
        //   ctx.fillText('Score: ' + this.score, this.x + this.header.x + 20, this.y + this.header.y + this.header.height - 15);
        //   // y coordinate for filltext is the bottom of text not top.
        //   ctx.fillText('Level: ' + this.level, this.x + this.header.x + 300, this.y + this.header.y + this.header.height - 15);
        //   ctx.closePath();
	      // });

        // ctx.font = '20px serif';
        // ctx.font = '20px Atomic Age';
        ctx.font = '22px Berkshire Swash';
        // ctx.font = '20px Pacifico';
        // ctx.font = '20px Lobster';

        ctx.fillText('Score: ' + this.score, this.x + this.header.x + 20, this.y + this.header.y + this.header.height - 15);
        // y coordinate for filltext is the bottom of text not top.
        ctx.fillText('Level: ' + this.level, this.x + this.header.x + 300, this.y + this.header.y + this.header.height - 15);
        ctx.closePath();
      }
    };

    this.displayScoreDebugNumber = 20;
    this.levelCompleted = false;
    this.upperCanvas = '';
    this.upCanvasPresent = false;
    this.spEffect = '';

    this.pauseCounter = 0;
    this.lastInstance = 0;
    this.dt = 0;

    this.stripedLineList = [];
    this.stripedLineEffect = false;

  }

  drawButton(button) {
    ctx.beginPath();
    ctx.fillStyle = button.backgroundColor;
    ctx.fillRect(button.x, button.y, button.width, button.height);
    ctx.fillStyle = button.textColor;
    // ctx.font = button.fontProperties;
    ctx.fillText(button.text, button.x + (button.width - ctx.measureText(button.text).width) / 2, button.y + 25);
  }

  displayScore() {
    ctx.restore();
    // ctx.rect(0, 0, canvas.width, canvas.height);
    //
    // ctx.clip();
    this.displayScoreDebugNumber += 10;
    ctx.beginPath();
    ctx.fillStyle = this.header.background;
    ctx.fillRect(this.x + this.header.x, this.y + this.header.y, 200, this.header.height);
    ctx.closePath();

    ctx.fillStyle = this.header.textColor;
    let text = 'Score: ' + this.score;
    ctx.fillText(text, this.x + this.header.x + 20, this.y + this.header.y + this.header.height - 15);
    // console.log(text, this.x + this.header.x + 20, this.y + this.header.y + this.header.height - 15);
    // console.log(text);
  }

  scoreAllRemoved() {
    for(let i = 0; i < this.playArea.numRows; i++) {
      for(let j = 0; j < this.playArea.numCols; j++) {
        if(this.playArea.tiles[i][j].type == -1) {
          this.score += 60;
        }
      }
    }
  }

  updateScore() {

    if(this.playArea.scoreLightning == true) {
      this.score += 300;
      this.scoreAllRemoved();
      this.playArea.scoreLightning = false;
    } else if(this.playArea.scoreStriped == true) {
      this.score += 100 * this.playArea.stripesToScore;
      this.scoreAllRemoved();
      this.playArea.scoreStriped = false;
      this.playArea.stripesToScore = 0;
    } else {
      for(let i = 0; i < this.playArea.matches.length; i++) {
        let matchLen = this.playArea.matches[i].length;
        this.score += (matchLen) * (matchLen - 1) * 10;
      }
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

    this.spEffect = new SpecialEffects(this, this.upperCanvas);

    // New game
    this.newGame();

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
  main(time) {
      // Request animation frames
      let self = this;
      var animationID = window.requestAnimationFrame((time) => {
        self.main(time);
      });
      // if i directly pass self.main inside requestAnimationFrame it won't work.
      // I had to keep self.main() inside a function(){}, for some reason.

      // console.log('time: ',time);

      // codes that could update/change state of game go here

      if((this.playArea.tilesAreFalling == false) && (this.playArea.pauseTiles == false)) {
        if(this.playArea.swappingState == true) {
          this.playArea.animateSwap(this.playArea.selectedTile, this.playArea.swappingTile);
        }
      }

      if((this.playArea.swappingState == false && this.playArea.tilesAreFalling == false)
        && (this.playArea.pauseTiles == false) && (this.playArea.lightningEffect == false)) {
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
            canvas.onmousedown = (event) => {
              // do nothing for now
            }
          }
          if(this.playArea.canMove() == false) {
            console.log('no move left need to reshuffle the tiles');
            // this.gameOver = true;
            window.cancelAnimationFrame(animationID);
            canvas.onmousedown = (event) => {
              // do nothing for now
            }
          }
        }
      }

      if((this.playArea.swappingState == false) && (this.playArea.pauseTiles == false) && (this.playArea.lightningEffect == false) && (this.stripedLineEffect == false)) {
        // finished swapping and other animations, so start fall animation if matches were found
        if(this.playArea.tilesAreFalling == true) {
          this.playArea.animateTileFall();
        }
      }

      if((this.playArea.pauseTiles == true) && (this.playArea.lightningEffect == false) && (this.playArea.stripeEffect == false)) {
        if(this.upCanvasPresent == false) {
          this.appendCanvas();
        }
        this.pauseForAnimation(time);
      }

      if((this.playArea.lightningEffect == true) && (this.playArea.pauseTiles == false)) {
        if(this.upCanvasPresent == false) {
          this.appendCanvas();
        }
        this.animateLightning(time);
      }

      // update striped line list
      if(this.playArea.stripeEffect == true) {
        for(let i = this.playArea.stripedAnimationList.length -1 ; i >= 0; i--) {
          let xCor = this.playArea.stripedAnimationList[i].point.x;
          let yCor = this.playArea.stripedAnimationList[i].point.y;
          let horizontal = this.playArea.stripedAnimationList[i].horizontal;
          let type = this.playArea.stripedAnimationList[i].type;
          let newLineAnimation = this.spEffect.createLineAnimation(xCor,yCor, horizontal, type);
          this.stripedLineList.push(newLineAnimation);
          this.stripedLineEffect = true;
          this.playArea.stripedAnimationList.splice(i, 1);
        }
        this.playArea.stripeEffect = false;
      }

      if((this.stripedLineEffect == true)) {
        if(this.upCanvasPresent == false) {
          this.appendCanvas();
        }
        this.animateStripes(time);
      }

  }

  pauseForAnimation(time) {
    if(this.pauseCounter == 0) {
      this.lastInstance = time;
    }
    this.dt += time - this.lastInstance;
    this.lastInstance = time;
    this.pauseCounter++;
    // if(this.pauseCounter > 20) {
    //   this.pauseTiles = false;
    //   this.pauseCounter = 0;
    //   return;
    // }

    if((this.dt / 1000) >= 1) {
      this.playArea.pauseTiles = false;
      this.playArea.fadeCandyList = [];
      this.playArea.scoresToDraw = [];
      this.removeCanvas();
      this.lastInstance = 0;
      this.pauseCounter = 0;
      this.dt = 0;
    }

    let alpha = 1 - this.dt / 1000;
    this.playArea.fadeMultipleCandies(alpha);

    this.spEffect.drawFloatingScores(alpha, this.dt);

  }

  animateLightning(time) {
    if(this.pauseCounter == 0) {
      this.lastInstance = time;
    }
    this.dt += time - this.lastInstance;
    this.pauseCounter++;

    this.spEffect.clearEffects();
    for(let i = 0; i < this.playArea.lightningTileCoordinates.length; i++) {
      this.spEffect.drawLightning(this.playArea.lightningOrigin, this.playArea.lightningTileCoordinates[i], 1);
    }

    if((this.dt / 1000) > 10) {
      this.dt = 0;
      this.pauseCounter = 0;
      this.lastInstance = 0;
      // this.updateScore();
      this.playArea.lightningEffect = false;
      this.playArea.lightningTileCoordinates = [];
      this.removeCanvas();
      this.upCanvasPresent = false;
    }

  }

  animateStripes(time) {

    // this.spEffect.clearEffects();
    this.spEffect.context.clearRect(0, 0, this.spEffect.context.canvas.width, this.spEffect.context.canvas.height);
    for(let i = this.stripedLineList.length - 1 ; i >= 0; i--) {
      let remove = this.stripedLineList[i].drawLines();
      if(remove == true) {
        this.stripedLineList.splice(i, 1);
      }
    }
    if(this.stripedLineList.length == 0) {
      this.stripedLineEffect = false;
      this.removeCanvas();
    }
  }

  createLevel(level) {
    this.playArea = new CandyZone(this);
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
    ctx.beginPath();
    // ctx.fillStyle = this.backgroundColor;
    // ctx.fillRect(this.x , this.y, this.width, this.height);
    ctx.closePath();
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
    this.upCanvasPresent = true;
  }

  removeCanvas() {
    mainWrapper.removeChild(this.upperCanvas);
    this.upCanvasPresent = false;
  }

}



let world = new GameWorld();
world.init();
// let start = {x: 50, y:50};
// let end = {x: 300, y: 300};
let start = world.playArea.getTileCoordinates(world.playArea.tiles[0][0]);
let end = world.playArea.getTileCoordinates(world.playArea.tiles[4][7]);
