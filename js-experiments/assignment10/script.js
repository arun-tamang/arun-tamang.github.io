
var bdy = document.getElementsByTagName('body')[0];
bdy.style.overflow = 'hidden';
bdy.style.padding = '0px';
function randomFunction(a,b){
    return Math.ceil(a + Math.random()*(b-a));
}

function checkObstacleCollision(bird, obstacle){
  if(obstacle.top == true){
    if((bird.left + bird.width > obstacle.left) && (bird.left < obstacle.left + obstacle.width)  && (bird.top <  obstacle.height)){
      return true;
    } else{
      return false;
    }
  }
  else {
    if((bird.left + bird.width > obstacle.left) && (bird.left < obstacle.left + obstacle.width)  && ((bird.top + bird.height) >  (500-obstacle.height))){
      return true;
    } else{
      return false;
    }
  }
}

class Bird {
	constructor(parent) {
		this.element = document.createElement('div');
    this.parent = parent;
    this.top = 45;
    this.left = 40;
    this.height = 40;
    this.width = 40;
    this.moveFlag = false;
    this.moveIncrement = 2;
    this.moveCounter = 0;
    // this.initialVelocity = 0;
    this.timeInterval = 0;
    this.currentVelocity = 0;
    this.acceleration = 10;
	}

  getCounter(){
    return this.moveCounter;
  }

  init(){
    this.parent.element.appendChild(this.element);
    this.element.style.width = this.width + 'px';
    this.element.style.height = this.height + 'px';
    this.element.style.backgroundImage = 'url(\'bird.png\')';
    this.element.style.backgroundSize = '100% 100%';
    this.element.style.position = 'absolute';
    this.element.style.top = this.top + 'px';
    this.element.style.left = this.left + 'px';
  }

	moveBird(direction){
		if(direction == 'up'){
      this.moveFlag = true;
      this.moveCounter = 0;
      this.moveIncrement = 2;
    }
	}

  updateBird(){
    if(this.moveFlag == true) {
      if( this.moveCounter >= 30 || this.top <=0) {
        this.moveFlag = false;
        this.moveIncrement = 2;
        this.timeInterval = 0;
      }
      this.moveCounter++;
      // console.log(getCounter());
      this.moveIncrement -= 0.05;
      this.top -= this.moveIncrement;
      this.element.style.top = this.top + 'px';
    } else {
      // console.log(getCounter());
      this.timeInterval++;
      this.currentVelocity = this.acceleration * this.timeInterval;
      this.top += 0.008 * this.currentVelocity;
      this.element.style.top = this.top + 'px';
    }
  }
}

class Obstacle{
  constructor(parent, topValue){
    this.top = topValue;
    this.parent = parent;
    this.element = document.createElement('div');
    this.heightList = [100, 150, 180, 200, 210, 250];
    this.height = this.heightList[Math.floor(Math.random()*(this.heightList.length))];
    this.left = 0;
    this.width = 100;
  }

  init(){
    this.parent.element.appendChild(this.element);
    this.element.style.backgroundSize = '100% 100%';
    this.element.style.backgroundRepeat = 'no-repeat';
    this.element.style.height = this.height + 'px';
    this.element.style.width = this.width + 'px';
    this.element.style.position = 'absolute';
    if(this.top) {
      this.element.style.top = 0;
      this.element.style.backgroundImage = 'url(\'pipe-top.png\')';
    } else {
      this.element.style.bottom = 0;
      this.element.style.backgroundImage = 'url(\'pipe-bottom.png\')';
    }
    this.element.style.left = this.left + 'px';
  }

  updateObstacle(){
    this.left--;
    if(this.left < (-parseInt(this.element.style.width))) {
      var obstaclePair = this.parent.obstacles.splice(0,2);
      this.parent.score += 1;
      this.parent.scoreDisplay.innerText = 'Score: ' + this.parent.score;
      this.parent.changeObstaclePair(obstaclePair[0],obstaclePair[1]);
    } else {
      this.element.style.left = this.left + 'px';
    }
  }
}

class World {
	constructor() {
		this.element = document.getElementById('main-wrapper');
    this.startButton = document.createElement('button');
    this.pauseButton = document.createElement('button');
    this.restartButton = document.createElement('button');
    this.messageDiv = document.createElement('div');
    this.scoreDisplay = document.createElement('div');
    this.element.appendChild(this.messageDiv);
    this.element.appendChild(this.scoreDisplay);
    this.scrollPostion = 0;
    this.numberOfObstacles = 10;
    this.obstacleSeparation = 250;
    this.width = 800;
    this.height = 500;
    this.score = 0;
    this.obstacleSeparationCounter = 0;
	}

