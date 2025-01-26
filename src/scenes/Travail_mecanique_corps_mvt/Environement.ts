import {
    Scene, 
    Engine, 
    MeshBuilder, 
    SceneLoader, 
    StandardMaterial,
    Color3,
    Vector3,
    PhysicsImpostor,
    CannonJSPlugin,
    Texture,
    Vector4,
    Axis,
    Space
} from "@babylonjs/core";

import "@babylonjs/loaders";
import * as CANNON from "cannon";
import * as Ammo from "ammojs-typed"
import * as GUI from '@babylonjs/gui/2D';
import { UI } from "./ui";
import { Tools } from "babylonjs";

export class Environement {

  public scene: Scene;
  engine : Engine;
  boitiers: any;
  cliquer=true;//variable pour activer impostor ou non
  public _ui:UI;
  public distance=1; //distance à parcourir par le boitier
  public force=1;
  physicEngine:any;
  wheelFI:any;
  public bouger:any;

  constructor(
  scene:Scene, engine:Engine,
  // Lagestion du loader 
  private setLoaded: () => void,

  // gestion des cards
  private voirCard :()=>void,

  ){
  //la scene
  this.scene = scene;

  //on charge les autres interfaces
  this._ui = new UI(this.scene);  
  // this._ui.startTimer();
  this.scene.onBeforeRenderObservable.add(() => {
    // when the game isn't paused, update the timer
    
        this._ui.updateHud();
        // console.log(this.boitiers[0].position._y);
  });

  this.scene.enablePhysics(
    new Vector3(0,-9.81, 0), 
    new CannonJSPlugin(true,10,CANNON)
  );


  //the engine
  this.engine = engine;

  //creation des materiels
  this.importLaboratoire();
  this.createMateriels();
  this.createground();
  this.createground2();
  this.createMotor();

  //action des sliders
  this.actionButtonMenu();  
  //creategravity
  this.createGravity();
  //action slider
  this.actionGroupSlider();

  //verification de la position des boitiers
  // this.createLines(this.scene);
  this.createMesures();

  this.createLabels();


  }

  async importLaboratoire(){
    const labo = await SceneLoader.ImportMeshAsync("","./models/","laboratoire.glb", this.scene);
    // Apparution du loader
    this.setLoaded();

    // Juste apres ça montrer le card avec cette methode

    this.voirCard();

    console.log(labo.meshes)
    labo.meshes[10].isVisible = false;
    labo.meshes[11].isVisible = false;
    labo.meshes[14].isVisible = false;
    labo.meshes[20].isVisible = false;
    labo.meshes[19].isVisible = false;
    labo.meshes[18].isVisible = false;
    labo.meshes[17].isVisible = false;
    labo.meshes[16].isVisible = false;
    labo.meshes[15].isVisible = false;
    // labo.meshes[11].isVisible = false;



    return labo;
  }


  createMateriels(){

  //on dit que c'est un tableau
  this.boitiers = [];
  this.boitiers[0] = MeshBuilder.CreateBox("ball", {width: 0.25, height:0.25, size:0.25}, this.scene);
  this.boitiers[0].position.y = 0.7;
  this.boitiers[0].position.x = 6.5;
  this.boitiers[0].position.z = -0.25
  
  this.boitiers[0].material = this.changeMaterialColor(170,255,0)

  

  return [this.boitiers[0]];
  }


  changeMaterialColor(x,y,z):StandardMaterial{
  const ballMat = new StandardMaterial("ballMat", this.scene);
  ballMat.diffuseColor = new Color3(x,y,z)
  return ballMat;
  }

  // Animation
  public createImpostor():void{
  this.boitiers[0].physicsImpostor = new PhysicsImpostor(
    this.boitiers[0], 
    PhysicsImpostor.BoxImpostor,
    { mass: 1, restitution : 0.75 }
  )

  this.boitiers[0].physicsImpostor = new PhysicsImpostor(
    this.boitiers[0],
    PhysicsImpostor.BoxImpostor,
    {mass : 1 , restitution : 0.75}
  )
  }

  createground(){
  const ground = MeshBuilder.CreateGround('ground', {width:2.5, height:5.2})
  ground.position.y = 0.6
  ground.position.x = 7.2
  ground.position.z = -2.5

  ground.physicsImpostor = new PhysicsImpostor(
    ground,
    PhysicsImpostor.BoxImpostor,
    { mass: 0, restitution: 0.5}
  )
  ground.isVisible = false                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
  }
  createground2(){
  const ground = MeshBuilder.CreateGround('ground', {})
  ground.position.y = 0.7
  ground.position.x = 7
  ground.position.z = -4.5

  ground.physicsImpostor = new PhysicsImpostor(
    ground,
    PhysicsImpostor.BoxImpostor,
    { mass: 0, restitution: 0.5}
  )
  ground.isVisible = false
  }

