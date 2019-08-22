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

var renderer, scene, camera, controls, sonic, eggman;
var t = 0;
var jump = false;


var ground1, ground2;
var side1, side2, side3, side4;
var city1, city2, city3, city4;

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

  var light1 = new THREE.AmbientLight( 0xffffff,0.5,1);
  light1.position.set( 30, 10, 30  );
  scene.add(light1);

  light = new THREE.SpotLight( 0xffffff, 2);
  light.position.set( -0.5, 17, -1  );
  light.castShadow = true;
  scene.add( light );

    //Set up shadow properties for the light
  light.shadow.mapSize.width = 1024;  // default
  light.shadow.mapSize.height = 1024; // default
  light.shadow.camera.near = 0.5;       // default
  light.shadow.camera.far = 8000;     // default
  light.shadow.camera.fov = 30;

  var res = generateCities();
  scene.add(res[0]);
  scene.add(res[1]);
  scene.add(res[2]);
  scene.add(res[3]);
}

var max_buildings = 150;

function generateTextureCanvas(){
		// build a small canvas 32x64 and paint it in white
		var canvas	= document.createElement( 'canvas' );
		canvas.width	= 32;
		canvas.height	= 64;
		var context	= canvas.getContext( '2d' );
		// plain it in white
		context.fillStyle	= '#ffffff';
		context.fillRect( 0, 0, 32, 64 );
		// draw the window rows - with a small noise to simulate light variations in each room
		for( var y = 2; y < 64; y += 2 ){
			for( var x = 0; x < 32; x += 2 ){
				var value	= Math.floor( Math.random() * 64 );
				context.fillStyle = 'rgb(' + [value, value, value].join( ',' )  + ')';
				context.fillRect( x, y, 2, 1 );
			}
		}

		// build a bigger canvas and copy the small one in it
		// This is a trick to upscale the texture without filtering
		var canvas2	= document.createElement( 'canvas' );
		canvas2.width	= 512;
		canvas2.height	= 1024;
		var context	= canvas2.getContext( '2d' );
		// disable smoothing
		context.imageSmoothingEnabled		= false;
		context.webkitImageSmoothingEnabled	= false;
		context.mozImageSmoothingEnabled	= false;
		// then draw the image
		context.drawImage( canvas, 0, 0, canvas2.width, canvas2.height );
		// return the just built canvas2
		return canvas2;
	}

var buildings_texture = new THREE.Texture(generateTextureCanvas());

var light	= new THREE.Color( 0xffffff );
var shadow	= new THREE.Color( 0x303050 );

function generateCities(){
	city1 = new THREE.Group();
	city2 = new THREE.Group();
	city3 = new THREE.Group();
	city4 = new THREE.Group();

	var geometry = new THREE.CubeGeometry( 1, 1, 1 );
	geometry.applyMatrix( new THREE.Matrix4().makeTranslation( 0, 0.5, 0 ) );

	buildings_texture.needsUpdate = true;
	var cmaterial = new THREE.MeshLambertMaterial( { map: buildings_texture });
	var buildingMesh = new THREE.Mesh( geometry, cmaterial );

	// base colors for vertexColors. light is for vertices at the top, shaddow is for the ones at the bottom
	var cityGeometry = new THREE.Geometry();

	var building;
	for( var i = 0; i < max_buildings; i ++ ){
			city1.add(generateBuilding(buildingMesh, 0, 0));
		    city2.add(generateBuilding(buildingMesh, 1, 0));
		    city3.add(generateBuilding(buildingMesh, 0, 500));
		    city4.add(generateBuilding(buildingMesh, 1, 500));
	}
	city1.add(side1);
	city2.add(side2);
	city3.add(side3);
	city4.add(side4);

	return [city1, city2, city3, city4];
}

