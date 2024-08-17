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
    private voirCard: (card: String) => void
  ) {
    this.scene = scene;
    this.engine = engine;

    this._ui = new UI(this.scene);

    this.scene.enablePhysics(
      new Vector3(0, -9.81, 0),
      new CannonJSPlugin(true, 10, CANNON)
    );

    this.importLaboratoire();
    this.createMateriels();

    this._ui._buttonAction[0].onPointerUpObservable.add(() => {
      this.arreterAnimation();
    });

    this._ui._buttonAction[1].onPointerUpObservable.add(() => {
      this.recommencerAnimation();
    });
  }

  async importLaboratoire() {
    const labo = await SceneLoader.ImportMeshAsync(
      "",
      "./experience2_Inertie/",
      "studio.glb",
      this.scene
    );
    for (let index = 1; index < 10; index++) {
      labo.meshes[index].isVisible = false;
    }
    this.setLoaded();
    this.voirCard("card");
  }

  createMateriels() {
    const box = MeshBuilder.CreateBox("box", { size: 0.2 }, this.scene);

    const ropeHeight = 1.2;
    const rope = MeshBuilder.CreateCylinder(
      "rope",
      { diameter: 0.02, height: ropeHeight },
      this.scene
    );

    rope.position.y = ropeHeight / 2;
    box.position.y = rope.position.y - ropeHeight / 2 - box.scaling.y / 2 + 0.1;

    const pendulum = new TransformNode("pendulum", this.scene);
    box.parent = pendulum;
    rope.parent = pendulum;

    this.pendulum = pendulum;

    this.startPendulumAnimation();

    const postHeight = 2;
    const postDiameter = 0.05;

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

    const crossbar = MeshBuilder.CreateCylinder(
      "crossbar",
      { diameter: postDiameter, height: 5, tessellation: 32 },
      this.scene
    );
    crossbar.rotation.x = Math.PI / 2;
    crossbar.position.x = leftPost.position.x;
    crossbar.position.y = leftPost.position.y + postHeight / 2;
    crossbar.position.z = (leftPost.position.z + rightPost.position.z) / 2;

    pendulum.position.x = crossbar.position.x;
    pendulum.position.y = crossbar.position.y - ropeHeight / 2;
    pendulum.position.z = crossbar.position.z;
  }

  startPendulumAnimation() {
    if (!this.pendulum) return;

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
      { frame: 0, value: -Math.PI / 6 },
      { frame: totalFrames / 2, value: Math.PI / 6 },
      { frame: totalFrames, value: -Math.PI / 6 },
    ];

    swingAnimation.setKeys(keyFrames);

    this.pendulum.animations = [swingAnimation];
    this.scene.beginAnimation(this.pendulum, 0, totalFrames, true);
  }

  arreterAnimation() {
    if (this.pendulum) {
      this.scene.stopAnimation(this.pendulum);
    }
  }

  recommencerAnimation() {
    this.startPendulumAnimation();
  }
}
