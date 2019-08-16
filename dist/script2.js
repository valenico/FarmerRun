const backgroundColor = 0x000000;

/// Dictionary for body parts of sonic ///
const sonic_dic = { 

  Testa : "Head_06",

  Fianchi : "Hips_05",
  Bacino_dx : "Pelvis_R_013",
  Bacino_sx : "Pelvis_L_08",

  Coscia_dx : "Thigh_R_014",
  Polpaccio_dx : "Calf_R_015",
  Piede_dx : "Foot_R_016",

  Coscia_sx : "Thigh_L_09",
  Polpaccio_sx : "Calf_L_010",
  Piede_sx : "Foot_L_011",

  Spalla_dx : "Shulder_R_034",
  Braccio_dx : "UpperArm_R_035",
  Avambraccio_dx : "ForeArm_R_036",
  Polso_dx : "Wrist_R_048",
  Mano_dx : "Hand_R_037",

  Spalla_sx : "Shulder_L_0019",
  Braccio_sx : "UpperArm_L_020",
  Avambraccio_sx : "ForeArm_L_021",
  Polso_sx : "Wrist_L_033",
  Mano_sx : "Hand_L_022"

};

/// AXIS (+)

// x = laterale sx
// y = su
// z = avanti

/*////////////////////////////////////////*/

/*var renderCalls = []; 
function render () {
  requestAnimationFrame( render );
  renderCalls.forEach((callback)=>{ callback(); });
}
*/ 
/*////////////////////////////////////////*/
var renderer, scene, camera, controls, sonic, ring, ring2;
var t = 0;
var jump = false;
var score = 0;
//function renderScene(){ renderer.render( scene, camera ); }
//renderCalls.push(renderScene);

var max_rings = 50;
var max_distance = 50;
var min_space = 2;
var probability = 0.4;
var rings = new Array();
var rings_in_use = 0;

function init() {

  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera( 80, window.innerWidth / window.innerHeight, 0.1, 800 );
  camera.position.set(0,2,-4);

  renderer = new THREE.WebGLRenderer( { antialias: true } );
  renderer.setPixelRatio( window.devicePixelRatio );
  renderer.setSize( window.innerWidth, window.innerHeight );
  renderer.setClearColor( backgroundColor );//0x );

  renderer.toneMapping = THREE.LinearToneMapping;
  renderer.toneMappingExposure = Math.pow( 0.94, 5.0 );
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFShadowMap;

  window.addEventListener( 'resize', function () {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( window.innerWidth, window.innerHeight );
  }, false );

  document.body.appendChild( renderer.domElement);

  controls = new THREE.OrbitControls( camera );

  controls.rotateSpeed = 0.3;
  controls.zoomSpeed = 0.9;

  controls.minDistance = 3;
  controls.maxDistance = 20;

  controls.minPolarAngle = 0; // radians
  controls.maxPolarAngle = Math.PI /2; // radians

  controls.enableDamping = true;
  controls.dampingFactor = 0.05;

 /* renderCalls.push(function(){
    controls.update()
  }); */

  document.addEventListener("keydown", onDocumentKeyDown, false);
  function onDocumentKeyDown(event) {
    var keyCode = event.which;
    if (keyCode == 65 && sonic.position.x < 4) {
      sonic.position.x += 0.5;
    } else if (keyCode == 68 && sonic.position.x > -4) {
      sonic.position.x -= 0.5;
    } else if (keyCode == 32){
      jump = true;
    }
  };
  var light = new THREE.AmbientLight( 0x20202A, 20, 100 );
  light.position.set( 30, -10, 30 );
  scene.add( light );

}

var loader = new THREE.GLTFLoader();
loader.crossOrigin = true;

loader.load( './../models/scene.gltf', function ( gltf ) {

    sonic = gltf.scene;
    sonic.position.set(0, 0, -0.75);
    //object.scale.set(2,2,2);
  
  /*  gltf.scene.traverse(function(child){
      if(child.name == 'Shoulder_L_Reference'){
        child.rotateZ(-0.8);
        child.rotateX(1);
        child.rotateY(-1);
      }
     }); */
    sonic.name = "sonic"
    scene.add( sonic );
   // animate(sonic);


});

loader.load( './../models/eggman-yurro.glb', function ( gltf ) {
  eggman = gltf.scene;
  eggman.position.set(0, 0, -100);
  eggman.scale.set(0.5,0.5,0.5);
  scene.add( eggman );
});

loader.load('./../models/ring.glb', function(gltf) {
    var ring = gltf.scene;
    ring.scale.set(0.005,0.005,0.005);
    //ring.position.set(0, 0.5 , 5);
    //scene.add(ring);
    //rings.push(ring);
    randomCoinInitialization(ring);
});


