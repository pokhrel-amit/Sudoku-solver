//DOM Handler Functions
_A = (element) => document.querySelectorAll(element);
_ = element => document.querySelector(element);
_I = elementId => document.getElementById(elementId);

//Random Numbers generation Functions
const random = (a,b = 0) => {
     if (a instanceof Array)
          return a[randomInt(a.length - 1)]
     
     return Math.random()*(b-a) + a;
}
const randomInt = (a,b) => Math.round(random(a,b));

function generateGrid(offset,boardNumbers){
     row = offset ;
     col = 3*(offset % 3) + 1
     const subGrid = new Array();
     for (let i = 0; i < 3; i++, row = ((row + 1) % 3) + offSetRow(row))
         for (let j = 0; j < 3; j++, col = ((col + 1) % 3) + offSetColumn(col))
           subGrid.push(boardNumbers[row][col]);
   
       return subGrid
}

const  compare = (v1,v2) => v1>v2;



const offSetRow = (cell) => {
     if (cell <= 2) return 0;
     if (cell <= 5) return 3;

     return 6;
   }

const offSetColumn = (cell) => {
     if (cell <= 2) return 0;
     if (cell <= 5) return 3;

     return 6;
   }


Array.prototype.calculateSum = function(){
     let sum = 0;
     for(let i=0;i<this.length;i++)
          sum+= this[i];
     return sum;
}

Array.prototype.calculateProduct = function(){
     let product = 1;
     for(let i=0;i<this.length;i++)
          product*= this[i];
     return product;
}

function checkUnique(array){
     const unique = [...new Set(array.map(x=>x))];

     return array.length - unique.length;
}


function swapRow(p1,p2,index){
     p1.values[index] = p2.values[index]     
}


function swapCol(p1,p2,index){
     for(i=0;i<9;i++)
          p1.values[index][i] = p2.values[index][i];
}




//Linear Mapping Function line equation
map = (value,vMin,vMax,oMin = 0,oMax = 1) => (oMin - oMax)/(vMin - vMax) * (value - vMin) + oMin




