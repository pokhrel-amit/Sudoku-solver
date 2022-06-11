const uploadDisplay = _I("sudoku-img"); 
const preprocessDisplay = _I("preprocess-img"); 
const frameDisplay = _I("frame-img");   
const textOutput = _I("output-text");
const canvas = _("canvas");
const showBtn = _I("show")
const uploadBtn = _I("upload-btn");
const solvedOutput = _I("solved-text");
const spinner = _I("spinner");

spinner.style.display = "none";

canvas.width = 300;
canvas.height = 300;

showBtn.style.display = "none"
noDisplay(uploadDisplay);
noDisplay(preprocessDisplay);
noDisplay(frameDisplay);
noDisplay(textOutput);
noDisplay(canvas);
noDisplay(solvedOutput);


function callTextInput(){
     showBtn.click()
}

showBtn.onclick = function(e){
    const response = textOutput.innerHTML;
    const lines = response.split("\n");
    for (let i=0; i < lines.length;i++)
        lines[i] = lines[i].split(" ")
                    
    lines.length = 9;

    for(let i=0;i<9;i++)
        for(let j=0;j<9;j++)
            lines[i][j] = parseInt(lines[i][j])
    
    
    
    const board = applyGenetic(lines)            
    let sol = new Array(9);

    for(let i=0;i<9;i++)
        sol[i] = board.values[i].join(" ");
            
    sol = sol.join("\n");
    
    solvedOutput.innerHTML = sol;
    board.draw(canvas)

    display(solvedOutput)
    display(canvas)
    spinner.style.display = "none"

    setTimeout(function(){
        scroll(0,2*window.innerHeight)
    },4*5000)

}


function noDisplay(element){
    element.parentNode.parentNode.style.visibility = "hidden";
}

function display(element){
    element.parentNode.parentNode.style.visibility = "visible"
}


uploadBtn.onchange = function(e){
    
    const file =e.target.files[0];
    const { name } = file;
    uploadDisplay.src = URL.createObjectURL(file);
    display(uploadDisplay)

    const xhr = new XMLHttpRequest();        
    xhr.open("GET",`http://localhost:8080?name=${name}`);
    xhr.send();
    spinner.style.display = "block"

    xhr.onload = function (){
        preprocessDisplay.src = "./saved_images/preProcess.jpg";
        display(preprocessDisplay);
        spinner.style.display = "none"


        xhr.open("GET",`http://localhost:8080/frame`)
        xhr.send();

        xhr.onload = function(){
            spinner.style.display = "block"
            if(xhr.responseText == "BAD"){
               spinner.style.display = "none"
               alert("The image doesn't contain sudoku puzzle");
               location.reload();
            }

          frameDisplay.src="./saved_images/frame_binary.jpg"
          display(frameDisplay);

          xhr.open("GET",`http://localhost:8080/classification`);
          
            xhr.onload = function(){
                    const response = xhr.responseText;
                    textOutput.innerHTML = response;
                    display(textOutput);
                    callTextInput();
                    scroll(0,window.innerHeight)
                }
            xhr.send();
        }
    }
}
