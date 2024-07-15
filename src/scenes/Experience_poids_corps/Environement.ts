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

export class Environement {

  public scene: Scene;
  engine : Engine;
  boitiers: any;
  cliquer=true;//variable pour activer impostor ou non
  public _ui:UI;
  physicEngine:any;
  wheelFI:any;

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
  this.boitiers[0].position.z = -0.7
  this.boitiers[0].material = this.changeMaterialColor(170,255,0)

  this.boitiers[1] = MeshBuilder.CreateBox("ball", {width: 0.25, height: 0.25, size: 0.25}, this.scene);
  this.boitiers[1].position.y = 0.7;
  this.boitiers[1].position.x = 7.7;
  this.boitiers[1].position.z = -0.7
  this.boitiers[1].material = this.changeMaterialColor(255,0,0)

  return [this.boitiers[0],this.boitiers[1]];
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
           
      this.createImpulse();
      this._ui._stopTimer = false;

      this._ui.startTimer();
      this.cliquer = false;
    
    }

    
  })

  this.scene.registerAfterRender(() => {
    if(this.cliquer !== true){
      this.wheelFI.rotate(Axis.X, Math.PI/2, Space.WORLD); 
    }
  }); 


  this._ui._buttonAction[1].onPointerUpObservable.add(()=>{
    this.toRestart();
  })
  }
  toRestart(){
  this.boitiers[1].position.y = 0.7;
  this.boitiers[1].position.x = 7.7;
  this.boitiers[1].position.z = -0.7
  this.boitiers[0].physicsImpostor.dispose();


  this.boitiers[0].position.y = 0.7;
  this.boitiers[0].position.x = 6.5;
  this.boitiers[0].position.z = -0.7
  this.boitiers[1].physicsImpostor.dispose();
  this.cliquer=true;
  this._ui._sString = "00";
  this._ui._mString = 0;
  this._ui.time = 0;
  // this._ui._stopTimer = false;
  this._ui._clockTime.text = "00:00";

  }

  createImpulse(){
    this.boitiers[0].physicsImpostor = new PhysicsImpostor(
      this.boitiers[0],
      PhysicsImpostor.BoxImpostor,
      {mass: 10, friction: 0.04}
    );

    this.boitiers[1].physicsImpostor = new PhysicsImpostor(
      this.boitiers[1],
      PhysicsImpostor.BoxImpostor,
      {mass: 10, friction: 0.04}
    );


    const bouger = () =>{
      this.boitiers[0].physicsImpostor.setLinearVelocity(new Vector3(0,0,-1));
      this.boitiers[1].physicsImpostor.setLinearVelocity(new Vector3(0,0,-1));
    }

    this.scene.registerBeforeRender(bouger);

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
    //valeur de p1
    this._ui._textMasse[4].text = "P1 = "+(this._ui._sliders[0].value)+"x"+(-this.physicEngine.gravity.y)+" kg";

    const displayValue = function(value){
      return Math.floor(value*100)/100;
    }

    const ball1 = this.boitiers[0];
    const ball2 = this.boitiers[1];

    var t=1;
    const setBall1 = (value) => {
      ball1.scaling.x = value;
      ball1.scaling.y = value;
      ball1.scaling.z = value;
      this._ui._textMasse[0].text = "m1 = "+ value.toFixed(2)+"Kg";
      this._ui._textMasse[3].text = "m12 = "+(((value.toFixed(2))))+ "Kg"
      this._ui._textMasse[3].text = "m12 = "+((value.toFixed(2)+(t.toFixed(2))))+ "Kg"
      this._ui._textMasse[4].text = "P1 = "+(value.toFixed(2))+"x"+(-this.physicEngine.gravity.y).toFixed(2)+" kg";


    }

    const setBall2 = (value) => {
      ball2.scaling.x = value;
      ball2.scaling.y = value;
      ball2.scaling.z = value;
      t=value;
      this._ui._textMasse[1].text = "m2 = "+ value.toFixed(2)+"Kg";
      this._ui._textMasse[3].text = "m12 = "+(value.toFixed(2)+parseInt(t.toFixed(2)))+ "Kg"


    }


    const physicEngine = this.physicEngine;
    const setGravitaion = (value) => { 
      physicEngine.setGravity(new Vector3(0,-(value),0))
      this._ui._textMasse[4].text = "P1 = "+(this._ui._textMasse[0].value)+"x"+(value.toFixed(2))+" kg";


    }
    this._ui.groupSliders[0].addSlider("Gravitation",setGravitaion,"m/s2",0,15,9.81,displayValue);
    this._ui.groupSliders[0].addSlider("Masse boîtier jaune",setBall1,"Kg",1,2,1,displayValue);
    this._ui.groupSliders[0].addSlider("Masse boîtier rouge",setBall2,"Kg",1,2,1,displayValue);

    this._ui.groupSliders[1].addCheckbox("Chambre à vide")

    
  }

  async createGravity(){
    // const ammo = await Ammo()
    // let physics: AmmoJSPlugin = new AmmoJSPlugin(true, ammo)
    this.scene.enablePhysics(null, new CannonJSPlugin(true,10,CANNON));
    this.physicEngine = this.scene.getPhysicsEngine();

  }


} 