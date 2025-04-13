import {
  Scene,
  Engine,
  MeshBuilder,
  SceneLoader,
  StandardMaterial,
  Color3,
  Vector3,
  PhysicsImpostor,
  CannonJSPlugin,
  Texture,
  Vector4,
  Axis,
  Space,
  TransformNode,
  PointerEventTypes,
} from "@babylonjs/core";

import "@babylonjs/loaders";
import * as CANNON from "cannon";
import * as Ammo from "ammojs-typed";
import * as GUI from "@babylonjs/gui/2D";
import { UI } from "./ui";
import { Line } from "babylonjs-gui";
import { Color4, GlowLayer, ParticleSystem } from "babylonjs";

export class Environement {
  public scene: Scene;
  engine: Engine;
  boitiers: any;
  cliquer = true; //variable pour activer impostor ou non
  public _ui: UI;
  physicEngine: any;
  wheelFI: any;
  line:any;
  line1:any;
  public lines = [];

  constructor(
    scene: Scene,
    engine: Engine,
    // Lagestion du loader
    private setLoaded: () => void,

    // gestion des cards
    private voirCard: (card: string) => void
  ) {
    //la scene
    this.scene = scene;

    //on charge les autres interfaces
    this._ui = new UI(this.scene);
    // this._ui.startTimer();
    this.scene.onBeforeRenderObservable.add(() => {
      // when the game isn't paused, update the timer

      this._ui.updateHud();
      this._ui.updateHud1();

      // console.log(this.boitiers[0].position._y);
    });

    this.scene.enablePhysics(
      new Vector3(0, -9.81, 0),
      new CannonJSPlugin(true, 10, CANNON)
    );

    //the engine
    this.engine = engine;

    //creation des materiels
    // this.importLaboratoire();
    // this.createMateriels();
    // this.createground();
    // this.createground2();
    // this.createMotor();

    //action des sliders
    this.actionButtonMenu();
    //creategravity
    // this.createGravity();
    //action slider
    // this.actionGroupSlider();

    //verification de la position des boitiers
    // this.creqteFil();

    // this.createLines(this.scene);
    this.createSolarSystem(this.scene);

  }


