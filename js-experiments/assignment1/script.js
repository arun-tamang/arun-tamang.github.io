
var mainWrapper = document.getElementById('main-wrapper');
mainWrapper.style.height = '300px';
mainWrapper.style.width =  '400px';
mainWrapper.style.backgroundColor = 'rgb(184, 58, 92)';
mainWrapper.style.position = 'relative';

var bottomlist = document.createElement('ul');
bottomlist.style.width = '200px';
bottomlist.style.backgroundColor = 'rgb(72, 165, 175)';
bottomlist.style.color = 'white';
document.querySelector('body').appendChild(bottomlist);

function randomFunction(a,b){
    return Math.ceil(a + Math.random()*(b-a));
}

for(var i=0; i<randomFunction(10,20); i++){
    var el = document.createElement('div');
    el.style.height = '20px';
    el.style.width = '20px';
    el.style.backgroundColor = 'gray';
    el.style.position = 'absolute';
    el.style.top = randomFunction(4,276) + 'px';
    el.style.left = randomFunction(4,376) + 'px';
    mainWrapper.appendChild(el);
    el.onclick = function(){
         var tp = this.style.top;
         var lf = this.style.left;
         var ls = document.createElement('li');
         ls.innerHTML = 'top: '+ tp + "<br />width: "+lf;
         bottomlist.appendChild(ls);
         mainWrapper.removeChild(this);
    }
}
