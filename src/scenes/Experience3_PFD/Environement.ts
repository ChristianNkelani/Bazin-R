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
  vitesse: { [key: string]: number };
  taille: object;
  cliquer = true; // Variable pour activer impostor ou non
  private _ui: UI;

  constructor(
    scene: Scene,
    engine: Engine,
    private setLoaded: () => void,
    private voirCard: (card: string) => void,
    private tailleR: string,
    private tailleB: string
  ) {
    this.scene = scene;
    this._ui = new UI(this.scene);
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
      "studio_off.glb",
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

    this.ball1 = MeshBuilder.CreateSphere(
      "ball1",
      { diameter: taille[a] },
      this.scene
    );
    this.ball1.position.y = 0.38;
    this.ball1.position.x = -0.01;
    this.ball1.position.z = -4.5;
    this.ball1.material = this.changeMaterialColor(0, 0, 255);

    this.ball2 = MeshBuilder.CreateSphere(
      "ball2",
      { diameter: taille[b] },
      this.scene
    );
    this.ball2.position.y = 0.38;
    this.ball2.position.x = -0.9;
    this.ball2.position.z = -4.5;
    this.ball2.material = this.changeMaterialColor(255, 0, 0);

    this._ui._play.onPointerUpObservable.add(() => {
      this.deplacer();
      this.deplacer2();
      this.lancerChrono(0, 0, this._ui._text4, this.ball2);
      this.lancerChrono(0, 0, this._ui._text2, this.ball1);
    });

    this._ui._restart.onPointerUpObservable.add(() => {
      this.ball1.position.z = -4.5;
      this.ball2.position.z = -4.5;
    });
  }

  changerTaille(tailleB: string, tailleR: string) {
    const sizeMap = {
      petite: 1,
      moyenne: 2,
      grosse: 3,
    };

    const newSizeB = sizeMap[tailleB];
    const newSizeR = sizeMap[tailleR];

    const vitesseB = 50 / newSizeB; // Plus petit = plus rapide
    const vitesseR = 50 / newSizeR;

    if (this.ball1) {
      this.ball1.scaling = new Vector3(newSizeB, newSizeB, newSizeB);
      this.vitesse["ball1"] = vitesseB; // Mettre à jour la vitesse de ball1
    }

    if (this.ball2) {
      this.ball2.scaling = new Vector3(newSizeR, newSizeR, newSizeR);
      this.vitesse["ball2"] = vitesseR; // Mettre à jour la vitesse de ball2
    }
  }

  public deplacer() {
    const startPosition = new Vector3(-0.01, 0, -4.5);
    const endPosition = new Vector3(-0.01, 0, 2.5);

    const amplitude = 0.2; // Amplitude du mouvement sinusoïdal
    const frequency = 3; // Fréquence du mouvement sinusoïdal

    const frames = 100; // Nombre de frames pour l'animation
    const zKeys = [];
    const xKeys = [];

    for (let i = 0; i <= frames; i++) {
      const frame = i;

      const zValue =
        startPosition.z + (endPosition.z - startPosition.z) * (i / frames);
      const xValue =
        startPosition.x + amplitude * Math.sin((frequency * i * Math.PI) / 50);

      zKeys.push({ frame: frame, value: zValue });
      xKeys.push({ frame: frame, value: xValue });
    }

    const zAnimation = new Animation(
      "zAnimation",
      "position.z",
      this.vitesse["ball1"] || 30,
      Animation.ANIMATIONTYPE_FLOAT,
      Animation.ANIMATIONLOOPMODE_CONSTANT
    );
    zAnimation.setKeys(zKeys);

    const xAnimation = new Animation(
      "xAnimation",
      "position.x",
      this.vitesse["ball1"] || 30,
      Animation.ANIMATIONTYPE_FLOAT,
      Animation.ANIMATIONLOOPMODE_CONSTANT
    );
    xAnimation.setKeys(xKeys);

    this.ball1.animations = [zAnimation, xAnimation];
    this.scene.beginAnimation(this.ball1, 0, frames, false);
  }

  public deplacer2() {
    const startPosition = new Vector3(-0.9, 0.38, -4.5);
    const endPosition = new Vector3(-0.9, 0.38, 2.5);

    const amplitude = 0.2; // Amplitude du mouvement sinusoïdal
    const frequency = 3; // Fréquence du mouvement sinusoïdal

    const frames = 100; // Nombre de frames pour l'animation
    const zKeys = [];
    const xKeys = [];

    for (let i = 0; i <= frames; i++) {
      const frame = i;

      const zValue =
        startPosition.z + (endPosition.z - startPosition.z) * (i / frames);
      const xValue =
        startPosition.x + amplitude * Math.sin((frequency * i * Math.PI) / 50);

      zKeys.push({ frame: frame, value: zValue });
      xKeys.push({ frame: frame, value: xValue });
    }

    const zAnimation = new Animation(
      "zAnimation",
      "position.z",
      this.vitesse["ball2"] || 30,
      Animation.ANIMATIONTYPE_FLOAT,
      Animation.ANIMATIONLOOPMODE_CONSTANT
    );
    zAnimation.setKeys(zKeys);

    const xAnimation = new Animation(
      "xAnimation",
      "position.x",
      this.vitesse["ball2"] || 30,
      Animation.ANIMATIONTYPE_FLOAT,
      Animation.ANIMATIONLOOPMODE_CONSTANT
    );
    xAnimation.setKeys(xKeys);

    this.ball2.animations = [zAnimation, xAnimation];
    this.scene.beginAnimation(this.ball2, 0, frames, false);
  }

  public changeMaterialColor(
    x: number,
    y: number,
    z: number
  ): StandardMaterial {
    const ballMat = new StandardMaterial("ballMat", this.scene);
    ballMat.diffuseColor = new Color3(x, y, z);
    return ballMat;
  }

  public lancerChrono(ms: number, sec: number, texte: any, ball: any) {
    const updateClock = () => {
      if (ball.position.z < -0.3) {
        this._ui._milsec = ms;
        this._ui._sec = sec;
        texte.text = `${this._ui._sec} : ${this._ui._milsec}`;
        this._ui._milsec++;

        if (this._ui._milsec >= 60) {
          this._ui._milsec = 0;
          this._ui._sec++;
        }

        // Continuer à mettre à jour l'horloge
        requestAnimationFrame(updateClock);
      }
    };

    // Initialiser le chronomètre
    requestAnimationFrame(updateClock);
  }
}
