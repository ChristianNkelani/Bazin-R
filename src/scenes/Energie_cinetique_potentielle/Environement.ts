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
    Curve3,
    PhysicsImpostor,
    CannonJSPlugin,
} from "@babylonjs/core";

    import * as CANNON from "cannon";
    import "@babylonjs/loaders";
    import { UI } from "./ui";
    import * as GUI from '@babylonjs/gui/2D';



export class Environement {

    scene: Scene;
    engine : Engine;
    ball1 : any;
    ball2 : any;
    inkDrop:any;
    aimants:any;
    physicEngine:any;

    cliquer=true;//variable pour activer impostor ou non
    private _ui:UI;


constructor(
    scene:Scene, engine:Engine,
    private setLoaded: () => void,
    private voirCard: () => void

){
    //creation de la scene
    this.scene = scene;

    //on charge les autres interfaces
    this._ui = new UI(this.scene);  

    //creation du moteur
    this.engine = engine;
    
    //ajout de la physique(gravité, collision)
    this.Physics();
    
    //importation du laboratoire
    this.importLaboratoire();

    //creation des balles et aimants
    this.createMateriels();

    //creeer les sliSders
    this.createSliders();
    
    this.actions()


     // Fonction d'animation
     scene.onBeforeRenderObservable.add(() => {

        // this._ui.texts[0].text =  "Énergie Potentielle: "+this.ball1.position._y;
        
        // const kineticEnergy = 0.5 * mass * speed * speed;
        // kineticEnergyText.text = `Énergie Cinétique: ${kineticEnergy.toFixed(2)}`;
    
    });


}




//-----------------------------------------------------------------------------------------------------------------------------------------------------------

    async importLaboratoire(){

        const labo = await SceneLoader.ImportMeshAsync("","./models/","laboratoire.glb", this.scene);
        this.setLoaded();
        this.voirCard();

        
        
        return labo;
    }

//-----------------------------------------------------------------------------------------------------------------------

    createground(){
        const ground = MeshBuilder.CreateGround('ground', {})
        ground.position.y = 0.7
        ground.position.x = 7
        ground.position.z = -0.6
        
        ground.physicsImpostor = new PhysicsImpostor(
        ground,
        PhysicsImpostor.BoxImpostor,
        { mass: 0, restitution: 0}
        )
        ground.isVisible = false
    }

    createground2(){
        const ground = MeshBuilder.CreateGround('ground', {})
        ground.position.y = 0.7
        ground.position.x = 7
        ground.position.z = -4.5
        
        ground.physicsImpostor = new PhysicsImpostor(
        ground,
        PhysicsImpostor.BoxImpostor,
        { mass: 0, restitution: 0}
        )
        ground.isVisible = false
    }
//-----------------------------------------------------------------------------------------------------------------

//-------------------------------------------------------------------------------------------------------------------------------------------------------
    
    /**
     * @cette_fonction_permet_d_activer_la_physique_dans_l_environnement
     */
    async Physics(){
        this.scene.enablePhysics(null, new CannonJSPlugin(true,10,CANNON));
        this.physicEngine = this.scene.getPhysicsEngine();

    }
//-----------------------------------------------------------------------------------------------------------------------------------------------------

    changeMaterialColor(x,y,z):StandardMaterial{
        const ballMat = new StandardMaterial("ballMat", this.scene);
        ballMat.diffuseColor = new Color3(x,y,z)
        return ballMat;
    }
//--------------------------------------------------------------------------------------------------------------------------------------------------------

    createMateriels(){

        this.aimants = [];

        const aimant1 = MeshBuilder.CreateBox("aimant", {width:0.5, height:0.08 , size: 1, depth:1}, this.scene);
        aimant1.position.x = 7.3
        aimant1.position.y = 3
        aimant1.position.z = -0.5

        this.aimants[0] = aimant1;
        
        const aimant2 = MeshBuilder.CreateBox("aimant", {width:0.5, height:0.08 , size: 1, depth:1}, this.scene);
        aimant2.position.x = 7.3
        aimant2.position.y = 2.5
        aimant2.position.z = -4.6

        this.aimants[1] = aimant2;
        
        this.ball1 = MeshBuilder.CreateSphere("ball", {diameter: 0.25}, this.scene);
        this.ball1.position.y = 3;
        this.ball1.position.x = 7.2;
        this.ball1.position.z = -0.7
        this.ball1.material = this.changeMaterialColor(170,255,0)
        
        this.ball2 = MeshBuilder.CreateSphere("ball", {diameter: 0.25}, this.scene);
        this.ball2.position.y = 2.5;
        this.ball2.position.x = 7.2;
        this.ball2.position.z = -4.4
        this.ball2.material = this.changeMaterialColor(255,0,0)
        
        this.createground();
        this.createground2();
        
        return [aimant1,aimant2,this.ball1,this.ball2];
    }
//-------------------------------------------------------------------------------------------------------------------------------------------------------

