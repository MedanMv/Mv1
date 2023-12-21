let bird = new Image()
bird.src = './img/bird.png'

let back = new Image()
back.src = './img/back.png'

let pipeBottom = new Image()
pipeBottom.src = './img/pipeBottom.png'

let pipeUp = new Image()
pipeUp.src = './img/pipeUp.png'

let road = new Image()
road.src = './img/road.png'

// let fly = new Audio()
// fly.src = './audio/fly.mp3'

// let score = new Audio()
// score.src = './audio/score.mp3'

let canvas = document.getElementById('canvas')
let ctx = canvas.getContext('2d')

bird.onload = imageLoaded;
back.onload = imageLoaded;
pipeBottom.onload = imageLoaded;
pipeUp.onload = imageLoaded;
road.onload = imageLoaded;

canvas.height = 512
canvas.width = 256
let isRotating = false;
let rotationAngle = 0;
let yPos = 120
let velY = 0
let gravity = 0.4
let gap = 110
let pipe = []
let outPipes = []
let gameStarted = false
let imagesLoaded = 0
const totalImages = 5
let con = false
var ref = null

function startGame() {
    gameStarted = true;
    ref = setInterval(draw, 20); 
}

function imageLoaded() {
    imagesLoaded++;
    if (imagesLoaded === totalImages) {
        drawStartScreen(); // Draw start screen after all images are loaded
    }
}

function restart(){
    pipe = {}
    pipe[0] = {
        x: canvas.width,
        y: 0
    }
    gameStarted = false
    drawStartScreen()
}

pipe[0]={
    x: canvas.width,
    y: 0
}

function collisionBottom(objA,objB){
    return(
        objA.x < objB.x + pipeBottom.width &&
        objA.x + objA.width > objB.x &&
        yPos < objB.y + pipeUp.height + gap + pipeBottom.height &&
        yPos + objA.height > objB.y + pipeUp.height + gap
    )
}

function collisionTop(objA, objB) {                 //universal
    return (
        objA.x < objB.x + pipeUp.width &&
        objA.x + objA.width > objB.x &&
        yPos < objB.y + pipeUp.height &&
        yPos + objA.height > objB.y
    )
}

function drawStartScreen() {
    ctx.clearRect(0,0,canvas.width,canvas.height)
    ctx.clearRect(10,yPos,bird.width,bird.height)
    ctx.drawImage(back,0,0)
    ctx.drawImage(road,0,canvas.height - road.height)
    ctx.drawImage(bird,10,yPos)
    ctx.globalAlpha = 0.5
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 140, canvas.width, canvas.height/2.5);
    ctx.fillStyle = 'white';
    ctx.font = '30px Arial';
    ctx.fillText('Click to start', canvas.width / 2 - 100, canvas.height / 2);
    ctx.globalAlpha = 1
}

function draw(){
    if (!gameStarted) {
        imageLoaded()
    } else {
        if(con == false){
            ctx.clearRect(10,yPos,bird.width,bird.height)
            con = true
        }
        velY = velY + gravity
        yPos = yPos + velY
        ctx.drawImage(back,0,0)
        // ctx.drawImage(bird,10,yPos)
        if(yPos >= canvas.height - road.height || yPos <= 0){  
            clearInterval(ref)          //  collision(bird,pipeUp) rabotaet s pervoi
            // location.reload()
            restart()
            yPos = 150
            velY = 0
        } 
    
        for(let i = 0; i < pipe.length; i++){
            if (collisionTop(bird, pipe[i]) || collisionBottom(bird, pipe[i])) { 
                clearInterval(ref)        
                // location.reload()   
                restart()       
                yPos = 150            // !!!!
                velY = 0
            }
            if(pipe[i].x < -pipeUp.width){
                ctx.clearRect(-pipeUp.width,canvas.height,pipeUp.width,canvas.height)
            }else{
                ctx.drawImage(pipeUp, pipe[i].x, pipe[i].y)
                ctx.drawImage(pipeBottom, pipe[i].x, pipe[i].y + pipeUp.height + gap)
                pipe[i].x -= 2
            
                if(pipe[i].x == 80){
                    pipe.push({
                        x: canvas.width,
                        y: Math.floor(Math.random()*pipeUp.height)-pipeUp.height
                    })
                }
            }  
        }
        ctx.drawImage(road,0,canvas.height - road.height)
    
        ctx.save();
    
        ctx.translate(10 + bird.width / 2, yPos + bird.height / 2);
    
        ctx.rotate((Math.PI / 180) * rotationAngle);
    
        ctx.drawImage(bird, -bird.width / 2, -bird.height / 2, bird.width, bird.height);
    
        ctx.restore();
        // Your game rendering logic here...
        // ...
    }
}

canvas.addEventListener('mousedown', function(event) {
    if (event.button === 0) { 
        moveUp()
        rotationAngle -= 37;
    }
});

canvas.addEventListener('mouseup', function(event) {
    if (!gameStarted && event.button === 0) { // Left mouse button clicked and game not started
    startGame();
}
    if (event.button === 0) { // Left mouse button released
        isRotating = false;
        rotationAngle = 0; // Reset rotation angle when the mouse is released
    }
});

let posX = 10
let posY = yPos

function moveUp(){
    velY = -6
}

// setInterval(draw,20)
