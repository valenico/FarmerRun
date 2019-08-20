var distance = 15;
var min_distance = 10;
var shield_time = 0;
var shield_to_spawn = true;
var sgeometry = new THREE.SphereGeometry( 0.5 , 32, 32 );
var smaterial = new THREE.MeshPhongMaterial({
  color: 0x87cefa,
  opacity: 0.35,
  transparent : true,
});
var shield = new THREE.Mesh( sgeometry, smaterial );
shield.position.set(0,0,-10);
shield.visible = false;
scene.add(shield);

var shield_on = false;

function spawn_shield(start){
    if(shield_to_spawn && Math.random() > 0.999){
        var px = (Math.random() > 0.5 ? -1 : 1)*Math.random()*2.5;
        var pz = Math.random()*distance + min_distance + start;

        var put = true;
        for(var i = 0 ; i < rings.length; i++){
            var z = shield.position.z <= rings[i].position.z + error;
            var z1 = shield.position.z >= rings[i].position.z - error;
            var x = shield.position.x <= rings[i].position.x + error;
            var x2 = shield.position.x >= rings[i].position.x - error;
            if(z && z1 && x && x2){
                put = false;
                break;
            }
        }

        for(i = 0 ; i < obs.length; i++){
            var z = shield.position.z <= obs[i].position.z + error;
            var z1 = shield.position.z >= obs[i].position.z - error;
            if(obs[i].rotation.z == 80.1){ // horizontal
                var x1 = eggman.position.x >= obs[i].position.x - error*2.5;
                var x2 = eggman.position.x <= obs[i].position.x + error*2.5;
            } else { // vertical 
                var x1 = eggman.position.x >= obs[i].position.x - error;
                var x2 = eggman.position.x <= obs[i].position.x + error;
            }
            if(z && z1 && x1 && x2){
                put = false;
                break;
            }
        }
        
        if(put){
            shield.position.set(px, 0.5, pz);
            shield.visible = true;
            shield_to_spawn = false;
        } else {
            spawn_shield(start);
        }
    }
}

function getshield(){
    var z = sonic.position.z <= shield.position.z + error;
    var z1 = sonic.position.z >= shield.position.z - error;
    var y = sonic.position.y <= shield.position.y + error;
    var y2 = sonic.position.y >= shield.position.y - error;
    var x = sonic.position.x <= shield.position.x + error;
    var x2 = sonic.position.x >= shield.position.x - error;
    if(z && z1 && y && y2 && x && x2 && !shield_on){
        invincibility = true;
        shield_on = true;
    }
}

function remove_shield(){
    invincibility = false;
    shield_on = false;
    shield.position.set(0,0,-10);
    shield_time = 0;
    shield_to_spawn = true;
    shield.visible = false;
}

function update_shield(){
    if(shield_on){
        shield.position.set(sonic.position.x, sonic.position.y + 0.5, sonic.position.z);
        shield_time +=1;
    } else if(shield_on == false && shield_to_spawn == false && shield.position.z < sonic.position.z){
        shield_to_spawn = true;
        shield.visible = false;
    }

    if(shield_time == 240 && shield_on){
        remove_shield();
    }
}