  actionButtonMenu(){
  this._ui._buttonAction[0].onPointerUpObservable.add(()=>{

    if(this.cliquer == true){
           
      this.cliquer = false;
      this.createImpulse();
      this._ui._stopTimer = false;

      this._ui.startTimer();
    
    }

    
  })

  this.scene.registerAfterRender(() => {
    if(this.bouger == true){
      this.wheelFI.rotate(Axis.X, Math.PI/2, Space.WORLD); 
    }
  }); 


  this._ui._buttonAction[1].onPointerUpObservable.add(()=>{
    this.toRestart();
  })
  }
  toRestart(){
    //repositionate boitier
    if(this.boitiers[0].physicsImpostor){
      this.boitiers[0].physicsImpostor.dispose();

    }
    this.bouger = false;

    this.boitiers[0].position.y = 0.7;
    this.boitiers[0].position.x = 6.5;
    this.boitiers[0].position.z = -0.25


    this.boitiers[0].rotation.x = 0;
    this.boitiers[0].rotation.y = 0;
    this.boitiers[0].rotation.z = 0;

    
    //reset clocktime
    this.cliquer=true;
    this._ui._sString = "00";
    this._ui._mString = 0;
    this._ui.time = 0;
    this._ui._clockTime.text = "00:00";

    this._ui._stopTimer = true;
    this._ui.stopTimer();
  }

  createImpulse(){// Initialiser le PhysicsImpostor
    this.boitiers[0].physicsImpostor = new PhysicsImpostor(
      this.boitiers[0],
      PhysicsImpostor.BoxImpostor,
      { mass: 10, friction: 0.01 }
    );
    
    // Variable globale pour le mouvement
     this.bouger = true;
    const vitesse1 = -0.06*this.force;
    
    const update = () => {
      if (this.bouger) {
        // Mettre à jour la vitesse
        this.boitiers[0].physicsImpostor.setLinearVelocity(new Vector3(0, 0, vitesse1));
        
        // Vérifier la condition d'arrêt
        if (this.boitiers[0].position._z <= (-this.distance-0.3)) { // Notez l'utilisation de .z au lieu de ._z
          // this.boitiers[0].dispose();
          this.bouger = false; // Arrêter le mouvement
          this._ui._stopTimer = true;
          this._ui.stopTimer();
          this.cliquer=false;
        }
        console.log("z est", this.boitiers[0].position._z)
      }
    };
    
    // Enregistrer la fonction d'update avant le rendu
    this.scene.registerBeforeRender(update);

  }



  createMotor(){

    //poteau1
    const poteau1 = MeshBuilder.CreateBox("p1",{width: 0.1, height:0.8, size: 0.1}, this.scene);
    poteau1.position.y = 1;
    poteau1.position.x = 6.7;
    poteau1.position.z = -5;

    //poteau2
    const poteau2 = MeshBuilder.CreateBox("p1",{width: 0.1, height:0.8, size: 0.1}, this.scene);
    poteau2.position.y = 1;
    poteau2.position.x = 7.5;
    poteau2.position.z = -5;

    //create cylinder
    const cylinder = MeshBuilder.CreateCylinder("c1",{height:1.5, diameter:0.1}, this.scene);
    cylinder.position.y = 1;
    cylinder.position.x = 7.1;
    cylinder.position.z = -5;
    cylinder.rotation.z = Math.PI/2;

    
    this.createAnimation();

  }

  createAnimation():void{
    	/*-----------------------Wheel------------------------------------------*/ 
	
	//Wheel Material 
	var wheelMaterial = new StandardMaterial("wheel_mat");
  var wheelTexture = new Texture("https://i.imgur.com/ZUWbT6L.png");
  wheelMaterial.diffuseTexture = wheelTexture;

  //Set color for wheel tread as black
  var faceColors=[];
  faceColors[1] = new Color3(0,0,0);

  //set texture for flat face of wheel 
  var faceUV =[];
  faceUV[0] = new Vector4(0,0,1,1);
  faceUV[2] = new Vector4(0,0,1,1);

  //create wheel front inside and apply material
  this.wheelFI = MeshBuilder.CreateCylinder("wheelFI", {diameter: 0.5, height: 0.1, tessellation: 24, faceColors:faceColors, faceUV:faceUV});
  this.wheelFI.material = wheelMaterial;
  this.wheelFI.position = new Vector3(7.1,1,-5)
  
    
  //rotate wheel so tread in xz plane  
  this.wheelFI.rotate(Axis.Z, Math.PI/2, Space.WORLD);
  // wheelFI.parent = carBody;  


/*-----------------------End Wheel------------------------------------------*/ 

/*------------Create other Wheels as Instances, Parent and Position----------*/



  }

