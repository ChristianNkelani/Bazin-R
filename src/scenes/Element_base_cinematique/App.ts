import {
  Scene,
  Engine,
  Vector3,
  HemisphericLight,
  UniversalCamera,
  DirectionalLight,
  PointLight
} from "@babylonjs/core";
import "@babylonjs/loaders";
import { UI } from "./ui";
import { Environement } from "./Environement";
import { Camera } from "babylonjs";

export class Experience3 {
  scene: Scene;
  engine: Engine;
  camera: UniversalCamera;

  private _ui: UI;
  private _environement: Environement;

  constructor(
    private canvas: HTMLCanvasElement,
    private setLoaded: () => void,
    private voirCard: (card: string) => void
  ) {
    this.engine = new Engine(this.canvas);

    this.scene = this.CreateScene();
     
    //on charge l environnement
    this._environement = new Environement(
      this.scene,
      this.engine,
      this.setLoaded,
      this.voirCard
    );

    this.engine.runRenderLoop(() => {
      this.scene.render();
      // console.log("cam ", this.camera.rotation.x,", ", this.camera.rotation.y, ", ", this.camera.rotation.z);

    });
  }

  CreateScene(): Scene {
    const scene = new Scene(this.engine);
     this.camera = new UniversalCamera(
      "camera",
      new Vector3(0, 3.5, -2.5),
      this.scene
    );
    this.camera.speed = 0.5;
    this.camera.rotation._y = Math.PI / 2;
    this.camera.rotation._x = Math.PI / 14;
    this.camera.attachControl();
    // Lumière hémisphérique
        const hemiLight = new HemisphericLight("hemiLight", new Vector3(0, 1, 0), this.scene);
        hemiLight.intensity = 0.7;
        // hemiLight.intensity = 1;
        
        // Lumière directionnelle ajustée pour éclairer les deux coins
        const directionalLight = new DirectionalLight("dirLight", new Vector3(-1, -2, -1), this.scene);
        directionalLight.position = new Vector3(0, 5, 0); // Position centrale pour éclairer les deux coins
        directionalLight.intensity = 0.7;
        directionalLight.shadowEnabled = true;
        
            // Lumière ponctuelle
            const pointLight = new PointLight("pointLight", new Vector3(2, 5, -1), this.scene);
            pointLight.intensity = 0.5;
    return scene;
  }
}
