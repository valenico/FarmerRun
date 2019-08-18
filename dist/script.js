const backgroundColor = 0xe0ffff;

/// Dictionary for body parts of sonic ///
var score = 0;
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

/*////////////////////////////////////////*/

/*var renderCalls = []; 
function render () {
  requestAnimationFrame( render );
  renderCalls.forEach((callback)=>{ callback(); });
}
*/ 
/*////////////////////////////////////////*/
var renderer, scene, camera, controls, sonic, eggman;
var t = 0;
var jump = false;
//function renderScene(){ renderer.render( scene, camera ); }
//renderCalls.push(renderScene);


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

  var light = new THREE.AmbientLight( 0xffffff, 2 , 1 );
  light.position.set( 30, -10, 30 );
  scene.add( light );

}

/* creation of a column object as obstacle, to clone/move 
var cgeometry = new THREE.CylinderBufferGeometry( 0.5 , 0.5, 2.5, 32 );
var cmaterial = new THREE.MeshLambertMaterial( {color: 'gray'} );
var cylinder = new THREE.Mesh( cgeometry, cmaterial );
cylinder.position.set(2, 1.25 , 6);
*/

var loader = new THREE.GLTFLoader();
loader.crossOrigin = true;

loader.load( './../models/scene.gltf', function ( gltf ) {
    sonic = gltf.scene;
    sonic.position.set(0, 0, -0.75);

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

    scene.add( sonic );
});

loader.load('./../models/ring.glb', function(gltf) {
    var ring = gltf.scene;
    ring.scale.set(0.005,0.005,0.005);
    randomCoinInitialization(ring);
});

var egglight = new THREE.PointLight( 'red', 50, 1 , 2);
var pointLightHelper = new THREE.PointLightHelper( egglight , 1 );
egglight.visible = false;
pointLightHelper.visible = false;

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

s = 0.3;
run_speed = 0.03;
// the array is fucking ordered! leg dx up, low -- leg sx up, low
run = [lerp(6, 8 , run_speed).concat(lerp(8, 6, run_speed)), lerp(4, 5.5, run_speed).concat(lerp(5.5,4,run_speed)), 
  lerp(8, 6, run_speed).concat(lerp(6,8,run_speed)),lerp(5.5 , 4, run_speed).concat(lerp(4,5.5,run_speed)),
  lerp(0, -2, run_speed).concat(lerp(-2,0,run_speed)),lerp(-2, 0, run_speed).concat(lerp(0,-2,run_speed)),
  lerp(0, 1, run_speed).concat(lerp(1,0,run_speed)),lerp(1, 0, run_speed).concat(lerp(0,1,run_speed))];

jump_points = lerp(0 , 1.5 , 0.04).concat(lerp(1.5 , 0 , 0.04));
eggman_moves_x = lerp( 0 , -2.25, run_speed/6).concat(lerp(-2.25,2.25,run_speed/3)).concat(lerp(2.25,0,run_speed/6));

var t_egg = 0;
var t_jump = 0;
var error = 0.5;

var text2 = document.createElement('h1');
text2.style.position = 'absolute';
text2.style.color = "black";
text2.innerHTML = score;
text2.style.top = 50 + 'px';
text2.style.left = 50 + 'px';
document.body.appendChild(text2);

var egg_speed = 0.06;
var egg = true;
var is_time = false;
var hitting = false;
var n_hit = 0;

var wait = 0;
var e = false;

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

function animate(){
  if(typeof(sonic) != 'undefined'){
    sonic.position.z += s;
    camera.position.z += s;

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
      is_time = Math.random() > 0.995;
      if(is_time){
        egg = false;
        eggman.position.z = sonic.position.z - 5;
        egglight.position.set(eggman.position.x , 0 , sonic.position.z - 0.1 );
        egglight.visible = true; 
        pointLightHelper.visible = true;
      }
    }

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
        eggman.position.z -= (n_hit == 10) ? 0.1 : 0.05; //going back towards sonic
        if(eggman.position.z <= sonic.position.z){ // after going to him, we set time and variable, he'll go back to its z position
          n_hit +=1;
          hitting = false;
        }
      }

      t_egg = (t_egg >= eggman_moves_x.length) ? 0 : t_egg+1;

      // we must decide how make it go away, even with a cycle of movements 
      if(n_hit == 11){
        eggman.position.z -= 0.1;
        n_hit = 0;
        is_time = false;
        egg = true;
      }

      e = check_eggman(e);
      if(e && score > 20) score-=30;
      //else if(e && score == 0) window.alert("GAME OVER");
    } 
    t = (t >= run[0].length) ? 0 : t+=1;

    check_ring();
    text2.innerHTML = score;
    if(eggman.position.z > sonic.position.z){
      egglight.visible = false; 
      pointLightHelper.visible = false;
    } 
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
  var n = texture.image.src.slice(-11,-4);

  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;

  var times_horizontal; 
  var times_vert; 

  var objGeometry;
  if(n == 'ground1'){
    objGeometry = new THREE.PlaneGeometry(6, 1000, 32);
    times_horizontal = 3;
    times_vert = 500;
  } else {
    objGeometry = new THREE.PlaneGeometry(1000, 3, 32);
    times_horizontal = 100;
    times_vert = 1;
  }

  texture.repeat.set(times_horizontal, times_vert);

  var objMaterial = new THREE.MeshPhongMaterial({
    map: texture,
    side: THREE.DoubleSide,
    shading: THREE.FlatShading
  });

  var mesh = new THREE.Mesh(objGeometry, objMaterial);
  
  if(n =='ground1'){
    mesh.rotation.x = 300.0222;
  } else {
    mesh.position.set(-2.98, 1.5, 0);
    mesh.rotation.y = 300.022225;

    var clone_side = mesh.clone();
    clone_side.position.x = 2.98;
    clone_side.rotation.y = -300.022225;
    scene.add(clone_side);

  }

  scene.add(mesh);
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
loader1.load('./side.jpg', onLoad, onProgress, onError);

function render(){ 
  //scene.add( cylinder );
  renderer.render(scene, camera);
}

// fine metodo texture
init();
animate();
