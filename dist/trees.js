var tree1, tree2, tree3, tree4;
var trees = new Array();
var max_trees = 10;
var tree_dist = 50;
var min_tree_dist = 50;

var objGeometry = new THREE.PlaneGeometry( 3 , 3 , 32);
var times_horizontal = 1;
var times_vert = 1;

var p = 0;

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

