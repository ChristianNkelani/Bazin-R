import {
  Scene,
  Engine,
  MeshBuilder,
  SceneLoader,
  StandardMaterial,
  Color3,
  Vector3,
  CannonJSPlugin,
  PhysicsImpostor,
  PBRMaterial,
  Sound,
  OimoJSPlugin,
  AmmoJSPlugin,
} from "@babylonjs/core";

import "@babylonjs/loaders";
import * as CANNON from "cannon";
import { UI } from "./ui";
import { Interaction } from "./interaction";
import * as GUI from "@babylonjs/gui/2D";

export class Environement {
  scene: Scene;
  engine: Engine;
  ball1: any;
  ball2: any;
  physicEngine: any;

  cliquer = true; //variable pour activer impostor ou non
  public _ui: UI;

  constructor(
    scene: Scene,
    engine: Engine,
    private setLoaded: () => void,
    private voirCard: (card: string) => void
  ) {
    //la scene
    this.scene = scene;

    //on charge les autres interfaces
    this._ui = new UI(this.scene);

    this.scene.onBeforeRenderObservable.add(() => {
      // when the game isn't paused, update the timer
      this._ui.updateHud();
    });

    //enable physics
    this.createGravity();

    //creation des materiels
    this.importLaboratoire();
    this.createMateriels();
    this.createImpostor();
    this.createground();
    this.createground2();
    this.newc();

    //action des sliders
    this.actionButtonMenu();

  }

  async importLaboratoire() {
    const labo = await SceneLoader.ImportMeshAsync(
      "",
      "./experience3_PFD/",
      "studio.glb",
      this.scene
    );
    this.setLoaded();
    this.voirCard("card");

    labo.meshes[2].isVisible = false;
    labo.meshes[1].isVisible = false;
    labo.meshes[8].isVisible = false;
    return labo;
  }

  createMateriels() {
    const aimant1 = MeshBuilder.CreateBox(
      "aimant",
      { width: 0.5, height: 0.08, size: 1, depth: 1 },
      this.scene
    );
    aimant1.position.x = 7.3;
    aimant1.position.y = 2.5;
    aimant1.position.z = -0.5;

    const aimant2 = MeshBuilder.CreateBox(
      "aimant",
      { width: 0.5, height: 0.08, size: 1, depth: 1 },
      this.scene
    );
    aimant2.position.x = 7.3;
    aimant2.position.y = 2.5;
    aimant2.position.z = -4.6;

    this.ball1 = MeshBuilder.CreateSphere(
      "ball",
      { diameter: 0.25 },
      this.scene
    );
    this.ball1.position.y = 0.8;
    this.ball1.position.x = 7.2;
    this.ball1.position.z = -0.7;
    this.ball1.material = this.changeMaterialColor(170, 255, 0);

   
   // Créer un mur
   const wall = MeshBuilder.CreateBox("wall", {width: 10, height: 5, depth: 0.5}, this.scene);
   wall.position = new Vector3(5, 1, 3.1);
   wall.material = new  StandardMaterial("wallMaterial",this.scene );
   wall.physicsImpostor = new PhysicsImpostor(wall, PhysicsImpostor.BoxImpostor, { mass: 0, restitution: 0.8 }, this.scene);
  wall.isVisible = false;
   const wall1 = MeshBuilder.CreateBox("wall", {width: 10, height: 5, depth: 0.5}, this.scene);
   wall1.position = new Vector3(5, 1, -8.5);
   wall1.material = new  StandardMaterial("wallMaterial",this.scene );
   wall1.physicsImpostor = new PhysicsImpostor(wall1, PhysicsImpostor.BoxImpostor, { mass: 0, restitution: 0.5 }, this.scene);
   wall1.isVisible = false;
    return [aimant1, aimant2, this.ball1];
  }

  changeMaterialColor(x, y, z): StandardMaterial {
    const ballMat = new StandardMaterial("ballMat", this.scene);
    ballMat.diffuseColor = new Color3(x, y, z);
    return ballMat;
  }

