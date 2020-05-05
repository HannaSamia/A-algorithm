function removeFromArray(array,element){
    for(var i = array.length - 1;i >= 0;i--){
        if(array[i] == element){
            array.splice(i,1);
        }
    }
}

function  heuristic(a,b){
    // p5 has a function called dist it will calculate the Euclidean distance in 2D or 3D
    // https://www.geeksforgeeks.org/p5-js-dist-function/
    var di = dist(a.i,a.j,b.i,b.j);


    //Here we are using the Manhattan distance
    // var di = abs(a.i - b.i) + abs(a.j - b.j)
    return di;
}

var cols = 30;
var rows = 30;
var grid = Array(cols);

// var width = 400;
// var height = 400;

var openSet = [];
var closedSet = [];
var start;
var end;

var w,h;

var path = []; // at the end this is the best path


function Node(i,j){
    this.i = i;
    this.j = j;

    this.f = 0;
    this.g = 0;
    this.h = 0;

    this.neighbors = []; //let each node keep track of it neighbors

    this.previous = undefined; // the node that i came from || parent node

    this.wall = false;

    if(random(1)<0.3){
        this.wall = true;
    }

    this.show = function(color){
        fill(color);
        if(this.wall){
            fill(0);
        }
        noStroke();
        rect(this.i * w,this.j * h,w - 1,h - 1);
    }

    this.addNeighbors = function(grid){
        var i = this.i;
        var j = this.j;
        
        if(i<cols-1){
            this.neighbors.push(grid[i+1][j]);
        }
        if(i > 0){
            this.neighbors.push(grid[i-1][j]);
        }
        if(j<rows-1){
            this.neighbors.push(grid[i][j+1]);
        }
        if(j>0){
            this.neighbors.push(grid[i][j-1]);
        }
        if (i > 0 && j > 0) {
            this.neighbors.push(grid[i - 1][j - 1]);
        }
        if (i < cols - 1 && j > 0) {
            this.neighbors.push(grid[i + 1][j - 1]);
        }
        if (i > 0 && j < rows - 1) {
            this.neighbors.push(grid[i - 1][j + 1]);
        }
        if (i < cols - 1 && j < rows - 1) {
            this.neighbors.push(grid[i + 1][j + 1]);
        }
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
        for(var j=0; j<rows; j++){
            grid[i][j] = new Node(i,j);
            // grid[i][j].addNeighbors(grid); // problem here i can add neighbors while filling the grid, not all the values are ready
        }
    }

    for(var i = 0; i<cols; i++){
        for(var j=0; j<rows; j++){
             grid[i][j].addNeighbors(grid);
        }
    }

    console.log("the Grid Is: --- ",grid);
    // console.table(grid);
    
    start = grid[0][0]; //start Node
    end = grid[cols-1][rows-1]; //end Node

    start.wall=false;//so that the start is never a wall
    end.wall = false;//so that the end is never a wall

    openSet.push(start); //we start with the first node


    
}


//The draw function in P5 is a loop it self
function draw(){

    //while openset not empty we keep going and checking
    if(openSet.length > 0){

        var currentIndex = 0;//we assume the openset need to have a node and its the first one
        for(var i = 0; i<openSet.length; i++){
            if(openSet[i].f < openSet[currentIndex].f){
                currentIndex = i;
            }
        }

        var currentVal = openSet[currentIndex];

        if(currentVal === end){
            
            noLoop();
            console.log("FOUND IT : DONE !!!")
        }

       // openSet.remove(currentVal) not such function in js
       removeFromArray(openSet,currentVal);
       closedSet.push(currentVal); 

        var neighbors = currentVal.neighbors;
        for(var i=0 ; i<neighbors.length;i++){
            var neighbor = neighbors[i];

            //while the neighbor node isn't in the closed Set we continue 
            if(!closedSet.includes(neighbor) && !neighbor.wall){//and if the neighbor is not a wall 
                var tempG = currentVal.g +1;

                //if neighbor in openset we evaluate it g with the calcuated tempG
                //if its lower then this is the better path 
                var isNewPath = false;
                if(openSet.includes(neighbor)){
                    if(tempG < neighbor.g){
                        neighbor.g = tempG;
                        isNewPath = true;
                    }
                }
                else{
                    //we add the neighbor to the open Set
                    neighbor.g = tempG;
                    isNewPath = true;
                    openSet.push(neighbor)
                }
                // need to guess how much it will take me to get to the end
                if(isNewPath){
                    neighbor.h = heuristic(neighbor,end);
                    neighbor.f = neighbor.g + neighbor.h
                    neighbor.previous = currentVal;
                }

            }
        }

    }else{
        console.log("DIDN't FIND IT : NO SOLUTION !");
        noLoop();
        return;
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

    //find the path and fill it something similar to a linked list
        path = [];
        var temp = currentVal;
        path.push(temp);
        while(temp.previous){
            path.push(temp.previous);
            temp = temp.previous;
        }


    for(var i = 0; i<path.length; i++){
        path[i].show(color(0,0,155));
    }

    noFill();
    stroke(255);
    beginShape();
        for(var i = 0; i<path.length; i++){
            vertex(path[i].i*w,path[i].j*h)
        }
    endShape();

}