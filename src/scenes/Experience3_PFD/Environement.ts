import {
  Scene,
  Engine,
  SceneLoader,
  MeshBuilder,
  Vector3,
  Animation,
  StandardMaterial,
  Color3,
} from "@babylonjs/core";

import "@babylonjs/loaders";
import { UI } from "./ui";

export class Environement {
  scene: Scene;
  engine: Engine;
  ball1: any;
  ball2: any;
  vitesse: object;
  taille: object;
  cliquer = true; //variable pour activer impostor ou non
  private _ui: UI;

  constructor(
    scene: Scene,
    engine: Engine,
    private setLoaded: () => void,
    private voirCard: (card: string) => void,
    private tailleR: string,
    private tailleB: string
  ) {
    //la scene
    this.scene = scene;

    //on charge les autres interfaces
    this._ui = new UI(this.scene);

    //the engine
    this.engine = engine;
    this.importLaboratoire();

    this.vitesse = {
      petite: 50,
      moyenne: 40,
      grosse: 30,
    };
    this.createBalle(tailleR, tailleB);
  }

  async importLaboratoire() {
    const labo = await SceneLoader.ImportMeshAsync(
      "",
      "./experience3_PFD/",
      "studio_test.glb",
      this.scene
    );
    this.setLoaded();
    this.voirCard("card");
    return labo;
  }
  createBalle(a: string, b: string) {
    this.tailleB = a;
    this.tailleR = b;
    const taille = {
      petite: 0.1,
      moyenne: 0.2,
      grosse: 0.3,
    };

    this.ball1 = MeshBuilder.CreateSphere("ball1", { diameter: taille[a] });
    this.ball1.position.y = 0;
    this.ball1.position.x = -0.5;
    this.ball1.position.z = -3;
    this.ball1.material = this.changeMaterialColor(0, 0, 255);
    console.log(`la taille est ${taille[a]}`);

    this._ui._play.onPointerUpObservable.add(() => {
      this.deplacer();
      this.deplacer2();
      this.lancerChrono(0, 0, this._ui._text4, this.ball2);
      this.lancerChrono(0, 0, this._ui._text2, this.ball1);
    });

    this._ui._restart.onPointerUpObservable.add(() => {
      this.ball1.position.z = -3;
      this.ball2.position.z = -3;
    });

    this.ball2 = MeshBuilder.CreateSphere("ball2", { diameter: taille[b] });
    this.ball2.position.y = 0.38;
    this.ball2.position.x = -1.4;
    this.ball2.position.z = -3;
    this.ball2.diameter = taille[this.tailleR];
    this.ball2.material = this.changeMaterialColor(255, 0, 0);
  }

  public deplacer() {
    const startPosition = new Vector3(-0.5, 0, -3);
    const endPosition = new Vector3(-0.5, 0, -0.3);

    const amplitude = 0.2; // Amplitude des ondulations
    const frequency = 3; // Fréquence des ondulations

    const frames = 100; // Nombre de frames pour l'animation
    const zKeys = [];
    const yKeys = [];

    for (let i = 0; i <= frames; i++) {
      const frame = i;

      // Position en z pour avancer vers endPosition
      const zValue =
        startPosition.z + (endPosition.z - startPosition.z) * (i / frames);

      // Mouvement sinusoïdal sur l'axe y pour les ondulations
      const yValue =
        startPosition.y + amplitude * Math.sin((frequency * i * Math.PI) / 50);

      zKeys.push({ frame: frame, value: zValue });
      yKeys.push({ frame: frame, value: yValue });
    }

    // Créer l'animation pour l'axe Z
    const zAnimation = new Animation(
      "zAnimation",
      "position.z",
      this.vitesse[this.tailleB] || 30,
      Animation.ANIMATIONTYPE_FLOAT,
      Animation.ANIMATIONLOOPMODE_CONSTANT
    );
    zAnimation.setKeys(zKeys);

    // Créer l'animation pour l'axe Y (mouvement de haut en bas)
    const yAnimation = new Animation(
      "yAnimation",
      "position.y",
      this.vitesse[this.tailleB] || 30,
      Animation.ANIMATIONTYPE_FLOAT,
      Animation.ANIMATIONLOOPMODE_CONSTANT
    );
    yAnimation.setKeys(yKeys);

    // Associer les animations à la balle
    this.ball1.animations = [zAnimation, yAnimation];

    // Démarrer l'animation
    this.scene.beginAnimation(this.ball1, 0, frames, false);
  }

  public deplacer2() {
    const startPosition = new Vector3(-1.9, 0.38, -2.15);
    const endPosition = new Vector3(-1.9, 0.38, -0.3);
    Animation.CreateAndStartAnimation(
      "anim",
      this.ball2,
      "position",
      this.vitesse[this.tailleR],
      100,
      startPosition,
      endPosition,
      Animation.ANIMATIONLOOPMODE_CONSTANT
    );
  }
  public changeMaterialColor(x, y, z): StandardMaterial {
    const ballMat = new StandardMaterial("ballMat", this.scene);
    ballMat.diffuseColor = new Color3(x, y, z);
    return ballMat;
  }
  public lancerChrono(ms, sec, texte, ball) {
    if (ball.position.z < -0.3) {
      setTimeout(() => {
        this._ui._milsec = ms;
        this._ui._sec = sec;
        texte.text = `${this._ui._sec} : ${this._ui._milsec}`;
        this._ui._milsec++;
        if (this._ui._milsec < 60) {
          console.log(this._ui._milsec);
          this.lancerChrono(this._ui._milsec, this._ui._sec, texte, ball);
        } else {
          if (this._ui._sec < 10) {
            this._ui._sec++;
            this._ui._milsec = 0;
            this.lancerChrono(this._ui._milsec, this._ui._sec, texte, ball);
          }
        }
      }, 1);
    }
  }
}
