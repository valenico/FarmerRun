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
  Avambraccio_sx : "ForeArm_L_0321",
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
var renderer, scene, camera, controls, sonic;
var t = 0;
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

function lerp(target, current, fraction){
	return (target-current)*fraction + current;
}

function animate(){
  //sonic.translateX(lerp(sonic.position + 10, sonic.position, 0.2))4
  if(typeof(scene.getObjectByName( "sonic", true ))!= "undefined"){
  	console.log(scene.getObjectByName( "sonic", true ).position);
  	var aux = scene.getObjectByName( "sonic", true ).position.z;
  	//scene.getObjectByName( "sonic", true ).position.z += 0.1;
  	scene.getObjectByName( "sonic", true ).position.z += lerp(10, 0, 0.01);
  	camera.position.z += lerp(10, 0, 0.01);
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

  if(t < 0.5){
    try {
      sonic.getObjectByName(sonic_dic.Testa).rotation.x += 1;
    } catch(err) {}
  } 
 // scene.add(sonic);
  t = (t >= 1) ? 0 : t+= 0.002;
  renderer.render(scene, camera);
}

// fine metodo texture
init();
animate();
