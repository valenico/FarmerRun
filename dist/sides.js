var tree1, tree2, tree3, tree4;
var trees = new Array();
var max_trees = 10;
var tree_dist = 50;
var min_tree_dist = 50;

var objGeometry = new THREE.PlaneGeometry( 3 , 3 , 32);
var times_horizontal = 1;
var times_vert = 1;

var p = 0;


var FLOOR_RES = 20;
var FLOOR_THICKNESS = 10;
var snoise = new ImprovedNoise();
var noiseScale = 3;
var noiseSeed = Math.random() * 100;
var stepCount = 0; 

var SideConfig = {
  //const dimensions
  FLOOR_WIDTH: 100,  // size of floor in x direction
  FLOOR_DEPTH: 500,  //size of floor in z direction
  MOVE_STEP: 500    //z distance to move before recreating a new floor strip

};

loader1.load('./../Images/grass1.jpg', load_grass);

function load_grass(texture){
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;

  var times_horizontal = 20; 
  var times_vert = 80; 
  var objGeometry = new THREE.PlaneGeometry( SideConfig.FLOOR_WIDTH, SideConfig.FLOOR_DEPTH , FLOOR_RES,FLOOR_RES );
  texture.repeat.set(times_horizontal, times_vert);

  side1 = createSide(objGeometry,texture, 53 , 0);
  side2 = createSide(objGeometry,texture, -53 , 0);
  side3 = createSide(objGeometry,texture, 53 , 500);
  side4 = createSide(objGeometry,texture,-53 , 500);
  scene.add(side1);
  scene.add(side2);
  scene.add(side3);
  scene.add(side4);
}

loader1.load('./../Images/tree.png', function(texture){
    texture.repeat.set(times_horizontal, times_vert);
    var objMaterial = new THREE.MeshPhongMaterial({
        map: texture,
        side: THREE.DoubleSide,
        shading: THREE.FlatShading,
        transparent: true,
      });
    tree1 = new THREE.Mesh(objGeometry, objMaterial);
});

loader1.load('./../Images/tree1.png', function(texture){
    texture.repeat.set(times_horizontal, times_vert);
    var objMaterial = new THREE.MeshPhongMaterial({
        map: texture,
        side: THREE.DoubleSide,
        shading: THREE.FlatShading,
        transparent: true,
      });
    tree2 = new THREE.Mesh(objGeometry, objMaterial);
});

loader1.load('./../Images/tree4.png', function(texture){
    texture.repeat.set(times_horizontal, times_vert);
    var objMaterial = new THREE.MeshPhongMaterial({
        map: texture,
        side: THREE.DoubleSide,
        shading: THREE.FlatShading,
        transparent: true,
      });
    tree3 = new THREE.Mesh(objGeometry, objMaterial);
});

loader1.load('./../Images/tree5.png', function(texture){
    texture.repeat.set(times_horizontal, times_vert);
    var objMaterial = new THREE.MeshPhongMaterial({
        map: texture,
        side: THREE.DoubleSide,
        shading: THREE.FlatShading,
        transparent: true,
      });
    tree4 = new THREE.Mesh(objGeometry, objMaterial);
    treesInit();
});


