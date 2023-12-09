let canvas = document.getElementById("canvas")
cxt = canvas.getContext("2d");

amt = +prompt("Amont of circles?")

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}

for(i = 0;i < amt; i++){
    let x = getRandomInt(0,900)                                          
    let y = getRandomInt(0,900)                                        
    let radius = getRandomInt(0,140)                                                 
    let startAngle = 0 * Math.PI                                  
    let endAngle = 2 * Math.PI                                    
    let counterClockwise = false                                     
    
    cxt.beginPath()                                              
    cxt.arc(x, y, radius, startAngle, endAngle, counterClockwise)
    cxt.lineWidth = 15;                                          

    rng = getRandomInt(1,3)
    if(rng == 1){
        cxt.fillStyle="red"
    }
    if(rng == 2){
        cxt.fillStyle="green"
    }
    if(rng == 3){
        cxt.fillStyle="blue"
    }
    cxt.fill()
}