  actionGroupSlider(){
    const physicEngine = this.physicEngine;

    physicEngine.setGravity(new Vector3(0,-1,0))

    //valeur de p1
    var masse1=2;
    var masse2=1;
    this._ui._textMasse[4].text = "W = "+(this._ui._sliders[0].value)+"x"+ (masse2)+" = "+(this._ui._sliders[0].value*masse2).toFixed(2)+" J";


    const displayValue = function(value){
      return Math.floor(value*100)/100;
    }

    const ball1 = this.boitiers[0];

    var m2=1;
    const setDist = (value) => {
      this.distance = value;
      masse1 = value;
      this._ui._textMasse[1].text = "Distance = "+ value.toFixed(2)+"mètres";
      this._ui._textMasse[4].text = "W = "+(value.toFixed(2))+"x"+(masse2).toFixed(2)+" = "+(masse2*value).toFixed(2)+" J";


    }

    
    const setForce = (value) => { 
      physicEngine.setGravity(new Vector3(0,-(value),0))
      this._ui._textMasse[4].text = "W = "+(masse1.toFixed(2))+"x"+(value.toFixed(2))+" = "+(value*masse1).toFixed(2)+" J";
      this._ui._textMasse[0].text = "Force = "+ value.toFixed(2)+" N";
      this.force = value;
      masse2=value;

    }
    this._ui.groupSliders[0].addSlider("Force du moteur =  ",setForce,"N",1,20,1,displayValue);
    this._ui.groupSliders[0].addSlider("Distance à parcourir OO'",setDist,"m",1,4,1,displayValue);
    // this._ui.groupSliders[0].addSlider("Masse boîtier rouge",setBall2,"Kg",1,2,1,displayValue);

    // this._ui.groupSliders[1].addCheckbox("Chambre à vide")


    
  }

  async createGravity(){
    // const ammo = await Ammo()
    // let physics: AmmoJSPlugin = new AmmoJSPlugin(true, ammo)
    this.scene.enablePhysics(null, new CannonJSPlugin(true,10,CANNON));
    this.physicEngine = this.scene.getPhysicsEngine();

  }

  //fonction pour creer les lignes 
  createLines(scene){
    const points = [
      this.boitiers[1].position,
      new  BABYLON.Vector3(7.7,0.7,-5)
    ];

    //dessiner la ligne
    const line = BABYLON.MeshBuilder.CreateLines("line",{points: points}, scene);
    // line.scaling = new BABYLON.Vector3(10,10,10);

    const lineMaterial = new BABYLON.StandardMaterial("lineMaterial", scene);
    // lineMaterial.emissiveColor = new BABYLON.Color3(255,0,0);

    // line.material = lineMaterial;
  

    const points1 = [
      this.boitiers[0].position,
      new  BABYLON.Vector3(6.5,0.7,-5)
    ];

    //dessiner la ligne
    const line1 = BABYLON.MeshBuilder.CreateLines("line",{points: points1}, scene);
    // line.scaling = new BABYLON.Vector3(10,10,10);


    const linear = BABYLON.MeshBuilder.CreateBox("box",{width:0.1, height:0.2, size:2}, scene )
    linear.position = new BABYLON.Vector3(7.3,0.5,-4.15);
    linear.rotation._y = Math.PI/2;

  }

  createFil() {
    // Création d'un fil (cylindre)
    var wireLength = 5; // Longueur du fil
    var wire = MeshBuilder.CreateCylinder(
      "wire",
      { height: wireLength, diameter: 0.1 },
      this.scene
    );
    wire.position.y = wireLength / 2; // Position initiale du fil
    wire.rotation.x = Math.PI / 2;
  }

  createMesures(){
    // Create graduation lines (1 meter apart)
    const createGraduationLines = () => {
      for (let i = 1; i <= 5; i++) {
          // Create a line at each meter
          const line = MeshBuilder.CreateLines("line" + i, {
              points: [
                  new Vector3(i-0.5, 0.7, 8.5),  // start of the line
                  new Vector3(i-0.5, 0.7, 5.68)    // end of the line
              ]
          });
          line.rotation.y = Tools.ToRadians(90);

      }
  };

  createGraduationLines();
  }

  createLabels(){
    for (let i = 1; i <= 10; i++) {
      const label = new GUI.TextBlock();
      label.width = 0.5;
      label.text = "erweriou";  // Display the number
      label.color = "black";
      label.fontSize = 48;  // Increase the font size for better visibility

      // Create a plane to display the label
      const labelPlane = MeshBuilder.CreatePlane("labelPlane" + i, {size: 0.6});  // Bigger size for label plane
      labelPlane.position = new Vector3(i, 1, 8);  // Position the label higher above the table

      // Attach the label to the plane
      const labelTexture = GUI.AdvancedDynamicTexture.CreateForMesh(labelPlane);
      labelTexture.addControl(label);
  }
  }

  


} 