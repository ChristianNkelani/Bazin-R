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
import { double } from "babylonjs";



export class Environement {

    scene: Scene;
    engine : Engine;
    ball1 : any;
    ball2 : any;
    inkDrop:any;
    aimants:any;
    public masse = 0;
    public masse1 = 0;
    public hauteur = 0;
    public hauteur1 = 0;
    physicEngine:any;

    cliquer=true;//variable pour activer impostor ou non
    public _ui:UI;


constructor(
    scene:Scene, engine:Engine,
    private setLoaded: () => void,
    private voirCard: (card: string) => void

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

    // this.createImpostor()


    this.scene.onBeforeRenderObservable.add(() => {
        // when the game isn't paused, update the timer
        this._ui.updateHud();
        this._ui.updateHud1();
      });

   


}




//-----------------------------------------------------------------------------------------------------------------------------------------------------------

    async importLaboratoire(){

        const labo = await SceneLoader.ImportMeshAsync("","./models/","laboratoire.glb", this.scene);
        this.setLoaded();
        this.voirCard("card");

        
        
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
        this.scene.enablePhysics(new Vector3(0, -9.81, 0), new CannonJSPlugin(true,10,CANNON));
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

createSliders() {
    var hauteur = 3;
    var hauteur1 = 2.5;

    this.hauteur = hauteur;
    this.hauteur1 = hauteur1;

    var g = 9.81;
    var masse = 1;
    var masse1 = 1;

    this.masse = masse;
    this.masse1 = masse1;
    const displayValue = (value) => {
        return (Math.floor(value * 100) / 100).toFixed(2);
    }

    const ball1 = this.ball1;
    const ball2 = this.ball2;
    var energiePotentielle1 =  masse*g*hauteur;
    var energiePotentielle2 =  masse1*g*hauteur1;

    const physicEngine = this.physicEngine;



    // this._ui._textMasse[2].text = "EpA = "+masse1.toFixed(2) + " x "+ g.toFixed(2) + " x "  + hauteur1.toFixed(2) + " = " + energiePotentielle2.toFixed(2) + " Joules";
    // this._ui._textMasse[0].text = "Ep = "+masse.toFixed(2) + " x "+ g.toFixed(2) + " x "  + hauteur.toFixed(2) + " = " + energiePotentielle1.toFixed(2) + " Joules";

    //texte pour le calcul de l energie cinetique balle jaune
    // this._ui._textMasse[1].text = "Ec4 = (1/2) x " + masse + " x " + "(" + hauteur + "/temps) ²" ;
    // this._ui._textMasse[3].text = "Ec4 = (1/2) x " + masse1+ " x " + "(" + hauteur1 + "/temps) ²" ;




    const setBall1 = (value) => {
        ball1.scaling.x = value;
        ball1.scaling.y = value;
        ball1.scaling.z = value;
        masse = value;
        this.masse = value.toFixed(2);

        // Calcul de l'énergie potentielle
        // this._ui._textMasse[0].text = "Ep = "+masse.toFixed(2) + " x "+ g.toFixed(2) + " x "  + hauteur.toFixed(2) + " = " + (value * hauteur * g).toFixed(2) + " Joules";

        // this._ui._textMasse[1].text = "Ec2 = (1/2) x " + value.toFixed(2) + " x " + "(" + this.hauteur.toFixed(2) + "/"  + "temps) ²" ;

    }

    const setHauteur1 = (value) => {
        this.aimants[0].position.y = value;
        this.ball1.position.y = value;

        // Mise à jour de l'énergie potentielle pour ball1
        // this._ui._textMasse[0].text = "Ep = "+masse.toFixed(2) + " x "+ g.toFixed(2) + " x "  + value.toFixed(2) + " = " + (masse *g*value).toFixed(2)+ " Joules";
        // this._ui._textMasse[1].text = "Ec3 = (1/2) x " + masse.toFixed(2) + " x " + "(" + value.toFixed(2) + "/"  + "temps) ²" ;
        
        this.hauteur = value;
        hauteur = value;
    }

    const setHauteur2 = (value) => {
        this.aimants[1].position.y = value;
        this.ball2.position.y = value;

        // Mise à jour de l'énergie potentielle pour ball2
        // this._ui._textMasse[2].text = "Ep = "+masse1.toFixed(2) + " x "+ g.toFixed(2) + " x "  + value.toFixed(2) + " = " + (masse1 *g*value).toFixed(2)+ " Joules";
        // this._ui._textMasse[3].text = "Ec2 = (1/2) x " + masse1.toFixed(2) + " x " + "(" + value.toFixed(2) + "/"  + "temps) ²" ;
        
        hauteur1 = value;
    }

    const setBall2 = (value) => {
        ball2.scaling.x = value;
        ball2.scaling.y = value;
        ball2.scaling.z = value;
        masse1 = value;

        // Calcul de l'énergie potentielle
        // this._ui._textMasse[2].text = "Ep = "+masse1.toFixed(2) + " x "+ g.toFixed(2) + " x "  + hauteur1.toFixed(2) + " = " + (value * hauteur1 * g).toFixed(2) + " Joules";
        
        // this._ui._textMasse[3].text = "Ec2 = (1/2) x " + value.toFixed(2) + " x " + "(" + this.hauteur1.toFixed(2) + "/"  + "temps) ²" ;
        
    }


    const setGravitaion = (value) => {
        physicEngine.setGravity(new BABYLON.Vector3(0, -(value), 0));
        
        // Mise à jour de l'énergie potentielle pour les deux balles
        // this._ui._textMasse[0].text = "Ep = "+masse.toFixed(2) + " x "+ value.toFixed(2) + " x "  + hauteur.toFixed(2) + " = " + (masse * value * hauteur).toFixed(2) + " Joules";
        // this._ui._textMasse[2].text = "Ep = "+masse1.toFixed(2) + " x "+ value.toFixed(2) + " x "  + hauteur1.toFixed(2) + " = " + (masse1 *value*hauteur1).toFixed(2)+ " Joules";
    }




    // Ajout des sliders pour la gravitation, les masses et les hauteurs des balles
    this._ui.groupSliders[0].addSlider("g = ", setGravitaion, "m/s2", 0, 15, 9.81, displayValue);
    this._ui.groupSliders[0].addSlider("Masse balle jaune", setBall1, "Kg", 1, 2, 1, displayValue);
    this._ui.groupSliders[0].addSlider("Hauteur de la balle jaune", setHauteur1, "m", 1, 3, 3, displayValue);
    this._ui.groupSliders[0].addSlider("Masse balle rouge", setBall2, "Kg", 1, 2, 1, displayValue);
    this._ui.groupSliders[0].addSlider("Hauteur de la balle rouge", setHauteur2, "m", 1, 3, 2.5, displayValue);
}

//--------------------------------------------------------------------------------------------------------------------------------------------------------
    actions(){
        
        this._ui._buttonAction[0].onPointerUpObservable.add(()=>{
            if(this.cliquer == true){

                
                this._ui._stopTimer = false;
                this._ui._stopTimer1 = false;

                this.createImpostor();  
                        
                this._ui.startTimer();
                this._ui.startTimer1();

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

    if(this.ball1.physicsImpostor){

        this.ball1.physicsImpostor.dispose();
        this.ball2.physicsImpostor.dispose();
    }
    
    
    this.ball1.position.y = this.aimants[0].position._y;
    this.ball1.position.x = 7.2;
    this.ball1.position.z = -0.7
    this.ball2.diameter = 0.25
    this.cliquer=true;

    //restart first chrono
    this._ui._sString = "00";
    this._ui._mString = 0;
    this._ui.time = 0;
    this._ui._clockTime.text = "00:00";


    //restart second chrono
    this._ui._sString1 = "00";
    this._ui._mString1 = 0;
    this._ui.time1 = 0;
    this._ui._clockTime1.text = "00:00";
    
    }
    

    // ! voir les parametres
 voirCalcul() {
    if (this._ui._container2.isVisible == true) {
      this._ui._container2.isVisible = false;
    } else {
      this._ui._container2.isVisible = true;
    }

    if (this._ui._container3.isVisible == true) {
        this._ui._container3.isVisible = false;
    } else {
        this._ui._container3.isVisible = true;
    }
  }
  // !voir les calculs
  voirParam() {
    if (this._ui.selectbox.isVisible == true) {
      this._ui.selectbox.isVisible = false;
    } else {
      this._ui.selectbox.isVisible = true;
    }
  }
}



