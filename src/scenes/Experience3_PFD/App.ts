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


export class Experience3 {
  scene: Scene;
  engine: Engine;

  private _ui: UI;
  public _environement: Environement;

  constructor(
    private canvas: HTMLCanvasElement,
    private setLoaded: () => void,
    private voirCard: (card: string) => void,
    private tailleR: string,
    private tailleB: string
  ) {
    this.engine = new Engine(this.canvas);

    //on cree la scene de base
    this.scene = this.CreateScene();

    //on charge l environnement
    this._environement = new Environement(
      this.scene,
      this.engine,
      this.setLoaded,
      this.voirCard,
      this.tailleR,
      this.tailleB
    );

    this.engine.runRenderLoop(() => {
      this.scene.render();
    });
  }

  CreateScene(): Scene {
    const scene = new Scene(this.engine);
    const camera = new UniversalCamera(
      "camera",
      new Vector3(-6, 4.5, -0.1),
      this.scene
    );
    camera.speed = 0.5;
    camera.rotation._y = Math.PI / 2;
    camera.rotation._x = Math.PI / 14;

    // camera.attachControl();
    camera.detachControl();
    const hemiLight = new HemisphericLight(
      "hemiLight",
      new Vector3(0, 1, 0),
      this.scene
    );
    hemiLight.intensity = 1;
    return scene;
  }
}
