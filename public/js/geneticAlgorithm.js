let solution;
function applyGenetic(values){
     let board = new Board(values);
     solution = new Board(values);
     
     updatePossibile();
     //Get possibilities of each cells
     const possible = getPossibility(board);
     
     //Initilize population
     const population = new Array();
     const populationSize = 1000;
     const mutationRate = 0.5;
     const selectionRate = 0.5;
     
     const maxGeneration = 50;
     let generation = 0;
     let maxFitness = 0;

     for(let i=0;i<populationSize;i++)
          population.push(generateSolution(values,possible));

     population.sort(function(pop1,pop2){
          if(fitness(pop1) < fitness(pop2)) return 1;
          if (fitness(pop1) > fitness(pop2)) return -1;
              return 0;
      })
     
     maxFitness = fitness(population[0]);
     board = population[0];

     while(!(generation > maxGeneration || maxFitness > 530000)){

          population.sort(function(pop1,pop2){
               if(fitness(pop1) < fitness(pop2)) return 1;
               if (fitness(pop1) > fitness(pop2)) return -1;
                    return 0;
          })
        
          const childs = new Array();

          for(let i=0;i< Math.floor(population.length*selectionRate);i++)
               childs.push(crossover(population[i],population[i+1],board));

          // Mutate the new generation
          for(let i=0;i<childs.length;i++){
               mutate(childs[i],mutationRate,board,possible,Math.pow(-1,i));
               const childFitness = fitness(childs[i]);
               if(childFitness > maxFitness){
                       maxFitness = childFitness;
                       population.push(childs[i]);
                       board = childs[i]
                  }       
             }
             
          generation++;
     }
     if(!updatePossibile()){
          alert("Problem is not solvable\nYour image may be inappropriate...")
        //  location.reload();
     }
     
     return solution
}


function fitness(pop){
     let uniqueRow = new Array(9)
          ,uniqueColumn = new Array(9)
          ,uniqueGrid = new Array(9);

     for(let i=0;i<9;i++){
          uniqueRow[i] = 9 - checkUnique(pop.values[i]);
          uniqueColumn[i] = 9 - checkUnique(pop.cols[i]);
          uniqueGrid[i] = 9 - checkUnique(pop.grids[i]);
          
     }    
     let fitnessRow = 0,fitnessCol = 0,fitnessGrid = 0; 
     for(let i=0;i<9;i++){
           fitnessRow += 9/(10 - uniqueRow[i]);
           fitnessCol += 9/(10 - uniqueColumn[i]);
           fitnessGrid += 9/(10 - uniqueGrid[i]);
     }
          
     pop.fitnessRow = fitnessRow;
     return (fitnessRow*fitnessCol*fitnessGrid);
}


function crossover(pop1,pop2,board){
      let child = new Board(board.values)
      
      for(let i=0;i<9;i++)
          for(let j=0;j<9;j++){
               if(!board.checkFixed(i,j) && pop1.fitnessRow > pop2.fitnessRow)
                    child.values[i][j] = pop1.values[i][j];
               else if(!board.checkFixed(i,j))
                    child.values[i][j] = pop2.values[i][j];
          }
     return child
}

function mutate(child,rate,board,possibility,dir){
     for(let i=0;i<9;i++)
          for(let j=0;j<9;j++){
               let randomVal = random(possibility[i][j]);
               if(!board.checkFixed(i,j) && child.checkGrid(i,j,randomVal) )
                    child.values[i][j] = randomVal
                    
               }
          
     return child;
 }

function generateSolution(grid,possibility){
     
     const numbers = new Array(9);

     for(let i=0;i<9;i++)
          numbers[i] = new Array(9);

     for(let i=0;i<9;i++)
          for(let j=0;j<9;j++){
               if(grid[i][j] == 0)
                    numbers[i][j] = random(possibility[i][j]);
               else
                    numbers[i][j] = grid[i][j];
          }
                  
     return new Board(numbers)                     
}

function getPossibility(board){
     const possible = new Array(9);     
     for (let i = 0; i < 9; i++) possible[i] = new Array(9);
     
     for (let i = 0; i < 9; i++)
       for (let j = 0; j < 9; j++) possible[i][j] = new Array();
     
     for (let i = 0; i < 9; i++)
          for (let j = 0; j < 9; j++)
               for (let value = 1; value <= 9; value++) 
                    if (board.values[i][j] == 0 && board.checkGrid(i, j, value))
                         possible[i][j].push(value); 
                         
     //Fill out cell with one possibility
     for(let i=0;i<9;i++)
          for(let j=0;j<9;j++)
               if (possible[i][j].length == 1){
                    board.values[i][j] = possible[i][j][0];
                    getPossibility(board);
               }
     return possible;
}

function updatePossibile(row=0,col=0){
     console.table(solution.values)
     if (row == 8 && col == 9)
          return true;

     if (col == 9){
          row++;
          col = 0;
     }
     if(solution.values[row][col] > 0)
          return updatePossibile(row,col+1);
     
     for (let num =1;num<=9;num++){
          if(solution.checkGrid(row,col,num)){
               solution.values[row][col] = num;
               if (updatePossibile(row,col+1))
                    return true
          }
          solution.values[row][col] = 0;
     }
     return false;
}
