
const backgroundColor = 0x000000;

/*////////////////////////////////////////*/

var renderCalls = [];
function render () {
  requestAnimationFrame( render );
  renderCalls.forEach((callback)=>{ callback(); });
}
render();

/*////////////////////////////////////////*/

var scene = new THREE.Scene();

var camera = new THREE.PerspectiveCamera( 80, window.innerWidth / window.innerHeight, 0.1, 800 );
camera.position.set(0,2,-4);

var renderer = new THREE.WebGLRenderer( { antialias: true } );
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

/*////////////////////////////////////////////////////////////////////


var qInitial = new THREE.Quaternion().setFromAxisAngle( (0,0,1) , -5 );
var qFinal = new THREE.Quaternion().setFromAxisAngle( (0,0,1),5);
var quaternionKF = new THREE.QuaternionKeyframeTrack( '.quaternion', [ 0, 1, 2 ], [ qInitial.x, qInitial.y, qInitial.z, qInitial.w, qFinal.x, qFinal.y, qFinal.z, qFinal.w, qInitial.x, qInitial.y, qInitial.z, qInitial.w ] );
var clip = new THREE.AnimationClip( 'Run', 3, [quaternionKF] );
*/

function renderScene(){ renderer.render( scene, camera ); }
renderCalls.push(renderScene);


/* ////////////////////////////////////////////////////////////////////////// */

var controls = new THREE.OrbitControls( camera );

controls.rotateSpeed = 0.3;
controls.zoomSpeed = 0.9;

controls.minDistance = 3;
controls.maxDistance = 20;

controls.minPolarAngle = 0; // radians
controls.maxPolarAngle = Math.PI /2; // radians

controls.enableDamping = true;
controls.dampingFactor = 0.05;

renderCalls.push(function(){
  controls.update()
});


/* ////////////////////////////////////////////////////////////////////////// */




var light = new THREE.AmbientLight( 0x20202A, 20, 100 );
light.position.set( 30, -10, 30 );
scene.add( light );

/* ////////////////////////////////////////////////////////////////////////// */

var moverGroup = new THREE.Object3D();
scene.add( moverGroup );
var floorGroup = new THREE.Object3D();

var floorMaterial = new THREE.MeshLambertMaterial({
	color: 0x006400, //diffuse							
	emissive: 0x000000, 
	shading: THREE.FlatShading, 
	side: THREE.DoubleSide,
	map: new THREE.TextureLoader().load('./ground.jpg'),
});

floorGeometry = new THREE.PlaneGeometry( 20, 1000 , 20,20 );
var floorMesh = new THREE.Mesh( floorGeometry, floorMaterial );

floorGroup.add( floorMesh );
moverGroup.add( floorGroup );
floorMesh.rotation.x = Math.PI/2;
//floorMesh.rotation.z = Math.PI/2;
floorGroup.position.y = 0;
moverGroup.position.z = 0;
floorGroup.position.z = 500;


/*//////////////////////////////////////////*/


var loader = new THREE.GLTFLoader();
loader.crossOrigin = true;

loader.load( './../models/scene.gltf', function ( gltf ) {

  
    var sonic = gltf.scene;
    sonic.position.set(0, 0, -0.75);
    //object.scale.set(2,2,2);
  

    gltf.scene.traverse(function(child){
      //console.log(child);
      if(child.name == "Thigh_R_014"){
        //child.rotateZ(5);
      }
     });
    //var mixer = new THREE.AnimationMixer( object );
    //var clipAction = AnimationAction(mixer ,clip );
    //clipAction.play(object);

    //object.position.y = - 95;
    scene.add( sonic );
    animate(sonic);
});

function animate(sonic){
	console.log(sonic.position);
	//scene.remove(sonic);

}