function generateBuilding(buildingMesh, side, start){
	var building = buildingMesh.clone();
	if(side == 0) building.position.x	= Math.floor( Math.random() * 30 ) + 20 ;
	else building.position.x	= (- Math.floor( Math.random() * 30 ) - 20) ;
	building.position.z	= start + Math.floor( Math.random() * 500 );
	// put a random rotation
	
	// put a random scale
	building.scale.x	= Math.random() * Math.random() * Math.random() * Math.random() * 50 + 8;
	building.scale.y	= (Math.random() * Math.random() * Math.random() * building.scale.x) * 8 + 8;
	building.scale.z	= building.scale.x;
	if(building.scale.x < 30) building.rotation.y	= Math.random()*Math.PI*2;

	var value	= 1 - Math.random() * Math.random();
	var baseColor	= new THREE.Color().setRGB( value + Math.random() * 0.1, value, value + Math.random() * 0.1 );
	// set topColor/bottom vertexColors as adjustement of baseColor
	var topColor	= baseColor.clone().multiply( light );
	var bottomColor	= baseColor.clone().multiply( shadow );
	// set .vertexColors for each face
	var geometry	= building.geometry;		
	for ( var j = 0, jl = geometry.faces.length; j < jl; j ++ ) {
		if ( j === 2 ) {
			// set face.vertexColors on root face
			geometry.faces[ j ].vertexColors = [ baseColor, baseColor, baseColor, baseColor ];
		} else {
			// set face.vertexColors on sides faces
			geometry.faces[ j ].vertexColors = [ topColor, bottomColor, bottomColor, topColor ];
		}
	}
	return building;
}


var loader = new THREE.GLTFLoader();
loader.crossOrigin = true;

loader.load( './../models/scene.gltf', function ( gltf ) {
    sonic = gltf.scene;
    sonic.name = "sonic";
    sonic.position.set(0, 0, -0.75);
    sonic.castShadow = true;
    sonic.receiveShadow = false;

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
text2.style.top = 20 + 'px';
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

    // Infinite road
    if(sonic.position.z >= 250*times){
      if(times % 2 == 0){
        ground2.position.z += 500;
        city3.position.z += 500;
        city4.position.z += 500;

      }
      else{ 
        ground1.position.z += 500;
        city1.position.z += 500;
        city2.position.z += 500;
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
  } else {
    objGeometry = new THREE.PlaneGeometry(60, 500, 32);
    times_horizontal = 5;
    times_vert = 300;
  }

  texture.repeat.set(times_horizontal, times_vert);

  var objMaterial = new THREE.MeshPhongMaterial({
    map: texture,
    side: THREE.DoubleSide,
    shading: THREE.FlatShading,
  });

  if(n =='road'){
    ground1 = new THREE.Mesh(objGeometry, objMaterial);
    ground1.rotation.x = 300.0221;
    ground1.receiveShadow = true;
    scene.add(ground1);      

    ground2 = ground1.clone();
    ground2.receiveShadow = true;
    ground2.position.z = 500-0.5;
    scene.add(ground2);
  
  } else {
    side1 = new THREE.Mesh(objGeometry, objMaterial);
    side1.rotation.x = 300.0221;
    side1.position.x = 33;

    side2 = side1.clone();
    side2.rotation.x = 300.0221;
    side2.position.x = -33;

    side3 = side1.clone();
    side3.rotation.x = 300.0221;
    side3.position.x = 33;
    side3.position.z = 500;

    side4 = side1.clone();
    side4.rotation.x = 300.0221;
    side4.position.x = -33;
    side4.position.z = 500;

    scene.add(side1);
    scene.add(side2);
    scene.add(side3);
    scene.add(side4);

  }

  
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
loader1.load('./../Images/road.jpg', onLoad, onProgress, onError);
loader1.load('./../Images/asphalt2.jpg', onLoad, onProgress, onError);

function render(){ 
  //scene.add( cylinder );
  renderer.render(scene, camera);
}

// fine metodo texture
init();
animate();
