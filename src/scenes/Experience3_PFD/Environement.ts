// import {
//   Scene,
//   Engine,
//   SceneLoader,
//   MeshBuilder,
//   Vector3,
//   Animation,
//   StandardMaterial,
//   Color3,
//   Texture
// } from "@babylonjs/core";

// import "@babylonjs/loaders";
// import { UI } from "./ui";
// import * as GUI from "@babylonjs/gui/2D";


// export class Environement {
//   scene: Scene;
//   engine: Engine;
//   ball1: any;
//   ball2: any;
//   vitesse: { [key: string]: number };
//   taille: object;
//   cliquer = true; // Variable pour activer impostor ou non
//   speed1 : number;
//   speed2 : number;
//   private _ui: UI;

//   constructor(
//     scene: Scene,
//     engine: Engine,
//     private setLoaded: () => void,
//     private voirCard: (card: string) => void,
//     private tailleR: string,
//     private tailleB: string
//   ) {
//     this.scene = scene;
//     this._ui = new UI(this.scene);
//     this.engine = engine;
//     this.importLaboratoire();
//     this.speed1 = 0;

//     this.vitesse = {
//       petite: 50,
//       moyenne: 40,
//       grosse: 30,
//     };
//   }

//   async importLaboratoire() {
//     const labo = await SceneLoader.ImportMeshAsync(
//       "",
//       "./experience2_Inertie/",
//       "st.glb",
//       this.scene
//     );
//     this.setLoaded();
//     this.voirCard("card");
//     this.createTest();

//     return labo;
//   }

 
//   public createTest() {
//     // Créer les fils horizontaux avec un décalage en y
//     const points1 = [];
//     const points2 = [];
//     const amplitude = 1;
//     const frequency = 2;
//     const yOffset1 = 3; // Décalage en y pour le premier rail
//     const yOffset2 = 3; // Décalage en y pour le deuxième rail

//     for (let i = -Math.PI; i <= Math.PI; i += 0.1) {
//         points1.push(new Vector3(i, amplitude * Math.sin(frequency * i) + yOffset1, -2));
//         points2.push(new Vector3(i, amplitude * Math.sin(frequency * i) + yOffset2, 2));
//     }
//     MeshBuilder.CreateLines("line1", {points: points1}, this.scene);
//     MeshBuilder.CreateLines("line2", {points: points2}, this.scene);

//     // Créer les matériaux avec des textures

//     // Créer les matériaux avec des couleurs
//     const material1 = new StandardMaterial("material1", this.scene);
//     material1.diffuseColor = new Color3(1, 0, 0); // Rouge

//     const material2 = new StandardMaterial("material2", this.scene);
//     material2.diffuseColor = new Color3(0, 0, 1); // Bleu

//     // Créer les balles
//     this.ball1 = MeshBuilder.CreateSphere("ball1", { diameter: 0.5 }, this.scene);
//     this.ball1.position = new Vector3(-Math.PI, amplitude * Math.sin(frequency * -Math.PI) + yOffset1, -2);
//     this.ball1.material = material1; // Appliquer la couleur rouge au premier matériau

//     this.ball2 = MeshBuilder.CreateSphere("ball2", { diameter: 0.5 }, this.scene);
//     this.ball2.position = new Vector3(-Math.PI, amplitude * Math.sin(frequency * -Math.PI) + yOffset2, 2);
//     this.ball2.material = material2; // Appliquer la couleur bleue au deuxième matériau


//     // Variables pour contrôler l'animation
//     let isAnimating1 = false;
//     let isAnimating2 = false;

   

    

//     // Fonction pour formater le temps en SS:MS
//     function formatTime(ms) {
//         const totalSeconds = Math.floor(ms / 1000);
//         // const milliseconds = ms % 1000;
//         return `00 : ${totalSeconds.toString().padStart(2, '0')} s`;
//     }

//     // Animation des balles
//     // this.scene.registerBeforeRender(()=> {
//     //     if (isAnimating1) {
//     //         if (!startTime1) startTime1 = performance.now(); // Démarrer le chronomètre
//     //         this.speed1 = 0.02 / this.ball1.scaling.x; // Vitesse inversement proportionnelle à la taille
//     //         this.ball1.position.x += this.speed1;
//     //         this.ball1.position.y = amplitude * Math.sin(frequency * this.ball1.position.x) + yOffset1;

//     //         const elapsedTime1 = performance.now() - startTime1;
//     //         chronoText1.text = "Temps : " + formatTime(elapsedTime1);

