import {
    Scene, 
    Engine, 
    SceneLoader,
    Vector3,
    Animation
} from "@babylonjs/core";
import "@babylonjs/loaders";
import { UI } from "./ui";

export class Environement {
    scene: Scene;
    engine: Engine;
    // ! Variable pour activer impostor ou non
    cliquer = true; 

    /*
        *declaration des propietes 
    */
    private _ui: UI;
    private voiture: any;
    private voiture2: any;
    private vitesse: number;
    private intervalId: number | null = null;

    constructor(
        scene: Scene, 
        engine: Engine,
        private setLoaded: () => void,
        private voirCard: (id) => void
    ) {
        this.scene = scene;
        this._ui = new UI(this.scene);
        this.engine = engine;
        this.importLaboratoire();
        this.actionButton();
    }

    async importLaboratoire() {
        const labo = await SceneLoader.ImportMeshAsync("", "./mru/", "mru.glb", this.scene);
        this.setLoaded();
        this.voirCard('card');

        this.voiture = labo.meshes[ 1];
        this.voiture2 = labo.meshes[10];

        // console.log(
        //     `position ${this.voiture2.position}`
        // );
        console.log(
            labo.meshes
        );
        
        
        return labo;
    }

    private lancerMru(): void {
        const pointA = this.voiture.position;
        const pointB = new Vector3(pointA.x, pointA.y, -7);

        const keys = [];
        keys.push({ frame: 0, value: pointA });
        keys.push({ frame: 100, value: pointB });

        const animation = new Animation("voitureAnimation", "position", 30, Animation.ANIMATIONTYPE_VECTOR3, Animation.ANIMATIONLOOPMODE_CONSTANT);
        animation.setKeys(keys);

        this.voiture.animations = [];
        this.voiture.animations.push(animation);

        this.scene.beginAnimation(this.voiture, 0, 100, false);
    }
    // private restore ():void{
    //     this.voiture.position
    // }

    private lancerMruv(): void {
        const pointA = this.voiture2.position.clone();
        const pointB = new Vector3(pointA.x, pointA.y, -7);
    
        const duration = 3; // Reduced duration to make the speed increase more noticeable
        let startTime: number;
        
        const animate = (timestamp: number) => {
            if (!startTime) startTime = timestamp;
            const elapsed = (timestamp - startTime) / 1000; // Time in seconds
    
            // Calculate the progress of the animation (0 to 1)
            let progress = elapsed / duration;
    
            // Apply an ease-in curve (cubic easing)
            progress = Math.pow(progress, 3);
    
            // Interpolate the position
            const newPosition = Vector3.Lerp(pointA, pointB, progress);
            this.voiture2.position = newPosition;
    
            // If the animation is not complete, request the next frame
            if (progress < 1) {
                requestAnimationFrame(animate);
            } else {
                // Ensure the final position is exactly pointB
                this.voiture2.position = pointB;
            }
        };
    
        // Start the animation
        requestAnimationFrame(animate);
    }

    private actionButton(): void {
        this._ui._bouttonAction[0].onPointerUpObservable.add(() => {
            this.lancerMru();
        });

        this._ui._bouttonAction[1].onPointerUpObservable.add(() => {
            this.lancerMruv();
        });
    }
}
