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
    this.createground();
    this.createground2();
    // this.newc()

    //action des sliders
    this.actionButtonMenu();

  }

  async importLaboratoire() {
    const labo = await SceneLoader.ImportMeshAsync(
      "",
      "./models/",
      "laboratoire.glb",
      this.scene
    );
    this.setLoaded();
    this.voirCard("card");
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
    this.ball1.position.y = 2.5;
    this.ball1.position.x = 7.2;
    this.ball1.position.z = -0.7;
    this.ball1.material = this.changeMaterialColor(170, 255, 0);

    this.ball2 = MeshBuilder.CreateSphere(
      "ball",
      { diameter: 0.25 },
      this.scene
    );
    this.ball2.position.y = 2.5;
    this.ball2.position.x = 7.2;
    this.ball2.position.z = -4.4;
    this.ball2.material = this.changeMaterialColor(255, 0, 0);

   // Créer un mur
   const wall = MeshBuilder.CreateBox("wall", {width: 8, height: 5, depth: 0.5}, this.scene);
   wall.position = new Vector3(4, 0, 3);
   wall.material = new  StandardMaterial("wallMaterial",this.scene );
   wall.physicsImpostor = new PhysicsImpostor(wall, PhysicsImpostor.BoxImpostor, { mass: 0, restitution: 1 }, this.scene);

    return [aimant1, aimant2, this.ball1, this.ball2];
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

    this.ball2.physicsImpostor = new PhysicsImpostor(
      this.ball2,
      PhysicsImpostor.BoxImpostor,
      { mass: 1, restitution: 0.75 }
    );


     // Ajouter un GUI pour contrôler la force de la lance
     var advancedTexture = GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI");

     var slider = new GUI.Slider();
     slider.minimum = 8;
     slider.maximum = 10;
     slider.value = 8;
     slider.height = "20px";
     slider.width = "200px";
     slider.color = "orange";
     slider.background = "grey";
     advancedTexture.addControl(slider);
 
     var textBlock = new GUI.TextBlock();
     textBlock.text = "Adjust the force of the throw";
     textBlock.color = "white";
     textBlock.height = "30px";
     textBlock.top = "-40px";
     advancedTexture.addControl(textBlock);
 
     var button = GUI.Button.CreateSimpleButton("startButton", "Launch Ball");
     button.width = "150px";
     button.height = "40px";
     button.color = "white";
     button.background = "green";
     button.top = "50px";
     advancedTexture.addControl(button);
     var force = new Vector3(0,0,0);

     slider.onPointerClickObservable.add((value) => {
        force = new Vector3(0,0,slider.value);
     })
    //  var force = new  Vector3(0,0,force);
     button.onPointerClickObservable.add( () => {
         // Lancer le ballon avec la force spécifiée par le slider
 
         this.ball1.physicsImpostor.applyImpulse(force, this.ball1.getAbsolutePosition())    
       
       });
  }

  createground() {
    const ground = MeshBuilder.CreateGround("ground", {});
    ground.position.y = 0.7;
    ground.position.x = 7;
    ground.position.z = -0.5;

    ground.physicsImpostor = new PhysicsImpostor(
      ground,
      PhysicsImpostor.BoxImpostor,
      { mass: 0, restitution: 0 }
    );
    ground.isVisible = false;
  }
  createground2() {
    const ground = MeshBuilder.CreateGround("ground", {width:20, height:20});
    ground.position.y = 0.7;
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

    this._ui._sliders[1].onValueChangedObservable.add((value) => {
      this.ball2.scaling.x = value;
      this.ball2.scaling.y = value;
      this.ball2.scaling.z = value;
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
    this.ball2.position.y = 2.5;
    this.ball2.position.x = 7.2;
    this.ball2.position.z = -4.4;
    this.ball2.diameter = 0.25;
    this.ball1.physicsImpostor.dispose();

    this.ball1.position.y = 2.5;
    this.ball1.position.x = 7.2;
    this.ball1.position.z = -0.7;
    this.ball2.diameter = 0.25;
    this.ball2.physicsImpostor.dispose();
    this.cliquer = true;
    this._ui._sString = "00";
    this._ui._mString = 0;
    this._ui.time = 0;
    // this._ui._stopTimer = false;
    this._ui._clockTime.text = "00:00";
  }

  async createGravity() {
    this.scene.enablePhysics(new Vector3(0,-9.81,0), new CannonJSPlugin(true, 10, CANNON));
    this.physicEngine = this.scene.getPhysicsEngine();
  }



  newc(){
    const scene = this.scene

    
    // ground.physicsImpostor = new PhysicsImpostor(ball, PhysicsImpostor., { mass: 1, restitution: 0.7 }, scene);

    // ground.isVisible = false;
    
    // Créer un mur
    const wall = MeshBuilder.CreateBox("wall", {width: 8, height: 5, depth: 0.5}, scene);
    wall.position = new Vector3(4, 0, 3);
    wall.material = new  StandardMaterial("wallMaterial",this.scene );
    wall.physicsImpostor = new PhysicsImpostor(wall, PhysicsImpostor.BoxImpostor, { mass: 0, restitution: 0.5 }, scene);
    // Créer un ballon
    const ball = MeshBuilder.CreateSphere("ball", {diameter: 0.3}, scene);
    ball.position = new Vector3(5, 5, -5 );
    ball.material = new StandardMaterial("ballMaterial", scene);
    ball.physicsImpostor = new PhysicsImpostor(ball, PhysicsImpostor.BoxImpostor, { mass: 1, restitution: 0.5 }, scene);
    // Vitesse initiale du ballon (0 au début)
    var velocity = new Vector3(0, 0, 0);

    const boite = MeshBuilder.CreateBox("boite",{width:2, height:2}, this.scene);
    boite.position = new Vector3(5,5,-5);
    boite.physicsImpostor = new PhysicsImpostor(boite,PhysicsImpostor.BoxImpostor, {mass:1, restitution:0.1}, scene);


    const ground = MeshBuilder.CreateGround("ground", { width: 20, height: 20 }, scene);
    ground.position = new Vector3(2,0,-1.5);
    ground.physicsImpostor = new PhysicsImpostor(
      ground,
      PhysicsImpostor.BoxImpostor,
      { mass: 0, restitution: 0.5 }
    );

    // Ajouter un GUI pour contrôler la force de la lance
    var advancedTexture = GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI");

    var slider = new GUI.Slider();
    slider.minimum = 0;
    slider.maximum = 0.2;
    slider.value = 0.05;
    slider.height = "20px";
    slider.width = "200px";
    slider.color = "orange";
    slider.background = "grey";
    advancedTexture.addControl(slider);

    var textBlock = new GUI.TextBlock();
    textBlock.text = "Adjust the force of the throw";
    textBlock.color = "white";
    textBlock.height = "30px";
    textBlock.top = "-40px";
    advancedTexture.addControl(textBlock);

    var button = GUI.Button.CreateSimpleButton("startButton", "Launch Ball");
    button.width = "150px";
    button.height = "40px";
    button.color = "white";
    button.background = "green";
    button.top = "50px";
    advancedTexture.addControl(button);
    var force = new  Vector3(0,0,5);
    button.onPointerClickObservable.add(function() {
        // Lancer le ballon avec la force spécifiée par le slider

        ball.physicsImpostor.applyImpulse(force, ball.getAbsolutePosition());    });
  
  


            
  
  }

}