//     //         if (this.ball1.position.x > Math.PI) {
//     //             isAnimating1 = false;
//     //         }
//     //     }

//     //     if (isAnimating2) {
//     //         if (!startTime2) startTime2 = performance.now(); // Démarrer le chronomètre
//     //         this.speed2 = 0.02 / this.ball2.scaling.x;
//     //         this.ball2.position.x += this.speed2;
//     //         this.ball2.position.y = amplitude * Math.sin(frequency * this.ball2.position.x) + yOffset2;

//     //         const elapsedTime2 = performance.now() - startTime2;
//     //         chronoText2.text = "Temps : " + formatTime(elapsedTime2);

//     //         if (this.ball2.position.x > Math.PI) {
//     //             isAnimating2 = false;
//     //         }
//     //     }
//     // });

    

//     // slider 2
//     this._ui.slider1.onValueChangedObservable.add((value)=> {
//         this.ball1.scaling = new Vector3(value, value, value);
//     });

//     // slider 2
//     this._ui.slider2.onValueChangedObservable.add((value)=> {
//       this.ball2.scaling = new Vector3(value, value, value);
//     });

//      // Variables pour les chronomètres
//      let startTime1 = 0, startTime2 = 0;

//      // Créer les éléments UI pour les chronomètres
//      const advancedTexture = GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI");
//      const chronoText1 = new GUI.TextBlock();
//      chronoText1.text = "Temps : 00:00";
//      chronoText1.color = "white";
//      chronoText1.fontSize = 24;
//      chronoText1.top = "-40%";
//      chronoText1.left = "-40%";
//      advancedTexture.addControl(chronoText1);
 
//      const vitesse1 = new GUI.TextBlock();
//      vitesse1.text = `Vitesse ${this.speed1}:` 
//      vitesse1.color = "white";
//      vitesse1.fontSize = 24
 
//      vitesse1.top = "-35%";
//      vitesse1.left = "-40%";
//      advancedTexture.addControl(vitesse1);
 
//      const chronoText2 = new GUI.TextBlock();
//      chronoText2.text = "Temps : 00:00";
//      chronoText2.color = "white";
//      chronoText2.fontSize = 24;
//      chronoText2.top = "-40%";
//      chronoText2.left = "40%";
//      advancedTexture.addControl(chronoText2);
 
//      const vitesse2 = new GUI.TextBlock();
//      vitesse2.text = "Vitesse : "
//      vitesse2.color = "white";
//      vitesse2.fontSize = 24
 
//      vitesse2.top = "-35%";
//      vitesse2.left = "40%";
//      advancedTexture.addControl(vitesse2);
 

//     // THE START BOUTTOM 
//     // Bouton Start
// this._ui.startButton.onPointerUpObservable.add(() => {
//   isAnimating1 = true;
//   isAnimating2 = true;
//   startTime1 = null; // Réinitialiser le chronomètre
//   startTime2 = null; // Réinitialiser le chronomètre
//   vitesse1.text = `Vitesse : 0`; // Mettre à jour le texte
//   vitesse2.text = `Vitesse : 0`; // Mettre à jour le texte
// });

// // Bouton Restart
// this._ui.restartButton.onPointerUpObservable.add(() => {
//   this.ball1.position = new Vector3(-Math.PI, amplitude * Math.sin(frequency * -Math.PI) + yOffset1, -2);
//   this.ball2.position = new Vector3(-Math.PI, amplitude * Math.sin(frequency * -Math.PI) + yOffset2, 2);
//   isAnimating1 = false;
//   isAnimating2 = false;
//   startTime1 = null; // Réinitialiser le chronomètre
//   startTime2 = null; // Réinitialiser le chronomètre
//   chronoText1.text = "Temps 00:00";
//   chronoText2.text = "Temps 00:00";
//   vitesse1.text = `Vitesse : 0`; // Mettre à jour le texte
//   vitesse2.text = `Vitesse : 0`; // Mettre à jour le texte
// });


//     // Ajouter le bouton Restart
//     this._ui.restartButton.onPointerUpObservable.add(()=> {
//         this.ball1.position = new Vector3(-Math.PI, amplitude * Math.sin(frequency * -Math.PI) + yOffset1, -2);
//         this.ball2.position = new Vector3(-Math.PI, amplitude * Math.sin(frequency * -Math.PI) + yOffset2, 2);
//         isAnimating1 = false;
//         isAnimating2 = false;
//         startTime1 = null; // Réinitialiser le chronomètre
//         startTime2 = null; // Réinitialiser le chronomètre
//         chronoText1.text = "Temps 00:00";
//         chronoText2.text = "Temps 00:00";
//     });
// }
//   }

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
import * as GUI from "@babylonjs/gui/2D";

