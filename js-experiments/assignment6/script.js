var mainWrapper = document.getElementById('main-wrapper');
var mainWrapper = document.getElementById('main-wrapper');
var wide = 800;
var tall = 500;
mainWrapper.style.width = wide + 'px';
mainWrapper.style.height = tall + 'px';
mainWrapper.style.backgroundColor = 'rgb(252, 102, 102)';
mainWrapper.style.position = 'relative';

function randomFunction(a,b){
    return Math.ceil(a + Math.random()*(b-a));
}

function CreateAnts(){
    this.directionListHorizontal = [true, false];  // true=right and false = left
    this.directionListVertical = [true, false];  // true = up and false = down
    this.element = document.createElement('div');
    mainWrapper.appendChild(this.element);
    this.element.width = 30;
    this.element.height = 30;
    this.element.style.width = this.element.width + 'px';
    this.element.style.height = this.element.height + 'px';
    this.element.style.backgroundColor = 'gray';
    this.element.style.position = 'absolute'
    this.element.left = randomFunction(0,wide-this.element.width-5);
    this.element.top = randomFunction(0,tall-this.element.height-5);
    this.element.directionHor = this.directionListHorizontal[Math.floor(Math.random()*2)];
    this.element.directionVer = this.directionListVertical[Math.floor(Math.random()*2)];
    var that = this;

    this.element.moveAnt = function(){
        //checkCollision
        for(var iterator=0; iterator<antArray.length; iterator++){
            if(that.element == antArray[iterator]){
                continue;
            }
            if((that.element.left < antArray[iterator].left+antArray[iterator].width) &&
              (that.element.left+that.element.width > antArray[iterator].left) &&
              (that.element.top < antArray[iterator].top+antArray[iterator].height) &&
              (that.element.top+that.element.height > antArray[iterator].top))
            {
                that.element.directionHor = !(that.element.directionHor);
                that.element.directionVer = !(that.element.directionVer);
            }
        }

        if(that.element.directionHor == false){
            //move left
            if(!(that.element.left<1)){
                that.element.left -= 1;
                that.element.style.left = that.element.left + 'px';
            }else{
                that.element.directionHor = true;
            }
        }
        else if(that.element.directionHor == true){
            if(!(that.element.left>wide-that.element.width-1)){
                //move right
                that.element.left += 1;
                that.element.style.left = that.element.left +'px';
            }else{
                that.element.directionHor = false;
            }
        }
        if(that.element.directionVer == true){
            if(!(that.element.top<1)){
                //move up
                that.element.top -= 1;
                that.element.style.top = that.element.top +'px';
            }else{
                that.element.directionVer = false;
            }

        }
        else if(that.element.directionVer == false){
            if(!(that.element.top>tall-that.element.height-1)){
                //move down
                that.element.top += 1;
                that.element.style.top = that.element.top +'px';
            }else{
                that.element.directionVer = true;
            }
        }

    };
}

var messageDiv = document.createElement('div');
mainWrapper.appendChild(messageDiv);
messageDiv.style.fontSize = '40px';
messageDiv.style.color = 'rgb(48, 222, 180)';
messageDiv.style.position = 'absolute';
messageDiv.style.top = '40px';
messageDiv.style.left = '60px';
messageDiv.innerHTML = 'WELCOME !!';


var startButton = document.createElement('button');
document.getElementsByTagName('body')[0].appendChild(startButton);
startButton.innerText = 'Start Game';
startButton.onclick = function(){
    startButton.style.display = 'none';
    messageDiv.style.display = 'none';
    startGame();
}


var antArray = [];

function startGame(){
    antArray = [];
    for(var i=0; i<Math.round(randomFunction(8,12)); i++){
        var temp = new CreateAnts();
        antArray[i] = temp.element;
        antArray[i].style.top = randomFunction(50,750) + 'px';
        antArray[i].style.left = randomFunction(50,450) + 'px';
        mainWrapper.appendChild(antArray[i]);
        antArray[i].onclick = function(){
             var index = antArray.indexOf(this);
             antArray.splice(index,1);
             console.log('no of ants: ' + antArray.length);
             mainWrapper.removeChild(this);
             if(antArray.length==0){
                 console.log('game-over');
                 messageDiv.innerText = 'Great Job !!!';
                 messageDiv.style.display = 'block';
                 clearInterval(counterPromise);
                 startButton.style.display  ='block';
                 startButton.innerText = 'Play Again';
             }
        }
    }
    var counterPromise = setInterval(function(){
        for(var i = 0; i<antArray.length; i++){
            antArray[i].moveAnt();
        }
    },10);
}
