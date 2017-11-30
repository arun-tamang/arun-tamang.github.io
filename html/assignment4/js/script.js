
var search = {
  show: false,
  input: document.getElementById('search-input'),
  toggleInput: function() {
    this.show = !this.show;
    if(this.show == true) {
      this.input.style.display = 'block';
    } else {
      this.input.style.display = 'none';
    }
  }
};

var handlers = {
  toggleInput: function() {
    search.toggleInput();
  }
}


// index is used to select current text category
var index = 0;

var slidingTextContainer = document.getElementsByClassName('sliding-text-container')[index];
var textChildren = slidingTextContainer.children;
var textWidth = textChildren[0].offsetWidth;
// slidingTextContainer.style.width = parseInt(textWidth * textChildren.length) + 'px';
// slider(ul);

for(var i = 0; i < textChildren.length; i++) {
  textChildren[i].style.left = i * textWidth + 'px';
}

var nextText = document.getElementsByClassName('previous-text')[0];
var prevText = document.getElementsByClassName('next-text')[0];
var textButtonFlag = true;
var currentText = 0;  // keep track of current text

nextText.onclick = function() {
  if(currentText<textChildren.length-1){
    if(textButtonFlag){
      textButtonFlag = false;
      var counter1 = 1;
      var counterPromise = setInterval(function(){
        if(counter1 >= textWidth){
          clearInterval(counterPromise);
          for(var i = currentText; i < textChildren.length; i++) {
            textChildren[i].style.left = -textWidth + ((i-currentText) * textWidth) + 'px';
          }
          currentText++;
          textButtonFlag = true;
          return;
        }
        for(var i = 0; i < textChildren.length; i++) {
          var lf = parseInt(textChildren[i].style.left);
          lf -= 5;
          textChildren[i].style.left = lf+'px';
        }
        // textChildren[currentText].style.left =-(counter1*10)+'px';
        counter1 += 5;
      }, 10);
    }
  }
}

prevText.onclick = function() {
  if(currentText > 0){
    if(textButtonFlag){
      textButtonFlag = false;
      var counter1 = 1;
      var counterPromise = setInterval(function(){
        if(counter1 >= textWidth){
          clearInterval(counterPromise);
          currentText--;
          for(var i = currentText; i < textChildren.length; i++) {
            textChildren[i].style.left = 0 + ((i-currentText) * textWidth) + 'px';
          }
          textButtonFlag = true;
          return;
        }
        for(var i = 0; i < textChildren.length; i++) {
          var lf = parseInt(textChildren[i].style.left);
          lf += 5;
          textChildren[i].style.left = lf+'px';
        }
        // textChildren[currentText].style.left =-(counter1*10)+'px';
        counter1 += 5;
      }, 10);
    }
  }
}

var imageList = document.getElementsByClassName('images')[0];
var imageChildren = imageList.children;
var imageWidth = imageChildren[0].offsetWidth;
// imageList.style.width = parseInt(imageWidth * imageChildren.length) + 'px';
// slider(ul);

for(var i = 0; i < imageChildren.length; i++) {
  imageChildren[i].style.left = i * imageWidth + 'px';
}

var nextImage = document.getElementsByClassName('prev-image')[0];
var prevImage = document.getElementsByClassName('next-image')[0];
var imageButtonFlag = true;
var currentImage = 0;  // keep track of current image

prevImage.onclick = function() {
  if(currentImage<imageChildren.length-1){
    if(imageButtonFlag){
      imageButtonFlag = false;
      var counter2 = 1;
      var counterPromise = setInterval(function(){
        if(counter2 >= imageWidth){
          clearInterval(counterPromise);
          for(var i = currentImage; i < imageChildren.length; i++) {
            imageChildren[i].style.left = -imageWidth + ((i-currentImage) * imageWidth) + 'px';
          }
          currentImage++;
          imageButtonFlag = true;
          return;
        }
        for(var i = 0; i < imageChildren.length; i++) {
          var lf = parseInt(imageChildren[i].style.left);
          lf -= 5;
          imageChildren[i].style.left = lf+'px';
        }
        // imageChildren[currentImage].style.left =-(counter2*10)+'px';
        counter2 += 5;
      }, 10);
    }
  }
}

nextImage.onclick = function() {
  if(currentImage > 0){
    if(imageButtonFlag){
      imageButtonFlag = false;
      var counter2 = 1;
      var counterPromise = setInterval(function(){
        if(counter2 >= imageWidth){
          clearInterval(counterPromise);
          currentImage--;
          for(var i = currentImage; i < imageChildren.length; i++) {
            imageChildren[i].style.left = 0 + ((i-currentImage) * imageWidth) + 'px';
          }
          imageButtonFlag = true;
          return;
        }
        for(var i = 0; i < imageChildren.length; i++) {
          var lf = parseInt(imageChildren[i].style.left);
          lf += 5;
          imageChildren[i].style.left = lf+'px';
        }
        // imageChildren[currentImage].style.left =-(counter2*10)+'px';
        counter2 += 5;
      }, 10);
    }
  }
}

window.onresize = function(event) {
  imageWidth = imageChildren[0].offsetWidth;
};
