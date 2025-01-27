import {
  Scene,
  Engine,
  Vector3,
  HemisphericLight,
  UniversalCamera,
  DirectionalLight, 
  PointLight, 
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

    
<<<<<<< HEAD
    camera.detachControl();
    const hemiLight = new HemisphericLight(
      "hemiLight",
      new Vector3(0, 1, 0),
      this.scene
    );
    hemiLight.intensity = 1;
=======
    camera.attachControl();
    // const hemiLight = new HemisphericLight(
    //   "hemiLight",
    //   new Vector3(0, 1, 0),
    //   this.scene
    // );
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
>>>>>>> 4e057a420f07f58f532bc8658639a27158b54778

    return scene;
  }

  adjustForce(force: number) {
    this._environement.adjustForce(force);  // Appel correct de la méthode
  }
  
  adjustVitesseB(vitesse: number) {
    this._environement.adjusteVitesseB(vitesse);  // Appel correct de la méthode
  }
  adjustVitesseJ(vitesse: number) {
    this._environement.adjusteVitesseJ(vitesse);  // Appel correct de la méthode
  }
}