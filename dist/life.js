var heart_loader = new THREE.GLTFLoader();
heart_loader.crossOrigin = true;

var heart;
var can_get_heart = false;
var max_hearts = 3;
var num_hearts = max_hearts;

heart_loader.load( './../models/heart/scene.gltf', function ( gltf ) {
    heart = gltf.scene;
    heart.name = "heart";
    heart.position.set(0, 1, 5);
    heart.scale.set(0.4,0.4,0.4);
    scene.add(heart);
});

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

function check_lives(){
    if(life3.src.slice(-10,-4) != 'nolife'){
        life3.src = './../Images/nolife.png';
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

function getHeart(){
    var z = sonic.position.z <= heart.position.z + error;
    var z1 = sonic.position.z >= heart.position.z - error;
    var y = sonic.position.y <= heart.position.y + error;
    var y2 = sonic.position.y >= heart.position.y - error;
    var x = sonic.position.x <= heart.position.x + error;
    var x2 = sonic.position.x >= heart.position.x - error;
    if(z && z1 && y && y2 && x && x2 && !max_hearts){

    }
}