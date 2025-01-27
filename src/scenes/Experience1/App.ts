import {
  Scene,
  Engine,
  DirectionalLight,
  PointLight,
  Vector3,
  HemisphericLight,
  MeshBuilder,
  PBRMaterial,
  Color3,
  UniversalCamera,
} from "@babylonjs/core";
import "@babylonjs/loaders";
import { UI } from "./ui";
import { Environement } from "./Environement";
import { Sound } from "babylonjs";
import { Interaction } from "./interaction";
export class Experience1 {
  scene: Scene;
  engine: Engine;

  private _ui: UI;
  private _Interaction: Interaction;
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
      voirCard
    );

    // chargement de l'UI
    // this._ui = new UI(this.scene);

    this.engine.runRenderLoop(() => {
      this.scene.render();
      if (this._environement.ball1.position._y <= 0.90) {
        this._environement._ui.stopTimer();
      }
      if (this._environement.ball2.position._y <= 0.90) {
        this._environement._ui.stopTimer1();
      }
    });
  }

  CreateScene(): Scene {
    const scene = new Scene(this.engine);

    const camera = new UniversalCamera(
      "camera",
      new Vector3(0, 3, -2.5),
      this.scene
    );
    camera.speed = 0.5;
    camera.rotation._y = Math.PI / 2;
    camera.rotation._x = Math.PI / 14;

    console.log(
      camera.position.x,
      camera.position.y,
      camera.position.z,
      camera.rotation.x,
      camera.rotation.y,
      camera.rotation.z
    );
    camera.attachControl();
    // console.log(camera.position.x, camera.position.y, camera.position.z, camera.rotation.x, camera.rotation.y, camera.rotation.z)
        // camera.attachControl();
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
