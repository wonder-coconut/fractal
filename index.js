const canvas = document.querySelector('canvas');
const generateBtn = document.getElementById('generate');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const ctx = canvas.getContext('2d');

function drawTree(x,y,angle,length,width,color1,color2)
{
    console.log(length);
    if(length < 10) return;
    const start = drawLine(x,y,angle,length,width,color1,color2);
    
    drawTree(start.x, start.y,angle + 90, length * 0.75, width * 0.75, color1, color2);
    drawTree(start.x, start.y,angle - 90, length * 0.75, width * 0.75, color1, color2);
}

function drawLine(x,y,angleDeg,length,width,color1,color2,)
{
    ctx.beginPath();
    ctx.save();
    ctx.strokeStyle = color1;
    ctx.fillStyle = color2;
    ctx.lineWidth = width;
    ctx.translate(x,y);
    ctx.rotate(-angleDeg * Math.PI/180)
    ctx.moveTo(0,0);
    ctx.lineTo(length, 0);
    ctx.stroke();
    ctx.restore();

    return {x: x + length * Math.cos(angleDeg * Math.PI/180),y: y - length * Math.sin(angleDeg * Math.PI/180)};
}

drawTree(canvas.width/2,canvas.height - 100, 90, 250, 10, 'white', 'white');