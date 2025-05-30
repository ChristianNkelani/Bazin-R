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

export class Environement {
  scene: Scene;
  engine: Engine;
  ball1: any;
  aimants: any = [];
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
      this._ui.updateHud1();
    });

    //enable physics
    this.createGravity();

    //creation des materiels
    this.importLaboratoire();
    this.createMateriels();
    this.createground();
    this.createground2();

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

    this.aimants[0] = aimant1;

    const aimant2 = MeshBuilder.CreateBox(
      "aimant",
      { width: 0.5, height: 0.08, size: 1, depth: 1 },
      this.scene
    );
    aimant2.position.x = 7.3;
    aimant2.position.y = 2.5;
    aimant2.position.z = -4.6;

    this.aimants[1] = aimant2;

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
      { mass: 1, restitution: 0.75 }
    );

    this.ball2.physicsImpostor = new PhysicsImpostor(
      this.ball2,
      PhysicsImpostor.BoxImpostor,
      { mass: 1, restitution: 0.75 }
    );
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
    const ground = MeshBuilder.CreateGround("ground", {});
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
        this._ui._stopTimer1 = false;
        this.createImpostor();

        this._ui.startTimer();
        this._ui.startTimer1();
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

    this.actionGroupSlider();
  }
  toRestart() {

    this.ball2.position.y = this.aimants[1].position._y;
    this.ball1.position.y = this.aimants[0].position._y;

    this.ball2.position.x = 7.2;
    this.ball2.position.z = -4.4;
    this.ball2.diameter = 0.25;
    
    this.ball1.position.x = 7.2;
    this.ball1.position.z = -0.7;
    this.ball2.diameter = 0.25;
    if(this.ball2.physicsImpostor || this.ball1.physicsImpostor ){
      
      this.ball1.physicsImpostor.dispose();
      this.ball2.physicsImpostor.dispose();
      
    }
    this.cliquer = true;
    this._ui._sString = "00";
    this._ui._mString = 0;
    this._ui.time = 0;
    // this._ui._stopTimer = false;
    this._ui._clockTime.text = "00:00";

    //restart second chrono
    this._ui._sString1 = "00";
    this._ui._mString1 = 0;
    this._ui.time1 = 0;
    this._ui._clockTime1.text = "00:00";
  }
  
  async createGravity() {
    this.scene.enablePhysics(null, new CannonJSPlugin(true, 10, CANNON));
    this.physicEngine = this.scene.getPhysicsEngine();
  }
  
  actionGroupSlider() {
    const setHauteur1 = (value) => {
      this.aimants[0].position.y = value;
      this.ball1.position.y = value;
      // Mise à jour de l'énergie potentielle pour ball1
      // this._ui._textMasse[0].text = "Ep = "+masse.toFixed(2) + " x "+ g.toFixed(2) + " x "  + value.toFixed(2) + " = " + (masse *g*value).toFixed(2)+ " Joules";
      // this._ui._textMasse[1].text = "Ec3 = (1/2) x " + masse.toFixed(2) + " x " + "(" + value.toFixed(2) + "/"  + "temps) ²" ;
      
      // this.hauteur = value;
      // hauteur = value;
    }
  
  const setHauteur2 = (value) => {
      this.aimants[1].position.y = value;
      this.ball2.position.y = value;
  
      // Mise à jour de l'énergie potentielle pour ball2
      // this._ui._textMasse[2].text = "Ep = "+masse1.toFixed(2) + " x "+ g.toFixed(2) + " x "  + value.toFixed(2) + " = " + (masse1 *g*value).toFixed(2)+ " Joules";
      // this._ui._textMasse[3].text = "Ec2 = (1/2) x " + masse1.toFixed(2) + " x " + "(" + value.toFixed(2) + "/"  + "temps) ²" ;
      
      // hauteur1 = value;
    }
    const displayValue = function (value) {
      return Math.floor(value * 100) / 100;
    };

    const ball1 = this.ball1;
    const ball2 = this.ball2;

    const setBall1 = function (this: any, value) {
      ball1.scaling.x = value;
      ball1.scaling.y = value;
      ball1.scaling.z = value;
    };

    const setBall2 = function (this: any, value) {
      ball2.scaling.x = value;
      ball2.scaling.y = value;
      ball2.scaling.z = value;
    };

    const physicEngine = this.physicEngine;
    const setGravitaion = function (value) {
      physicEngine.setGravity(new Vector3(0, -value, 0));
    };
    this._ui.groupSliders[0].addSlider(
      "g = ",
      setGravitaion,
      "m/s2",
      0,
      15,
      9.81,
      displayValue
    );
    this._ui.groupSliders[0].addSlider(
      "Masse balle jaune",
      setBall1,
      "Kg",
      1,
      2,
      1,
      displayValue
    );
    this._ui.groupSliders[0].addSlider(
      "Masse balle rouge",
      setBall2,
      "Kg",
      1,
      2,
      1,
      displayValue
    );

    this._ui.groupSliders[0].addSlider("Hauteur de la balle jaune", setHauteur1, "m", 1, 3, 3, displayValue);
    this._ui.groupSliders[0].addSlider("Hauteur de la balle rouge", setHauteur2, "m", 1, 3, 3, displayValue);

    
  }
}
