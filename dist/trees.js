var tree_types = new Array();
var trees = new Array();
var max_trees = 10;
var tree_dist = 50;
var min_tree_dist = 50;

var objGeometry = new THREE.PlaneGeometry( 3 , 3 , 32);
var times_horizontal = 1;
var times_vert = 1;

function tree_load(texture){
    texture.repeat.set(times_horizontal, times_vert);
    var objMaterial = new THREE.MeshPhongMaterial({
        map: texture,
        side: THREE.DoubleSide,
        shading: THREE.FlatShading,
        transparent: true,
      });
    tree_types.push(new THREE.Mesh(objGeometry, objMaterial));
    if(tree_types.length > 3) treesInit();
}

loader1.load('./../Images/tree.png', tree_load);
loader1.load('./../Images/tree1.png', tree_load);
loader1.load('./../Images/tree4.png', tree_load);
loader1.load('./../Images/tree5.png', tree_load);

function treesInit(){
    for(var m = 0; m < max_trees;){
        var road_side = (Math.random() > 0.5 ? -1 : 1);
        var px = road_side*Math.random()*10 +(road_side == -1 ? -3 : 3) ;
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
            var c = tree_types[Math.floor(Math.random()*tree_types.length)].clone();
            c.position.set(px, 0 , pz);
            trees.push(c);
            scene.add(c);
            m++;
        } 
    }
}

function treesRepositioning(start){
    for(var i = 0; i < trees.length; i++){
        if(trees[i].position.z +3 < sonic.position.z ){
            var road_side = (Math.random() > 0.5 ? -1 : 1);
            var px = road_side*Math.random()*10 +(road_side == -1 ? -3 : 3) ;
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
                trees[i].position.set(px,0,pz);
            } 
        }
    }
}

