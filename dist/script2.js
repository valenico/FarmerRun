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
    if (keyCode == 65) {
      sonic.position.x += 0.5;
    } else if (keyCode == 68) {
      sonic.position.x -= 0.5;
    } else if (keyCode == 32){
      jump = true;
    }
  };
  var light = new THREE.AmbientLight( 0x20202A, 20, 100 );
  light.position.set( 30, -10, 30 );
  scene.add( light );


}


/*////////////////////////////////////////////////////////////////////


var qInitial = new THREE.Quaternion().setFromAxisAngle( (0,0,1) , -5 );
var qFinal = new THREE.Quaternion().setFromAxisAngle( (0,0,1),5);
var quaternionKF = new THREE.QuaternionKeyframeTrack( '.quaternion', [ 0, 1, 2 ], [ qInitial.x, qInitial.y, qInitial.z, qInitial.w, qFinal.x, qFinal.y, qFinal.z, qFinal.w, qInitial.x, qInitial.y, qInitial.z, qInitial.w ] );
var clip = new THREE.AnimationClip( 'Run', 3, [quaternionKF] );
*/


/* ////////////////////////////////////////////////////////////////////////// */

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

var rings;

loader.load('./../models/ring.glb', function(gltf) {
    ring = gltf.scene;
    ring.scale.set(0.005,0.005,0.005);
    ring.position.set(0, 0.5 , 5);
    scene.add(ring);

    ring2 = gltf.scene.clone();
    ring2.scale.set(0.005,0.005,0.005);
    ring2.position.set(0, 0.5 , 7);
    scene.add(ring2);

    rings = [ring, ring2 ];
});

function lerp1(current, target, fraction){
	return (target-current)*fraction;}

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
run = [lerp(6, 8 , 0.03).concat(lerp(8, 6, 0.03)), lerp(4, 5.5, 0.03).concat(lerp(5.5,4,0.03)), 
       lerp(8, 6, 0.03).concat(lerp(6,8,0.03)),lerp(5.5 , 4, 0.03).concat(lerp(4,5.5,0.03)),
       lerp(0, -2, 0.03).concat(lerp(-2,0,0.03)),lerp(-2, 0, 0.03).concat(lerp(0,-2,0.03)),
       lerp(0, 1, 0.03).concat(lerp(1,0,0.03)),lerp(1, 0, 0.03).concat(lerp(0,1,0.03))];


jump_points = lerp(0 , 1 , 0.04).concat(lerp(1 , 0 , 0.04));
var t_jump = 0;

function check_ring(){

  for(var i = 0; i < rings.length ; i++){
    r = rings[i];
    console.log(r);
    try {
      z = sonic.position.z <= r.position.z + 0.05;
      z1 = sonic.position.z >= r.position.z - 0.05;

      y = sonic.position.y <= r.position.y + 0.5;
      y2 = sonic.position.y >= r.position.y - 0.5;

      x = sonic.position.x <= r.position.x + 0.3;
      x2 = sonic.position.x >= r.position.x - 0.3;
      if(z && z1 && x && x2 && y && y2){
        return i;
      }
    } catch(err){
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

  s = scene.getObjectByName( "sonic", true );
  if(typeof(s)!= "undefined"){
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
    sonic.getObjectByName(sonic_dic.Braccio_dx).rotation.y = -1;
    sonic.getObjectByName(sonic_dic.Braccio_sx).rotation.y = 1;
    sonic.getObjectByName(sonic_dic.Testa).rotation.z = 0.2;

    t = (t == run[0].length) ? 0 : t+=1;
    
    r = check_ring();
    if(r != -1){
      score +=10;
      text2.innerHTML = score;
      rings[r].position.set( (Math.random() < 0.5 ? -1 : 1)*Math.random()*3 , Math.random() < 0.5 ? 1.2 : 0.5, sonic.position.z + Math.random()*10+2);
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
