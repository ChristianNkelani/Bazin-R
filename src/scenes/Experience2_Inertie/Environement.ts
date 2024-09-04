import {
  Scene,
  Engine,
  SceneLoader,
  CannonJSPlugin,
  MeshBuilder,
  TransformNode,
  Animation,
  Vector3,
  QuadraticEase,
  StandardMaterial,
  Texture,
  Color3
} from "@babylonjs/core";

import "@babylonjs/loaders";
import * as CANNON from "cannon";
import { UI } from "./ui";

export class Environement {
  scene: Scene;
  engine: Engine;
  private _ui: UI;
  private pendulum: TransformNode | null = null;

  constructor(
    scene: Scene,
    engine: Engine,
    private setLoaded: () => void,
    private voirCard: (card: string) => void
  ) {
    this.scene = scene;
    this.engine = engine;

    this._ui = new UI(this.scene);

    this.scene.enablePhysics(
      new Vector3(0, -9.81, 0),
      new CannonJSPlugin(true, 10, CANNON)
    );

    this.importLaboratoire();
    this.createpend1();
    this.createpend2();

  }

  async importLaboratoire() {
    const labo = await SceneLoader.ImportMeshAsync(
      "",
      "./experience2_Inertie/",
      "st.glb",
      this.scene
    );
    // for (let index = 1; index < 10; index++) {
    //   labo.meshes[index].isVisible = false;
    // }
    this.setLoaded();
    this.voirCard("card");
  }

  createpend1() {
   
  // Créer le support avec texture
  const support = MeshBuilder.CreateBox("support", {height: 0.2, width: 0.2, depth: 0.2}, this.scene);
  support.position.y = 4.5; // Augmenter la position du support
  const supportMaterial = new StandardMaterial("supportMaterial", this.scene);
  supportMaterial.diffuseTexture = new Texture("textures/wood.jpg", this.scene);
  support.material = supportMaterial;

  // Créer le pendule
  const pivot = new TransformNode("root");
  const rod = MeshBuilder.CreateCylinder("rod", {height: 2, diameter: 0.05}, this.scene);
  rod.position.y = -1;
  const rodMaterial = new StandardMaterial("rodMaterial", this.scene);
  rodMaterial.diffuseTexture = new Texture("textures/metal.jpg", this.scene);
  rod.material = rodMaterial;
  rod.parent = pivot;

  const ball = MeshBuilder.CreateSphere("ball", {diameter: 0.5}, this.scene);
  ball.position.y = -2;
  const ballMaterial = new StandardMaterial("ballMaterial", this.scene);
  ballMaterial.diffuseTexture = new Texture("textures/metal.jpg", this.scene);
  ball.material = ballMaterial;
  ball.parent = pivot;

  // Positionner le pivot au niveau du support
  pivot.position.y = 4.5; // Augmenter la position du pivot

  // Animation du pendule
  this.scene.registerBeforeRender(() => {
      const time = performance.now() * 0.001;
      pivot.rotation.z = Math.sin(time) * 0.5;
  });

  };

  createpend2(){

  // Créer le support avec texture
  const support = MeshBuilder.CreateBox("support", {height: 0.2, width: 0.2, depth: 0.2}, this.scene);
  support.position.y = 4.5; // Augmenter la position du support
  support.position.z = 1;
  const supportMaterial = new StandardMaterial("supportMaterial", this.scene);
  supportMaterial.diffuseTexture = new Texture("textures/wood.jpg", this.scene);
  support.material = supportMaterial;

  // Créer le pendule fixe
  const pivot = new TransformNode("root");
  const rod = MeshBuilder.CreateCylinder("rod", {height: 2, diameter: 0.05}, this.scene);
  rod.position.y = -1;
  const rodMaterial = new StandardMaterial("rodMaterial", this.scene);
  rodMaterial.diffuseColor = new Color3(0, 0, 1); // Couleur bleue
  rod.material = rodMaterial;
  rod.parent = pivot;

  const ball = MeshBuilder.CreateSphere("ball", {diameter: 0.5}, this.scene);
  ball.position.y = -2;
  const ballMaterial = new StandardMaterial("ballMaterial", this.scene);
  ballMaterial.diffuseColor = new Color3(0, 0, 1); // Couleur bleue
  ball.material = ballMaterial;
  ball.parent = pivot;

  // Positionner le pivot au niveau du support
  pivot.position.y = 4.5; // Augmenter la position du pivot
  pivot.position.z = 1;

};

}

