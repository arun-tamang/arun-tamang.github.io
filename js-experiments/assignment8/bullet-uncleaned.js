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

function World(div){
  this.element = document.getElementById(div);
  this.height = 600;
  this.width = 600;
  this.numberOfLanes = 3;
  this.laneSelector = 0;
  this.numberOfObstacles = this.numberOfLanes - 1;

  this.obstacleList = ['car1.jpg', 'car2.jpg', 'enemycar.png'];
  this.obstacles = [];

  this.score = 0;
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

    this.element.appendChild(this.messageDiv);
    this.messageDiv.innerText = 'WELCOME!';
    this.messageDiv.style.fontSize = '80px';
    this.messageDiv.style.fontWeight = 'bold';
    this.messageDiv.style.color = 'rgba(28, 182, 215, 0.64)';
    this.messageDiv.style.top = '90px';
    this.messageDiv.style.left = '70px';
    this.messageDiv.style.position = 'absolute';

    // create car
    this.carChild = new Car(that);
    this.fire = function(){
      // that.carChild.getBullet();
      this.carChild.bullets[this.carChild.bulletTracker].fireBullet();
      // console.log('bulletTracker:' + this.carChild.bulletTracker)
      this.carChild.bulletTracker++;

      // this.carChild.bullets.splice(0,1);
    }
    // this.carChild.bullet = new Bullet(this.carChild);
    // this.carChild.bullet.fireBullet();

    // initialize start button
    this.startButton.innerText = 'Start';
    bdy.appendChild(this.startButton);
    this.startButton.onclick = function(){
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
            // console.log('collision detected');
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
          }
          for(let j = 0; j < that.carChild.bullets.length; j++) {
            if(that.carChild.bullets[j].moveBullet == true) {
              if(checkCollision(that.obstacles[i], that.carChild.bullets[j])){
                // console.log('bullet collision');
                that.score ++;
                that.obstacles[i].giveNewPositionAndImage();
                that.carChild.bullets[j].resetBullet();
              }
            }
          }

          that.obstacles[i].top += 2;
          that.obstacles[i].element.style.top = that.obstacles[i].top + 'px';
          if(that.obstacles[i].top > that.height){
            // console.log('reached below');
            that.obstacles[i].giveNewPositionAndImage();
          }
        }
        for(let i = 0; i < that.carChild.bullets.length; i++){
          if(that.carChild.bullets[i].moveBullet == true) {
            that.carChild.bullets[i].bottom += 2;
            that.carChild.bullets[i].top -=2;
            that.carChild.bullets[i].element.style.bottom = that.carChild.bullets[i].bottom + 'px';

            if(that.carChild.bullets[i].bottom > that.height) {
              that.carChild.bullets[i].resetBullet();
            }
          }
        }
      },7);
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
  this.parent = parent;
  this.left = 225;
  this.top = parent.height - this.height;
  this.element.style.top = this.top + 'px';
  this.element.style.left = this.left + 'px';
  this.element.style.backgroundImage = "url('playercar.png')";
  this.element.style.backgroundSize = '100% 100%';
  this.numberOfBullets = 30;
  this.bulletTracker = 0;

  this.bullets = [];
  for(let i = 0; i < this.numberOfBullets; i++) {
    this.bullets[i] = new Bullet(this);
  }

  var that = this;

  // this.getBullet = function() {
  //   that.bullet = new Bullet();
  // }
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
    this.lane = parent.laneSelector;
    this.left = 25 + this.lane * 200;
    parent.laneSelector = (parent.laneSelector + 1) % parent.numberOfLanes;
    this.top = - giveRandomNumber(this.height * 2, this.height * 8 );
    this.element.style.top = this.top + 'px';
    this.element.style.left = this.left + 'px';

    this.obstacleImage = parent.obstacleList[Math.floor(Math.random()*((parent.obstacleList).length))];
    this.element.style.backgroundImage = "url('" + this.obstacleImage + "')";
  }
}

function Bullet(parent) {
  this.element = document.createElement('div');
  this.parent = parent;
  this.moveBullet = false;
  this.element.style.backgroundImage = 'url(\'laser-bullet.png\')';
  this.element.style.backgroundSize = '100% 100%';
  parent.element.appendChild(this.element);
  this.width = 20;
  this.height = 50;
  this.bottom = 0;
  this.top = 0;
  this.left = 0;
  this.element.style.height = this.height + 'px';
  this.element.style.width = this.width + 'px';
  this.element.style.position = 'absolute';
  this.element.style.display = 'none';
  var that = this;
  this.fireBullet = function() {
    that.parent.parent.element.appendChild(that.element);
    that.bottom = that.parent.height;
    that.top = that.parent.parent.height - (that.bottom + that.height);
    that.element.style.bottom = that.bottom + 'px';
    that.left = that.parent.left + (that.parent.width / 2) - (that.width/2);
    that.element.style.left = that.left + 'px';
    that.element.style.backgroundColor = 'red';
    that.element.style.display = 'block';
    that.moveBullet = true;
  }
  this.resetBullet = function() {
    that.moveBullet = false;
    that.parent.parent.element.removeChild(that.element);
    that.element.style.left = '0px';
    that.element.style.bottom = '0px';
    var removedBullet = that.parent.bullets.splice(0,1);
    that.parent.bulletTracker--;
    that.parent.bullets.push(removedBullet[0]);
  }
}

var firstWorld = new World('first-game-container');
firstWorld.init();
var secondWorld = new World('second-game-container');
secondWorld.init();


document.onkeyup = function(event){
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
  if(event.keyCode == 38){
      //fire on pressin up arrow key
      secondWorld.fire();
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
      if(firstWorld.carChild.left < 400){
          firstWorld.carChild.left += 200;
          firstWorld.carChild.element.style.left = firstWorld.carChild.left+'px';
      }
  }
  if(event.keyCode == 87){
      //fire on pressing 'w'
      firstWorld.fire();
  }
}
