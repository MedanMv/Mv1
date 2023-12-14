document.addEventListener("DOMContentLoaded", function () {

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
    
    let fly = new Audio()
    fly.src = './audio/fly.mp3'
    
    let score = new Audio()
    score.src = './audio/score.mp3'
    
    let canvas = document.getElementById('canvas')
    let ctx = canvas.getContext('2d')
    
    canvas.height = 512
    canvas.width = 256
    
    let isRotating = false;
    let rotationAngle = 0;
    
    let yPos = 150
    let velY = 0
    let gravity = 0.4
    
    let gap = 110
    let pipe = []
    let outPipes = []
    
    
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
    
    function draw(){
        velY = velY + gravity
        yPos = yPos + velY
        ctx.drawImage(back,0,0)
        // ctx.drawImage(bird,10,yPos)
        if(yPos >= canvas.height - road.height || yPos <= 0){             //  collision(bird,pipeUp) rabotaet s pervoi
            location.reload()
            yPos = 150
            velY = 0
        } 
    
        for(let i = 0; i < pipe.length; i++){
            if (collisionTop(bird, pipe[i]) || collisionBottom(bird, pipe[i])) {         
                location.reload()           
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
        if (isRotating) {
            rotationAngle += 3;
        }
    
        ctx.save();
    
        ctx.translate(10 + bird.width / 2, yPos + bird.height / 2);
    
        ctx.rotate((Math.PI / 180) * rotationAngle);
    
        ctx.drawImage(bird, -bird.width / 2, -bird.height / 2, bird.width, bird.height);
    
        ctx.restore();
    }
    
    canvas.addEventListener('mousedown', function(event) {
        if (event.button === 0) { 
            rotationAngle -= 37;
        }
    });
    
    canvas.addEventListener('mouseup', function(event) {
        if (event.button === 0) { // Left mouse button released
            isRotating = false;
            rotationAngle = 0; // Reset rotation angle when the mouse is released
        }
    });
    
    canvas.addEventListener('mousedown', moveUp)
    
    
    let posX = 10
    let posY = yPos

    moveUp()
    
    function moveUp(){
        velY = -6
        // fly.play()
    }
    
    setInterval(draw,20)

})
