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
const renderBtn = document.getElementById('render');
const randomizeBtn = document.getElementById('randomize');
const animateShapeBtn = document.getElementById('animateShape');
const animateClrBtn = document.getElementById('animateColour');
const animateBtn = document.getElementById('animate');

const angleIncrement = 1;
const timeInterval = 100;

let red,green,blue,alpha;
red = green = blue = 255;
alpha = 1;

let color1= 'rgb(' + red + ',' + green + ',' + blue + ',' + alpha + ')';
let color2= 'rgb(' + red + ',' + green + ',' + blue + ',' + alpha + ')';

let start;//object with x and y coordinates

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

document.addEventListener('keydown', (e) => 
{
    if(e.keyCode === 13)
        render();
});

renderBtn.addEventListener('click', render);

animateShapeBtn.addEventListener('click', animateShape);

animateClrBtn.addEventListener('click', animateColour);

animateBtn.addEventListener('click', animate);

randomizeBtn.addEventListener('click', () => 
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
    drawTree(canvas.width/2,canvas.height/2, 90, 100, 10,0);
});

function render()
{
    ctx.clearRect(0,0,canvas.width,canvas.height);
    if((widthChange.value <= 100 && widthChange.value >= 0) && (lenChange.value <=100 && lenChange.value >= 0))//percentage constraints
        drawTree(canvas.width/2, 3*canvas.height/4, parseFloat(angle.value), parseInt(len.value), parseInt(width.value),0);
    else
        console.log('out of bounds');
}

function animateShape()
{
    const angleTimeInterval = timeInterval;
    for (let angle = 0; angle <= 360; angle += angleIncrement)
    {
        setTimeout(() => {
            angleDelta.value = angle;
            render();
        }, timeInterval*(angle));
    }
}

function animateColour()
{
    red = 255;
    blue = green = 0;

    const range = 256*6;
    const colourIncrement = range/360.0 * angleIncrement;
    const colourTimeInterval = timeInterval/range * 360;

    for (let i = 0; i < range; i += colourIncrement)
    {
        setTimeout(() => {
            if(i < 256)
                blue = i;
            else if(i >= 256 & i < 512)
                red = 512 - i;
            else if(i >= 512 & i < 768)
                green = i - 512;
            else if(i >= 768 & i < 1024)
                blue = 1024 - i;
            else if(i >= 1024 & i < 1280)
                red = i - 1024;
            else if(i >= 1280 & i < 1536)
                green = 1536 - i;
            
            color1 = color2 = 'rgb(' + red + ',' + green + ',' + blue + ',' + alpha + ')';
            render();
        }, colourTimeInterval * i);
    }
}

function animate()
{
    red = 255;
    blue = green = 0;

    const range = 256*6;
    const colourIncrement = range/360.0 * angleIncrement;
    const colourTimeInterval = timeInterval/range * 360;

    for (let i = 0; i < range; i += colourIncrement)
    {
        setTimeout(() => {
            if(i < 256)
                blue = i;
            else if(i >= 256 & i < 512)
                red = 512 - i;
            else if(i >= 512 & i < 768)
                green = i - 512;
            else if(i >= 768 & i < 1024)
                blue = 1024 - i;
            else if(i >= 1024 & i < 1280)
                red = i - 1024;
            else if(i >= 1280 & i < 1536)
                green = 1536 - i;
            
            angleDelta.value = i/range * 360.0;

            color1 = color2 = 'rgb(' + red + ',' + green + ',' + blue + ',' + alpha + ')';
            render();
        }, colourTimeInterval * i);
    }
}

function drawTree(x,y,angle,len,width,counter)
{
    counter ++;
    if(len < 10) return;
    
    let start;
    if(counter == 1 && !initialLine.checked)
        start = {x: x,y: y};
    else
        start = drawLine(x,y,angle,len,width,color1,color2);
    
    //console.log(len + ', '+start+', '+counter);
    len = len * parseInt(lenChange.value)/100;
    width = width * parseInt(widthChange.value)/100;

    let initialAngle = angle - (parseFloat(branches.value) - 1) * parseFloat(angleDelta.value) / 2;
    for(let i = 0; i < branches.value ; i++)
    {
        drawTree(start.x, start.y, initialAngle + i * angleDelta.value, len, width, counter);
    }
    /*drawTree(start.x, start.y,angle + parseFloat(angleDelta.value),len,width,++counter);
    drawTree(start.x, start.y,angle - parseFloat(angleDelta.value),len,width,++counter);*/
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
