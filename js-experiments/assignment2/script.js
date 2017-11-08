var imgNames = ['image-1.jpg','image-2.jpg','image-3.jpg','image-4.jpg','image-5.jpg'];

var mainWrapper = document.getElementById('main-wrapper');
var sliderList = document.createElement('ul');
sliderList.setAttribute('id', 'slide');
mainWrapper.appendChild(sliderList);
mainWrapper.style.width = '600px';
mainWrapper.style.backgroundColor = 'rgb(174, 244, 176)';
mainWrapper.style.textAlign = 'center';

for(var i=0; i<imgNames.length; i++){
    var listItem = document.createElement('li');
    var newImage = document.createElement('img');
    newImage.src = imgNames[i];
    newImage.style.width = '600px';
    newImage.style.height = '100%';
    listItem.style.height = '350px'
    listItem.appendChild(newImage);
    listItem.style.position = 'relative';
    listItem.setAttribute('class', 'slidingImage')
    listItem.style.float = 'left';
    sliderList.appendChild(listItem);
}

sliderList.style.width = '600px';
sliderList.style.height = '350px';
sliderList.style.overflow = 'hidden';
sliderList.style.listStyle = 'none';
sliderList.style.padding = '0px';

var nxt = document.createElement('button');
nxt.innerText = 'Next';
nxt.style.clear = 'both';
var prev = document.createElement('button');
prev.innerText = 'Previous';
prev.style.clear = 'both';


var slidingImages = document.getElementsByClassName('slidingImage');
counter = 0;
nxt.onclick = function(){
    var counter1 = 1;
    if(counter<slidingImages.length-1){
        var counterPromise = setInterval(function(){
            if(counter1>60){
                clearInterval(counterPromise);
                slidingImages[counter+1].style.marginRight = '0px';
                counter++;
                return;
            }

            slidingImages[counter].style.marginTop =-(counter1*10)+'px';
            counter1++;
        }, 10);
    }
}

prev.onclick = function(){
    if(counter>0){
        console.log('previous is valid now.')
        var counter1 = 1;
        var counterPromise = setInterval(function(){
            if(counter1>60){
                clearInterval(counterPromise);
                counter--;
                return;
            }
            slidingImages[counter-1].style.marginTop = -((60-counter1)*10) +'px';
            counter1++;
        }, 10);
    }
}

mainWrapper.appendChild(prev);
mainWrapper.appendChild(nxt);
