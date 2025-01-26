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
        this._ui.updateHud1();

        // console.log("b1",this.boitiers[0].position._x);
        // console.log("b2", this.boitiers[1].position._x);

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
  // this.createMotor();

  //action des sliders
  this.actionButtonMenu();  

  //creategravity
  this.createGravity();


  this.fonction();


  }

  async importLaboratoire(){
   // this.engine.displayLoadingUI();
   const labo = await SceneLoader.ImportMeshAsync(
    "",
    "./experience3_PFD/",
    "studio.glb",
    this.scene
  );
    // Apparution du loader
    this.setLoaded();

    // Juste apres ça montrer le card avec cette methode

    this.voirCard();

    console.log(labo.meshes)
    labo.meshes[1].position.y = 0.8;
    labo.meshes[1].position.x = -7;
    labo.meshes[2].isVisible = false;
    labo.meshes[1].isVisible = false;
    labo.meshes[8].isVisible = false;




    return labo;
  }


  createMateriels(){

  //on dit que c'est un tableau
  this.boitiers = [];
  this.boitiers[0] = MeshBuilder.CreateBox("ball", {width: 0.25, height:0.25, size:0.25}, this.scene);
  this.boitiers[0].position.y = 0.7;
  this.boitiers[0].position.x = 6.5;
  this.boitiers[0].position.z = -0.7
  this.boitiers[0].isVisible = false;
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
           
      this.createImpulse();
      this._ui._stopTimer = false;
      this._ui._stopTimer1 = false;

      this._ui.startTimer();
      this._ui.startTimer1();

      this.cliquer = false;
    
    }

    
  })


  this._ui._buttonAction[1].onPointerUpObservable.add(()=>{
    this.toRestart();
  })
  }


  toRestart(){
  
    
    //reset clocktime
    this.cliquer=true;
    this._ui._sString = "00";
    this._ui._mString = 0;
    this._ui.time = 0;
    this._ui._clockTime.text = "00:00";

    //restart second chrono
    this._ui._sString1 = "00";
    this._ui._mString1 = 0;
    this._ui.time1 = 0;
    this._ui._clockTime1.text = "00:00";
  }

  createImpulse(){// Initialiser le PhysicsImpostor
    this.boitiers[0].physicsImpostor = new PhysicsImpostor(
      this.boitiers[0],
      PhysicsImpostor.BoxImpostor,
      { mass: 10, friction: 0.04 }
    );
    
    // Variable globale pour le mouvement
    let bouger = true;
    const vitesse1 = -0.05*this.force;
    
    const update = () => {
      
      if (bouger) {
        // Mettre à jour la vitesse
        this.boitiers[0].physicsImpostor.setLinearVelocity(new Vector3(0, 0, vitesse1));
        
        // Vérifier la condition d'arrêt
        if (this.boitiers[0].position._z <= -this.distance) { // Notez l'utilisation de .z au lieu de ._z
          // this.boitiers[0].dispose();
          bouger = false; // Arrêter le mouvement
          this.cliquer=true;
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
      this._ui._textMasse[1].text = "Distance = "+ value.toFixed(2)+"Kg";
      this._ui._textMasse[4].text = "W = "+(value.toFixed(2))+"x"+(masse2).toFixed(2)+" = "+(masse2*value).toFixed(2)+" J";


    }

    const physicEngine = this.physicEngine;
    const setForce = (value) => { 
      physicEngine.setGravity(new Vector3(0,-(value),0))
      this._ui._textMasse[4].text = "W = "+(masse1.toFixed(2))+"x"+(value.toFixed(2))+" = "+(value*masse1).toFixed(2)+" J";
      this._ui._textMasse[0].text = "Force = "+ value.toFixed(2)+" N";
      this.force = value;
      masse2=value;

    }
    this._ui.groupSliders[0].addSlider("Force du moteur =  ",setForce,"N",1,20,2,displayValue);
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

  creqteFil(){
    // Création d'un fil (cylindre)
    var wireLength = 5; // Longueur du fil
    var wire = MeshBuilder.CreateCylinder("wire", { height: wireLength, diameter: 0.1 }, this.scene);
    wire.position.y = wireLength / 2; // Position initiale du fil
    wire.rotation.x = Math.PI/2;




  }

  createMesures(){
    // Create graduation lines (1 meter apart)
    const createGraduationLines = () => {
      for (let i = 1; i <= 5; i++) {
          // Create a line at each meter
          const line = MeshBuilder.CreateLines("line" + i, {
              points: [
                  new Vector3(i-0.5, 0.7, 8.5),  // start of the line
                  new Vector3(i-0.5, 0.7, 5.5)    // end of the line
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

  

  fonction(){
    let animationStarted = false; // Drapeau pour indiquer si l'animation a commencé
     // Création des deux surfaces (10x10)
     const surface1 = MeshBuilder.CreateGround("surface1", { width: 10, height: 3});
     surface1.position = new Vector3(7.2, 0, 0); // Position de la première surface
 
     const surface2 = MeshBuilder.CreateGround("surface2", { width: 10, height: 3 });
     surface2.position = new Vector3(7.2, 0, -5); // Position de la deuxième surface
 
     // Matériau pour les surfaces (gris par défaut)
     const groundMaterial = new StandardMaterial("groundMaterial");
     groundMaterial.diffuseColor = new Color3(0.8, 0.8, 0.8); // Couleur gris clair
     surface1.material = groundMaterial;
     surface2.material = groundMaterial;
 
     // Création des machines
     const machine1 = MeshBuilder.CreateBox("machine1", { size: 0.3 });
     machine1.position = new Vector3(3, 1, -1); // Position initiale de la première machine
     machine1.material = this.changeMaterialColor(255,0,0);
     
 
     const machine2 = MeshBuilder.CreateBox("machine2", { size: 0.3 });
     machine2.position = new Vector3(3, 1, -5); // Position initiale de la deuxième machine
     machine2.material = this.changeMaterialColor(0,255,0);

     // Fonction pour ajouter une bille sur la surface
     function placeBall(position: Vector3, scene: Scene,color) {
         const ball = MeshBuilder.CreateSphere("ball", { diameter: 0.2 }, scene);
         ball.position = position;
        //  const ballMaterial = new StandardMaterial("ballMaterial", scene);
        //  ballMaterial.diffuseColor = color; // Couleur bleue pour la bille
        //  ball.material = ballMaterial;
         return ball;
     }
 
     // Variables pour gérer les mouvements et le placement des billes en lignes et colonnes
     let gridSpacing = 1; // Espacement entre les billes en lignes et colonnes
     let rowIndex1 = 0;
     let colIndex1 = 0;
     let rowIndex2 = 0;
     let colIndex2 = 0;
 
     // Variables de vitesse (modifiables par l'utilisateur)
     let speedMachine1 = 25; // Vitesse de la machine 1 (plus petite valeur = plus rapide)
     let speedMachine2 = 50; // Vitesse de la machine 2 (plus grande valeur = plus lente)
 
     // Compteurs pour gérer le déplacement en fonction de la vitesse
     let counterMachine1 = 0;
     let counterMachine2 = 0;
 
     // Animation des machines
     this.scene.registerBeforeRender(() => {

      console.log("m1", machine1.position._z)
      console.log("m2", machine2.position._z)
         if (!animationStarted) return; // Sortir si l'animation n'a pas commencé
 
         // Machine 1 (rapide) se déplace en fonction de sa vitesse
         counterMachine1++;
         if (counterMachine1 >= speedMachine1) { // Gérer la vitesse en fonction du compteur
             if (rowIndex1 < 3) {
                 if (colIndex1 < 6) {
                     const ballPosition1 = new Vector3(3 + colIndex1 * gridSpacing, 0.1, -1 + rowIndex1 * gridSpacing);
                     const newball = placeBall(ballPosition1, this.scene, new BABYLON.Vector3(255,0,0)); // Place la bille à la position actuelle
                     newball.material = this.changeMaterialColor(255,0,0);
                     machine1.position.x = 1 + colIndex1 * gridSpacing;
                     machine1.position.z = -2 + rowIndex1 * gridSpacing;
                     colIndex1++;
                 } else {
                     colIndex1 = 0;
                     rowIndex1++;
                 }
             }
             counterMachine1 = 0; // Réinitialiser le compteur pour la machine 1
         }
 
         // Machine 2 (lente) se déplace en fonction de sa vitesse
         counterMachine2++;
         if (counterMachine2 >= speedMachine2) { // Gérer la vitesse en fonction du compteur
             if (rowIndex2 < 3) {
                 if (colIndex2 < 6) {
                     const ballPosition2 = new Vector3(3 + colIndex2 * gridSpacing, 0.1, -6 + rowIndex2 * gridSpacing);
                     const newball = placeBall(ballPosition2, this.scene, new Vector3(255,0,0)); // Place la bille à la position actuelle
                     newball.material = this.changeMaterialColor(0,255,0);
                     machine2.position.x = 1 + colIndex2 * gridSpacing;
                     machine2.position.z = -5 + rowIndex2 * gridSpacing;
                     colIndex2++;
                 } else {
                     colIndex2 = 0;
                     rowIndex2++;
                 }
             }
             counterMachine2 = 0; // Réinitialiser le compteur pour la machine 2
         }

         if(machine1.position._x == 6 && machine1.position._z == 0){
            this._ui.stopTimer();
            this._ui._textMasse[5].text = "Force déployée : 50 N \n Distance parcourue : 10 m \n répétée 3 fois consécutive \n Temps= " + this._ui._mString+ "." + this._ui._sString + " secondes";
            
          }
         if(machine2.position._x == 6 && machine2.position._z == -3){
           this._ui.stopTimer1();
           this._ui._textMasse[3].text = "Force déployée : 50 N \n Distance parcourue : 10 m \n répétée 3 fois consécutive \n Temps= " + this._ui._mString1 + "." + this._ui._sString1 + " secondes";

         }
     });
 
     // GUI (User Interface) pour le bouton
  
     this._ui._buttonAction[0].onPointerUpObservable.add(()=>{
        this._ui._stopTimer = false; 
        this._ui._stopTimer1 = false; 

        this._ui.startTimer();
        this._ui.startTimer1();

        animationStarted = true;
     });
 
  }

    // ! voir les parametres
 voirCalcul() {
  if (this._ui._container2.isVisible == true) {
    this._ui._container2.isVisible = false;
    this._ui._container3.isVisible = false;
  } else {
    this._ui._container2.isVisible = true;
    this._ui._container3.isVisible = true;
  }
}
// !voir les calculs
// voirParam() {
//   if (this._ui._selectbox.isVisible == true) {
//     this._ui._selectbox.isVisible = false;
//   } else {
//     this._ui._selectbox.isVisible = true;
//   }
// }



} 