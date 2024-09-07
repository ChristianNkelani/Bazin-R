import {
    Scene, 
    Engine, 
    SceneLoader,
    Vector3,
    Animation,
    Mesh
} from "@babylonjs/core";
import "@babylonjs/loaders";
import { UI } from "./ui";

export class Environement {
    scene: Scene;
    engine: Engine;
    cliquer = true;

    private _ui: UI;
    private voiture: Mesh;
    private voiture2: Mesh;
    private vitesseVoiture1: number = 0;
    private vitesseVoiture2: number = 0;
    private intervalId: number | null = null;
    private lastPositionVoiture1: Vector3;
    private lastPositionVoiture2: Vector3;
    private initialPositionVoiture1: Vector3;
    private initialPositionVoiture2: Vector3;

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
        this.lastPositionVoiture1 = new Vector3();
        this.lastPositionVoiture2 = new Vector3();
    }

    async importLaboratoire() {
        const labo = await SceneLoader.ImportMeshAsync("", "./mru/", "mru.glb", this.scene);
        this.setLoaded();
        this.voirCard('card');
    
        this.voiture = labo.meshes[1] as Mesh;
        this.voiture2 = labo.meshes[10] as Mesh;
    
        // Stocker les positions initiales
        this.initialPositionVoiture1 = this.voiture.position.clone();
        this.initialPositionVoiture2 = this.voiture2.position.clone();
    
        this.lastPositionVoiture1 = this.voiture.position.clone();
        this.lastPositionVoiture2 = this.voiture2.position.clone();
    
        this.updateSpeed();
    }
    

    private updateSpeed(): void {
        // Appeler cette fonction en boucle pour calculer et afficher les vitesses
        this.scene.onBeforeRenderObservable.add(() => {
            const deltaTime = this.engine.getDeltaTime() / 1000; // Temps écoulé en secondes

            // Calculer la vitesse de la voiture 1
            const distanceVoiture1 = Vector3.Distance(this.voiture.position, this.lastPositionVoiture1);
            this.vitesseVoiture1 = distanceVoiture1 / deltaTime; // Distance / Temps

            // Calculer la vitesse de la voiture 2
            const distanceVoiture2 = Vector3.Distance(this.voiture2.position, this.lastPositionVoiture2);
            this.vitesseVoiture2 = distanceVoiture2 / deltaTime; // Distance / Temps

            // Mettre à jour les positions précédentes
            this.lastPositionVoiture1 = this.voiture.position.clone();
            this.lastPositionVoiture2 = this.voiture2.position.clone();

            

            // Mettre à jour l'UI pour afficher les vitesses
            this._ui.updateSpeedUI(this.vitesseVoiture1, this.vitesseVoiture2);
        });
    }

    private lancerMru(): void {
        const pointA = this.voiture.position.clone();  // Position initiale de la voiture
        const pointB = new Vector3(pointA.x, pointA.y, -7);  // Position finale
    
        const duration = 3;  // Durée de l'animation en secondes
        let startTime: number;
    
        const animate = (timestamp: number) => {
            if (!startTime) startTime = timestamp;
            const elapsed = (timestamp - startTime) / 1000;  // Temps écoulé en secondes
    
            // Calculer la progression linéaire de l'animation (de 0 à 1)
            let progress = elapsed / duration;
    
            // S'assurer que la progression ne dépasse pas 1
            progress = Math.min(progress, 1);
    
            // Interpoler la position de manière linéaire (vitesse constante)
            const newPosition = Vector3.Lerp(pointA, pointB, progress);
            this.voiture.position = newPosition;
    
            // Calculer la vitesse en m/s (distance / temps)
            const distance = Vector3.Distance(pointA, pointB);
            const vitesseVoiture1 = distance / duration;
    
            // Mettre à jour l'interface utilisateur avec la vitesse
            this._ui.updateSpeedUI(vitesseVoiture1, 0);  // 0 pour la voiture2 pour l'instant
    
            // Si l'animation n'est pas terminée, demander la prochaine frame
            if (progress < 1) {
                requestAnimationFrame(animate);
            } else {
                // S'assurer que la position finale est exactement pointB
                this.voiture.position = pointB;
            }
        };
    
        // Démarrer l'animation
        requestAnimationFrame(animate);
    }
    

    private lancerMruv(): void {
        const pointA = this.voiture2.position.clone();
        const pointB = new Vector3(pointA.x, pointA.y, -7);
        
        const duration = 3; // Durée de l'animation
        let startTime: number;
        
        const easeInOutCubic = (t: number) => {
            // Fonction de courbe ease-in-out cubic
            return t < 0.5
                ? 4 * t * t * t // Accélération au début
                : 1 - Math.pow(-2 * t + 2, 3) / 2; // Décélération à la fin
        };
        
        const animate = (timestamp: number) => {
            if (!startTime) startTime = timestamp;
            const elapsed = (timestamp - startTime) / 1000; // Temps écoulé en secondes
            
            // Calculer la progression de l'animation (de 0 à 1)
            let progress = elapsed / duration;
        
            // Appliquer la courbe d'accélération-décélération (ease-in-out)
            progress = easeInOutCubic(progress);
        
            // Interpoler la position
            const newPosition = Vector3.Lerp(pointA, pointB, progress);
            this.voiture2.position = newPosition;
        
            // Si l'animation n'est pas terminée, demander la prochaine frame
            if (progress < 1) {
                requestAnimationFrame(animate);
            } else {
                this.voiture2.position = pointB;
            }
        };
        
        requestAnimationFrame(animate);
    }

    private actionButton(): void {
        this._ui._bouttonAction[0].onPointerUpObservable.add(() => {
            this.lancerMru();
        });

        this._ui._bouttonAction[1].onPointerUpObservable.add(() => {
            this.lancerMruv();
        });

        this._ui.restore.onPointerUpObservable.add(()=>{
            console.log('goooo');
            
            this.resetPositions();
        })
    }
    private resetPositions(): void {
        // Réinitialiser les positions des voitures à leurs positions d'origine
        this.voiture.position = this.initialPositionVoiture1.clone();
        this.voiture2.position = this.initialPositionVoiture2.clone();
    
        // Mettre à jour les vitesses affichées (qui sont 0 après la restauration)
        this._ui.updateSpeedUI(0, 0);
    }
}
