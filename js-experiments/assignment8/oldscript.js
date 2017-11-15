var bdy = document.getElementsByTagName('body')[0];

function giveRandomNumber(a,b){
    return Math.ceil(a + Math.random()*(b-a));
}

function checkCollision(objA,objB){
  if((objA.left + objA.width > objB.left) && (objA.left < objB.left + objB.width) && (objA.top + objA.height > objB.top) && (objA.top < objB.top + objB.height)){
    return true;
  } else{
  return false;
    }
  }

function initializeWorld(div){
  this.element = document.getElementById(div);
  this.height = 600;
  this.width = 600;
  this.numberOfLanes = 3;
  this.laneSelector = 0;
  this.numberOfObstacles = this.numberOfLanes - 1;

  this.obstacleList = ['car1.jpg', 'car2.jpg', 'enemycar.png'];
  this.obstacles = [];

  this.counterPromise;
  this.scrollPosition = 0;
  var that = this;

  this.startButton = document.createElement('button');

  this.stopButton = document.createElement('button');

  this.messageDiv = document.createElement('div');

  this.init = function(){

    this.element.style.width = this.width + 'px';
    this.element.style.height = this.height + 'px';
    this.element.style.margin = 0;
    this.element.style.backgroundImage = "url('track.png')";
    this.element.style.backgroundRepeat = 'repeat-y';
    this.element.style.position = 'relative';
    this.element.style.overflow = 'hidden';
    // this.element.style.marginTop = '20px';

    this.element.appendChild(this.messageDiv);
    this.messageDiv.innerText = 'WELCOME!';
    this.messageDiv.style.fontSize = '80px';
    this.messageDiv.style.fontWeight = 'bold';
    this.messageDiv.style.color = 'rgba(28, 182, 215, 0.64)';
    this.messageDiv.style.top = '90px';
    this.messageDiv.style.left = '70px';
    this.messageDiv.style.position = 'absolute';

    // console.log('from init: this = ');
    // console.log(this);

    // create car
    this.carChild = new Car(that);

    // this.obstacle = new Obstacle(this);
    // this.obstacle.giveNewPositionAndImage();

    // initialize start button
    this.startButton.innerText = 'Start';
    bdy.appendChild(this.startButton);
    this.startButton.onclick = function(){
      // console.log('"this" from startButton.onclick');
      // console.log(this);  //it prints starButton button element.
      that.messageDiv.style.display = 'none';
      this.style.display = 'none';
      that.stopButton.style.display = 'block';

      // fill obstacles array
      for(var i = 0; i < (that.numberOfObstacles); i++){
        that.obstacles[i] = new Obstacle(that);
        that.obstacles[i].giveNewPositionAndImage();
      }

      that.counterPromise = setInterval(function(){
        that.scrollPosition += 2;
        that.element.style.backgroundPosition = '0px ' + that.scrollPosition + 'px';
        //scroll obstacles
        for(var i = 0; i < (that.numberOfObstacles); i++) {
          // check collision
          if(checkCollision(that.obstacles[i], that.carChild)){
            console.log('collision detected');
            that.messageDiv.innerHTML = 'GAME OVER';
            that.messageDiv.style.display = 'block';
            that.obstacles.forEach(function (item, index) {
              that.element.removeChild(that.obstacles[index].element);
            });
            that.obstacles = [];
            that.startButton.innerText = 'Restart';
            that.startButton.style.display = 'block';
            that.stopButton.style.display = 'none';
            clearInterval(that.counterPromise);
            return;
            // that.obstacles[i].element.style.display = 'none';
            // that.carChild.element.style.display = 'none';

          }
          that.obstacles[i].top += 2;
          that.obstacles[i].element.style.top = that.obstacles[i].top + 'px';
          if(that.obstacles[i].top > that.height){
            // console.log('reached below');
            that.obstacles[i].giveNewPositionAndImage();
          }
        }
      },10);
    }

    // initialize stop button
    this.stopButton.innerText = 'Stop';
    this.stopButton.style.display = 'none';
    bdy.appendChild(this.stopButton);
    this.stopButton.onclick = function(){
      that.startButton.style.display = 'block';
      this.style.display = 'none'
      clearInterval(that.counterPromise);
    }

  }

}

function Car(parent){
  this.width = 150;
  this.height = 250;
  this.element = document.createElement('div');
  this.element.style.width = this.width + 'px';
  this.element.style.height = this.height + 'px';
  this.element.style.position = 'absolute';
  parent.element.appendChild(this.element);
  this.left = 225;
  this.top = parent.height - this.height;
  this.element.style.top = this.top + 'px';
  this.element.style.left = this.left + 'px';
  this.element.style.backgroundImage = "url('playercar.png')";
  this.element.style.backgroundSize = '100% 100%';

  var that = this;
}

function Obstacle(parent){
  this.height = 150;
  this.width = 150;
  this.element = document.createElement('div');
  this.obstacleImage = parent.obstacleList[Math.floor(Math.random()*((parent.obstacleList).length))];
  this.element.style.backgroundImage = "url('" + this.obstacleImage + "')";
  this.element.style.backgroundSize = "100% 100%";
  this.element.style.width = this.width + 'px';
  this.element.style.height = this.height + 'px';
  this.element.style.position = 'absolute';
  parent.element.appendChild(this.element);
  this.parent = parent;

  var that = this;

  this.giveNewPositionAndImage = function(){
    // this.lane = Math.floor(Math.random()*3);  // lane = 0,1 or 2
    this.lane = parent.laneSelector;
    this.left = 25 + this.lane * 200;
    parent.laneSelector = (parent.laneSelector + 1) % parent.numberOfLanes;
    // this.top = -parseInt(this.element.style.height) + 10;
    this.top = - giveRandomNumber(this.height * 2, this.height * 8 );
    // parent.element.appendChild(this.element);
    this.element.style.top = this.top + 'px';
    this.element.style.left = this.left + 'px';

    this.obstacleImage = parent.obstacleList[Math.floor(Math.random()*((parent.obstacleList).length))];
    this.element.style.backgroundImage = "url('" + this.obstacleImage + "')";
  }
}

var firstWorld = new initializeWorld('first-game-container');
firstWorld.init();
var secondWorld = new initializeWorld('second-game-container');
secondWorld.init();


document.onkeydown = function(event){
  if(event.keyCode == 37){
      //move left
      if(secondWorld.carChild.left > 25){
          secondWorld.carChild.left -= 200;
          secondWorld.carChild.element.style.left = secondWorld.carChild.left+'px';
      }

  }
  if(event.keyCode == 39){
      //move right
      if(secondWorld.carChild.left < 400){
          secondWorld.carChild.left += 200;
          secondWorld.carChild.element.style.left = secondWorld.carChild.left+'px';
      }
  }
  if(event.keyCode == 65){
      //move left
      if(firstWorld.carChild.left > 25){
          firstWorld.carChild.left -= 200;
          firstWorld.carChild.element.style.left = firstWorld.carChild.left+'px';
      }

  }
  if(event.keyCode == 68){
      //move right
      if(firstWorld.carChild.left !=400){
          firstWorld.carChild.left += 200;
          firstWorld.carChild.element.style.left = firstWorld.carChild.left+'px';
      }
  }
}
