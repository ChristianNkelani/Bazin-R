import {
  Scene,
  Engine,
  SceneLoader,
  CannonJSPlugin,
  ArcRotateCamera,
  HemisphericLight,
  MeshBuilder,
  TransformNode,
  Animation,
  Vector3,
  QuadraticEase,
} from "@babylonjs/core";

import "@babylonjs/loaders";
import * as CANNON from "cannon";
import { UI } from "./ui";

export class Environement {
  scene: Scene;
  engine: Engine;
  // ball1 : any;
  // ball2 : any;
  cliquer = true; //variable pour activer impostor ou non
  private _ui: UI;

  constructor(
    scene: Scene,
    engine: Engine,
    private setLoaded: () => void,
    private voirCard: () => void
  ) {
    //la scene
    this.scene = scene;

    //on charge les autres interfaces
    this._ui = new UI(this.scene);

    this.scene.enablePhysics(
      new Vector3(0, -9.81, 0),
      new CannonJSPlugin(true, 10, CANNON)
    );

    //the engine
    this.engine = engine;

    //creation des materiels
    this.importLaboratoire();
    this.createMateriels();

    //action des sliders
  }

  async importLaboratoire() {
    // this.engine.displayLoadingUI();
    const labo = await SceneLoader.ImportMeshAsync(
      "",
      "./experience2_Inertie/",
      "studio.glb",
      this.scene
    );
    for (let index = 1; index < 10; index++) {
      labo.meshes[index].isVisible = false;
    }
    // this.engine.hideLoadingUI();
    this.setLoaded();
    this.voirCard();

    return labo;
  }

  createMateriels() {
    // Créer le cube
    const box = MeshBuilder.CreateBox("box", { size: 0.2 }, this.scene);
    box.position.y = -0.3;

    // Créer le fil (cylindre fin)
    const rope = MeshBuilder.CreateCylinder(
      "rope",
      { diameter: 0.02, height: 1 },
      this.scene
    );
    rope.position.y = 0.5; // Ajuster la position du fil pour qu'il soit collé à la barre horizontale

    // Grouper le cube et le fil pour les animer ensemble
    const pendulum = new TransformNode("pendulum", this.scene);
    box.parent = pendulum;
    rope.parent = pendulum;

    // Attacher le pendule à la barre horizontale
    pendulum.position.y = 1.5; // Positionner le pendule sous la barre

    // Animation du pendule (balancement de gauche à droite)
    const frameRate = 60;
    const totalFrames = 120;

    const swingAnimation = new Animation(
      "swing",
      "rotation.z",
      frameRate,
      Animation.ANIMATIONTYPE_FLOAT,
      Animation.ANIMATIONLOOPMODE_CYCLE
    );

    const easingFunction = new QuadraticEase();
    easingFunction.setEasingMode(QuadraticEase.EASINGMODE_EASEINOUT);

    swingAnimation.setEasingFunction(easingFunction);

    const keyFrames = [
      { frame: 0, value: -Math.PI / 6 }, // Inclinaison à gauche (30 degrés)
      { frame: totalFrames / 2, value: Math.PI / 6 }, // Inclinaison à droite (30 degrés)
      { frame: totalFrames, value: -Math.PI / 6 }, // Retour à gauche
    ];

    swingAnimation.setKeys(keyFrames);

    pendulum.animations.push(swingAnimation);
    this.scene.beginAnimation(pendulum, 0, totalFrames, true);

    // Création de la barre en forme de poteau de football
    const postHeight = 2;
    const postDiameter = 0.05;

    // Créer les poteaux verticaux
    const leftPost = MeshBuilder.CreateCylinder(
      "leftPost",
      { diameter: postDiameter, height: postHeight },
      this.scene
    );
    leftPost.position = new Vector3(8, 1, 0);

    const rightPost = MeshBuilder.CreateCylinder(
      "rightPost",
      { diameter: postDiameter, height: postHeight },
      this.scene
    );
    rightPost.position = new Vector3(8, postHeight / 2, -5);

    // Créer la barre supérieure horizontale avec une largeur légèrement augmentée
    const crossbar = MeshBuilder.CreateCylinder(
      "crossbar",
      { diameter: postDiameter, height: 1.4, tessellation: 32 },
      this.scene
    );
    crossbar.rotation.z = Math.PI / 2;
    crossbar.position.y = 2; // Positionner la barre en haut des poteaux

    // window.addEventListener("resize", () => {
    //   engine.resize();
    // });
  }
}
