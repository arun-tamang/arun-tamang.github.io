let mainWrapper = document.getElementById('main-wrapper');
mainWrapper.style.backgroundImage = 'url(\'./images/background.jpg\')';
mainWrapper.style.backgroundSize = '100% 100%';
mainWrapper.style.width = '800px';
mainWrapper.style.height = '640px';

let canvas = document.getElementById('myCanvas');
//canvas.width = parseInt(mainWrapper.style.width);
//canvas.height = parseInt(mainWrapper.style.height);
let ctx = canvas.getContext('2d');

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
    this.pauseCounter = 0;
  }

  pauseForAnimation() {
    this.pauseCounter ++;
    if(this.pauseCounter > 20) {
      this.pauseTiles = false;
      this.pauseCounter = 0;
      return;
    }
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

  removeRow(row) {
    for(let i = 0; i < this.numCols; i++) {
      if((12 <= this.tiles[row][i].type) && (this.tiles[row][i].type <= 17)) {
        // a vertical striped candy
        this.removeColumn(i);
      } else {
        this.tiles[row][i].type = -1;
      }
    }
  }

  removeColumn(column) {
    for(let j=0; j < this.numRows; j++) {
      if((6 <= this.tiles[j][column].type) && (this.tiles[j][column].type <= 11)) {
        // a horizontal striped candy
        this.removeRow(j);
      } else {
        this.tiles[j][column].type = -1;
      }
    }
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
                this.tiles[rowValue][index].type = -1;
              } else {
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
                this.tiles[rowValue][index].type = -1;
              } else {
                this.tiles[rowValue][index].type = -1;
              }
            }
          } else {
            this.tiles[rowValue][index].type = -1;
          }
        }
      }
      else {
        // this is vertical match
        let limit = this.matches[i].row + this.matches[i].length;
        let colValue = this.matches[i].column;
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
                this.tiles[index][colValue].type = -1;
              } else {
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
                this.tiles[index][colValue].type = -1;
              } else {
                this.tiles[index][colValue].type = -1;
              }
            }
          } else {
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
          this.tiles[i][j].type = -1;
        }
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
          this.stripesToActivate.push(this.tiles[i][j]);
        }
      }
    }
    for(let i = 0; i < this.stripesToActivate.length; i++) {
      this.activateStriped(this.stripesToActivate[i]);
    }
    this.pauseTiles = true;
    // finally remove current striped tile as it won't be activateStriped
    tile.type = -1;
  }

  activateStriped(tile) {
    if((6 <= tile.type) && (tile.type <= 11)) {
      //horizontal striped candy. remove all candies in this row
      this.removeRow(tile.row);
    }
    if((12 <= tile.type) && (tile.type <= 17)) {
      // vertical striped candy.
      this.removeColumn(tile.column);
      // no need to break as this is horizontal match and we need to keep on replacing tiles.
    }
  }

  // activateMultipleStriped(tile) {
  //
  // }

  destroyAllCandies() {
    for(let i = 0; i < this.numRows; i++) {
      for(let j = 0; j < this.numCols; j++) {
        this.tiles[i][j].type = -1;
      }
    }
  }

  activateColorBomb(bombTile, otherTile) {
    bombTile.type = -1;
    // Now check if another candy is normal candy
    if((0 <= otherTile.type) && (otherTile.type <= 5)) {
      this.removeType(otherTile);
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
          this.removeRow(tile1.row);
          this.removeColumn(tile2.column);
        } else if(((6 <= tile2.type) && (tile2.type <= 11)) && ((12 <= tile1.type) && (tile1.type <= 17))) {
          this.removeRow(tile2.row);
          this.removeColumn(tile1.column);
        } else {
          // if both of same stripe-direction randomly remove row and column
          let choose = Math.floor(Math.random() * 2); // generate 0 or 1
          if(choose == 0) {
            this.removeRow(tile1.row);
            this.removeColumn(tile2.column);
          } else {
            this.removeRow(tile2.row);
            this.removeColumn(tile1.column);
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
        ctx.font = '20px serif';
        ctx.fillText('Score: ' + this.score, this.x + this.header.x + 20, this.y + this.header.y + this.header.height - 15);
        // y coordinate for filltext is the bottom of text not top.
        ctx.fillText('Level: ' + this.level, this.x + this.header.x + 300, this.y + this.header.y + this.header.height - 15);
        ctx.closePath();
      }
    };

    this.displayScoreDebugNumber = 20;
    this.levelCompleted = false;

  }

  // fillHeader() {
  //   ctx.beginPath();
  //   ctx.fillStyle = this.header.background;
  //   // ctx.fillStyle = 'red';
  //   ctx.fillRect(this.x + this.header.x, this.y + this.header.y, this.header.width, this.header.height);
  //   ctx.fillStyle = this.header.textColor;
  //   ctx.font = '20px serif';
  //   ctx.fillText('Score: ' + this.score, this.x + this.header.x + 20, this.y + this.header.y + this.header.height - 15);
  //   // y coordinate for filltext is the bottom of text not top.
  //   ctx.fillText('Level: ' + this.level, this.x + this.header.x + 300, this.y + this.header.y + this.header.height - 15);
  //   ctx.closePath();
  //   // console.log('inside header');
  //   // console.log(this.header.x);
  // }

  drawButton(button) {
    ctx.beginPath();
    ctx.fillStyle = button.backgroundColor;
    ctx.fillRect(button.x, button.y, button.width, button.height);
    ctx.fillStyle = button.textColor;
    ctx.font = button.fontProperties;
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
    // ctx.fillStyle = 'blue';
    let text = 'Score: ' + this.score;
    ctx.fillText(text, this.x + this.header.x + 20, this.y + this.header.y + this.header.height - 15);
    // console.log(text, this.x + this.header.x + 20, this.y + this.header.y + this.header.height - 15);
    // ctx.strokeText(text, this.x + this.header.x + this.displayScoreDebugNumber, this.y + this.header.y + this.header.height - 15);
    // console.log(text);
    // ctx.fillText(text, 20, 40);


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

}


let world = new GameWorld();
world.init();
