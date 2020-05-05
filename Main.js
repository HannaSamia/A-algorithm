var cols = 5;
var rows = 5;
var grid = Array(cols);

// var width = 400;
// var height = 400;

var openSet = [];
var closedSet = [];
var start;
var end;

var w,h;


function Node(i,j){
    this.x = i;
    this.y = j;
    this.f = 0;
    this.g = 0;
    this.h = 0;

    this.show = function(color){
        fill(color);
        noStroke();
        rect(this.x*w,this.y*h,w-1,h-1);
    }
}




function setup(){
    createCanvas(400,400);
    console.log('A*');

    w = width / cols;
    h = height / rows;

    for(var i = 0; i<cols; i++){
        grid[i] = new Array(rows);
    }

    for(var i = 0; i<cols; i++){
        for(var j=0;j<rows;j++){
            grid[i][j] = new Node(i,j)
        }
    }

    start = grid[0][0]; //start Node
    end = grid[cols-1][rows-1]; //end Node

    openSet.push(start); //we start with the first node


    
}


//The draw function in P5 is a loop it self
function draw(){

    //while openset not empty we keep going and checking
    if(openSet.length > 0){

    }else{

    }

    background(0);

    for(var i = 0; i<cols; i++){
        for(var j=0;j<rows;j++){
            grid[i][j].show(255);//we pass the color
        }
    }

    for(var i = 0; i<closedSet.length; i++){
        closedSet[i].show(color(255,0,0));

    }

    for(var i = 0; i<openSet.length; i++){
        openSet[i].show(color(0,255,0));

    }

}