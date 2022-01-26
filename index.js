const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
const branches = document.getElementById('branches');
const angle = document.getElementById('angle');
const initialLine = document.getElementById('initial-line');
const render = document.getElementById('render');
const randomize = document.getElementById('randomize');

const color1='white';
const color2='white';

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

render.addEventListener('click', () =>
{
    ctx.clearRect(0,0,canvas.width,canvas.height);
    drawTree(canvas.width/2,canvas.height - 80, 90, parseInt(angle.value), 100, 10);
});

randomize.addEventListener('click', () => 
{
    const angleVal = Math.round(Math.random()*360);
    const branchVal = Math.round(Math.random()*10);
    angle.value = angleVal;
    branches.value = branchVal;
    ctx.clearRect(0,0,canvas.width,canvas.height);
    drawTree(canvas.width/2,canvas.height - 80, 90, parseInt(angle.value), 100, 10);
});

function drawTree(x,y,angle,angleDelta,length,width)
{
    //console.log(length);
    if(length < 10) return;
    const start = drawLine(x,y,angle,length,width,color1,color2);
    
    drawTree(start.x, start.y,angle + angleDelta, angleDelta, length * 0.75, width * 0.75);
    drawTree(start.x, start.y,angle - angleDelta, angleDelta, length * 0.75, width * 0.75);
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

//TODO branches and original line off