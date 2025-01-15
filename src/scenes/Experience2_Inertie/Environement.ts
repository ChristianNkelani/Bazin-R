import {
  Scene,
  Engine,
  SceneLoader,
  CannonJSPlugin,
  MeshBuilder,
  TransformNode,
  Vector3,
  StandardMaterial,
  Texture,
  Color3,
  ActionManager,
  ExecuteCodeAction,
} from "@babylonjs/core";

import "@babylonjs/loaders";
import * as CANNON from "cannon";
import { UI } from "./ui";


export class Environement {
  scene: Scene;
  engine: Engine;
  private _ui: UI;
  private _LaboratoryManager : LaboratoryManager;
  private _penduleManager : PenduleManager;

  constructor(
    scene: Scene,
    engine: Engine,
    private setLoaded: () => void,
    private voirCard: (card: string) => void
  ) {
    this.scene = scene;
    this.engine = engine;

    this._ui = new UI(this.scene);
    this._LaboratoryManager = new LaboratoryManager(this.scene, this.setLoaded, this.voirCard);
    this._penduleManager = new PenduleManager(this.scene);

    this.scene.enablePhysics(
      new Vector3(0, -9.81, 0),
      new CannonJSPlugin(true, 10, CANNON)
    );
  }

  adjustForce(force: number) {
    this._penduleManager.adjustFore(force);  // Appel correct de la méthode
  }
  
  adjusteVitesse(vitesse: number) {
    this._penduleManager.adjusteVitesse(vitesse);  // Appel correct de la méthode
  }
}

class LaboratoryManager {
  private scene : Scene;
  private setLoaded : ()=>void;
  private voirCard : (cible : string) => void;
  constructor (scene: Scene, setLoaded : ()=> void, voirCard : (cible : string)=>void){
    this.scene = scene;
    this.setLoaded = setLoaded;
    this.voirCard = voirCard;
    this.importLaboratoire();
    
  }
  async importLaboratoire() {
    try {
       await SceneLoader.ImportMeshAsync(
          "",
          "./experience2_Inertie/",
          "st.glb",
          this.scene
       );
       this.setLoaded();
       this.voirCard("card");
    } catch (error) {
       console.error("Error loading laboratory model:", error);
       // Peut-être un mécanisme pour notifier l'utilisateur si le chargement échoue
    }
 }
}

class PenduleManager {
  private scene : Scene;

  constructor(scene: Scene){
    this.scene = scene
    this.createPendulum(new Vector3(0, 4.5, 0), new Color3(1, 1, 0), true); // Pendule animé
    this.createPendulum(new Vector3(0, 4.5, 1), new Color3(0, 0, 1), true); // Pendule fixe
  }

  createPendulum(position: Vector3, color: Color3, isAnimated: boolean) {
    const support = MeshBuilder.CreateBox("support", { height: 0.2, width: 0.2, depth: 0.2 }, this.scene);
    support.position = position;
    const supportMaterial = new StandardMaterial("supportMaterial", this.scene);
    supportMaterial.diffuseTexture = new Texture("textures/wood.jpg", this.scene);
    support.material = supportMaterial;

    const pivot = new TransformNode("root");
    pivot.position = position;

    const rod = MeshBuilder.CreateCylinder("rod", { height: 2, diameter: 0.05 }, this.scene);
    rod.position.y = -1;
    const rodMaterial = new StandardMaterial("rodMaterial", this.scene);
    rodMaterial.diffuseColor = color;
    rod.material = rodMaterial;
    rod.parent = pivot;

    const ball = MeshBuilder.CreateSphere("ball", { diameter: 0.5 }, this.scene);
    ball.position.y = -2;
    const ballMaterial = new StandardMaterial("ballMaterial", this.scene);
    ballMaterial.diffuseColor = color;
    ball.material = ballMaterial;
    ball.parent = pivot;

    if (isAnimated) {
        let isPaused = false;
        let pausedTime = 0;
        this.scene.registerBeforeRender(() => {
            if (!isPaused) {
                const time = (performance.now() * 0.001) - pausedTime;
                pivot.rotation.z = Math.sin(time) * 0.5;
            }
        });

        ball.actionManager = new ActionManager(this.scene);
        ball.actionManager.registerAction(new ExecuteCodeAction(ActionManager.OnPickTrigger, () => {
            isPaused = !isPaused;
            pausedTime = performance.now() * 0.001 - pausedTime;
        }));
    }

    return { support, rod, ball };
  }
  adjustFore(force: number) {
    const pivot = this.scene.getTransformNodeByName("root");
    if (pivot) {
      const maxAngle = Math.PI / 4; // Angle maximum d'oscillation
      const angle = Math.sin(force) * maxAngle;  // Utiliser la force pour ajuster l'angle
      pivot.rotation.z = angle;  // Appliquer l'angle ajusté
    }
    console.log('Force ajustée:', force);
  }
  
  adjusteVitesse(force: number) {
    const pivot = this.scene.getTransformNodeByName("root");
    if (pivot) {
        let previousTime = performance.now();
        
        this.scene.registerBeforeRender(() => {
            const currentTime = performance.now();
            const deltaTime = (currentTime - previousTime) * 0.001; // Temps écoulé en secondes
            previousTime = currentTime;

            // Utiliser force pour ajuster la vitesse
            pivot.rotation.z += Math.sin(currentTime * 0.001 * force) * deltaTime * 0.05;
        });
    }
    console.log('Vitesse ajustée:', force);
}

  
}


