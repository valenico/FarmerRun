var d = 30;
var obs = new Array();
var min_dist = 25;
var n_obs = 0;
var max_obs = 5;

// creation of a column object as obstacle, to clone/move 
var cgeometry = new THREE.CylinderBufferGeometry( 0.5 , 0.5, 2.5, 32 );
var cmaterial = new THREE.MeshLambertMaterial( {color: 'gray'} );
var cylinder = new THREE.Mesh( cgeometry, cmaterial );

function generate_obstacle(){  
    for(; n_obs <= max_obs; ){
        var pz = Math.random()*d;
        var or = Math.random() > 0.5 ? cylinder.rotation.z : 80.1;
        var px = (Math.random() > 0.5 ? -1 : 1)*2.5*Math.random();
        var put = true; 
        for(var i = 0; i < rings.length; i++){
            var z1 = pz <= rings[i].position.z + 2; 
            var z2 = pz >= rings[i].position.z - 2;
            var x1 = px >= rings[i].position.x - 3;
            var x2 = px <= rings[i].position.x + 3;
            if(z1 && z2 && x1 && x2){
                put = false;
                break;
            }
        } 
        for(var l = 0; l < n_obs; l++){
            var z1 = pz <= obs[l].position.z + 2; 
            var z2 = pz >= obs[l].position.z - 2;
            var x1 = px >= obs[l].position.x - 3;
            var x2 = px <= obs[l].position.x + 3;
            if(z1 && z2 && x1 && x2){
                put = false;
                break;
            }
        }
        if(put){
            c = cylinder.clone();
            c.rotation.z = or;
            c.position.set(px, or == cylinder.rotation.z ? 1.25 : 0.25 , pz);
            obs.push(c);
            scene.add(c);
            n_obs++;
        }
    }
}

function repositioningObstacle(index, from){
    var pz = Math.random()*d + from + min_dist;
    var or = Math.random() > 0.5 ? cylinder.rotation.z : 80.1;
    var px = (Math.random() > 0.5 ? -1 : 1)*Math.random()*2.5;
    var put= true;
    for(var i = 0; i < rings.length; i++){
        var group = Math.floor(i/size);
        if(or != 80.1 || lines_type[group] == 0){ //tall obstacle OR flat rings line
            var z1 = pz <= rings[i].position.z + 2; 
            var z2 = pz >= rings[i].position.z - 2;
            var x1 = px >= rings[i].position.x - 2;
            var x2 = px <= rings[i].position.x + 2;
            if(z1 && z2 && x1 && x2){
                console.log("RINGSSSSS");
                put = false;
                break;
            }
        }
        else { // short obstacles AND curve rings line
            var id = i%size;
            var parent = i - id;
            var z1 = pz <= rings[parent].position.z + 1; 
            var z2 = pz >= rings[parent].position.z - 1;
            var x1 = px >= rings[parent].position.x - 3;
            var x2 = px <= rings[parent].position.x + 3;

            var z3 = pz <= rings[parent+4].position.z + 2; 
            var z4 = pz >= rings[parent+4].position.z - 2;
            var x3 = px >= rings[parent+4].position.x - 3;
            var x4 = px <= rings[parent+4].position.x + 3;
            if(z1 && z2 && x1 && x2 && z3 && z4 && x3 && x4){

                console.log("COLLISIONNN");
                put = false;
                break;
            }
        }
    }
    for(var l = 0; l < n_obs; l++){
        var z1 = pz <= obs[l].position.z + 2; 
        var z2 = pz >= obs[l].position.z - 2;
        var x1 = px >= obs[l].position.x - 3;
        var x2 = px <= obs[l].position.x + 3;
        if(z1 && z2 && x1 && x2){
            console.log("OBSTACLEE");
            put = false;
            break;
        }
    }
    if(put){
        obs[index].rotation.z = or;
        obs[index].position.set(px, or == 80.1 ? 0.25 : 1.25, pz);
    } else {
        //console.log("NOPEEE");
        repositioningObstacle(index, from);
    }
}

function collision(){
    if(invincibility) return;
    var s = true;
    for(var l = 0; l < n_obs; l++){
        var z1 = sonic.position.z <= obs[l].position.z + error; 
        var z2 = sonic.position.z >= obs[l].position.z - error;
        if(obs[l].rotation.z != 80.1){
            var x1 = sonic.position.x >= obs[l].position.x - error;
            var x2 = sonic.position.x <= obs[l].position.x + error;
        } else {
            var x1 = sonic.position.x >= obs[l].position.x - error*2.5;
            var x2 = sonic.position.x <= obs[l].position.x + error*2.5;
            s = sonic.position.y <= 0.5;
        }
        if(z1 && z2 && x1 && x2 && s){
            score -=100;
            damage_feedback();
        }
    }
}

function delete_obs(){
    for(var k = 0; k < obs.length; k++){
        if(obs[k].position.z < sonic.position.z - 2){
            repositioningObstacle( k , sonic.position.z );
        }
    }
}

var rubble;
loader.load('./../models/rubble/scene.gltf', function(gltf){
    rubble = gltf.scene;
    rubble.scale.set(0.005,0.005,0.005);
    rubble.rotation.y = 80.1;
    rubble.visible = false;
    scene.add(rubble);
});

function break_walls(){
    for(var l = 0; l < n_obs; l++){
        var z1 = eggman.position.z <= obs[l].position.z + error; 
        var z2 = eggman.position.z >= obs[l].position.z - error;
        if(obs[l].rotation.z == 80.1){ // horizontal
            var x1 = eggman.position.x >= obs[l].position.x - error*2.5;
            var x2 = eggman.position.x <= obs[l].position.x + error*2.5;
        } else { // vertical 
            var x1 = eggman.position.x >= obs[l].position.x - error;
            var x2 = eggman.position.x <= obs[l].position.x + error;
        }
        if(z1 && z2 && x1 && x2){
            repositioningObstacle( l , sonic.position.z);
            rubble.position.set(eggman.position.x, 0, eggman.position.z);
            rubble.visible = true;
        }
    }
}
