import {
    Scene, 
    Engine, 
    SceneLoader,
    MeshBuilder ,
    Vector3,
    Animation,
    StandardMaterial,
    Color3,
    Path3D,
    Curve3
} from "@babylonjs/core";

import "@babylonjs/loaders";
import { UI } from "./ui";


export class Environement {

    scene: Scene;
    engine : Engine;
    ball1 : any;
    ball2 : any;
    inkDrop:any;
    cliquer=true;//variable pour activer impostor ou non
    private _ui:UI;


constructor(
scene:Scene, engine:Engine,
private setLoaded: () => void,
private voirCard: () => void

){
    this.inkDrop = [];
    //la scene
    this.scene = scene;

    //on charge les autres interfaces
    this._ui = new UI(this.scene);  

    //the engine
    this.engine = engine;
    this.importLaboratoire();

    this.createBalle();
    // this.chrono(0);

    this.chatgpt();


}

async importLaboratoire(){
    // this.engine.displayLoadingUI();
    const labo = await SceneLoader.ImportMeshAsync("","./experience3_PFD/","studio.glb", this.scene);
    //
    this.setLoaded();
    //
    this.voirCard()
    // labo.meshes[1].isVisible = false;
    labo.meshes[1].position.y = 0.8;
    labo.meshes[1].position.x = -7;
    labo.meshes[2].isVisible = false;
    labo.meshes[1].isVisible = false;
    labo.meshes[8].isVisible = false;

    
    return labo;
}
public createBalle(){
    this.ball1 = MeshBuilder.CreateSphere("ball1",{diameter:0.5});
    this.ball1.position.y = 0.7;
    this.ball1.position.x = 7;
    this.ball1.position.z = -0.8;
    this.ball1.material = this.changeMaterialColor(255,0,0);

    this.ball2 = MeshBuilder.CreateSphere("ball2",{diameter:0.3});
    this.ball2.position.y = 0.10;
    this.ball2.position.x = 7;
    this.ball2.position.z = 2.5;
    this.ball2.material = this.changeMaterialColor(0,255,0);

    this._ui._play.onPointerUpObservable.add(()=>{
        this.deplacer();
        this.parabolic();
    })

    this._ui._restart.onPointerUpObservable.add(()=>{
        this.ball1.position.z = -0.8;
    })




    
}

public deplacer(){
    // this.inkDrop = [];
    for (let i = 0; i < this.inkDrop.length; i++) {
        this.inkDrop[i].isVisible = false;
        
        
    }
    
    // Définir les points de la courbe
    const points = [
        new Vector3(6.5, 0.3, -0.8),
        new Vector3(6.7, 0.3, -0.9),
        new Vector3(7.1, 0.3, -1.2),
        new Vector3(6.5, 0.3, -1.4),
        new Vector3(6.1, 0.3, -1.3),
        new Vector3(6.3, 0.3, -1.6),
        new Vector3(7.2, 0.3, -1.8),
        new Vector3(6.1, 0.3, -2.1),
        new Vector3(6, 0.3, -2.3),
        new Vector3(6.2, 0.3, -2.4),
        new Vector3(6.7, 0.3, -2.5),
        new Vector3(6.8, 0.3, -2.6),
        new Vector3(6.9, 0.3, -2.8),
        new Vector3(7.8, 0.3, -3),
        new Vector3(8.1 , 0.3, -3.2),
        new Vector3(8.4 , 0.3, -3.4),
        new Vector3(7.1 , 0.3, -3.6),
        new Vector3(7.3 , 0.3, -3.8),
        new Vector3(8.5 , 0.3, -4.1),
        new Vector3(6.9 , 0.3, -4.3),




    ];

    // Créer une spline Catmull-Rom à partir des points
    // const path = Curve3.CreateCatmullRomSpline(points, 20);
    const path = Curve3.CreateCatmullRomSpline(points,20)

    // Obtenir les points de la courbe
    const pathPoints = path.getPoints();

    // Créer une animation
    const animation = new Animation(
        "anim",
        "position",
        20,
        Animation.ANIMATIONTYPE_VECTOR3,
        Animation.ANIMATIONLOOPMODE_CONSTANT
    );

    // Clés pour l'animation (les étapes de l'animation le long de la courbe)
    const keys = [];
    for (let i = 0; i < pathPoints.length; i++) {
        keys.push({
            frame: i * (200 / (pathPoints.length - 1)), // Distribue les frames uniformément
            value: pathPoints[i]
        });
    }

    // Affecter les clés à l'animation
    animation.setKeys(keys);

    // Ajouter l'animation à la balle
    this.ball1.animations = [];
    this.ball1.animations.push(animation);

    // Commencer l'animation
    this.scene.beginAnimation(this.ball1, 0, 200, false);

    }


    changeMaterialColor(x,y,z):StandardMaterial{
        const ballMat = new StandardMaterial("ballMat", this.scene);
        ballMat.diffuseColor = new Color3(x,y,z)
        return ballMat;
    }

