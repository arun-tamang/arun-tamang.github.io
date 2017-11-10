
function randomFunction(a,b){
    return Math.ceil(a + Math.random()*(b-a));
}


function createWorld(div){
    this.element = document.getElementById(div);
    this.wide = 800;
    this.tall = 500;
    this.element.style.width = this.wide + 'px';
    this.element.style.height = this.tall + 'px';
    this.element.style.backgroundColor = 'rgb(252, 102, 102)';
    this.element.style.backgroundImage = 'url("ant-floor.png")';
    this.element.style.backgroundSize = 'cover';
    this.element.style.position = 'relative';

    this.messageDiv = document.createElement('div');
    this.element.appendChild(this.messageDiv);
    this.messageDiv.style.fontSize = '40px';
    this.messageDiv.style.color = 'rgb(48, 222, 180)';
    this.messageDiv.style.position = 'absolute';
    this.messageDiv.style.top = '40px';
    this.messageDiv.style.left = '60px';
    this.messageDiv.innerHTML = 'WELCOME !!';

    var that = this;
    this.startButton = document.createElement('button');
    document.getElementsByTagName('body')[0].appendChild(this.startButton);
    this.startButton.innerText = 'Start Game';
    this.startButton.onclick = function(){
        this.style.display = 'none';
        that.messageDiv.style.display = 'none';
        startGame();
    }
}

function CreateAnts(parent){
    this.directionListHorizontal = [true, false];  // true=right and false = left
    this.directionListVertical = [true, false];  // true = up and false = down
    this.element = document.createElement('div');
    parent.element.appendChild(this.element);
    this.width = 30;
    this.height = 30;
    this.element.style.width = this.width + 'px';
    this.element.style.height = this.height + 'px';
    this.element.style.backgroundImage = "url('ant1.png')";
    this.element.style.backgroundSize = 'cover';
    this.element.style.position = 'absolute';
    this.left = randomFunction(0,parent.wide-this.width-5);
    this.top = randomFunction(0,parent.tall-this.height-5);
    this.directionHor = this.directionListHorizontal[Math.floor(Math.random()*2)];
    this.directionVer = this.directionListVertical[Math.floor(Math.random()*2)];
    var that = this;

    this.fadeOut = function(){
        that.element.onclick = function(){
            return false;
        }
        var fadeCounter = 1;
        var interval = setInterval(function(){
            if(fadeCounter<=0){
                    clearInterval(interval);
                    world.element.removeChild(that.element);
            }
            that.element.style.opacity = ""+fadeCounter;
            fadeCounter -= 0.1;
        },60);
    }

    this.moveAnt = function(){
        //checkCollision
        for(var iterator=0; iterator<antArray.length; iterator++){
            if(that == antArray[iterator]){
                continue;
            }
            if((that.left < antArray[iterator].left+antArray[iterator].width) &&
              (that.left+that.width > antArray[iterator].left) &&
              (that.top < antArray[iterator].top+antArray[iterator].height) &&
              (that.top+that.height > antArray[iterator].top))
            {
                that.directionHor = !(that.directionHor);
                that.directionVer = !(that.directionVer);
            }
        }

        if(that.directionHor == false){
            //move left
            if(!(that.left<1)){
                that.left -= 1;
                that.element.style.left = that.left + 'px';
            }else{
                that.directionHor = true;
            }
        }
        else if(that.directionHor == true){
            if(!(that.left>parent.wide-that.width-1)){
                //move right
                that.left += 1;
                that.element.style.left = that.left +'px';
            }else{
                that.directionHor = false;
            }
        }
        if(that.directionVer == true){
            if(!(that.top<1)){
                //move up
                that.top -= 1;
                that.element.style.top = that.top +'px';
            }else{
                that.directionVer = false;
            }

        }
        else if(that.directionVer == false){
            if(!(that.top>parent.tall-that.height-1)){
                //move down
                that.top += 1;
                that.element.style.top = that.top +'px';
            }else{
                that.directionVer = true;
            }
        }

    };
}

var world = new createWorld('main-wrapper');

var antArray = [];


function startGame(){
    antArray = [];
    for(var i=0; i<Math.round(randomFunction(8,12)); i++){
        var ant = new CreateAnts(world);
        antArray[i] = ant;
        ant.element.style.top = randomFunction(50,750) + 'px';
        ant.element.style.left = randomFunction(50,450) + 'px';
        ant.element.onclick = function(_ant){
            return function(){
                var index = antArray.indexOf(_ant);
                antArray.splice(index,1);
                console.log('no of ants: ' + antArray.length);
                _ant.fadeOut();
                if(antArray.length==0){
                    console.log('game-over');
                    world.messageDiv.innerText = 'Great Job !!!';
                    world.messageDiv.style.display = 'block';
                    clearInterval(counterPromise);
                    world.startButton.style.display  ='block';
                    world.startButton.innerText = 'Play Again';
                }
            }
        }(ant);
    }
    var counterPromise = setInterval(function(){
        for(var i = 0; i<antArray.length; i++){
            antArray[i].moveAnt();
        }
    },10);
}
