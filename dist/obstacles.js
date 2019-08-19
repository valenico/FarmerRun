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
        obs[index].rotation.z = or;
        obs[index].position.set(px, or == 80.1 ? 0.25 : 1.25, pz);
    } 
}

function delete_obs(){
    for(var k = 0; k < obs.length; k++){
        if(obs[k].position.z < sonic.position.z - 2){
            repositioningObstacle( k , sonic.position.z );
        }
    }
}
