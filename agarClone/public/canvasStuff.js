function init(){
    draw()
}

// ================================
// =============DRAWING============
// ================================
player.locX = Math.floor(500*Math.random() + 100)
player.locY = Math.floor(500*Math.random() + 100)

function draw(){
    context.beginPath()
    context.fillStyle = "rgb(255,230,230)"
    // arg1,2 = x,y of the center of the arc
    // arg3 = radius
    // arg4 = where to start on the circle in radians, 0 = 3:00
    // arg5 = where to stop in radians
    context.arc(player.locX,player.locY,10,0,Math.PI*2)
    context.fill()
    context.lineWidth = 3;
    context.strokeStyle = 'rgb(0,255,0)'
    context.stroke()
    requestAnimationFrame(draw)
}

function getMousePosition(event){
	var rect = canvas.getBoundingClientRect();
	return {
		x: Math.round((event.clientX-rect.left)/(rect.right-rect.left)*canvas.width),
		y: Math.round((event.clientY-rect.top)/(rect.bottom-rect.top)*canvas.height)
	};
}

canvas.addEventListener('mousemove',(event)=>{
    console.log(event)
    var mousePosition = getMousePosition(event);
    var angleDeg = Math.atan2(mousePosition.y - (canvas.height/2), mousePosition.x - (canvas.width/2)) * 180 / Math.PI;
    if(angleDeg >= 0 && angleDeg < 90){
        xVector = 1 - (angleDeg/90);
        yVector = -(angleDeg/90);
    }else if(angleDeg >= 90 && angleDeg <= 180){
        xVector = -(angleDeg-90)/90;
        yVector = -(1 - ((angleDeg-90)/90));
    }else if(angleDeg >= -180 && angleDeg < -90){
        xVector = (angleDeg+90)/90;
        yVector = (1 + ((angleDeg+90)/90));
    }else if(angleDeg < 0 && angleDeg >= -90){
        xVector = (angleDeg+90)/90;
        yVector = (1 - ((angleDeg+90)/90));
    }

    
    speed = 10
    xV = xVector;
    yV = yVector;

    if((player.locX < 5 && player.xVector < 0) || (player.locX > 500) && (xV > 0)){
        player.locY -= speed * yV;
    }else if((player.locY < 5 && yV > 0) || (player.locY > 500) && (yV < 0)){
        player.locX += speed * xV;
    }else{
        player.locX += speed * xV;
        player.locY -= speed * yV;
    }    
})

