var mainWrapper = document.getElementById('main-wrapper');
var wide = 800;
var tall = 500;
mainWrapper.style.width = wide + 'px';
mainWrapper.style.height = tall + 'px';
mainWrapper.style.backgroundColor = 'rgb(252, 102, 102)';
// console.log(mainWrapper.style.width);
mainWrapper.style.position = 'relative';

function createBox(){
    this.directionListHorizontal = ['right','left'];
    this.directionListVertical = ['up','down'];
    this.element = document.createElement('div');
    mainWrapper.appendChild(this.element);
    this.width = '20px';
    this.height = '20px';
    this.element.style.width = this.width;
    this.element.style.height = this.height;
    this.element.style.backgroundColor = 'gray';
    this.element.style.position = 'absolute'
    this.left = randomFunction(0,wide-parseInt(this.width)-10);
    console.log('tall-parseInt(this.height)-10',tall-parseInt(this.height)-10);
    this.top = randomFunction(0,tall-parseInt(this.height)-10);
    this.directionHor = this.directionListHorizontal[Math.floor(Math.random()*2)];
    this.directionVer = this.directionListVertical[Math.floor(Math.random()*2)];
    var that = this;


    document.onkeydown = function(event){
        // console.log(event.keyCode);
        if(event.keyCode == 37){
            //move left
            that.directionHor = 'left';
            that.moveLoop();
        }
        if(event.keyCode == 38){
            //move up
            that.directionVer = 'up';
            that.moveLoop();
        }
        if(event.keyCode == 39){
            //move right
            that.directionHor = 'right';
            that.moveLoop();
        }
        if(event.keyCode == 40){
            //move down
            that.directionVer = 'down';
            that.moveLoop();
        }
    }

    this.moveLoop = function(){
        if(that.directionHor == 'left'){
            //move left
            if(!(that.left<5)){
                that.left -= randomFunction(1,6);
                that.element.style.left = that.left + 'px';
                // console.log(that.element.style.left);
            }else{
                that.directionHor = 'right';
            }
        }
        if(that.directionHor == 'right'){
            if(!(that.left>775)){
                //move right
                that.left += randomFunction(1,6);
                that.element.style.left = that.left +'px';
                // console.log(that.element.style.left);
            }else{
                that.directionHor = 'left';
            }
        }
        if(that.directionVer == 'up'){
            if(!(that.top<5)){
                //move up
                that.top -= randomFunction(1,6);
                that.element.style.top = that.top +'px';
                (that.element.style.top);
            }else{
                that.directionVer = 'down';
            }

        }
        if(that.directionVer == 'down'){
            if(!(that.top>475)){
                //move down
                that.top += randomFunction(1,6);
                that.element.style.top = that.top +'px';
                // console.log(that.element.style.top);
            }else{
                that.directionVer = 'up';
            }
        }

    };
}


var bottomlist = document.createElement('ul');
bottomlist.style.width = '200px';
bottomlist.style.backgroundColor = 'rgb(72, 165, 175)';
bottomlist.style.color = 'white';
document.querySelector('body').appendChild(bottomlist);

function randomFunction(a,b){
    return Math.ceil(a + Math.random()*(b-a));
}

for(var i=0; i<randomFunction(10,15); i++){
    var el = new createBox();
    el.element.style.top = randomFunction(4,276) + 'px';
    el.element.style.left = randomFunction(4,376) + 'px';
    mainWrapper.appendChild(el.element);
    el.element.onclick = function(){
         mainWrapper.removeChild(this);
    }
    setInterval(el.moveLoop,50);
}