  // Animation
  public createImpostor(): void {
    this.ball1.physicsImpostor = new PhysicsImpostor(
      this.ball1,
      PhysicsImpostor.BoxImpostor,
      { mass: 1, restitution: 1 }
    );



     // Ajouter un GUI pour contrôler la force de la lance
     var advancedTexture = GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI");

     var slider = new GUI.Slider();
     slider.minimum = 8;
     slider.maximum = 16;
     slider.value = 8;
     slider.height = "20px";
     slider.width = "200px";
     slider.color = "orange";
     slider.background = "grey";
     advancedTexture.addControl(slider);
 
     var textBlock = new GUI.TextBlock();
     textBlock.text = "Ajuster la force de frappe";
     textBlock.color = "white";
     textBlock.height = "30px";
     textBlock.top = "-40px";
     advancedTexture.addControl(textBlock);
 
     var button = GUI.Button.CreateSimpleButton("startButton", "Frapper");
     button.width = "150px";
     button.height = "40px";
     button.color = "white";
     button.background = "green";
     button.top = "50px";
     advancedTexture.addControl(button);
    //  var force = new Vector3(0,0,0);

     var force = new Vector3(0, 0, 0); // Déclarez la variable force en dehors

     slider.onValueChangedObservable.add((value) => {
         force = new Vector3(0, 0, value); // Mettez à jour la force en fonction de la valeur du slider
     });
     
     button.onPointerClickObservable.add(() => {
         // Lancer le ballon avec la force spécifiée par le slider
        //  this.ball1.physicsImpostor = new PhysicsImpostor(
        //   this.ball1,
        //   PhysicsImpostor.BoxImpostor,
        //   { mass: 1, restitution: 1 }
        // );
         this.ball1.physicsImpostor.applyImpulse(force, this.ball1.getAbsolutePosition());
     });
  }

  createground() {

  }
  createground2() {
    const ground = MeshBuilder.CreateGround("ground", {width:20, height:20});
    ground.position.y = 0.1;
    ground.position.x = 7;
    ground.position.z = -4.5;

    ground.physicsImpostor = new PhysicsImpostor(
      ground,
      PhysicsImpostor.BoxImpostor,
      { mass: 0, restitution: 0 }
    );
    ground.isVisible = false;

    
  }

  actionButtonMenu() {
    this._ui._sliders[0].onValueChangedObservable.add((value) => {
      this.ball1.scaling.x = value;
      this.ball1.scaling.y = value;
      this.ball1.scaling.z = value;
    });

  
    this._ui._buttonAction[0].onPointerUpObservable.add(() => {
      if (this.cliquer == true) {
        this._ui._stopTimer = false;
        this.createImpostor();

        this._ui.startTimer();
        this.cliquer = false;
      }
    });
    this._ui.groupSliders[1].addCheckbox("Chambre à vide", () => {
      this._ui.box.isVisible = !this._ui.box.isVisible.valueOf();
    });
    this._ui._sliders[2].onPointerUpObservable.add(() => {
      this.physicEngine.setGravity(
        new Vector3(0, -this._ui._sliders[2].value, 0)
      );
    });

    this._ui._buttonAction[1].onPointerUpObservable.add(() => {
      this.toRestart();
    });

  }
  toRestart() {

    // this.ball1.physicsImpostor.dispose();

    this.ball1.position.y = 0.8;
    this.ball1.position.x = 7.2;
    this.ball1.position.z = -0.7;

  }

  async createGravity() {
    this.scene.enablePhysics(new Vector3(0,-9.81,0), new CannonJSPlugin(true, 10, CANNON));
    this.physicEngine = this.scene.getPhysicsEngine();
    // this.physicEngine.setTimeStep(1 / 120);
  }



  newc(){
    const scene = this.scene

    
   // Créer le joueur (une boîte)
const player = MeshBuilder.CreateBox('player', {height: 1, width: 0.5, depth: 0.5}, scene);
player.position.y = 0.5;
player.position.z = -3;

// Créer le mur (un plan)
const wall = MeshBuilder.CreatePlane('wall', {height: 5, width: 5}, scene);
wall.position.z = 3;
wall.rotation.y = Math.PI;

// Créer la balle (une sphère)
const ball = MeshBuilder.CreateSphere('ball', {diameter: 0.2}, scene);
ball.position = player.position.clone();
ball.position.z += 2;

// Ajouter une action pour tirer la balle
scene.onPointerDown = function () {
    const direction = wall.position.subtract(ball.position).normalize();
    const speed = 5;
    ball.physicsImpostor = new PhysicsImpostor(ball, PhysicsImpostor.SphereImpostor, {mass: 1, restitution: 1}, scene);
    ball.physicsImpostor.setLinearVelocity(direction.scale(speed));
};

// Ajouter la physique à la scène
// const gravityVector = new Vector3(0, -9.81, 0);
// const physicsPlugin = new CannonJSPlugin();
// scene.enablePhysics(gravityVector, physicsPlugin);

            
  
  }

}
