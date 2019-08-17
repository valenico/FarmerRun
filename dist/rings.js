var max_distance = 50;
var min_gap = 12.5;
var probability = 0.35;
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
    if(i <= 2) yy = i*3/4 + 0.5;
    else yy -= 3/4;
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
  var gap = 0;
  for(i = 0; i < size; i++){

    var p = Math.random();
    gap += min_gap; 
    if(p <= probability){
      coins = coin_curve(ring, gap, i);
      lines_type[i] = 1;
    }
    else{
      coins = coin_line(ring, gap, i);
      lines_type[i] = 0;
    }
  }
}


function ringRepositioning(ring, parentid, id, group){
  // First of the line
  if(id == 0){
    var x = (Math.random() < 0.5 ? -1 : 1)*Math.random()*3;
    ring.position.x = x;
    ring.position.z += max_distance + min_gap;

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
        
        if(id <= 2) yy = id*3/4 + 0.5;
        else if(id == 3) yy = 2*3/4 + 0.5 - 3/4;
        else yy = 0.5;

        ring.position.y = yy;

      } else ring.position.y = 0.5;    
      if(scene.getObjectById(ring.id) == null) scene.add(ring);
    }
  }
}