var robot;
var fireball;
var fireball_moves;
var t_robot = 0;
var t_fireball = 0;
var robot_to_spawn = true;
var shooting = false;
var frame_count = 0;
var time_to_shoot = 80;

var robot_time = 0;
var robot_max_time = 1000;

var robot_speed = 0.007
var fireball_speed = 0.025;


robot_moves = [lerp(0, 3, robot_speed).concat(lerp(3, 0, robot_speed)), 
               lerp(3.4, 2.7, robot_speed).concat(lerp(2.7, 3.4, robot_speed)), 
               lerp(4, -4, robot_speed).concat(lerp(-4, 4, robot_speed))];


loader.load("./../models/fireball/scene.gltf", function(gltf){
    fireball = gltf.scene;
    fireball.position.set( 0 , 1 , -5);

    fireball.scale.set(0.003,0.003,0.003);
    fireball.castShadow = true;
    scene.add(fireball);
});

/*

var geometry = new THREE.SphereGeometry( 0.2, 0.2, 32 );
var material = new THREE.MeshPhongMaterial( {map: new THREE.TextureLoader().load( '../Images/fireball.jpg'), specular: 0xffffff, shininess: 100, emissive: 0xd62323,
                                            flatShading: true} );
var fireball = new THREE.Mesh( geometry, material );
fireball.position.set(0,1,-5);
scene.add( fireball )

*/

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


var line;

function laser(){

    var material = new THREE.MeshPhongMaterial({
    color: 0xcf1b03,
    blending: THREE.AdditiveBlending, 
    shininess: 100, 
    emissive: 0xcf1b03
    });

    var geometry = new THREE.Geometry();
    geometry.vertices.push(
        new THREE.Vector3( robot.position.x,  robot.position.y,  robot.position.z ),
        new THREE.Vector3( sonic.position.x, sonic.position.y + 0.5, sonic.position.z )
    );

    line = new THREE.Line( geometry, material );
    scene.add( line );  
}

function spawn_robot(){

    if((sonic.position.z + 3) % 100 <= 1 && robot_to_spawn == true ){
        robot_to_spawn = false;
        robot.position.x = 4;
        robot.position.z = sonic.position.z + 150;
        shooting = false;
        t_robot = 0;
        robot_time = 0
    }
}


function fireball_lerp(fromx, fromy, fromz, tox, toy, toz){
    fireball_moves = [ lerp(fromx, tox, fireball_speed),
                       lerp(fromy, toy, fireball_speed),
                       lerp(fromz, toz, fireball_speed)
                     ];
}

function robotEnemy(){
    if(robot_to_spawn == false){
        if(robot.position.z >= sonic.position.z + 13){
            robot.position.z -= 0.8;
            return;
        }
        robot_time += 1;
        if(robot_time < robot_max_time){

            robot.position.z = sonic.position.z + 13;
            robot.rotation.z = robot_moves[0][t_robot];
            robot.rotation.y = robot_moves[1][t_robot];
            robot.position.x = robot_moves[2][t_robot];

            t_robot = (t_robot >= robot_moves[2].length) ? 0 : t_robot+1;



            var rand = Math.random();
            if(shooting == false && rand > 0.99 ){ 
                shooting = true;
                frame_count = 0;
                t_fireball = 0;
                laser();
            }
            if(shooting == true){
                line.geometry.vertices[0].x = robot.position.x;
                line.geometry.vertices[0].y = robot.position.y;
                line.geometry.vertices[0].z = robot.position.z;

                line.geometry.vertices[1].x = sonic.position.x;
                line.geometry.vertices[1].y = sonic.position.y + 0.5;
                line.geometry.vertices[1].z = sonic.position.z;
                line.geometry.verticesNeedUpdate = true;

                if(frame_count >= time_to_shoot){
                    if(frame_count == time_to_shoot){
                        if(robot.position.x >= 2){
                            if(sonic.position.x < 0) fireball_lerp(robot.position.x, robot.position.y, robot.position.z, sonic.position.x - 1.5, sonic.position.y - 1, sonic.position.z + 2);
                            else fireball_lerp(robot.position.x, robot.position.y, robot.position.z, sonic.position.x, sonic.position.y - 1, sonic.position.z + 1);
                        }
                        else if(robot.position.x <= -2) {
                            if(sonic.position.x > 0) fireball_lerp(robot.position.x, robot.position.y, robot.position.z, sonic.position.x + 1.5, sonic.position.y - 1, sonic.position.z + 2);
                            else fireball_lerp(robot.position.x, robot.position.y, robot.position.z, sonic.position.x, sonic.position.y - 1, sonic.position.z + 1);
                        }
                        else fireball_lerp(robot.position.x, robot.position.y, robot.position.z, sonic.position.x, sonic.position.y - 1, sonic.position.z + 1);
                    }

                    scene.remove(line);
                    fireball.position.x = fireball_moves[0][t_fireball];
                    fireball.position.y = fireball_moves[1][t_fireball];
                    fireball.position.z = fireball_moves[2][t_fireball];
                    fireball.rotation.x += 0.5;
                    fireball.rotation.y += 0.5;

                    if(!invincibility && check_fireball()){
                        getDamage();
                        damage_feedback();
                    }

                    t_fireball += 1;

                    if(t_fireball >= fireball_moves[0].length || fireball.position.z + 2 < sonic.position.z){
                        shooting = false;         
                        frame_count = 0;
                        t_fireball = 0;
                    }
                }
                frame_count += 1;
            }
        }
        else { // end condition
            robot.position.z -= 0.5;
            scene.remove(line);

            if(t_fireball != 0){
                fireball.position.x = fireball_moves[0][t_fireball];
                fireball.position.y = fireball_moves[1][t_fireball];
                fireball.position.z = fireball_moves[2][t_fireball];
                t_fireball = (t_fireball >= fireball_moves[0].length) ? 0 : t_fireball+1;
            }
            if(robot.position.z + 6 <= sonic.position.z) {
                robot_to_spawn = true;
                robot_time = 0;
                t_fireball = 0; 
                shooting = false;           }
        }
    }
}