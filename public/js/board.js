class Board {
     constructor(values) {
        this.values = values;
        this.permanent = new Array();
        this.cols = new Array(9);
        this.grids = new Array(9);

        for(let i=0;i<9;i++)
          for(let j=0;j<9;j++)
            if (values[i][j] != 0)
              this.permanent.push( {row:i,col:j});
       
       const numbers = values,numbersT = new Array(9);
      
              
        for(let i=0;i<9;i++){
          numbersT[i] = new Array(9);
               for(let j=0;j<9;j++)
                    numbersT[i][j] = numbers[j][i];
        }

        for(let i=0;i<9;i++)
          this.cols[i] = numbersT[i];

        for(let i=0;i<9;i++)
            this.grids[i] = generateGrid(i,numbers);
        
    }
      
     checkGrid(row, column, value) {
      for (let i = 0; i < 9; i++)
      if (this.values[i][column] == value || this.values[row][i] == value)
        return false;


      for (let i = 0; i < 3; i++, row = ((row + 1) % 3) + offSetRow(row))
        for (let j = 0; j < 3; j++, column = ((column + 1) % 3) + offSetColumn(column))
          if (this.values[row][column] == value) return false;

      return true;
     }

     checkFixed(row,col){
        const filtered = this.permanent.filter(el => (el.row == row && el.col == col))

        if (filtered.length != 0)
          return true;
        return false

    }
   
     draw(canvas, x = canvas.width/10 -5, y = canvas.height/10-5) {
       const dx = x;
       const dy = y;
       const cc = canvas.getContext("2d");
   
       for (let i = 0; i < 9; i++, y += dx) {
         for (let j = 0; j < 9; j++, x += dy) {
           cc.rect(x, y, 25, 25);
           cc.font = "20px Arial";
           cc.fillText(this.values[i][j], x + 8, y + 16);
           cc.stroke();
   
           if (i % 3 == 0) {
             cc.moveTo(x, y - 2);
             cc.lineTo(x + dx, y - 2);
             cc.stroke();
           }
   
           if (j % 3 == 0) {
             cc.moveTo(x - 2, y);
             cc.lineTo(x - 2, y + dy);
             cc.stroke();
           }
         }
         x = dx;
       }
     }
   }