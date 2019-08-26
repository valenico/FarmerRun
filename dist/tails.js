var tails;

loader.load( "./../models/tails/scene.gltf", function(gltf){
    tails = gltf.scene;
    tails.position.set( 0 , 0, 3); 
    scene.add(tails);
  });
  