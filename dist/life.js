var life1 = document.createElement('img');
life1.style.position = 'absolute';
life1.src = './life.png';
life1.style.height = 40 + 'px';
life1.style.top = 20 + 'px';
life1.style.left = 40 + 'px';
document.body.appendChild(life1);

var life2 = document.createElement('img');
life2.style.position = 'absolute';
life2.src = './life.png';
life2.style.height = 40 + 'px';
life2.style.top = 20 + 'px';
life2.style.left = 90 + 'px';
document.body.appendChild(life2);

var life3 = document.createElement('img');
life3.style.position = 'absolute';
life3.src = './life.png';
life3.style.height = 40 + 'px';
life3.style.top = 20 + 'px';
life3.style.left = 140 + 'px';
document.body.appendChild(life3);

function check_lives(){
    if(life3.src.slice(-10,-4) != 'nolife'){
        life3.src = './nolife.png';
        return;
    } else if(life2.src.slice(-10,-4) != 'nolife'){
        life2.src = './nolife.png';
        return;
    } else if(life1.src.slice(-10,-4) != 'nolife'){
        life1.src = './nolife.png';
        return;
    } else {
        window.alert("Game Over!");
    }
}