	init() {
    this.birdChild = new Bird(this);
    this.obstacles = [];
		this.element.style.backgroundImage = 'url(\'background-image.png\')';
		this.element.style.width = this.width + 'px';
		this.element.style.height = this.height + 'px';
		this.element.backgroundRepeat = 'repeat-x';
    this.element.style.position = 'relative';
    this.element.style.overflow = 'hidden';
    bdy.appendChild(this.startButton);
    this.startButton.innerText = 'Start';
    bdy.appendChild(this.pauseButton);
    this.pauseButton.innerText = 'Pause';
    this.pauseButton.style.display = 'none';
    bdy.appendChild(this.restartButton);
    this.restartButton.innerText = 'Restart';
    this.restartButton.style.display = 'none';
    this.messageDiv.innerHTML = 'WELCOME!!!!<br>Use up arrow to control the bird.';
    this.messageDiv.style.fontSize = '80px';
    this.messageDiv.style.color = 'rgba(244, 6, 49, 0.57)';
    this.messageDiv.style.position = 'absolute';
    this.messageDiv.style.zIndex = '1';
    this.messageDiv.style.top = '100px';
    this.messageDiv.style.left = '100px';
    this.scoreDisplay.style.position = 'absolute';
    this.score = 0;
    this.scoreDisplay.style.top = 0;
    this.scoreDisplay.style.left = 0;
    this.scoreDisplay.style.zIndex = '2';
    this.scoreDisplay.innerText = 'Score: ' + this.score;
    this.scoreDisplay.style.backgroundColor = 'rgba(43, 43, 43, 0.63)';
    this.scoreDisplay.style.color = 'white';
    this.scoreDisplay.style.fontSize = '2em';

    var that = this;
    this.startButton.onclick = () => {
      this.startButton.style.display = 'none';
      this.messageDiv.style.display = 'none';
      this.pauseButton.style.display = 'block';
      this.interval = setInterval(() => {
        this.updateWorld();
      },10);
    };
    this.pauseButton.onclick = () => {
      this.pauseButton.style.display = 'none';
      this.startButton.style.display = 'block';
      clearInterval(this.interval);
    };
    this.restartButton.onclick = () => {
      this.restartButton.style.display = 'none';
      this.element.removeChild(this.birdChild.element);
      for(let i = 0; i < this.obstacles.length; i++){
        this.element.removeChild(this.obstacles[i].element);
      }
      this.init();
      this.messageDiv.style.display = 'none';
      this.interval = setInterval(() => {
        this.updateWorld();
      },10);
      this.pauseButton.style.display = 'block';
    };
    this.birdChild.init();
    this.obstacleSeparationCounter = 0;
    for(let i = 0; i < this.numberOfObstacles; i += 2) {
      this.obstacles[i] = new Obstacle(this, true);
      this.obstacles[i].init();
      this.obstacles[i].left = this.width + this.obstacleSeparation * this.obstacleSeparationCounter;
      this.obstacles[i].element.style.left = this.obstacles[i].left + 'px';
      this.obstacles[i+1] = new Obstacle(this, false);
      this.obstacles[i+1].init();
      this.obstacles[i+1].left = this.obstacles[i].left;
      this.obstacles[i+1].element.style.left = this.obstacles[i+1].left + 'px';
      this.obstacles[i+1].height = parseInt(this.element.style.height) - 150 - this.obstacles[i].height;
      this.obstacles[i+1].element.style.height = this.obstacles[i+1].height + 'px';
      this.obstacleSeparationCounter ++;
    }

    document.onkeydown = (event) => {
      if(event.keyCode == 38){
        this.birdChild.moveBird('up');
      }
    }

	}

  changeObstaclePair(obs1, obs2){
    var newIndex = this.obstacles.length;
    var lastLeft = this.obstacles[newIndex-1].left;
    this.obstacles[newIndex] = obs1;
    this.obstacles[newIndex + 1] = obs2;
    obs1.left = lastLeft + this.obstacleSeparation;
    obs1.element.style.left = obs1.left + 'px';
    obs2.left = lastLeft + this.obstacleSeparation;
    obs2.element.style.left = obs2.left + 'px';
    obs1.height = obs1.heightList[Math.floor(Math.random()*(obs1.heightList.length))];
    obs1.element.style.height = obs1.height + 'px';
    obs2.height = parseInt(this.element.style.height) - 150 - obs1.height;
    obs2.element.style.height = obs2.height + 'px';
  }

	updateWorld() {
    if(this.birdChild.top > (this.height - this.birdChild.height)) {
      // bird touched bottom of world screen
      clearInterval(this.interval);
      this.endGame();
    }
		this.element.style.backgroundPosition = - this.scrollPostion + 'px 0px';
		this.scrollPostion++;
    for(let i = 0; i < this.obstacles.length; i++){
      if(checkObstacleCollision(this.birdChild, this.obstacles[i])) {
        clearInterval(this.interval);
        this.endGame();
        break;
      }
      this.obstacles[i].updateObstacle();
    }
    this.birdChild.updateBird();
	}

  endGame(){
    document.onkeydown = (event) => {
      if(event.keyCode == 38){
        // do nothing
      }
    }
    this.pauseButton.style.display = 'none';
    this.restartButton.style.display = 'block';
    this.messageDiv.style.display = 'block';
    this.messageDiv.innerHTML = 'GAME OVER <br>YOUR SCORE: ' + this.score;
  }
}

var birdWorld = new World();
birdWorld.init();
