function removeFromArray(array,element){
    for(var i = array.length - 1;i >= 0;i--){
        if(array[i] == element){
            array.splice(i,1);
        }
    }
}

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
    this.i = i;
    this.j = j;

    this.f = 0;
    this.g = 0;
    this.h = 0;

    this.neighbors = []; //let each node keep track of it neighbors

    this.show = function(color){
        fill(color);
        noStroke();
        rect(this.i*w,this.j*h,w-1,h-1);
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
            // grid[i][j].addNeighbors(grid); // problem here i can add neighbors while filling the grid, not all the values are ready
        }
    }

    for(var i = 0; i<cols; i++){
        for(var j=0;j<rows;j++){
             grid[i][j].addNeighbors(grid);
        }
    }

    console.log("the Grid Is: --- ",grid);
    // console.table(grid);
    
    start = grid[0][0]; //start Node
    end = grid[cols-1][rows-1]; //end Node

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

        if(currentVal == end){
            Console.log("FOUND IT : DONE !!!")
        }

       // openSet.remove(currentVal) not such function in js
       removeFromArray(openSet,currentVal);
       closedSet.push(currentVal); 

        var neighbors = currentVal.neighbors;
        for(var i=0 ; i<neighbors.length;i++){
            var neighborsValue = neighbors[i];

            //while the neighbor node isn't in the closed Set we continue 
            if(!closedSet.includes(neighborsValue)){
                var tempG = currentVal.g +1;

                //if neighbor in openset we evaluate it g with the calcuated tempG
                //if its lower then this is the better path 
                if(openSet.includes(neighborsValue)){
                    if(tempG < neighborsValue.g){
                        neighborsValue.g = tempG;
                    }
                }
                else{
                    //we add the neighbor to the open Set
                    neighborsValue.g = tempG;
                    openSet.push(neighbors)
                }
            }
        }

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