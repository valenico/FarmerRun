const backgroundColor = 0x000000;


/// Dictionary for body parts of sonic ///
var score = 0;
var light;

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

  Indice_lower_sx: "Index2_L_024",
  Indice_upper_sx: "Index1_L_023",
  Medio_lower_sx: "Middle2_L_026",
  Medio_upper_sx: "Middle1_L_025",
  Mignolo_lower_sx:  "Pinky2_L_028",
  Mignolo_upper_sx: "Pinky1_L_027",    
  Anulare_lower_sx: "Ring2_L_030",
  Anulare_upper_sx:  "Ring1_L_029",
  Pollice_lower_sx: "Thumb2_L_032",
  Pollice_upper_sx:  "Thumb1_L_031",
  Indice_upper_dx: "Index1_R_038",
  Indice_lower_dx: "Index2_R_039",
  Medio_upper_dx: "Middle1_R_040",
  Medio_lower_dx: "Middle2_R_041",
  Mignolo_upper_dx: "Pinky1_R_042",
  Mignolo_lower_dx: "Pinky2_R_043",
  Anulare_upper_dx: "Ring1_R_044",
  Anulare_lower_dx: "Ring2_R_045",
  Pollice_upper_dx: "Thumb1_R_046",
  Pollice_lower_dx: "Thumb2_R_047",

  Spalla_sx : "Shulder_L_0019",
  Braccio_sx : "UpperArm_L_020",
  Avambraccio_sx : "ForeArm_L_021",
  Polso_sx : "Wrist_L_033",
  Mano_sx : "Hand_L_022",
};


var renderer, scene, camera, controls, sonic, eggman, tails;
var t = 0;
var jump = false;

var ground1, ground2;
var side1, side2, side3, side4;
var bg;

var items_probability = 0.999;

function init() {

  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera( 80, window.innerWidth / window.innerHeight, 0.1, 800 );
  camera.position.set(0,2,-4);

  var container = document.getElementById('game');

  renderer = new THREE.WebGLRenderer( { antialias: true } );
  renderer.setPixelRatio( window.devicePixelRatio );
  renderer.setSize( window.innerWidth, window.innerHeight );
  renderer.setClearColor( backgroundColor );//0x );

  renderer.toneMapping = THREE.LinearToneMapping;
  renderer.toneMappingExposure = Math.pow( 0.94, 5.0 );
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;

  window.addEventListener( 'resize', function () {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( window.innerWidth, window.innerHeight );
  }, false );

  container.appendChild( renderer.domElement);

  controls = new THREE.OrbitControls( camera );
  controls.enabled = false;

document.addEventListener("keydown", onDocumentKeyDown, false);
function onDocumentKeyDown(event) {
    var keyCode = event.which;
    if (keyCode == 65 && sonic.position.x < 2.5) {
      sonic.position.x += 0.5;
    } else if (keyCode == 68 && sonic.position.x > -2.5) {
      sonic.position.x -= 0.5;
    } else if (keyCode == 32){
      jump = true;

    }
  };

  var light1 = new THREE.AmbientLight( 0xffffff, 1.4 , 1);
  light1.position.set( 30, 10, 30  );
  scene.add(light1);

  light = new THREE.SpotLight( 0xffffff, 1.2, 0, 1.2);
  light.position.set( -0.5, 20, -5  );
  light.castShadow = true;
  scene.add( light );

    //Set up shadow properties for the light
  light.shadow.mapSize.width = 1024;  // default
  light.shadow.mapSize.height = 1024; // default
  light.shadow.camera.near = 0.5;       // default
  light.shadow.camera.far = 8000;     // default
  light.shadow.camera.fov = 30;

}

var loader = new THREE.GLTFLoader();
loader.crossOrigin = true;

loader.load( './../models/scene.gltf', function ( gltf ) {
    sonic = gltf.scene;
    sonic.name = "sonic";
    sonic.position.set(0, 0, -0.75);
    sonic.castShadow = true;
    sonic.receiveShadow = true;

    light.target = sonic;

    sonic.getObjectByName(sonic_dic.Indice_lower_sx).rotation.z = 2;
    sonic.getObjectByName(sonic_dic.Indice_upper_sx).rotation.z = 1;
    sonic.getObjectByName(sonic_dic.Medio_lower_sx).rotation.z = 2;
    sonic.getObjectByName(sonic_dic.Medio_upper_sx).rotation.z = 1;
    sonic.getObjectByName(sonic_dic.Mignolo_lower_sx).rotation.z = 2;
    sonic.getObjectByName(sonic_dic.Mignolo_upper_sx).rotation.z = 1;
    sonic.getObjectByName(sonic_dic.Anulare_lower_sx).rotation.z = 2;
    sonic.getObjectByName(sonic_dic.Anulare_upper_sx).rotation.z = 1;    
    sonic.getObjectByName(sonic_dic.Pollice_lower_sx).rotation.z = 2;
    sonic.getObjectByName(sonic_dic.Pollice_upper_sx).rotation.z = 0.5;
    sonic.getObjectByName(sonic_dic.Indice_lower_dx).rotation.z = 2;
    sonic.getObjectByName(sonic_dic.Indice_upper_dx).rotation.z = 1;
    sonic.getObjectByName(sonic_dic.Medio_lower_dx).rotation.z = 2;
    sonic.getObjectByName(sonic_dic.Medio_upper_dx).rotation.z = 1;
    sonic.getObjectByName(sonic_dic.Mignolo_lower_dx).rotation.z = 2;
    sonic.getObjectByName(sonic_dic.Mignolo_upper_dx).rotation.z = 1;
    sonic.getObjectByName(sonic_dic.Anulare_lower_dx).rotation.z = 2;
    sonic.getObjectByName(sonic_dic.Anulare_upper_dx).rotation.z = 1;
    sonic.getObjectByName(sonic_dic.Pollice_lower_dx).rotation.z = 2;
    sonic.getObjectByName(sonic_dic.Pollice_upper_dx).rotation.z = 1;

    scene.add(sonic);
});

