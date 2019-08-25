var robot;
var fireball;

var robot_to_spawn = true;

loader.load("./../models/fireball/scene.gltf", function(gltf){
    fireball = gltf.scene;
    fireball.position.set( 0 , 1 , 5);

    fireball.scale.set(0.007,0.007,0.007);
    fireball.castShadow = true;
    //scene.add(fireball);
});

loader.load("./../models/robotfly/scene.gltf", function(gltf){
    robot = gltf.scene;
    robot.position.set( 4 , 3 , -4);
    robot.scale.set(0.1,0.1,0.1);
    robot.castShadow = true;
    robot.rotation.z = 0;
    robot.rotation.y = 3.5;
    robot.rotation.x = -0.4;
    scene.add(robot);
});




function check_fireball(){
    if(fireball.position.z + 2 < sonic.position.z) return false;
    var z1 = fireball.position.z <= sonic.position.z + error;
    var z2 = fireball.position.z >= sonic.position.z - error;
    var x1 = fireball.position.x <= sonic.position.x + error;
    var x2 = fireball.position.x >= sonic.position.x - error;
    var y1 = fireball.position.y >= sonic.position.y - error;
    var y2 = fireball.position.y <= sonic.position.y + error;
    if(x1 && x2 && y1 && y2 && z1 && z2) return true;
    return false;
}



function shoot(){

    /*
    var material = new THREE.LineBasicMaterial({
    color: 0xfb0000,
    blending: THREE.AdditiveBlending
    });

    var geometry = new THREE.Geometry();
    geometry.vertices.push(
        new THREE.Vector3( robot.position.x,  robot.position.y,  robot.position.z ),
        new THREE.Vector3( sonic.position.x, sonic.position.y + 0.5, sonic.position.z )
    );

    var line = new THREE.Line( geometry, material );
    scene.add( line ); */   
}

function spawn_robot(){

    if( robot_to_spawn == true && egg == false){
        robot_to_spawn = false;
        robot.position.z = sonic.position.z + 150;
        t_robot = 0;
    }
}

var t_robot = 0;
var shootting = false;
var move = 0;

function robot_time(){
    if(robot_to_spawn == false){
        if(robot.position.z >= sonic.position.z + 10){
            robot.position.z -= 1;
            return;
        }

        robot.rotation.z = robot_moves[0][t_robot];
        robot.rotation.y = robot_moves[1][t_robot];
        robot.position.x = robot_moves[2][t_robot];

        t_robot = (t_robot >= robot_moves[2].length) ? 0 : t_robot+1;



        var rand = Math.random();
        if(shootting == false && rand > 0 ){ 
            shootting = true;
            //shoot();
        }

        if(sonic.position.z >= 50){
            robot.position.z -= 0.5;
            if(robot.position.z + 2 <= sonic) {
                robot_to_spawn = true;
            }
        } else robot.position.z = sonic.position.z + 10;

    }
}