function coin_curve(ring, start){
  var coin_curve = [];
  var yy;
  var clone;
  var x = (Math.random() < 0.5 ? -1 : 1)*Math.random()*3;
  for(var i = 0 ; i < 5; i++){
    clone = ring.clone();
    if(i <= 2) yy = i + 0.5;
    else yy -= 1;
    clone.position.set(x , yy , start + i);
    scene.add(clone);
    coin_curve.push(clone);
  }
  return coin_curve;
}

function coin_line(ring, start){
  var coin_line = [];
  var x = (Math.random() < 0.5 ? -1 : 1)*Math.random()*3;
  for(var i = 0; i < 5; i++){
    var clone = ring.clone();
    clone.position.set(x , 0.5 ,start + i);
    coin_line.push(clone);
    scene.add(clone);
  }
  return coin_line;
}


function randomCoinInitialization(ring){
  var coins = [];
  for(i = 0; i < 5; i++){

    var p = Math.random();
    if(p <= probability){
      coins = coin_curve(ring , 5*i + min_space);
      rings.push(coins);
      rings_in_use += 5;
      //console.log(coins);
    }
    else{
      coins = coin_line(ring, 5*i + min_space);
      rings.push(coins);
      rings_in_use += 5;
      //console.log(coins);
    }
  }
  console.log(rings);
}


function randomCoinGenerator(){

}

function randomCoinRepositioning(coin, start){
    coin.position.set( (Math.random() < 0.5 ? -1 : 1)*Math.random()*3 , Math.random() < 0.5 ? 1.2 : 0.5, start + max_distance + Math.random()*10+2);
  }


function lerp1(current, target, fraction){
	return (target-current)*fraction;
}

function lerp(current, target, fraction){
  var array_of_points = [];

  for (var is = 0; is < (1/fraction); is++){
    var j = is*fraction;
    array_of_points.push(current*(1-j)+target*j); 
  }

  return array_of_points;
}


// for the z position of sonic i just use a scalar, we don't have a 'ending' point
s = 0.02;

// the array is fucking ordered! leg dx up, low -- leg sx up, low
run_speed = 0.03;
run = [lerp(6, 8 , run_speed).concat(lerp(8, 6, run_speed)), lerp(4, 5.5, run_speed).concat(lerp(5.5,4,run_speed)), 
       lerp(8, 6, run_speed).concat(lerp(6,8,run_speed)),lerp(5.5 , 4, run_speed).concat(lerp(4,5.5,run_speed)),
       lerp(0, -2, run_speed).concat(lerp(-2,0,run_speed)),lerp(-2, 0, run_speed).concat(lerp(0,-2,run_speed)),
       lerp(0, 1, run_speed).concat(lerp(1,0,run_speed)),lerp(1, 0, run_speed).concat(lerp(0,1,run_speed))];


jump_points = lerp(0 , 1.5 , 0.04).concat(lerp(1.5 , 0 , 0.04));
var t_jump = 0;

eggman_moves_x = lerp( 0 , -2.5, run_speed/6).concat(lerp(-2.5,2.5,run_speed/3)).concat(lerp(2.5,0,run_speed/6));
var t_egg = 0;
egg_speed = 0.06;
var egg = true;
var is_time = false;
var hitting = false;
var t_hit = 0;
var n_hit = 0;
var egglight = new THREE.PointLight('red', 100);

error = 0.5;

function check_ring(){

  for(var i = 0; i < rings.length ; i++){
    for(var j = 0; j < rings[0].length; j++){
      r = rings[i][j];
      //console.log(r);
      try {

        if(sonic.position.z >= r.position.z + 3) randomCoinRepositioning(r, sonic.position.z); // ring miss

        z = sonic.position.z <= r.position.z + error;
        z1 = sonic.position.z >= r.position.z - error;

        y = sonic.position.y <= r.position.y + error;
        y2 = sonic.position.y >= r.position.y - error;

        x = sonic.position.x <= r.position.x + error;
        x2 = sonic.position.x >= r.position.x - error;
        if(z && z1 && x && x2 && y && y2){
          return r;
        }
      } catch(err){}
    }
  }
  return -1;
}

var text2 = document.createElement('h1');
text2.style.position = 'absolute';
text2.style.color = "white";
text2.innerHTML = score;
text2.style.top = 50 + 'px';
text2.style.left = 50 + 'px';
document.body.appendChild(text2);

