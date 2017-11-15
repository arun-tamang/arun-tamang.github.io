var canvas = document.getElementById("myCanvas");
canvas.style.background = 'rgb(7, 57, 71)';
var ctx = canvas.getContext('2d');


function Circle() {
  this. x = 0;
  this.y = 0;
  this.radius = 10;
  this.maxRadius = 10;
  this.columnOffset = 0;
  this.sizeOffset = 0;

  this.drawCircle = function() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = 'rgb(253, 174, 120)';
    ctx.fill();
    ctx.closePath();
  }
}

function AnimationWorld(){
  this.numberOfRows = 10;
  this.numberOfColumns = 15;
  this.topPadding = 200;
  this.leftPadding = 150;
  this.phase = 0;
  this.speed = 0.005;
  this.frameCount = 0;
  this.numberOfMatrices = 2;

  this.circles = [];
  this.circleMatrix = [];
  this.circleColumn = [];

  this.draw = function() {
    for(var matrix = 0; matrix < this.numberOfMatrices; matrix++) {
      for(var i = 0; i < this.numberOfColumns; i++) {
        this.circleColumn = [];
        for(var j= 0; j < this.numberOfRows; j++) {
          var matrixPhase = this.phase + (matrix / (this.numberOfMatrices-1) * (Math.PI));
          this.circleColumn[j] = new Circle();
          this.circleColumn[j].columnOffset = (i / (this.numberOfColumns - 1)) * (Math.PI);
          this.circleColumn[j].x = this.leftPadding + i * 22;
          this.circleColumn[j].y = this.topPadding + Math.sin(matrixPhase + this.circleColumn[j].columnOffset) * 45 + (j * 12);
          this.circleColumn[j].sizeOffset = (Math.cos(matrixPhase - (j / this.numberOfRows) + this.circleColumn[j].columnOffset) + 1) * 0.5;
          this.circleColumn[j].radius = this.circleColumn[j].sizeOffset * this.circleColumn[j].maxRadius;

          this.circleColumn[j].drawCircle();
        }
        this.circleMatrix[i] = this.circleColumn;
      }
      this.circles[matrix] = this.circleMatrix;
    }
    this.phase = this.frameCount * this.speed;
    this.frameCount++;
  }
}

//create world
var world = new AnimationWorld();


var myInterval = setInterval(function(){
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  world.draw();
}, 10);