  createSolarSystem(scene){

    // const scene = this.scene;

     // Soleil (avec rotation et effet lumineux)
    var sun = MeshBuilder.CreateSphere("sun", { diameter: 12 }, scene);
    var sunMat = new StandardMaterial("sunMat");
    sunMat.emissiveTexture = new Texture("https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Solarsystemscope_texture_8k_sun.jpg/800px-Solarsystemscope_texture_8k_sun.jpg?20201026210200", scene);
    sunMat.emissiveColor = new Color3(1, 0.8, 0);
    sun.material = sunMat;

    // Ajout d'un effet de glow autour du Soleil
   var glowLayer = new GlowLayer("glow", scene);
   glowLayer.intensity = 0.8;

   // Création d'un champ d'étoiles avec un système de particules
   var starSystem = new ParticleSystem("stars", 2000, scene);
  //  starSystem.particleTexture = new Texture("https://playground.babylonjs.com/textures/flare.png", scene);
  //  starSystem.emitter = new Vector3(0, 0, 0); // Centre de l'émission
  //  starSystem.minEmitBox = new Vec(-500, -500, -500);
  //  starSystem.maxEmitBox = new Vector3(500, 500, 500);
   starSystem.color1 = new Color4(1, 1, 1, 1);
   starSystem.color2 = new Color4(1, 1, 1, 1);
   starSystem.minSize = 0.1;
   starSystem.maxSize = 0.3;
   starSystem.minLifeTime = Number.MAX_VALUE; // Les étoiles restent en place
   starSystem.emitRate = 0; // Pas d'émission continue
   starSystem.manualEmitCount = 2000;
   starSystem.start();
   

    // Données des planètes (toutes les 8) avec leurs textures, tailles, distances et vitesses d'orbite
    var planetsData = [
      { name: "Mercure", size: 1, distance: 8, speed: 0.02, texture: "https://upload.wikimedia.org/wikipedia/commons/2/2e/Mercury_transparent.png" },
      { name: "Vénus", size: 1.8, distance: 12, speed: 0.015, texture: "https://upload.wikimedia.org/wikipedia/commons/8/85/Venus_globe.jpg" },
      { name: "Terre", size: 2, distance: 16, speed: 0.01, texture: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cb/The_Blue_Marble_%28remastered%29.jpg/600px-The_Blue_Marble_%28remastered%29.jpg" },
      { name: "Mars", size: 1.6, distance: 20, speed: 0.008, texture: "https://upload.wikimedia.org/wikipedia/commons/0/02/OSIRIS_Mars_true_color.jpg" },
      { name: "Jupiter", size: 4, distance: 28, speed: 0.005, texture: "https://upload.wikimedia.org/wikipedia/commons/e/e2/Jupiter.jpg" },
      { name: "Saturne", size: 3.4, distance: 36, speed: 0.003, texture: "https://upload.wikimedia.org/wikipedia/commons/2/29/Saturn_True_Color.jpg" },
      { name: "Uranus", size: 3, distance: 42, speed: 0.002, texture: "https://upload.wikimedia.org/wikipedia/commons/3/3d/Uranus2.jpg" },
      { name: "Neptune", size: 2.8, distance: 48, speed: 0.001, texture: "https://upload.wikimedia.org/wikipedia/commons/5/56/Neptune_Full.jpg" }
  ];

  var planets = [];
  var earthMesh = null; // Pour stocker la référence à la Terre (pour la Lune)

  // Création des planètes, leurs orbites et leurs étiquettes si besoin
  planetsData.forEach(function(data) {
    // Création de la planète
    var planet = MeshBuilder.CreateSphere(data.name, { diameter: data.size }, scene);
    var material = new StandardMaterial(data.name + "Mat", scene);
    material.diffuseTexture = new Texture(data.texture, scene);
    planet.material = material;
    // Position initiale sur l'axe x
    planet.position.x = data.distance;
    
    // Création de l'orbite (ligne circulaire autour du Soleil)
    var orbit = MeshBuilder.CreateLines(data.name + "Orbit", {
        points: Array.from({ length: 361 }, function(_, i) {
            var angle = (i * Math.PI) / 180;
            return new Vector3(Math.cos(angle) * data.distance, 0, Math.sin(angle) * data.distance);
        })
    }, scene);
    orbit.color = new Color3(0.5, 0.5, 0.5);
    
    planets.push({ mesh: planet, distance: data.distance, speed: data.speed, angle: Math.random() * Math.PI * 2 });
    
    // Sauvegarder la Terre pour ajouter la Lune
    if (data.name === "Terre") {
        earthMesh = planet;
    }
  });

   // Apparution du loader
   this.setLoaded();

   // Juste apres ça montrer le card avec cette methode

   this.voirCard("card");



   // Ajout de la Lune autour de la Terre
   if (earthMesh) {
       // Création d'un pivot pour la Lune, parenté à la Terre
       var moonPivot = new TransformNode("moonPivot", scene);
       moonPivot.parent = earthMesh;
       moonPivot.position = Vector3.Zero();
       
       var moonDistance = 3; // Distance de la Lune par rapport à la Terre
       var moon = MeshBuilder.CreateSphere("moon", { diameter: 0.5 }, scene);
       moon.parent = moonPivot;
       moon.position = new Vector3(moonDistance, 0, 0);
       
       var moonMat = new StandardMaterial("moonMat", scene);
       moonMat.diffuseTexture = new Texture("https://upload.wikimedia.org/wikipedia/commons/e/e1/FullMoon2010.jpg", scene);
       moon.material = moonMat;
       
       // Création de l'orbite de la Lune autour de la Terre
       var moonOrbit = MeshBuilder.CreateLines("moonOrbit", {
           points: Array.from({ length: 361 }, function(_, i) {
               var angle = (i * Math.PI) / 180;
               return new Vector3(Math.cos(angle) * moonDistance, 0, Math.sin(angle) * moonDistance);
           })
       }, scene);
       moonOrbit.color = new Color3(0.7, 0.7, 0.7);
       moonOrbit.parent = earthMesh; // Pour suivre la Terre
       
       // Animation de l'orbite de la Lune en faisant tourner le pivot
       scene.onBeforeRenderObservable.add(function() {
           moonPivot.rotation.y += 0.05;
       });
   }
   
   // Animation du Soleil et des planètes
   scene.onBeforeRenderObservable.add(function() {
       // Rotation du Soleil
       sun.rotation.y += 0.005;
       
       // Animation de l'orbite des planètes autour du Soleil
       planets.forEach(function(planet) {
           planet.angle += planet.speed;
           planet.mesh.position.x = Math.cos(planet.angle) * planet.distance;
           planet.mesh.position.z = Math.sin(planet.angle) * planet.distance;
       });
   });


  //  // Gestion du clic pour zoomer et suivre une cible
  //  scene.onPointerObservable.add(function(pointerInfo) {
  //   if (pointerInfo.type === PointerEventTypes.POINTERPICK) {
  //       var pickResult = pointerInfo.pickInfo;
  //       if (pickResult.hit && pickResult.pickedMesh) {
  //           if (pickResult.pickedMesh.name === "sun") {
  //               // Clic sur le Soleil : vue globale
  //               camera.lockedTarget = null;
  //               camera.radius = 120;
  //           } else if (pickResult.pickedMesh.name === "moon") {
  //               // Clic sur la Lune : zoom rapproché
  //               camera.lockedTarget = pickResult.pickedMesh;
  //               camera.radius = 8;
  //           } else {
  //               // Clic sur une planète : zoom modéré
  //               camera.lockedTarget = pickResult.pickedMesh;
  //               camera.radius = 15;
  //           }
  //       }
  //   }
  // });



  }

















  async importLaboratoire() {
    const labo = await SceneLoader.ImportMeshAsync(
      "",
      "./models/",
      "laboratoire.glb",
      this.scene
    );
    // Apparution du loader
    this.setLoaded();

    // Juste apres ça montrer le card avec cette methode

    this.voirCard("card");

    console.log(labo.meshes);
    labo.meshes[10].isVisible = false;
    labo.meshes[11].isVisible = false;
    labo.meshes[14].isVisible = false;
    labo.meshes[20].isVisible = false;
    labo.meshes[19].isVisible = false;
    labo.meshes[18].isVisible = false;
    labo.meshes[17].isVisible = false;
    labo.meshes[16].isVisible = false;
    labo.meshes[15].isVisible = false;
    // labo.meshes[11].isVisible = false;

    return labo;
  }

  createMateriels() {
    //on dit que c'est un tableau
    this.boitiers = [];
    this.boitiers[0] = MeshBuilder.CreateBox(
      "ball",
      { width: 0.25, height: 0.25, size: 0.25 },
      this.scene
    );
    this.boitiers[0].position.y = 0.7;
    this.boitiers[0].position.x = 6.5;
    this.boitiers[0].position.z = -0.6;
    this.boitiers[0].material = this.changeMaterialColor(170, 255, 0);

    this.boitiers[1] = MeshBuilder.CreateBox(
      "ball",
      { width: 0.25, height: 0.25, size: 0.25 },
      this.scene
    );
    this.boitiers[1].position.y = 0.7;
    this.boitiers[1].position.x = 7.7;
    this.boitiers[1].position.z = -0.7;
    this.boitiers[1].material = this.changeMaterialColor(255, 0, 0);

    return [this.boitiers[0], this.boitiers[1]];
  }

  changeMaterialColor(x, y, z): StandardMaterial {
    const ballMat = new StandardMaterial("ballMat", this.scene);
    ballMat.diffuseColor = new Color3(x, y, z);
    return ballMat;
  }

  // Animation
  public createImpostor(): void {
    this.boitiers[0].physicsImpostor = new PhysicsImpostor(
      this.boitiers[0],
      PhysicsImpostor.BoxImpostor,
      { mass: 1, restitution: 0.75 }
    );

    this.boitiers[0].physicsImpostor = new PhysicsImpostor(
      this.boitiers[0],
      PhysicsImpostor.BoxImpostor,
      { mass: 1, restitution: 0.75 }
    );
  }

  createground() {
    const ground = MeshBuilder.CreateGround("ground", {
      width: 2.5,
      height: 5.2,
    });
    ground.position.y = 0.6;
    ground.position.x = 7.2;
    ground.position.z = -2.5;

    ground.physicsImpostor = new PhysicsImpostor(
      ground,
      PhysicsImpostor.BoxImpostor,
      { mass: 0, restitution: 0.5 }
    );
    ground.isVisible = false;
  }
  createground2() {
    const ground = MeshBuilder.CreateGround("ground", {});
    ground.position.y = 0.7;
    ground.position.x = 7;
    ground.position.z = -4.5;

    ground.physicsImpostor = new PhysicsImpostor(
      ground,
      PhysicsImpostor.BoxImpostor,
      { mass: 0, restitution: 0.5 }
    );
    ground.isVisible = false;
  }

  actionButtonMenu() {
    this._ui._buttonAction[0].onPointerUpObservable.add(() => {
      if (this.cliquer == true) {
        this.createImpulse(this.scene);
        this._ui._stopTimer = false;
        this._ui._stopTimer1 = false;

        
        this._ui.startTimer();
        this._ui.startTimer1();

        this.cliquer = false;
      }
    });

    this.scene.registerAfterRender(() => {
      if (this.cliquer !== true) {
        this.wheelFI.rotate(Axis.X, Math.PI / 2, Space.WORLD);
      }
    });

    this._ui._buttonAction[1].onPointerUpObservable.add(() => {
      this.toRestart(this.scene);
    });
  }

  toRestart(scene) {
    if(this.boitiers[1].PhysicsImpostor || this.boitiers[0].physicsImpostor){

      //repositionate boitier
      this.boitiers[1].position.y = 0.7;
      this.boitiers[1].position.x = 7.7;
      this.boitiers[1].position.z = -0.7;

      
      //lines dispose
      
      this.boitiers[0].position.y = 0.7;
      this.boitiers[0].position.x = 6.5;
      this.boitiers[0].position.z = -0.6;
      
      this.boitiers[1].physicsImpostor.dispose();
      this.boitiers[0].physicsImpostor.dispose();
      // this.boitiers[0].rotation.x = 0;
      // this.boitiers[0].rotation.y = 0;
      // this.boitiers[0].rotation.z = 0;

      this._ui._stopTimer = true;
      this._ui._stopTimer1 = true;


      this.createLines(scene);

    }
    

    //reset clocktime
    this.cliquer = true;
    this._ui._sString = "00";
    this._ui._mString = 0;
    this._ui.time = 0;
    this._ui._clockTime.text = "00:00";

    //reset clocktime1
    this._ui._sString1 = "00";
    this._ui._mString1 = 0;
    this._ui.time1 = 0;
    this._ui._clockTime1.text = "00:00";
  }

  createImpulse(scene) {
    this.boitiers[0].physicsImpostor = new PhysicsImpostor(
      this.boitiers[0],
      PhysicsImpostor.BoxImpostor,
      { mass: 10, friction: 0.04 }
    );

    this.boitiers[1].physicsImpostor = new PhysicsImpostor(
      this.boitiers[1],
      PhysicsImpostor.BoxImpostor,
      { mass: 10, friction: 0.04 }
    );

    // let bouger = true;
    var vitesse1 =
      this.physicEngine.gravity.y / (6 * this.boitiers[0].scaling._x);
      
    var vitesse2 =
      this.physicEngine.gravity.y / (6 * this.boitiers[1].scaling._x);
    
    // Variable globale pour le mouvement
    let bouger1 = true;
    let bouger2 = true;


    const update = () => {
      if (bouger1) {
        // Mettre à jour la vites
        // this.lines[i-1].isVisible = false;
        this.boitiers[0].physicsImpostor.setLinearVelocity(new Vector3(0, 0, vitesse1));
        this.createLines(scene);

        
        // Vérifier la condition d'arrêt
        if (this.boitiers[0].position._z <= -3.8) { // Notez l'utilisation de .z au lieu de ._z
          // this.boitiers[0].dispose();
          bouger1 = false; // Arrêter le mouvement
          this._ui._stopTimer = true;
          this.cliquer=true;
        }

        if (this.boitiers[1].position._z <= -3.8) { // Notez l'utilisation de .z au lieu de ._z
          // this.boitiers[0].dispose();
          bouger2 = false; // Arrêter le mouvement
          this._ui._stopTimer1 = true;
          this.cliquer=true;
        }
      }

      if (bouger2) {
        // Mettre à jour la vites
        this.boitiers[1].physicsImpostor.setLinearVelocity(new Vector3(0, 0, vitesse2));

        
        // Vérifier la condition d'arrêt
        if (this.boitiers[1].position._z <= -3.8) { // Notez l'utilisation de .z au lieu de ._z
          // this.boitiers[0].dispose();
          bouger2 = false; // Arrêter le mouvement
          this.cliquer=true;
        }
      }
    };
    
    // Enregistrer la fonction d'update avant le rendu
    this.scene.registerBeforeRender(update);



  }

  createMotor() {
    //poteau1
    const poteau1 = MeshBuilder.CreateBox(
      "p1",
      { width: 0.1, height: 0.8, size: 0.1 },
      this.scene
    );
    poteau1.position.y = 1;
    poteau1.position.x = 6.7;
    poteau1.position.z = -5;

    //poteau2
    const poteau2 = MeshBuilder.CreateBox(
      "p1",
      { width: 0.1, height: 0.8, size: 0.1 },
      this.scene
    );
    poteau2.position.y = 1;
    poteau2.position.x = 7.5;
    poteau2.position.z = -5;

    //create cylinder
    const cylinder = MeshBuilder.CreateCylinder(
      "c1",
      { height: 1.5, diameter: 0.1 },
      this.scene
    );
    cylinder.position.y = 1;
    cylinder.position.x = 7.1;
    cylinder.position.z = -5;
    cylinder.rotation.z = Math.PI / 2;

    this.createAnimation();
  }

  createAnimation(): void {
    /*-----------------------Wheel------------------------------------------*/

    //Wheel Material
    var wheelMaterial = new StandardMaterial("wheel_mat");
    var wheelTexture = new Texture("https://i.imgur.com/ZUWbT6L.png");
    wheelMaterial.diffuseTexture = wheelTexture;

    //Set color for wheel tread as black
    var faceColors = [];
    faceColors[1] = new Color3(0, 0, 0);

    //set texture for flat face of wheel
    var faceUV = [];
    faceUV[0] = new Vector4(0, 0, 1, 1);
    faceUV[2] = new Vector4(0, 0, 1, 1);

    //create wheel front inside and apply material
    this.wheelFI = MeshBuilder.CreateCylinder("wheelFI", {
      diameter: 0.5,
      height: 0.1,
      tessellation: 24,
      faceColors: faceColors,
      faceUV: faceUV,
    });
    this.wheelFI.material = wheelMaterial;
    this.wheelFI.position = new Vector3(7.1, 1, -5);

    //rotate wheel so tread in xz plane
    this.wheelFI.rotate(Axis.Z, Math.PI / 2, Space.WORLD);
    // wheelFI.parent = carBody;

  }


 actionGroupSlider() {
    // Met à jour les valeurs des textes avec les masses initiales
    this._ui._textMasse[4].text =
        "P1 = " +
        this._ui._sliders[0].value +
        " x " +
        -this.physicEngine.gravity.y +
        " = " +
        (this._ui._sliders[0].value * -this.physicEngine.gravity.y).toFixed(2) +
        " N";

    this._ui._textMasse[5].text =
        "P2 = " +
        this._ui._sliders[1].value +
        " x " +
        -this.physicEngine.gravity.y +
        " = " +
        (this._ui._sliders[1].value * -this.physicEngine.gravity.y).toFixed(2) +
        " N";

    this._ui._textMasse[6].text =
        "P12 = " +
        this._ui._sliders[2].value +
        " x " +
        -this.physicEngine.gravity.y +
        " = " +
        (this._ui._sliders[2].value * -this.physicEngine.gravity.y).toFixed(2) +
        " N";

    let masse1 = this._ui._sliders[0].value;
    let masse2 = this._ui._sliders[1].value;

    const displayValue = function (value) {
        return Math.floor(value * 100) / 100;
    };

    const ball1 = this.boitiers[0];
    const ball2 = this.boitiers[1];

    const setBall1 = (value) => {
        masse1 = value;
        this._ui._textMasse[4].text =
            "P1 = " + displayValue(value).toFixed(2) + " x " + -this.physicEngine.gravity.y.toFixed(2) +
            " = " + (value * -this.physicEngine.gravity.y).toFixed(2) + " N";

        this._ui._textMasse[6].text =
            "P12 = " + (value+masse2).toFixed(2) + " x " + -this.physicEngine.gravity.y.toFixed(2) +
            " = " + ((value+masse1) * -this.physicEngine.gravity.y).toFixed(2) + " N";
          
            this._ui._textMasse[0].text = "m1 = " + value.toFixed(2) + " kg";
            this._ui._textMasse[3].text = "m12 = " + (masse2+value).toFixed(2) + " kg";

        ball1.scaling.x = value;
        ball1.scaling.y = value;
        ball1.scaling.z = value;
    };

    const setBall2 = (value) => {
        masse2 = value;
        this._ui._textMasse[5].text =
            "P2 = " + displayValue(value).toFixed(2) + " x " + -this.physicEngine.gravity.y.toFixed(2) +
            " = " + (value * -this.physicEngine.gravity.y).toFixed(2) + " N";

        this._ui._textMasse[6].text =
            "P12 = " + (value+masse1).toFixed(2) + " x " + -this.physicEngine.gravity.y.toFixed(2) +
            " = " + ((value+masse1) * -this.physicEngine.gravity.y).toFixed(2) + " N";

            this._ui._textMasse[1].text = "m2 = " + value.toFixed(2) + " kg";
            this._ui._textMasse[3].text = "m12 = " + (masse1+value).toFixed(2) + " kg";


        ball2.scaling.x = value;
        ball2.scaling.y = value;
        ball2.scaling.z = value;
    };

    // Associe les sliders aux fonctions qui modifient les masses et les tailles des boitiers
    this._ui._sliders[0].onValueChangedObservable.add(setBall1);
    this._ui._sliders[1].onValueChangedObservable.add(setBall2);

    // Action supplémentaire pour slider P12
    this._ui._sliders[2].onValueChangedObservable.add((value) => {
        this._ui._textMasse[6].text =
            "P12 = " + displayValue(value) + " x " + -this.physicEngine.gravity.y.toFixed(2) +
            " = " + (value * -this.physicEngine.gravity.y).toFixed(2) + " N";
    });

    const physicEngine = this.physicEngine;

    const setGravitaion = (value) => {
        physicEngine.setGravity(new Vector3(0, -value, 0));
        this._ui._textMasse[4].text =
            "P1 = " + masse1.toFixed(2) + " x " + value.toFixed(2) +
            " = " + (masse1 * value).toFixed(2) + " N";
        
          this._ui._textMasse[5].text =
            "P2 = " + masse2.toFixed(2) + " x " + value.toFixed(2) +
            " = " + (masse2 * value).toFixed(2) + " N";

          this._ui._textMasse[6].text =
            "P12 = " + (masse1+masse2).toFixed(2) + " x " + value.toFixed(2) +
            " = " + (value * value).toFixed(2) + " N";
    };

    this._ui.groupSliders[0].addSlider(
      "g = ",
      setGravitaion,
      "m/s2",
      0,
      15,
      9.81,
      displayValue
    );
    this._ui.groupSliders[0].addSlider(
      "Masse boîtier jaune",
      setBall1,
      "Kg",
      1,
      2,
      1,
      displayValue
    );
    this._ui.groupSliders[0].addSlider(
      "Masse boîtier rouge",
      setBall2,
      "Kg",
      1,
      2,
      1,
      displayValue
    );
}

  async createGravity() {
    // const ammo = await Ammo()
    // let physics: AmmoJSPlugin = new AmmoJSPlugin(true, ammo)
    this.scene.enablePhysics(null, new CannonJSPlugin(true, 10, CANNON));
    this.physicEngine = this.scene.getPhysicsEngine();
  }

  creqteFil() {
    // Création d'un fil (cylindre)
    var wireLength = 5; // Longueur du fil
    var wire = MeshBuilder.CreateCylinder(
      "wire",
      { height: wireLength, diameter: 0.1 },
      this.scene
    );
    wire.position.y = wireLength / 2; // Position initiale du fil
    wire.rotation.x = Math.PI / 2;
  }
  // ! voir les parametres
 voirCalcul() {
    if (this._ui._container2.isVisible == true) {
      this._ui._container2.isVisible = false;
    } else {
      this._ui._container2.isVisible = true;
    }
  }
  // !voir les calculs
  voirParam() {
    if (this._ui._selectbox.isVisible == true) {
      this._ui._selectbox.isVisible = false;
    } else {
      this._ui._selectbox.isVisible = true;
    }
  }

  //fonction pour creer les lignes 
  createLines(scene){

    if(this.line != null || this.line1 != null){
      this.line.dispose();
      this.line1.dispose();
    }
    const points = [
      this.boitiers[1].position,
      new  BABYLON.Vector3(7.3,1,-5)
    ];
 
    //dessiner la ligne
    this.line = BABYLON.MeshBuilder.CreateLines("line",{points: points}, scene);
    // line.scaling = new BABYLON.Vector3(10,10,10);

    const lineMaterial = new BABYLON.StandardMaterial("lineMaterial", scene);
    // lineMaterial.emissiveColor = new BABYLON.Color3(255,0,0);


    // line.material = lineMaterial;
  

    const points1 = [
      this.boitiers[0].position,
      new  BABYLON.Vector3(6.8,1,-5)
    ];

    //dessiner la ligne
    this.line1 = BABYLON.MeshBuilder.CreateLines("line",{points: points1}, scene);
    // line.scaling = new BABYLON.Vector3(10,10,10);


    const linear = BABYLON.MeshBuilder.CreateBox("box",{width:0.1, height:0.2, size:2}, scene )
    linear.position = new BABYLON.Vector3(7.3,0.5,-4.15);
    linear.rotation._y = Math.PI/2;

  }
}