function createSide(floorGeometry,texture,posx, posz){
  var floorMaterial = new THREE.MeshLambertMaterial({
      map: texture,
      color: 0x1df348,
      shading: THREE.FlatShading, 
      side: THREE.DoubleSide,
    });

  //add extra x width
  var floorGeometry = new THREE.PlaneGeometry( SideConfig.FLOOR_WIDTH, SideConfig.FLOOR_DEPTH , FLOOR_RES,FLOOR_RES );
  var floorMesh = new THREE.Mesh( floorGeometry, floorMaterial );
  floorMesh.rotation.x = Math.PI/2;
  floorMesh.position.y = 0;
  floorMesh.position.x = posx;
  floorMesh.position.z = posz;

  var i;
  var ipos;
  var offset = stepCount *SideConfig.MOVE_STEP/SideConfig.FLOOR_DEPTH * FLOOR_RES;

  for( i = 0; i < FLOOR_RES + 1; i++) {
    for( var j = 0; j < FLOOR_RES + 1; j++) {
      ipos = i + offset;
      if(posx > 0){
        if(i < 3 || i > FLOOR_RES - 3) floorGeometry.vertices[i * (FLOOR_RES + 1)+ j].z = 0; 
        else if(j < 3) floorGeometry.vertices[i * (FLOOR_RES + 1)+ j].z = snoise.noise(ipos/FLOOR_RES * noiseScale, j/FLOOR_RES * noiseScale, noiseSeed ) * FLOOR_THICKNESS*j/4;
        else if(j > FLOOR_RES - 3) floorGeometry.vertices[i * (FLOOR_RES + 1)+ j].z = 0; 
        else floorGeometry.vertices[i * (FLOOR_RES + 1)+ j].z = snoise.noise(ipos/FLOOR_RES * noiseScale, j/FLOOR_RES * noiseScale, noiseSeed ) * FLOOR_THICKNESS;        
      } else {
        if(i < 3 || i > FLOOR_RES - 3) floorGeometry.vertices[i * (FLOOR_RES + 1)+ j].z = 0; 
        else if(j< 3) floorGeometry.vertices[i * (FLOOR_RES + 1)+ j].z = 0; 
        else if(j > FLOOR_RES - 4) floorGeometry.vertices[i * (FLOOR_RES + 1)+ j].z = snoise.noise(ipos/FLOOR_RES * noiseScale, j/FLOOR_RES * noiseScale, noiseSeed ) * FLOOR_THICKNESS*(-j+FLOOR_RES)/4; 
        else floorGeometry.vertices[i * (FLOOR_RES + 1)+ j].z = snoise.noise(ipos/FLOOR_RES * noiseScale, j/FLOOR_RES * noiseScale, noiseSeed ) * FLOOR_THICKNESS;
      }
    }
  }
  floorGeometry.verticesNeedUpdate = true;
  return floorMesh;

}


function treesInit(){
    for(var m = 0; m < max_trees;){
        var road_side = (Math.random() > 0.5 ? -1 : 1);
        var px = road_side*Math.random()*10 +(road_side == -1 ? -4 : 4);
        var pz = Math.random()*tree_dist + 10;
        var put = true;
        for(var l = 0; l < trees.length; l++){
            var x1 = px <= trees[l].position.x + error*3;
            var x2 = px >= trees[l].position.x - error*3;
            var z1 = pz <= trees[l].position.z + error*3;
            var z2 = pz >= trees[l].position.z - error*3;
            if(x1 && x2 && z1 && z2){
                put = false;
                break;
            }
        }

        if(put){ 
            if( p == 0 ){
                c = tree1.clone();
                p++;
            } else if( p == 1 ){
                c = tree2.clone();
                p++;
            } else if( p == 2 ){
                c= tree3.clone();
                p++;
            } else {
                c = tree4.clone();
                p = 0;
            }
            c.position.set(px, 1 , pz);
            trees.push(c);
            scene.add(c);
            m++;
        } 
    }
}

function treesRepositioning(start){
    for(var i = 0; i < trees.length; i++){
        if(trees[i].position.z + 2 < sonic.position.z ){
            var road_side = (Math.random() > 0.5 ? -1 : 1);
            var px = road_side*Math.random()*10 +(road_side == -1 ? -4 : 4) ;
            var pz = Math.random()*tree_dist + start + min_tree_dist;
            var put = true;
            for(var l = 0; l < trees.length; l++){
                var x1 = px <= trees[l].position.x + error*3;
                var x2 = px >= trees[l].position.x - error*3;
                var z1 = pz <= trees[l].position.z + error*3;
                var z2 = pz >= trees[l].position.z - error*3;
                if(x1 && x2 && z1 && z2){
                    put = false;
                    break;
                }
            }

            if(put){
                scene.remove(trees[i]);
                trees.splice(i,1);
                if( p == 0 ){
                    c = tree1.clone();
                    p++;
                } else if( p == 1 ){
                    c = tree2.clone();
                    p++;
                } else if( p == 2 ){
                    c= tree3.clone();
                    p++;
                } else {
                    c = tree4.clone();
                    p = 0;
                }
                c.position.set(px, 1 , pz);
                trees.push(c);
                scene.add(c);
            } 
        }
    }
}