function animate(){

  object = scene.getObjectByName( "sonic", true );
  if(typeof(object)!= "undefined"){
	//if(t >= 0.5) s.getObjectByName(sonic_dic.Testa).rotation.x += 1;
	//t = (t >= 1) ? 0 : t+= 0.002;

  	sonic.position.z += lerp1(0, 10, 0.01);
    camera.position.z += lerp1(0, 10, 0.01);
  
    sonic.getObjectByName(sonic_dic.Polpaccio_dx).rotation.z = run[1][t];
    sonic.getObjectByName(sonic_dic.Coscia_dx).rotation.z = run[0][t];
      
    sonic.getObjectByName(sonic_dic.Polpaccio_sx).rotation.z = run[3][t];
    sonic.getObjectByName(sonic_dic.Coscia_sx).rotation.z = run[2][t];

    sonic.getObjectByName(sonic_dic.Avambraccio_sx).rotation.z = run[4][t];
    sonic.getObjectByName(sonic_dic.Avambraccio_dx).rotation.z = run[5][t];

    sonic.getObjectByName(sonic_dic.Braccio_dx).rotation.z = run[6][t];
    sonic.getObjectByName(sonic_dic.Braccio_sx).rotation.z = run[7][t];
    sonic.getObjectByName(sonic_dic.Braccio_dx).rotation.y = -1.5;
    sonic.getObjectByName(sonic_dic.Braccio_sx).rotation.y = 1.5;
    sonic.getObjectByName(sonic_dic.Testa).rotation.z = 0.2;
	    
    if(egg){
      is_time = Math.random() > 0.99;
      if(is_time){
        egg = false;
        eggman.position.z = sonic.position.z - 5;
	egglight.position.set(eggman.position.x, eggman.position.y, eggman.position.z + 2.5);
	scene.add(egglight);
      }
    }

    if(is_time){
      eggman.position.x = eggman_moves_x[t_egg]
      
      //here that should be a random movement towards sonic to hit him
      if(eggman.position.z >= sonic.position.z + 4){ //we're in front of sonic
        hitting = Math.random() > 0.9; //probability of trying to hit
      } else if(hitting == false){
        eggman.position.z += egg_speed;
      }

      if(hitting){
        eggman.position.z -= (n_hit == 10) ? 0.07 : 0.04; //going back towards sonic, full speed if it's last hit
        t_hit +=1;
        if(t_hit >= 80){ // after going to him, we set time and variable, he'll go back to its z position
          t_hit = 0;
          n_hit +=1;
          hitting = false;
        }
      }

      t_egg = (t_egg >= eggman_moves_x.length) ? 0 : t_egg+1;

      if(n_hit == 11){
        eggman.position.z -= 0.07; //smooth disappearing, otherwise it just stops
        is_time = false;
	n_hit = 0;
        egg = true;
      }
    } 
    t = (t == run[0].length) ? 0 : t+=1;
    
    r = check_ring();
    if(r != -1){
      score +=10;
      randomCoinRepositioning(r, sonic.position.z);
      //rings[r].position.set( (Math.random() < 0.5 ? -1 : 1)*Math.random()*3 , Math.random() < 0.5 ? 1.2 : 0.5, sonic.position.z + Math.random()*10+2);
    }
    text2.innerHTML = score;
    egglight.position.set(eggman.position.x, eggman.position.y, eggman.position.z + 2.5);
  }
  if(jump){
    sonic.position.y = jump_points[t_jump];
    t_jump += 1;
    if(t_jump >= jump_points.length){
      jump = false;
      t_jump = 0;
    }
  }
  requestAnimationFrame(animate);
  render();

}

// Metodo con cui carica la texture
// bisogna capire come farla vedere bene

var onLoad = function (texture) {

  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;

  const times_horizontal = 3;
  const times_vert = 500;

  texture.repeat.set(times_horizontal, times_vert);

  var objGeometry = new THREE.PlaneGeometry(10, 1000);

  var objMaterial = new THREE.MeshPhongMaterial({
    map: texture,
    side: THREE.DoubleSide,
    shading: THREE.FlatShading
  });

  var mesh = new THREE.Mesh(objGeometry, objMaterial);
  scene.add(mesh);
  mesh.rotation.x = 300.0222;
}

// Function called when download progresses
var onProgress = function (xhr) {
  console.log((xhr.loaded / xhr.total * 100) + '% loaded');
};

// Function called when download errors
var onError = function (xhr) {
  console.log('An error happened');
};

var loader1 = new THREE.TextureLoader();
loader1.load('./ground1.jpg', onLoad, onProgress, onError);

function render(){
  renderer.render(scene, camera);
}

// fine metodo texture
init();
animate();
