import {
  Scene,
  Engine,
  SceneLoader,
  MeshBuilder,
  Vector3,
  Animation,
  StandardMaterial,
  Color3,
  Texture
} from "@babylonjs/core";

import "@babylonjs/loaders";
import { UI } from "./ui";
import * as GUI from "@babylonjs/gui/2D";


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
      "./experience2_Inertie/",
      "st.glb",
      this.scene
    );
    this.setLoaded();
    this.voirCard("card");
    this.createTest();

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

    // this._ui._play.onPointerUpObservable.add(() => {
    //   this.deplacer();
    //   this.deplacer2();
    //   this.lancerChrono(0, 0, this._ui._text4, this.ball2);
    //   this.lancerChrono(0, 0, this._ui._text2, this.ball1);
    // });

    // this._ui._restart.onPointerUpObservable.add(() => {
    //   this.ball1.position.z = -4.5;
    //   this.ball2.position.z = -4.5;
    // });
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
  public createTest() {
    // Créer les fils horizontaux avec un décalage en y
    var points1 = [];
    var points2 = [];
    var amplitude = 1;
    var frequency = 2;
    var yOffset1 = 3; // Décalage en y pour le premier rail
    var yOffset2 = 3; // Décalage en y pour le deuxième rail

    for (var i = -Math.PI; i <= Math.PI; i += 0.1) {
        points1.push(new Vector3(i, amplitude * Math.sin(frequency * i) + yOffset1, -2));
        points2.push(new Vector3(i, amplitude * Math.sin(frequency * i) + yOffset2, 2));
    }
    var line1 = MeshBuilder.CreateLines("line1", {points: points1}, this.scene);
    var line2 = MeshBuilder.CreateLines("line2", {points: points2}, this.scene);

    // Créer les matériaux avec des textures
    var material1 = new StandardMaterial("material1", this.scene);
    material1.diffuseTexture = new Texture("./texture/1.jpeg", this.scene);

    var material2 = new StandardMaterial("material2", this.scene);
    material2.diffuseTexture = new Texture("./texture/2.jpeg", this.scene);

    // Créer les balles
    var ball1 = MeshBuilder.CreateSphere("ball1", {diameter: 0.5}, this.scene);
    ball1.position = new Vector3(-Math.PI, amplitude * Math.sin(frequency * -Math.PI) + yOffset1, -2);
    ball1.material = material1; // Appliquer la texture au premier matériau

    var ball2 = MeshBuilder.CreateSphere("ball2", {diameter: 0.5}, this.scene);
    ball2.position = new Vector3(-Math.PI, amplitude * Math.sin(frequency * -Math.PI) + yOffset2, 2);
    ball2.material = material2; // Appliquer la texture au deuxième matériau

    // Variables pour contrôler l'animation
    var isAnimating1 = false;
    var isAnimating2 = false;

    // Variables pour les chronomètres
    var startTime1, startTime2;

    // Créer les éléments UI pour les chronomètres
    var advancedTexture = GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI");
    var chronoText1 = new GUI.TextBlock();
    chronoText1.text = "Temps pour la balle 1: 00:00";
    chronoText1.color = "white";
    chronoText1.fontSize = 24;
    chronoText1.top = "-40%";
    chronoText1.left = "-40%";
    advancedTexture.addControl(chronoText1);

    var chronoText2 = new GUI.TextBlock();
    chronoText2.text = "Temps pour la balle 2: 00:00";
    chronoText2.color = "white";
    chronoText2.fontSize = 24;
    chronoText2.top = "-30%";
    chronoText2.left = "-40%";
    advancedTexture.addControl(chronoText2);

    // Fonction pour formater le temps en SS:MS
    function formatTime(ms) {
        var totalSeconds = Math.floor(ms / 1000);
        var milliseconds = ms % 1000;
        return `${totalSeconds.toString().padStart(2, '0')}:${milliseconds.toString().padStart(3, '0')}`;
    }

    // Animation des balles
    this.scene.registerBeforeRender(function () {
        if (isAnimating1) {
            if (!startTime1) startTime1 = performance.now(); // Démarrer le chronomètre
            var speed1 = 0.02 / ball1.scaling.x; // Vitesse inversement proportionnelle à la taille
            ball1.position.x += speed1;
            ball1.position.y = amplitude * Math.sin(frequency * ball1.position.x) + yOffset1;

            var elapsedTime1 = performance.now() - startTime1;
            chronoText1.text = "Temps pour la balle 1: " + formatTime(elapsedTime1);

            if (ball1.position.x > Math.PI) {
                isAnimating1 = false;
            }
        }

        if (isAnimating2) {
            if (!startTime2) startTime2 = performance.now(); // Démarrer le chronomètre
            var speed2 = 0.02 / ball2.scaling.x;
            ball2.position.x += speed2;
            ball2.position.y = amplitude * Math.sin(frequency * ball2.position.x) + yOffset2;

            var elapsedTime2 = performance.now() - startTime2;
            chronoText2.text = "Temps pour la balle 2: " + formatTime(elapsedTime2);

            if (ball2.position.x > Math.PI) {
                isAnimating2 = false;
            }
        }
    });

    // slider 2
    this._ui.slider1.onValueChangedObservable.add(function (value) {
        ball1.scaling = new Vector3(value, value, value);
    });

    // slider 2
    this._ui.slider2.onValueChangedObservable.add(function (value) {
      ball2.scaling = new Vector3(value, value, value);
    });

    // THE START BOUTTOM 
    this._ui.startButton.onPointerUpObservable.add(function () {
        isAnimating1 = true;
        isAnimating2 = true;
        startTime1 = null; // Réinitialiser le chronomètre
        startTime2 = null; // Réinitialiser le chronomètre
    });

    // Ajouter le bouton Restart
    this._ui.restartButton.onPointerUpObservable.add(function () {
        ball1.position = new Vector3(-Math.PI, amplitude * Math.sin(frequency * -Math.PI) + yOffset1, -2);
        ball2.position = new Vector3(-Math.PI, amplitude * Math.sin(frequency * -Math.PI) + yOffset2, 2);
        isAnimating1 = false;
        isAnimating2 = false;
        startTime1 = null; // Réinitialiser le chronomètre
        startTime2 = null; // Réinitialiser le chronomètre
        chronoText1.text = "Temps pour la balle 1: 00:00";
        chronoText2.text = "Temps pour la balle 2: 00:00";
    });
}




  }
