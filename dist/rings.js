var max_distance = 50;
var min_space = 2;
var probability = 0.3;
var rings = new Array();
var size = 5;
var lines_type = new Array(5);

function coin_curve(ring, start, group){
  var coin_curve = [];
  var yy;
  var clone;
  var x = (Math.random() < 0.5 ? -1 : 1)*Math.random()*3;
  for(var i = 0 ; i < size; i++){
    clone = ring.clone();
    if(i <= 2) yy = i + 0.5;
    else yy -= 1;
    clone.id = group*size + i;
    clone.position.set(x , yy , start + i);
    scene.add(clone);
    coin_curve.push(clone);
    rings.push(clone);
  }
  return coin_curve;
}


function coin_line(ring, start, group){
  var coin_line = [];
  var x = (Math.random() < 0.5 ? -1 : 1)*Math.random()*3;
  for(var i = 0; i < size; i++){
    var clone = ring.clone();
    clone.id = group*size + i;
    clone.position.set(x , 0.5 ,start + i);
    coin_line.push(clone);
    scene.add(clone);
    rings.push(clone);
  }
  return coin_line;
}


function randomCoinInitialization(ring){
  var coins = [];
  for(i = 0; i < size; i++){

    var p = Math.random();
    if(p <= probability){
      coins = coin_curve(ring , 5*i + min_space, i);
      lines_type[i] = 1;
    }
    else{
      coins = coin_line(ring, 5*i + min_space, i);
      lines_type[i] = 0;
    }
  }
}


function ringRepositioning(ring, parentid, id, group){
  // First of the line
  if(id == 0){
    var x = (Math.random() < 0.5 ? -1 : 1)*Math.random()*3;
    ring.position.x = x;
    ring.position.z += max_distance;

    var p = Math.random();
    if(p < probability) lines_type[group] = 1;
    else lines_type[group] = 0;

    if(scene.getObjectById(ring.id) == null) scene.add(ring);
  }
  // Following rings
  else{
    if(ring.position.z < rings[parentid].position.z){
      ring.position.x = rings[parentid].position.x;
      ring.position.z = rings[parentid].position.z + id;

      if(lines_type[group] == 1) { // rings curve

        if(id == 4) ring.position.y = 0.5;
        else if(id == 3) ring.position.y = id - 2 + 0.5;
        else ring.position.y = id + 0.5;

      } else ring.position.y = 0.5;    
      if(scene.getObjectById(ring.id) == null) scene.add(ring);
    }
  }
}

function check_ring(){
  var res;
  var group;
  for(var i = 0; i < rings.length ; i++){
      r = rings[i];
      var id = i%size;
      var parent = i - id;
      group = Math.floor(i/size);

      if(scene.getObjectById(r.id) == null){
        ringRepositioning(r, parent, id);
        continue;
      }
      try {
        if(sonic.position.z >= r.position.z + 2) ringRepositioning(r, parent, id, group); // ring miss

        z = sonic.position.z <= r.position.z + error;
        z1 = sonic.position.z >= r.position.z - error;

        y = sonic.position.y <= r.position.y + error;
        y2 = sonic.position.y >= r.position.y - error;

        x = sonic.position.x <= r.position.x + error;
        x2 = sonic.position.x >= r.position.x - error;
        if(z && z1 && x && x2 && y && y2){ 
          res = r;
          break;
        }
        else res = -1;
      } catch(err){}
    }

  if(res != -1){
      score += 10;
      scene.remove(res);
      var i = rings.indexOf(r);
      var id = i%size;
      var parent = i - id;
      ringRepositioning(r, parent, id, group);
      //rings[r].position.set( (Math.random() < 0.5 ? -1 : 1)*Math.random()*3 , Math.random() < 0.5 ? 1.2 : 0.5, sonic.position.z + Math.random()*10+2);
    }
}
