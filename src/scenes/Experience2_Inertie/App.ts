import {
  Scene,
  Engine,
  Vector3,
  HemisphericLight,
  UniversalCamera,
} from "@babylonjs/core";
import "@babylonjs/loaders";
import { UI } from "./ui";
import { Environement } from "./Environement";

export class Experience2 {
  scene: Scene;
  engine: Engine;

  private _ui: UI;
  private _environement: Environement;

  constructor(
    private canvas: HTMLCanvasElement,
    private setLoaded: () => void,
    private voirCard: (card: string) => void
  ) {
    this.engine = new Engine(this.canvas);

    //on cree la scene de base
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
    });
  }

  CreateScene(): Scene {
    const scene = new Scene(this.engine);

    const camera = new UniversalCamera(
      "camera",
      new Vector3(-4, 4.5, 0.8),
      this.scene
    );
    camera.speed = 0.5;
    camera.rotation._y = Math.PI / 2;
    camera.rotation._x = Math.PI / 14;
    // camera.fov = 1.5;
    // camera.setTarget(new Vector3(8, 1, -2.5)); 

    
    camera.attachControl();
    const hemiLight = new HemisphericLight(
      "hemiLight",
      new Vector3(0, 1, 0),
      this.scene
    );
    hemiLight.intensity = 1;

    return scene;
  }

  adjustForce(force: number) {
    this._environement.adjustForce(force);  // Appel correct de la méthode
  }
  
  adjustVitesse(vitesse: number) {
    this._environement.adjusteVitesse(vitesse);  // Appel correct de la méthode
  }
}