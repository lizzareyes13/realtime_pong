
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const ioClient = ("io");

const localPlayer = new Player (300,100);
localPlayer.initControls(2.5);
let remotePlayer = undefined;

function gameLoop(){
  ctx.clearRect(0,0,canvas.width,canvas.height);
  localPlayer.update();
  localPlayer.render(ctx);
  if(remotePlayer)remotePlayer.render(ctx);
  window.requestAnimationFrame(gameLoop);
}
gameLoop();

ioClient.on("player_moved", function(msg){
  if (!remotePlayer){
    remotePlayer = new Player (msg.x, msg.y);
  }
  remotePlayer.x = msg.x;
  remotePlayer.y = msg.y;
})