export class Environement {
  scene: Scene;
  engine: Engine;
  ball1: any;
  ball2: any;
  vitesse: { [key: string]: number };
  speed1 : any;
  speed2 : any;
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

  public createTest() {
    // Acceleration

    const acceleration = 0.02; // Accélération en m/s²
    let velocity = 0; // Vitesse initiale en m/s

    velocity += acceleration; // Augmente la vitesse avec l'accélération


    const points1 = [];
    const points2 = [];
    const amplitude = 1;
    const frequency = 2;
    const yOffset1 = 3;
    const yOffset2 = 3;
    // Facteur de conversion pour rendre les vitesses plus grandes
    const speedFactor = 100;


    for (let i = -Math.PI; i <= Math.PI; i += 0.1) {
      points1.push(new Vector3(i, amplitude * Math.sin(frequency * i) + yOffset1, -2));
      points2.push(new Vector3(i, amplitude * Math.sin(frequency * i) + yOffset2, 2));
    }

    MeshBuilder.CreateLines("line1", { points: points1 }, this.scene);
    MeshBuilder.CreateLines("line2", { points: points2 }, this.scene);

    const material1 = new StandardMaterial("material1", this.scene);
    material1.diffuseColor = new Color3(1, 0, 0);

    const material2 = new StandardMaterial("material2", this.scene);
    material2.diffuseColor = new Color3(0, 0, 1);

    this.ball1 = MeshBuilder.CreateSphere("ball1", { diameter: 0.5 }, this.scene);
    this.ball1.position = new Vector3(-Math.PI, amplitude * Math.sin(frequency * -Math.PI) + yOffset1, -2);
    this.ball1.material = material1;

    this.ball2 = MeshBuilder.CreateSphere("ball2", { diameter: 0.5 }, this.scene);
    this.ball2.position = new Vector3(-Math.PI, amplitude * Math.sin(frequency * -Math.PI) + yOffset2, 2);
    this.ball2.material = material2;

    let isAnimating1 = false;
    let isAnimating2 = false;

    let previousPosition1 = this.ball1.position.clone();
    let previousPosition2 = this.ball2.position.clone();

    let startTime1 = 0, startTime2 = 0;

    const advancedTexture = GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI");

    const chronoText1 = new GUI.TextBlock();
    chronoText1.text = "Temps : 00:00";
    chronoText1.color = "white";
    chronoText1.fontSize = 24;
    chronoText1.top = "-40%";
    chronoText1.left = "40%";
    advancedTexture.addControl(chronoText1);

    const vitesse1 = new GUI.TextBlock();
    vitesse1.text = "Vitesse : 0 m/s";
    vitesse1.color = "white";
    vitesse1.fontSize = 24;
    vitesse1.top = "-35%";
    vitesse1.left = "40%";
    advancedTexture.addControl(vitesse1);

    const chronoText2 = new GUI.TextBlock();
    chronoText2.text = "Temps : 00:00";
    chronoText2.color = "white";
    chronoText2.fontSize = 24;
    chronoText2.top = "-40%";
    chronoText2.left = "-40%";
    advancedTexture.addControl(chronoText2);

    const vitesse2 = new GUI.TextBlock();
    vitesse2.text = "Vitesse : 0 m/s";
    vitesse2.color = "white";
    vitesse2.fontSize = 24;
    vitesse2.top = "-35%";
    vitesse2.left = "-40%";
    advancedTexture.addControl(vitesse2);

    const accleration = new GUI.TextBlock();
    accleration.text = "L'acceleratio est de 0.5 m/s²"
    accleration.color = "white";
    accleration.top = "-40%";
    accleration.fontSize = 24
    advancedTexture.addControl(accleration);

    const formatTime = (ms: number) => {
      const totalSeconds = Math.floor(ms / 1000);
      return `00 : ${totalSeconds.toString().padStart(2, "0")} s`;
    };

    // this.scene.registerBeforeRender(() => {
    //   const deltaTime = this.engine.getDeltaTime() / 1000;

    //   if (isAnimating1) {
    //     if (!startTime1) startTime1 = performance.now();
    //     this.speed1 = Math.abs(this.ball1.position.x - previousPosition1.x) / deltaTime;
    //     this.ball1.position.x += 0.02 / this.ball1.scaling.x;
    //     this.ball1.position.y = amplitude * Math.sin(frequency * this.ball1.position.x) + yOffset1;
    //     vitesse1.text = `Vitesse : ${this.speed1.toFixed(2)} m/s`;
    //     const elapsedTime1 = performance.now() - startTime1;
    //     chronoText1.text = "Temps : " + formatTime(elapsedTime1);
    //     previousPosition1 = this.ball1.position.clone();

    //     if (this.ball1.position.x > Math.PI) isAnimating1 = false;
    //   }

    //   if (isAnimating2) {
    //     if (!startTime2) startTime2 = performance.now();
    //     this.speed2 = Math.abs(this.ball2.position.x - previousPosition2.x) / deltaTime;
    //     this.ball2.position.x += 0.02 / this.ball2.scaling.x;
    //     this.ball2.position.y = amplitude * Math.sin(frequency * this.ball2.position.x) + yOffset2;
    //     vitesse2.text = `Vitesse : ${this.speed2.toFixed(2)} m/s`;
    //     const elapsedTime2 = performance.now() - startTime2;
    //     chronoText2.text = "Temps : " + formatTime(elapsedTime2);
    //     previousPosition2 = this.ball2.position.clone();

    //     if (this.ball2.position.x > Math.PI) isAnimating2 = false;
    //   }
    // });
    let test = 1;
      this.scene.registerBeforeRender(() => {
        
        if (isAnimating1) {
          if(test < 7.9){
            test += 0.1;
          }
          if (!startTime1) startTime1 = performance.now(); // Démarrer le chronomètre
            
        
            this.speed1 = (0.02 / this.ball1.scaling.x) * speedFactor; // Calcul de la vitesse
            this.ball1.position.x += this.speed1 / speedFactor; // Déplacement réel
            this.ball1.position.y = amplitude * Math.sin(frequency * this.ball1.position.x) + yOffset1;
            const elapsedTime1 = performance.now() - startTime1;
            chronoText1.text = "Temps : " + formatTime(elapsedTime1);
            previousPosition1 = this.ball1.position.clone();

            this.speed1 += test;
            vitesse1.text = `Vitesse : ${this.speed1.toFixed(2)} m/s`;
    
            if (this.ball1.position.x > Math.PI) {
                isAnimating1 = false;
            }
        }
    
        if (isAnimating2) {
            if (!startTime2) startTime2 = performance.now(); // Démarrer le chronomètre
            this.speed2 = (0.02 / this.ball2.scaling.x) * speedFactor; // Calcul de la vitesse
            this.ball2.position.x += this.speed2 / speedFactor; // Déplacement réel
            this.ball2.position.y = amplitude * Math.sin(frequency * this.ball2.position.x) + yOffset2;
            const elapsedTime2 = performance.now() - startTime2;
            chronoText2.text = "Temps : " + formatTime(elapsedTime2);
            previousPosition2 = this.ball2.position.clone();

            this.speed2 += test;
            vitesse2.text = `Vitesse : ${this.speed2.toFixed(2)} m/s`;
    
            if (this.ball2.position.x > Math.PI) {
                isAnimating2 = false;
            }
        }
    });
  
    this._ui.startButton.onPointerUpObservable.add(() => {
      isAnimating1 = true;
      isAnimating2 = true;
      startTime1 = null;
      startTime2 = null;
      previousPosition1 = this.ball1.position.clone();
      previousPosition2 = this.ball2.position.clone();
    });

    this._ui.restartButton.onPointerUpObservable.add(() => {
      this.ball1.position = new Vector3(-Math.PI, amplitude * Math.sin(frequency * -Math.PI) + yOffset1, -2);
      this.ball2.position = new Vector3(-Math.PI, amplitude * Math.sin(frequency * -Math.PI) + yOffset2, 2);
      isAnimating1 = false;
      isAnimating2 = false;
      startTime1 = null;
      startTime2 = null;
      chronoText1.text = "Temps : 00:00";
      chronoText2.text = "Temps : 00:00";
      vitesse1.text = "Vitesse : 0 m/s";
      vitesse2.text = "Vitesse : 0 m/s";
      test = 1
    });

    this._ui.slider1.onValueChangedObservable.add((value)=> {
        this.ball1.scaling = new Vector3(value, value, value);
    });

    this._ui.slider2.onValueChangedObservable.add((value)=> {
      this.ball2.scaling = new Vector3(value, value, value);
  });
  }
}