    chatgpt(){


        // Position initiale de la balle
        this.ball1.position = new Vector3(7,0.15,-0.8);
    
        // Trajectoire
        let previousPosition = this.ball1.position.clone();
        let previousPosition1 = this.ball1.position.clone();

        const linePoints: Vector3[] = [previousPosition];
        
    
        this.scene.registerBeforeRender(() => {
            // Mise à jour de la position de la balle (simulation simple d'un mouvement)
            // Si la balle a suffisamment bougé, ajouter un point à la trajectoire
            if (Vector3.Distance(previousPosition, this.ball1.position) > 0.01) {
                previousPosition = this.ball1.position.clone();
                linePoints.push(previousPosition);
    
                // Création d'une goutte d'encre
                this.inkDrop = MeshBuilder.CreateSphere("inkDrop", { diameter: 0.04 }, this.scene);
                this.inkDrop.position = previousPosition.clone();
                // this.inkDrop.position.y = 0.53;
                const inkMaterial = new StandardMaterial("inkMaterial", this.scene);
                inkMaterial.diffuseColor = new Color3(0, 1, 255);
                this.inkDrop.material = inkMaterial;
            
            }

            if (Vector3.Distance(previousPosition1, this.ball2.position) > 0.01) {
                previousPosition1 = this.ball2.position.clone();
                linePoints.push(previousPosition1);
    
                // Création d'une goutte d'encre
                this.inkDrop = MeshBuilder.CreateSphere("inkDrop", { diameter: 0.04 }, this.scene);
                this.inkDrop.position = previousPosition1.clone();
                // this.inkDrop.position.y = 0.53;
                const inkMaterial = new StandardMaterial("inkMaterial", this.scene);
                inkMaterial.diffuseColor = new Color3(0, 1, 0);
                this.inkDrop.material = inkMaterial;
            
            }
            //effacer les gouttes
            this._ui._restart.onPointerUpObservable.add(()=>{
            })
        });
    
    }

    public parabolic(){
       
        // Parameters for the parabolic motion
        const v0 = 10; // initial velocity
        const theta = Math.PI / 4; // launch angle in radians
        const g = 9.81; // gravity
        const timeStep = 0.1; // time step for simulation

        // Create an array to store the trajectory points
        const points = [];

        // Calculate the trajectory points
        for (let t = 0; t <= 2 * v0 * Math.sin(theta) / g; t += timeStep) {
            const y = v0 * Math.sin(theta) * t - 0.5 * g * t * t;
            const z = -(v0 * Math.cos(theta) * t)+2.5;
            points.push(new Vector3(6.5, y, z));
            console.log("z",t,z)
        }

        // Draw the trajectory
        // MeshBuilder.CreateLines("trajectory", {points: points}, this.scene);
    
        // Créer une spline Catmull-Rom à partir des points
        // const path = Curve3.CreateCatmullRomSpline(points, 20);
        const path = Curve3.CreateCatmullRomSpline(points,20)
    
        // Obtenir les points de la courbe
        const pathPoints = path.getPoints();
    
        // Créer une animation
        const animation = new Animation(
            "anim",
            "position",
            20,
            Animation.ANIMATIONTYPE_VECTOR3,
            Animation.ANIMATIONLOOPMODE_CONSTANT
        );
    
        // Clés pour l'animation (les étapes de l'animation le long de la courbe)
        const keys = [];
        for (let i = 0; i < pathPoints.length; i++) {
            keys.push({
                frame: i * (200 / (pathPoints.length - 1)), // Distribue les frames uniformément
                value: pathPoints[i]
            });
        }
    
        // Affecter les clés à l'animation
        animation.setKeys(keys);
    
        // Ajouter l'animation à la balle
        this.ball2.animations = [];
        this.ball2.animations.push(animation);
    
        // Commencer l'animation
        this.scene.beginAnimation(this.ball2, 0, 200, false);
    
        }


    public mvt_recigligne(){
    // this.inkDrop = [];
    for (let i = 0; i < this.inkDrop.length; i++) {
        this.inkDrop[i].isVisible = false;
        
        
    }
    
    // Définir les points de la courbe
    const points = [
        new Vector3(6.5, 0.3, -0.8),
        new Vector3(6.7, 0.3, -0.9),
        new Vector3(7.1, 0.3, -1.2),
        new Vector3(6.5, 0.3, -1.4),
        new Vector3(6.1, 0.3, -1.3),
        new Vector3(6.3, 0.3, -1.6),
        new Vector3(7.2, 0.3, -1.8),
        new Vector3(6.1, 0.3, -2.1),
        new Vector3(6, 0.3, -2.3),
        new Vector3(6.2, 0.3, -2.4),
        new Vector3(6.7, 0.3, -2.5),
        new Vector3(6.8, 0.3, -2.6),
        new Vector3(6.9, 0.3, -2.8),
        new Vector3(7.8, 0.3, -3),
        new Vector3(8.1 , 0.3, -3.2),
        new Vector3(8.4 , 0.3, -3.4),
        new Vector3(7.1 , 0.3, -3.6),
        new Vector3(7.3 , 0.3, -3.8),
        new Vector3(8.5 , 0.3, -4.1),
        new Vector3(6.9 , 0.3, -4.3),

    ];

    // Créer une spline Catmull-Rom à partir des points
    // const path = Curve3.CreateCatmullRomSpline(points, 20);
    const path = Curve3.CreateCatmullRomSpline(points,20)

    // Obtenir les points de la courbe
    const pathPoints = path.getPoints();

    // Créer une animation
    const animation = new Animation(
        "anim",
        "position",
        20,
        Animation.ANIMATIONTYPE_VECTOR3,
        Animation.ANIMATIONLOOPMODE_CONSTANT
    );

    // Clés pour l'animation (les étapes de l'animation le long de la courbe)
    const keys = [];
    for (let i = 0; i < pathPoints.length; i++) {
        keys.push({
            frame: i * (200 / (pathPoints.length - 1)), // Distribue les frames uniformément
            value: pathPoints[i]
        });
    }

    // Affecter les clés à l'animation
    animation.setKeys(keys);

    // Ajouter l'animation à la balle
    this.ball1.animations = [];
    this.ball1.animations.push(animation);

    // Commencer l'animation
    this.scene.beginAnimation(this.ball1, 0, 200, false);

    }
    
}

