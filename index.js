const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
const branches = document.getElementById('branches');
const angle = document.getElementById('angle');
const angleDelta = document.getElementById('angle-delta');
const len = document.getElementById('length');
const width = document.getElementById('width');
const lenChange = document.getElementById('length-percent');
const widthChange = document.getElementById('width-percent');
const initialLine = document.getElementById('initial-line');
const render = document.getElementById('render');
const randomize = document.getElementById('randomize');

const color1='white';
const color2='white';

let start;//object with x and y coordinates

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

render.addEventListener('click', () =>
{
    ctx.clearRect(0,0,canvas.width,canvas.height);
    if((widthChange.value <= 100 && widthChange.value >= 0) && (lenChange.value <=100 && lenChange.value >= 0))//percentage constraints
        drawTree(canvas.width/2,canvas.height - 250, parseInt(angle.value), parseInt(len.value), parseInt(width.value),1);
    else
        console.log('out of bounds');
});

randomize.addEventListener('click', () => 
{
    branches.value = Math.round(Math.random()*5) + 1;
    angle.value = Math.round(Math.random()*360);
    angleDelta.value = Math.round(Math.random()*360);
    len.value = Math.round(Math.random()*190) + 10;
    width.value = Math.round(Math.random()*39) + 1;
    lenChange.value = Math.round(Math.random()*75);
    widthChange.value = Math.round(Math.random()*75);//capped at 75 to avoid stack overflow
    initialLine.checked = Math.round(Math.random());
    ctx.clearRect(0,0,canvas.width,canvas.height);
    drawTree(canvas.width/2,canvas.height/2, 90, 100, 10,1);
});

function drawTree(x,y,angle,len,width,counter)
{
    if(len < 10) return;
    
    let start;
    if(counter == 1 && !initialLine.checked)
        start = {x: x,y: y};
    else
        start = drawLine(x,y,angle,len,width,color1,color2);
    
    console.log(len + ', '+start+', '+counter);
    len = len * parseInt(lenChange.value)/100;
    width = width * parseInt(widthChange.value)/100;

    drawTree(start.x, start.y,angle + parseInt(angleDelta.value),len,width,++counter);
    drawTree(start.x, start.y,angle - parseInt(angleDelta.value),len,width,++counter);
}

function drawLine(x,y,angleDeg,len,width,color1,color2,)
{
    ctx.beginPath();
    ctx.save();
    ctx.strokeStyle = color1;
    ctx.fillStyle = color2;
    ctx.lineWidth = width;
    ctx.translate(x,y);
    ctx.rotate(-angleDeg * Math.PI/180)
    ctx.moveTo(0,0);
    ctx.lineTo(len, 0);
    ctx.stroke();
    ctx.restore();

    return {x: x + len * Math.cos(angleDeg * Math.PI/180),y: y - len * Math.sin(angleDeg * Math.PI/180)};
}

//TODO branches