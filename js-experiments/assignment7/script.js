var bdy = document.getElementsByTagName('body')[0];

function initializeWorld(div){
    this.element = document.getElementById(div);
    this.element.style.width = '600px';
    this.element.style.height = '600px';
    this.element.style.margin = 0;
    this.element.style.backgroundImage = "url('racing-background.jpg')";
    this.element.style.backgroundRepeat = 'repeat-y';
    this.element.style.position = 'relative';
    this.counterPromise;
    this.scrollPosition = 0;
    var that = this;
    this.startButton = document.createElement('button');
    this.startButton.onclick = function(){
        this.style.display = 'none';
        that.stopButton.style.display = 'block';
        that.counterPromise = setInterval(function(){
            that.scrollPosition += 2;
            that.element.style.backgroundPosition = '0px ' + that.scrollPosition + 'px';
        },10);
    }
    this.startButton.innerText = 'Start';
    bdy.appendChild(this.startButton);

    this.stopButton = document.createElement('button');
    this.stopButton.onclick = function(){
        that.startButton.style.display = 'block';
        this.style.display = 'none'
        clearInterval(that.counterPromise);
    }
    this.stopButton.innerText = 'Stop';
    this.stopButton.style.display = 'none';
    bdy.appendChild(this.stopButton);

}



function Car(parent){
    this.element = document.createElement('div');
    this.element.style.width = '200px';
    this.element.style.height = '200px';
    this.element.style.position = 'absolute';
    parent.element.appendChild(this.element);
    this.left = 200;
    this.element.style.bottom = '0px';
    this.element.style.left = '200px';
    this.element.style.backgroundImage = "url('car1.jpg')";
    this.element.style.backgroundSize = 'cover';

    var that = this;
}



var firstWorld = new initializeWorld('first-game-container');
var car1 = new Car(firstWorld);
var secondWorld = new initializeWorld('second-game-container');
var car2 = new Car(secondWorld);


document.onkeydown = function(event){
    if(event.keyCode == 37){
        //move left
        if(car2.left != 0){
            car2.left -= 200;
            car2.element.style.left = car2.left+'px';
            console.log('should move left');
        }

    }
    if(event.keyCode == 39){
        //move right
        if(car2.left !=400){
            car2.left += 200;
            car2.element.style.left = car2.left+'px';
            console.log('should move right');
        }
    }
    if(event.keyCode == 65){
        //move left
        if(car1.left != 0){
            car1.left -= 200;
            car1.element.style.left = car1.left+'px';
            console.log('should move left');
        }

    }
    if(event.keyCode == 68){
        //move right
        if(car1.left !=400){
            car1.left += 200;
            car1.element.style.left = car1.left+'px';
            console.log('should move right');
        }
    }
}
