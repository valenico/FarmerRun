var robot;

loader.load("./../models/robotfly/scene.gltf", function(gltf){
    robot = gltf.scene;
    robot.position.set( 3 , 3 , 4);
    robot.scale.set(0.1,0.1,0.1);
    robot.castShadow = true;
    robot.rotation.y = 3.7;
    robot.rotation.x = -0.4;
    scene.add(robot);
    shoot();
});

function shoot(){
    var bullet  = new THREE.Mesh( new THREE.SphereGeometry(0.1, 8 , 8), 
        new THREE.MeshPhongMaterial({color:0xffdb00
        })
    );
    var bullet_light = new THREE.PointLight( 0xffdb00, 100 , 5);
    bullet.position.set(robot.position.x-1 , robot.position.y-1, robot.position.z - 1);
    bullet_light.position.set(bullet.position);
    scene.add(bullet);
    scene.add(bullet_light);
    
}