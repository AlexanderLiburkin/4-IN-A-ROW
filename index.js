const express = require('express'); //Import the express dependency
const port = 7777;                  //Save the port number where your server will be listening
const app = express();//Instantiate an express app, the main work horse of this server

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());

const path = require('path');
app.use(express.static(path.join(__dirname, "public")));
app.use(express.static("public"));
app.set("view engine", "ejs");

const router = express.Router();
var times=0;
var board=[[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0,0,0]];
let lastMove={"GameStatus":"WaitToStart"};
var currPlayer=1;
router.get('/',function(req,res){
  times++;
  res.render("index", {
  player:times});
});
router.get('/GetLast',function(req,res){
  res.send(lastMove);
});
router.get('/GetMove/:p/:c',function(req,res){
  let p=Number(req.params.p);
  let c=Number(req.params.c);
  if(p==currPlayer){
    c--;
  cul=c%7;
   for (let index = 5 ; index >= 0; index--) {
    if(board[index][cul]==0){
      c = (cul+1) + (index*7)  ;
    }
   }
    lastMove.GameStatus="on";
    lastMove.player=p;
    lastMove.cell=c;
    c--;
    board[Math.floor(c/7)][c%7]=p;
    console.log(board);
    if(IsFinished()){
      GameOver();
    }
    currPlayer=(currPlayer==1)?2:1;
  }
  res.send(lastMove);
});


//add the router
app.use('/', router);


app.listen(port, () => {            //server starts listening for any attempts from a client to connect at port: {port}
    console.log(`Now listening on port ${port}`); 
});
function NewGame(){
  board=[[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0,0,0]];
  lastMove={"GameStatus":"WaitToStart"};
}
function GameOver(){
  lastMove.GameStatus="over";
}
function IsFinished(){
  console.log("IsFinished");
  
  for(let r=0;r<6;r++){
    for (let k = 0; k < 7; k++) {

      //row
      if(board[r][3] != 0){
        if (board[r][0] == board[r][3] ){
          if(board[r][3] == board[r][1] && board[r][3] == board[r][2]){
            return true;
          }
        }else if(board[r][6] == board[r][3]){
          if(board[r][3] == board[r][4] && board[r][3] == board[r][5]){
            return true;
          }
        }
      }

      //col

      if(board[3][k] != 0){
        if(board[0][k] == board[3][k]){
          if(board[3][k] == board[1][k] && board[3][k] == board[2][k]){
            return true;
          }
        }else if(board[5][k] == board[3][k]){
          if(board[3][k] == board[4][k] && board[3][k] == board[5][k]){
            return true;
          }
        }
      }

      // right Diag
      
      if(r < 3 && k < 4 && board[r][k] != 0){
        if(board[r][k] == board[r+3][k+3]){
          if(board[r][k] == board[r+1][k+1] && board[r][k] == board[r+2][k+2]){
            return true;
          }
        }

      }

      //left Diag
      if(r < 3 && k > 2 && board[r][k] != 0){
        if(board[r][k] == board[r+3][k-3]){
          if(board[r][k] == board[r+1][k-1] && board[r][k] == board[r+2][k-2]){

            return true;
          }
        }
      }
    }
  }
  return false;
}