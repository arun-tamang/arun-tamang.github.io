var data = [
   {
       tagName: 'div',
       className: 'test-class',
       styles: {
           width: "100px",
           height: "100px",
           backgroundColor: 'red'
       },
       children: [
           {
               tagName: 'div',
               className: 'box',
               styles: {
                   width: "50px",
                   height: "50px",
                   backgroundColor: 'blue'
               },
           },
           {
               tagName: 'div',
               className: 'box',
               styles: {
                   width: "50px",
                   height: "50px",
                   backgroundColor: 'brown',
                   float: 'right'
               },
           }
       ]
   },
   {
       tagName: 'div',
       className: 'test-class',
       styles: {
           width: "100px",
           height: "100px",
           backgroundColor: 'red'
       },
       children: [
           {
               tagName: 'div',
               className: 'box',
               styles: {
                   width: "50px",
                   height: "50px",
                   backgroundColor: 'blue'
               },
           },
           {
               tagName: 'div',
               className: 'box',
               styles: {
                   width: "50px",
                   height: "50px",
                   backgroundColor: 'brown',
                   float: 'right'
               },
           },
           {
               tagName: 'div',
               className: 'box',
               styles: {
                   width: "50px",
                   height: "50px",
                   backgroundColor: 'pink',
                   float: 'right'
               },
           }
       ]
   },
   {
       tagName: 'div',
       className: 'test-class',
       styles: {
           width: "100px",
           height: "100px",
           backgroundColor: 'red'
       },
       children: [
           {
               tagName: 'div',
               className: 'box',
               styles: {
                   width: "50px",
                   height: "50px",
                   backgroundColor: 'blue'
               },
           },
           {
               tagName: 'div',
               className: 'box',
               styles: {
                   width: "50px",
                   height: "50px",
                   backgroundColor: 'brown',
                   float: 'right'
               },
           }
       ]
   }
];

var mainWrapper = document.getElementById('main-wrapper');


function Node(parent){
    var that = this;
    this.createNode = function(dataItem){
        var keys = Object.keys(dataItem);
        for(var j = 0; j<keys.length; j++){
            if(keys[j].toUpperCase()=='tagName'.toUpperCase()) {
                this. container = document.createElement(dataItem[keys[j]]);
                parent.appendChild(this.container);
            }
            if(keys[j].toUpperCase()=='className'.toUpperCase()){
                this.container.setAttribute('class', dataItem[keys[j]]);
            }
            if(keys[j].toUpperCase()=='styles'.toUpperCase()) {
                var styleKeys = Object.keys(dataItem[keys[j]]);
                for (var k=0; k <styleKeys.length; k++){
                    this.container.style[styleKeys[k]]  = dataItem[keys[j]][styleKeys[k]];
                }
            }
            if(keys[j].toUpperCase()=='children'.toUpperCase()){
                var childKeys = Object.keys(dataItem[keys[j]]);
                for(var l = 0; l < childKeys.length; l++){
                    //create child
                    var childNode = new Node(that.container);
                    childNode.createNode(dataItem[keys[j]][childKeys[l]]);
                }
            }
        }
    }
}


var dataKeys = Object.keys(data);
for(var i = 0; i<data.length; i++){
    var newNode = new Node(mainWrapper);
    newNode.createNode(data[i]);
}
