const express = require("express");
const {spawn} = require("child_process");
const path = require("path");
const fs = require('fs');


const app = express();
const port = 8080;

app.use(express.static(path.join(__dirname,'public')))

app.get('/', (req, res) => {
    if (req.query.name != undefined){
        const preprocess = spawn("python",["preProcess.py",req.query.name])
          
        preprocess.stderr.on("data",function(err){
              if (err)
                   res.write("Some error occured while pre processing");
          })
            
        preprocess.on("close",function(code){
             if (code == 0)
                res.write("Successfully pre processed image")
            res.end()
            })
        }
    else{
        res.sendFile(__dirname+"/index.html")
    }        
})

app.get("/frame",(req,res)=>{
    const frameExtractor = spawn("python",["extractFrame.py"]);

    frameExtractor.stderr.on("data",function(err){
        if (err)
             res.write("Some error occured while extracting frame");
        })

    frameExtractor.on("close",function(code){
        if (code == 0)
            res.write("OK");
        else if(code == 1)
            res.write("BAD")
        res.end();
    })

})

app.get("/classification",(req,res) => {
    const pythonExecute = spawn("python",["main.py"]);
    
//    pythonExecute.stderr.on("data",function(err){
  //      if (err)
    //        res.write("Some error occured while classifiying digits");
      //  })

    pythonExecute.on("close",function(code){
        if (code == 0)      
        {    
            data = fs.readFileSync('./test.txt', 'utf8' )
            res.end(data)
        }
    })
})
  
app.listen(port, () => {
    console.log(`Server is  up and running on ${port}`)
  })
