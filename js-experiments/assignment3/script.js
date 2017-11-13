var details={
    firstName: 'Johnny',
    lastName: 'Bravo',
    age: 21,
    gender: 'Male',
    profession: 'Programmer',
    Education: 'Bachelors in Electronics Engineering',
    hobbies: 'Singing',
    projects: ['Speech-Recognition', 'Autonomous Vehicle']
}

var mainWrapper = document.getElementById('main-wrapper');
var newList = document.createElement('ul');
var bdy = document.getElementsByTagName('body')[0];
mainWrapper.style.backgroundColor = 'rgb(233, 179, 249)';
mainWrapper.style.maxWidth = '1200px';
mainWrapper.style.margin = '0 auto';
mainWrapper.style.width = '100%';
mainWrapper.style.padding = '2%';
mainWrapper.style.overflow = 'auto';

mainWrapper.appendChild(newList);

var keyList = Object.keys(details);
// var listItem = document.createElement('li');
var key;
for(var i=0; i<keyList.length; i++){
    var listItem = document.createElement('li');
    key = keyList[i];
    if(key == 'projects'){
      listItem.innerHTML = key + ": <ul>";
      console.log(details[key]);
      for(var j = 0; j < details[key].length; j++){
        listItem.innerHTML += '<li>' + details[key][j] + '</li>';
        console.log(details[key][j]);
      }
      listItem.innerHTML += '</ul>'
      listItem.style.textTransform = 'capitalize';
      listItem.style.padding = '10px';
      newList.appendChild(listItem);
      continue;
    }
    listItem.innerHTML = key + ": " + details[key];
    listItem.style.textTransform = 'capitalize';
    listItem.style.padding = '10px';
    newList.appendChild(listItem);
    // console.log(key + ": " + details[key]);
}

newList.style.listStyle = 'none';
mainWrapper.style.width = '100%';
// mainWrapper.style.border = '0.1px solid red';
// mainWrapper.style.backgroundColor = 'rgb(18, 224, 231';
newList.style.backgroundColor = 'rgb(221, 67, 173)';
// newList.style.backgroundColor = 'inherit';
newList.style.width = '60%';
newList.style.float = 'left';

var photo = document.createElement('img');
// photo.setAttribute('src','johnny.jpg')
photo.src = 'johnny.jpg';
photo.style.width = '35%';
photo.style.float = 'right';
mainWrapper.appendChild(photo);

mainWrapper.style.borderRadius = '10px';
newList.style.borderRadius = '8px';
photo.style.borderRadius = '8px';

var welcomeDiv = document.createElement('div');
welcomeDiv.innerText = 'Hi, I am Johnny and I am a programmer.'
mainWrapper.appendChild(welcomeDiv);

var aboutMe = document.createElement('button');
aboutMe.innerHTML = "About Me";
var showLess = document.createElement('button');
showLess.innerText = 'Show Less';
showLess.style.display = 'none';
mainWrapper.appendChild(aboutMe);
mainWrapper.appendChild(showLess);
mainWrapper.style.color = 'rgb(171, 130, 130)';
newList.style.color = 'white';
welcomeDiv.style.margin = '10px';

newList.style.display = 'none';
aboutMe.onclick = function(){
    newList.style.display = 'block';
    welcomeDiv.style.display = 'none';
    showLess.style.display = 'block';
    this.style.display = 'none';
}

showLess.onclick = function(){
    newList.style.display = 'none';
    welcomeDiv.style.display = 'block';
    aboutMe.style.display = 'block';
    this.style.display = 'none'
}
