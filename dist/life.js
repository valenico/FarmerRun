var heart;
var can_get_heart = false;
var max_hearts = 3;
var num_hearts = max_hearts;

loader.load( './scene.gltf', function ( gltf ) {
    heart = gltf.scene;
    heart.name = "heart";
    heart.position.set(0, -5, 5);
    heart.scale.set(0.007, 0.007, 0.007);
    scene.add(heart)
});


var distance = 15;
var min_distance = 10;


var life1 = document.createElement('img');
life1.style.position = 'absolute';
life1.src = './../Images/life.png';
life1.style.height = 40 + 'px';
life1.style.top = 20 + 'px';
life1.style.right = 40 + 'px';
document.body.appendChild(life1);

var life2 = document.createElement('img');
life2.style.position = 'absolute';
life2.src = './../Images/life.png';
life2.style.height = 40 + 'px';
life2.style.top = 20 + 'px';
life2.style.right = 90 + 'px';
document.body.appendChild(life2);

var life3 = document.createElement('img');
life3.style.position = 'absolute';
life3.src = './../Images/life.png';
life3.style.height = 40 + 'px';
life3.style.top = 20 + 'px';
life3.style.right = 140 + 'px';
document.body.appendChild(life3);



function heartSpawn(start){
    if(Math.random() > 0.1){
        var px =  Math.floor(Math.random() * 4.5) - 2.25;
        var py = (Math.random() + 0.5);
        var pz = Math.random()*distance + min_distance + start;

        var put = true;
        for(var i = 0 ; i < rings.length; i++){
            var z = pz <= rings[i].position.z + error;
            var z1 = pz >= rings[i].position.z - error;
            var y = py <= rings[i].position.y + error;
            var y1  = py >= rings[i].position.y - error;
            var x = px <= rings[i].position.x + error;
            var x2 = px >= rings[i].position.x - error;
            if(z && z1 && x && x2 && y && y1){
                put = false;
                break;
            }
        }

        for(i = 0 ; i < obs.length; i++){
            var z = pz <= obs[i].position.z + error;
            var z1 = pz >= obs[i].position.z - error;
            if(obs[i].rotation.z == 80.1){ // horizontal
                var x1 = px >= obs[i].position.x - error*2.5;
                var x2 = px <= obs[i].position.x + error*2.5;
                var y = py < 0.5 + error;
            } else { // vertical 
                var x1 = px >= obs[i].position.x - error;
                var x2 = px <= obs[i].position.x + error;
                var y = true;
            }
            if(z && z1 && x1 && x2 && y){
                put = false;
                break;
            }
        }
        
        if(put){
            heart.position.set(px, py, pz);
        } else {
            heartSpawn(start);
        }
    }
}


function getDamage(){
    if(life3.src.slice(-10,-4) != 'nolife'){
        life3.src = './../Images/nolife.png';
        can_get_heart = true;
        return;
    } else if(life2.src.slice(-10,-4) != 'nolife'){
        life2.src = './../Images/nolife.png';
        return;
    } else if(life1.src.slice(-10,-4) != 'nolife'){
        life1.src = './../Images/nolife.png';
        return;
    } else {
        window.alert("Game Over!");
    }
}


function check_lives(){
    if(life1.src.slice(-10,-4) == 'nolife'){
        life1.src = './../Images/life.png';        
        return;    
    } else if(life2.src.slice(-10,-4) == 'nolife'){
        life2.src = './../Images/life.png';
        return;
    } else if(life3.src.slice(-10,-4) == 'nolife'){
        life3.src = './../Images/life.png';
        can_get_heart = false;
        return;
    }
    return;
}


function getHeart(){

    if(heart.position.z + 3 < sonic.position.z) {
        heartSpawn(sonic.position.z);
        return;
    }

    var z = sonic.position.z <= heart.position.z + error;
    var z1 = sonic.position.z >= heart.position.z - error;
    var y = sonic.position.y <= heart.position.y + error;
    var y2 = sonic.position.y >= heart.position.y - error;
    var x = sonic.position.x <= heart.position.x + error;
    var x2 = sonic.position.x >= heart.position.x - error;
    if(z && z1 && y && y2 && x && x2 && can_get_heart){
        check_lives();
        heartSpawn(sonic.position.z);
    }
}
