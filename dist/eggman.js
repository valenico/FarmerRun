var egglight = new THREE.PointLight( 'red', 50, 1 , 2);
var pointLightHelper = new THREE.PointLightHelper( egglight , 1 );
egglight.visible = false;
pointLightHelper.visible = false;

var wait = 0;
var e = false;


var t_egg = 0;
var t_jump = 0;

var egg_speed = 0.12;
var egg = true;
var is_time = false;
var hitting = false;
var n_hit = 0;


function check_eggman(oldv){
  if(oldv || (wait != 0 && wait < 80)){
    wait +=1;
  } else {
    v = eggman.position.z <= sonic.position.z + error;
    v2 = eggman.position.z >= sonic.position.z - error;
    v3 = eggman.position.x <= sonic.position.x + error;
    v4 = eggman.position.x >= sonic.position.x - error;
    wait = 0;
    if(v && v4 && v2 && v3) return true;
  }
  return false;
}

function eggman_spawn(){
    if(egg){
      is_time = Math.random() > 0.995;
      if(is_time){
        egg = false;
        eggman.position.z = sonic.position.z - 5;
        egglight.position.set(eggman.position.x , 0 , sonic.position.z - 0.1 );
        egglight.visible = true; 
        pointLightHelper.visible = true;
      }
    }
}

function eggman_moves(){
    if(is_time){
      eggman.position.x = eggman_moves_x[t_egg]
      egglight.position.set(eggman.position.x, 0, sonic.position.z - 0.1 );
      
      //here that should be a random movement towards sonic to hit him
      if(eggman.position.z >= sonic.position.z + 4){ //we're in front of sonic
        hitting = Math.random() > 0.95; //probability of trying to hit
      } else if(hitting == false){
        eggman.position.z += egg_speed;
      }

      if(hitting){
        eggman.position.z -= egg_speed; //going back towards sonic
        if(eggman.position.z <= camera.position.z + 1){ // after going to him, we set time and variable, he'll go back to its z position
          n_hit +=1;
          hitting = false;
        }
      }

      t_egg = (t_egg >= eggman_moves_x.length) ? 0 : t_egg+1;

      // we must decide how make it go away, even with a cycle of movements 
      if(n_hit == 11){
        eggman.position.z = camera.position.z;
        n_hit = 0;
        is_time = false;
        egg = true;
      }

      if(!invincibility) {
        e = check_eggman(e);
        if(e && score > 20){
          score-=30;
          damage_feedback();
        }
      }
      //else if(e && score == 0) window.alert("GAME OVER");
    } 
}

function turn_off_eggman(){
    if(eggman.position.z > sonic.position.z){
      egglight.visible = false; 
      pointLightHelper.visible = false;
    }
}