    createSliders(){
        var hauteur=3;
        var hauteur1=3;

        var g = 9.81;
        var masse = 1;
        var masse1 = 1;

        // this._ui.texts[0].text = this.ball1.position._y;

        const displayValue = (value) => {
            return Math.floor(value*100)/100;
        }
            
            const ball1 = this.ball1;
            const ball2 = this.ball2;
            
            const setBall1 = (value) => {
            ball1.scaling.x = value;
            ball1.scaling.y = value;
            ball1.scaling.z = value;
            masse = value;
            this._ui.texts[0].text =  "Énergie Potentielle: "+(value*hauteur*g).toFixed(2);
            }
            
            const setHauteur1 = (value) => {
                this.aimants[0].position.y = value;
                this.ball1.position.y = value;
                this._ui.texts[0].text =  "Énergie Potentielle: "+masse*value*-this.physicEngine.gravity._y;

                hauteur = value;
            }

            const setHauteur2 = (value) => {
                this.aimants[1].position.y = value;
                this.ball2.position.y = value;

                this._ui.texts[2].text =  "Énergie Potentielle: "+(masse1*value*-this.physicEngine.gravity._y).toFixed(2);
                hauteur = value;

            }
            const setBall2 = (value) => {
            ball2.scaling.x = value;
            ball2.scaling.y = value;
            ball2.scaling.z = value;
            masse1 = value;
            this._ui.texts[2].text =  "Énergie Potentielle: "+(value*hauteur1*g).toFixed(2);

            }
            
            
            const physicEngine = this.physicEngine;
            const setGravitaion = (value) =>{
            physicEngine.setGravity(new Vector3(0,-(value),0))
            this._ui.texts[0].text =  "Énergie Potentielle: "+(masse*hauteur*value).toFixed(2);
            this._ui.texts[2].text =  "Énergie Potentielle: "+(masse1*hauteur1*value).toFixed(2);

            }
            this._ui.groupSliders[0].addSlider("Gravitation",setGravitaion,"m/s2",0,15,9.81,displayValue);
            this._ui.groupSliders[0].addSlider("Masse balle jaune",setBall1,"Kg",1,2,1,displayValue);
            this._ui.groupSliders[0].addSlider("Masse balle rouge",setBall2,"Kg",1,2,1,displayValue);
            this._ui.groupSliders[0].addSlider("Hauteur de la balle jaune",setHauteur1,"m",1,3,3,displayValue);
            this._ui.groupSliders[0].addSlider("Hauteur de la balle rouge",setHauteur2,"m",1,3,2.5,displayValue);

        }
//--------------------------------------------------------------------------------------------------------------------------------------------------------
    actions(){
        
        this._ui._buttonAction[0].onPointerUpObservable.add(()=>{
            if(this.cliquer == true){
              this._ui._stopTimer = false;
                this.createImpostor();        
                this._ui.startTimer();
                this.cliquer = false;
             
            }
        
        })


        this._ui._buttonAction[1].onPointerUpObservable.add(()=>{
            this.toRestart();
        })
    }



    // Animation
    public createImpostor():void{
        this.ball1.physicsImpostor = new PhysicsImpostor(
        this.ball1, 
        PhysicsImpostor.BoxImpostor,
        { mass: 1, restitution : 0.75 }
        )
        
        this.ball2.physicsImpostor = new PhysicsImpostor(
        this.ball2,
        PhysicsImpostor.BoxImpostor,
        {mass : 1 , restitution : 0.75}
        )
    }


toRestart(){
    this.ball2.position.y = this.aimants[1].position._y;
    this.ball2.position.x = 7.2;
    this.ball2.position.z = -4.4
    this.ball2.diameter = 0.25
    this.ball1.physicsImpostor.dispose();
    
    
    this.ball1.position.y = this.aimants[0].position._y;
    this.ball1.position.x = 7.2;
    this.ball1.position.z = -0.7
    this.ball2.diameter = 0.25
    this.ball2.physicsImpostor.dispose();
    this.cliquer=true;
    this._ui._sString = "00";
    this._ui._mString = 0;
    this._ui.time = 0;
    // this._ui._stopTimer = false;
    this._ui._clockTime.text = "00:00";
    
    }
    
}


