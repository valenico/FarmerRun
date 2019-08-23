const backgroundColor = 0xe0ffff;


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


var SideConfig = {
  //const dimensions
  FLOOR_WIDTH: 100,  // size of floor in x direction
  FLOOR_DEPTH: 500,  //size of floor in z direction
  MOVE_STEP: 500    //z distance to move before recreating a new floor strip

};

var renderer, scene, camera, controls, sonic, eggman;
var t = 0;
var jump = false;


var FLOOR_RES = 20;
var FLOOR_THICKNESS = 17;
var snoise = new ImprovedNoise();
var noiseScale = 3;
var noiseSeed = Math.random() * 100;
var stepCount = 0; 


var ground1, ground2;
var side1, side2, side3, side4;
var bg;

var items_probability = 0.999;

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
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;

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
  scene.add( egglight );
  scene.add( pointLightHelper );
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

function animate(){
  if(typeof(sonic) != 'undefined'){
    delete_obs(); // reposition of obstacles behind sonic
    break_walls();
    sonic.position.z += s;
    camera.position.z += s;
    light.position.z += s;
    bg.position.z += s;
    heart.rotation.y += 0.05;

    // Infinite road
    if(sonic.position.z >= 250*times + 10){
      if(times % 2 == 0){
        ground2.position.z += 500;
        side3.position.z += 500;
        side4.position.z += 500;

      }
      else{ 
        ground1.position.z += 500;
        side1.position.z += 500;
        side2.position.z += 500;
      }
      times += 1;
    }

    getHeart();
    getshield();
    update_shield();

    // Damage feedback
    if(invincibility == true && shield_on == false){
      if(scene.getObjectByName(sonic.name) != null && (current_frame == 0 || current_frame == 2*invincibility_frames)){
        scene.remove(sonic);      }
      else if(scene.getObjectByName(sonic.name) == null && (current_frame == invincibility_frames || current_frame == 3*invincibility_frames-1)){
        scene.add(sonic);
      }
      current_frame += 1;
      if(current_frame >= 3 * invincibility_frames) {
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

    if((sonic.position.z + 3) % 150 <= 1) eggman_spawn();
    eggman_moves();

    t = (t >= run[0].length) ? 0 : t+=1;

    check_ring(); 
    collision();

    text2.innerHTML = "Score: " + score;

    turn_off_eggman();
    spawn_shield(sonic.position.z);
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

var cloud;

var max_clouds = 100;
var clouds = new Array(max_clouds);


function cloudsCollision(x, y, z){
  for(i = 0; i < clouds.length; i++){
    var x1 = x <= clouds[i].position.x + 10;
    var x2 = x >= clouds[i].position.x - 10;
    var y1 = y <= clouds[i].position.y + 5;
    var y1 = y >= clouds[i].position.y - 5;
    var z1 = z <= clouds[i].position.z + 10;
    var z2 = z >= clouds[i].position.z - 10;

    if(x1 && x2 && y1 && y2 && z1 && z2) return true;
  }
  return false;
}



function spawnClouds(cloudMesh, start){
  var aux = start;
  for(i = 0; i < max_clouds; i++){
    var clone = cloud.clone();
    var x = Math.floor(Math.random()*180 - 90);
    var y = Math.floor(Math.random()* 5 + 15);
    var z = 10 + aux;
    clone.position.set(x, y , z);
    clone.scale.x = 3;

    clone.scale = Math.random()*2 + 0.3;
    clouds[i] = clone;
    scene.add(clone);
    aux += 8;
  }
}

function checkClouds(){
  for(i = 0; i < clouds.length; i++){
    if(clouds[i].position.z + 3 < sonic.position.z){
      cloudRepositioning(clouds[i]);
    }
  }
}


function cloudRepositioning(cloud){
  var x = Math.floor(Math.random()*180 - 90);
  var y = Math.floor(Math.random()* 5 + 15);
  var z = sonic.position.z + 400 + Math.floor(Math.random()*150);

  if(cloudsCollision(x,y,z)) cloudRepositioning(cloud);
  else{
    cloud.position.set(x,y,z);
    cloud.scale = Math.random()*2 + 0.3;}

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
    objGeometry = new THREE.PlaneGeometry(6,500, 32);
    times_horizontal = 1;
    times_vert = 50;
  } else if(n =='ope1'){
    objGeometry = new THREE.PlaneGeometry( 800 , 150 , 32);
    times_horizontal = 1;
    times_vert = 1;
  } else if( n == "ud10"){
    objGeometry = new THREE.PlaneGeometry( 10 , 10 , 32);
    times_horizontal = 1;
    times_vert = 1;

  } else {
    objGeometry = new THREE.PlaneGeometry( SideConfig.FLOOR_WIDTH, SideConfig.FLOOR_DEPTH , FLOOR_RES,FLOOR_RES );
    times_horizontal = 40;
    times_vert = 200;
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
    ground2.position.z = 500-0.5;
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
    
  } else if( n == "ud10"){
    var objMaterial = new THREE.MeshPhongMaterial({
      map: texture,
      side: THREE.DoubleSide,
      shading: THREE.FlatShading,
      transparent: true,
    });
    cloud = new THREE.Mesh(objGeometry, objMaterial);

    spawnClouds(cloud, 0);
  } else {
    side1 = createSide(objGeometry,texture, 53 , 0);
    side2 = createSide(objGeometry,texture, -53 , 0);
    side3 = createSide(objGeometry,texture, 53 , 500);
    side4 = createSide(objGeometry,texture,-53 , 500);
    scene.add(side1);
    scene.add(side2);
    scene.add(side3);
    scene.add(side4);

  }

  
}



function createSide(floorGeometry,texture,posx, posz){
  var floorMaterial = new THREE.MeshLambertMaterial({
      map: texture,
      //color: 0x0ff747, //diffuse              
      //emissive: 0x000000, 
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
        if(j < 3 || i > FLOOR_RES - 3) floorGeometry.vertices[i * (FLOOR_RES + 1)+ j].z = 0; 
        else if(i < 3 || i > FLOOR_RES - 3) floorGeometry.vertices[i * (FLOOR_RES + 1)+ j].z = 0; 
        else floorGeometry.vertices[i * (FLOOR_RES + 1)+ j].z = snoise.noise(ipos/FLOOR_RES * noiseScale, j/FLOOR_RES * noiseScale, noiseSeed ) * FLOOR_THICKNESS;        
      } else {
        if(j > FLOOR_RES - 3) floorGeometry.vertices[i * (FLOOR_RES + 1)+ j].z = 0; 
        else if(i < 3 || i > FLOOR_RES - 3) floorGeometry.vertices[i * (FLOOR_RES + 1)+ j].z = 0; 
        else floorGeometry.vertices[i * (FLOOR_RES + 1)+ j].z = snoise.noise(ipos/FLOOR_RES * noiseScale, j/FLOOR_RES * noiseScale, noiseSeed ) * FLOOR_THICKNESS;
      }
    }
  }
  floorGeometry.verticesNeedUpdate = true;
  return floorMesh;

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
loader1.load('./../Images/hill_text.jpg', onLoad, onProgress, onError);
loader1.load('./../Images/landscope1.jpg', onLoad, onProgress, onError);
loader1.load('./../Images/cloud10.png', onLoad, onProgress, onError);


function render(){ 
  //scene.add( cylinder );
  renderer.render(scene, camera);
}

// fine metodo texture
init();
animate();

