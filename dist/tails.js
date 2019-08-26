var spawn_tails = true;
var can_move_tails = false;
var speed = 0.05;

const tails_dic = { 

    Testa : "Head_08",
  
    Fianchi : "Hips_05",
   // Bacino_dx : "Pelvis_R_013",
   // Bacino_sx : "Pelvis_L_08",
  
    Coscia_dx : "Thigh_R_058",
    Polpaccio_dx : "Calf_R_059",
    Piede_dx : "Foot_R_060",
  
    Coscia_sx : "Thigh_L_052",
    Polpaccio_sx : "Calf_L_053",
    Piede_sx : "Foot_L_054",
  
    Spalla_dx : "Shoulder_R_027",
    Braccio_dx : "UpperArm_R_028",
    Avambraccio_dx : "ForeArm_R_029",
    Polso_dx : "Wrist_R_043",
    Mano_dx : "Hand_R_032",
  
    Indice_lower_sx: "Index2_L_017",
    Indice_upper_sx: "Index1_L_016",
    Medio_lower_sx: "Middle2_L_019",
    Medio_upper_sx: "Middle1_L_018",
    Mignolo_lower_sx:  "Pinky2_L_021",
    Mignolo_upper_sx: "Pinky1_L_020",    
    Anulare_lower_sx: "Ring2_L_023",
    Anulare_upper_sx:  "Ring1_L_022",
    Pollice_lower_sx: "Thumb2_L_025",
    Pollice_upper_sx:  "Thumb1_L_024",

    Indice_upper_dx: "Index1_R_033",
    Indice_lower_dx: "Index2_R_034",
    Medio_upper_dx: "Middle1_R_035",
    Medio_lower_dx: "Middle2_R_036",
    Mignolo_upper_dx: "Pinky1_R_037",
    Mignolo_lower_dx: "Pinky2_R_038",
    Anulare_upper_dx: "Ring1_R_039",
    Anulare_lower_dx: "Ring2_R_040",
    Pollice_upper_dx: "Thumb1_R_041",
    Pollice_lower_dx: "Thumb2_R_042",
  
    Spalla_sx : "Shulder_L_010",
    Braccio_sx : "UpperArm_L_011",
    Avambraccio_sx : "ForeArm_L_012",
    Polso_sx : "Wrist_L_026",
    Mano_sx : "Hand_L_015",
  };

var tails_run = [lerp(4, 2 , run_speed).concat(lerp(2, 4, run_speed)), lerp(0, -0.5, run_speed).concat(lerp(-0.5,0,run_speed)), 
    lerp(2, 4, run_speed).concat(lerp(4, 2,run_speed)),lerp(-0.5, 0, run_speed).concat(lerp(0,-0.5,run_speed)),
    lerp(0, -2, run_speed).concat(lerp(-2,0,run_speed)),lerp(-2, 0, run_speed).concat(lerp(0,-2,run_speed)),
    lerp(0, 1, run_speed).concat(lerp(1,0,run_speed)),lerp(1, 0, run_speed).concat(lerp(0,1,run_speed))];
  
var tails_jump_points = lerp(0 , 1.5 , 0.04).concat(lerp(1.5 , 0 , 0.04));
  
function move_tails(t){
    tails.getObjectByName(tails_dic.Polpaccio_dx).rotation.z = tails_run[1][t];
    tails.getObjectByName(tails_dic.Coscia_dx).rotation.z = tails_run[0][t];
    tails.getObjectByName(tails_dic.Polpaccio_sx).rotation.z = tails_run[3][t];
    tails.getObjectByName(tails_dic.Coscia_sx).rotation.z = tails_run[2][t];
    tails.getObjectByName(tails_dic.Avambraccio_sx).rotation.z = tails_run[4][t];
    tails.getObjectByName(tails_dic.Avambraccio_dx).rotation.z = tails_run[5][t];
    tails.getObjectByName(tails_dic.Braccio_dx).rotation.z = tails_run[6][t];
    tails.getObjectByName(tails_dic.Braccio_sx).rotation.z = tails_run[7][t];
    tails.position.z -= speed;

    if(tails.position.z < sonic.position.z){
        can_move_tails = false;
        spawn_tails = true;
        tails.visible = false;
    }
} 

function spawnTails(){
    if(Math.random() > items_probability){
        var side = Math.random() > 0.5 ? -1 : 1;
        tails.position.set(side*Math.random()*3, 0, sonic.position.z + 100);
        tails.visible = true;
        can_move_tails = true;
        spawn_tails = false;
    }
}