loader.load( "./../models/tails/scene.gltf", function(gltf){
  tails = gltf.scene;
  tails.getObjectByName('Reference_04').rotation.y = 3.1;
  tails.getObjectByName(tails_dic.Indice_lower_sx).rotation.z = -2;
  tails.getObjectByName(tails_dic.Indice_upper_sx).rotation.z = -1;
  tails.getObjectByName(tails_dic.Medio_lower_sx).rotation.z = -2;
  tails.getObjectByName(tails_dic.Medio_upper_sx).rotation.z = -1;
  tails.getObjectByName(tails_dic.Mignolo_lower_sx).rotation.z = -2;
  tails.getObjectByName(tails_dic.Mignolo_upper_sx).rotation.z = -1;
  tails.getObjectByName(tails_dic.Anulare_lower_sx).rotation.z = -2;
  tails.getObjectByName(tails_dic.Anulare_upper_sx).rotation.z = -1;    
  tails.getObjectByName(tails_dic.Pollice_lower_sx).rotation.z = -2;
  tails.getObjectByName(tails_dic.Pollice_upper_sx).rotation.z = -0.5;
  tails.getObjectByName(tails_dic.Indice_lower_dx).rotation.z = -2;
  tails.getObjectByName(tails_dic.Indice_upper_dx).rotation.z = -1;
  tails.getObjectByName(tails_dic.Medio_lower_dx).rotation.z = -2;
  tails.getObjectByName(tails_dic.Medio_upper_dx).rotation.z = -1;
  tails.getObjectByName(tails_dic.Mignolo_lower_dx).rotation.z = -2;
  tails.getObjectByName(tails_dic.Mignolo_upper_dx).rotation.z = -1;
  tails.getObjectByName(tails_dic.Anulare_lower_dx).rotation.z = -2;
  tails.getObjectByName(tails_dic.Anulare_upper_dx).rotation.z = -1;
  tails.getObjectByName(tails_dic.Pollice_lower_dx).rotation.z = -2;
  tails.getObjectByName(tails_dic.Pollice_upper_dx).rotation.z = -1;
  tails.getObjectByName(tails_dic.Braccio_dx).rotation.y = -0.5;
  tails.getObjectByName(tails_dic.Braccio_sx).rotation.y = 0.5;
  tails.position.set(0 , -3, 0);
  scene.add(tails);
});


loader.load('./../models/ring.glb', function(gltf) {
    var ring = gltf.scene;
    ring.scale.set(0.005,0.005,0.005);
    randomCoinInitialization(ring);
    generate_obstacle();
});

loader.load( './../models/eggman-yurro.glb', function ( gltf ) {
  eggman = gltf.scene;
  eggman.position.set(0, 0, -100);
  eggman.scale.set(0.5,0.5,0.5);
  scene.add( eggman );
  scene.add(alarm);
});

function lerp(current, target, fraction){

  var array_of_points = [];

  for (var is = 0; is < (1/fraction); is++){
    var j = is*fraction;
    array_of_points.push(current*(1-j)+target*j); 
  }

  return array_of_points;
}

s = 0.1;
run_speed = 0.03;

var error = 0.5;
// the array is fucking ordered! leg dx up, low -- leg sx up, low
run = [lerp(6, 8 , run_speed).concat(lerp(8, 6, run_speed)), lerp(4, 5.5, run_speed).concat(lerp(5.5,4,run_speed)), 
  lerp(8, 6, run_speed).concat(lerp(6,8,run_speed)),lerp(5.5 , 4, run_speed).concat(lerp(4,5.5,run_speed)),
  lerp(0, -2, run_speed).concat(lerp(-2,0,run_speed)),lerp(-2, 0, run_speed).concat(lerp(0,-2,run_speed)),
  lerp(0, 1, run_speed).concat(lerp(1,0,run_speed)),lerp(1, 0, run_speed).concat(lerp(0,1,run_speed))];

