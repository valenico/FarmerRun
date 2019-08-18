var d = 10;
var obs = new Array();
var n_obs = 0;

// creation of a column object as obstacle, to clone/move 
var cgeometry = new THREE.CylinderBufferGeometry( 0.5 , 0.5, 2.5, 32 );
var cmaterial = new THREE.MeshLambertMaterial( {color: 'gray'} );
var cylinder = new THREE.Mesh( cgeometry, cmaterial );

function generate_obstacle(){  
    while(n_obs <= 5){
        var posz = (Math.random() + 5)*d + sonic.position.z;
        var posx = (Math.random() > 0.5 ? -1 : 1)*Math.random()*2.5;
        var put = true; 
        for(var i = 0; i < rings.length; i++){
            if((rings[i].position.z <= posz + 0.5 || rings[i].position.z >= posz - 0.5) && (rings[i].position.x <= posx + 0.5 || rings[i].position.z >= posx - 0.5)){
                put = false;
                break;
            }
        }
        if(put){
            c = cylinder.clone();
            c.position.set(posx, 1.25 , posz);
            obs.push(c);
            scene.add(c);
            n_obs++;
        }
    }
}

function repositioningObstacle(index, from){
    var posz = (Math.random() + 5)*d + from;
    var posx = (Math.random() > 0.5 ? -1 : 1)*Math.random()*2.5;
    var put= true;
    for(var i = 0; i < rings.length; i++){
        if((rings[i].position.z <= posz + 0.5 || rings[i].position.z >= posz - 0.5) && (rings[i].position.x <= posx + 0.5 || rings[i].position.z >= posx - 0.5)){
            put = false;
            break;
        }
    }
    if(put){
        obs[index].position.set(posx, 1.25, posz);
    } else {
        //repositioningObstacle(index, posz);
        obs[index].position.set(posx, 1.25, posz + 15);
    }
    
}

function delete_obs(){
    for(var k = 0; k < obs.length; k++){
        if(obs[k].position.z < sonic.position.z ){
            repositioningObstacle( k , sonic.position.z );
        }
    }
}