jump_points = lerp(0 , 1.5 , 0.04).concat(lerp(1.5 , 0 , 0.04));
eggman_moves_x = lerp( 0 , -2.25, run_speed/6).concat(lerp(-2.25,2.25,run_speed/3)).concat(lerp(2.25,0,run_speed/6));


var text2 = document.createElement('h1');
text2.style.position = 'absolute';
text2.style.color = "black";
text2.innerHTML = "Score: " + score;
text2.style.height = 40 + 'px';
text2.style.top = 0 + 'px';
text2.style.left = 40 + 'px';
document.body.appendChild(text2);

var invincibility = false;
var current_frame;
var invincibility_frames = 20; // duration of a "tic", the actual number of invincibility frames is 3*invincibility_frames

var times = 1; 

function damage_feedback(){
  invincibility = true;
  current_frame = 0;
}
k = 0;
function animate(){
  if(typeof(sonic) != 'undefined' && typeof(tails) != 'undefined'){
    delete_obs(); // reposition of obstacles behind sonic
    break_walls();
    if(s < 0.2){
      s += 0.000005;
      egg_speed += 0.000005;
    }
    sonic.position.z += s;
    camera.position.z += s;
    light.position.z += s;
    bg.position.z += s;
    heart.rotation.y += 0.05;

    // Infinite road
    if(sonic.position.z >= 125*times + 10){
      if(times % 2 == 0){
        ground2.position.z += 250;
        side3.position.z += 250;
        side4.position.z += 250;

      }
      else{ 
        ground1.position.z += 250;
        side1.position.z += 250;
        side2.position.z += 250;
      }
      times += 1;
    }

    getHeart();
    getshield();
    update_shield();

 

    // Damage feedback
    if(invincibility == true && shield_on == false){
      if(scene.getObjectByName(sonic.name) != null && (current_frame == 0 || current_frame == 2*invincibility_frames || current_frame == 4*invincibility_frames)){
        scene.remove(sonic);      }
      else if(scene.getObjectByName(sonic.name) == null && (current_frame == invincibility_frames || current_frame == 3*invincibility_frames || current_frame == 5*invincibility_frames-1)){
        scene.add(sonic);
      }
      current_frame += 1;
      if(current_frame >= 5 * invincibility_frames) {
        invincibility = false;
        current_frame = 0;
      }
    }

    checkClouds();


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

    if(spawn_tails) spawnTails();
    if(can_move_tails) move_tails(t);

    if((sonic.position.z + 3) % 150 <= 1) eggman_spawn();
    eggman_moves();

    if(robot_to_spawn == true) spawn_robot();

    if(robot_to_spawn == false) robotEnemy();

    t = (t >= run[0].length) ? 0 : t+=1;

    check_ring(); 
    collision();

    text2.innerHTML = "Score: " + score;

    turn_off_eggman();
    spawn_shield(sonic.position.z);
    treesRepositioning(sonic.position.z);
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
var onLoad = function (texture) {
  var n = texture.image.src.slice(-8,-4);

  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;

  var times_horizontal; 
  var times_vert; 

  var objGeometry;
  if(n == 'road'){
    objGeometry = new THREE.PlaneGeometry(6,250, 32);
    times_horizontal = 1;
    times_vert = 50;
  } else if(n =='ope1'){
    objGeometry = new THREE.PlaneGeometry( 800 , 150 , 32);
    times_horizontal = 1;
    times_vert = 1;
  }

  texture.repeat.set(times_horizontal, times_vert);

  if(n =='road'){
    var objMaterial = new THREE.MeshPhongMaterial({
      map: texture,
      side: THREE.DoubleSide,
      shading: THREE.FlatShading,
    });

    ground1 = new THREE.Mesh(objGeometry, objMaterial);
    ground1.rotation.x = 300.0221;
    ground1.receiveShadow = true;
    scene.add(ground1);      

    ground2 = ground1.clone();
    ground2.receiveShadow = true;
    ground2.position.z = 250;
    scene.add(ground2);
  

  } else if(n=='ope1'){
    var objMaterial = new THREE.MeshPhongMaterial({
      map: texture,
      side: THREE.DoubleSide,
     // shading: THREE.FlatShading,
    });

    bg = new THREE.Mesh(objGeometry, objMaterial);
    bg.position.set( 0 , 69, 250);
    scene.add(bg);   
  } 
}


// Function called when download progresses
var onProgress = function (xhr) {
  console.log((xhr.loaded / xhr.total * 100) + '% loaded');
};

// Function called when download errors
var onError = function (xhr) {
  console.log(xhr);
};

var loader1 = new THREE.TextureLoader();
loader1.load('./../Images/road.jpg', onLoad, onProgress, onError);
loader1.load('./../Images/landscope1.jpg', onLoad, onProgress, onError);


function render(){ 
  renderer.render(scene, camera);
}

// fine metodo texture
init();
animate();

