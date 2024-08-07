import { Scene, MeshBuilder, Color3, PBRMaterial, Sound } from "@babylonjs/core";
import * as GUI from '@babylonjs/gui/2D';
import { Vector3 } from "babylonjs";

export class UI {
    public _scene:Scene;
    public _sliders:any;
    public _buttonAction:any;
    public groupSliders:any;
    public texts:any;
    public selectbox : any ;

    //Game Timer
    public time: number; //keep track to signal end game REAL TIME
    private _prevTime = 0;
    public _clockTime: any; //GAME TIME
    private _startTime: number;
    public _stopTimer: boolean;
    public _sString = "00";
    public _mString = 0;
    public gravitation: -9.8;

    public box :any;
    public textedynamique : string

    constructor(scene: Scene){
        this._scene = scene;
        
        //creation du menu
        this.createMenu();
        //menu action
        this.createButtonActionMenu();

        //create the texture 
        const advancedTexture = GUI.AdvancedDynamicTexture.CreateFullscreenUI('UI', undefined);        
        this.Chrono(advancedTexture);

        this.calculs(3,4)
    }
   
    
    public createMenu(){
        const advancedTexture = GUI.AdvancedDynamicTexture.CreateFullscreenUI('UI', undefined);
        const container = new GUI.Container();
   
    
       
    
    
        advancedTexture.addControl(container)
        // creation chronr

        this.selectbox= new GUI.SelectionPanel("sp");
        this.selectbox.width=0.23;
        this.selectbox.height = 0.55;
        this.selectbox.left = "50px";
        this.selectbox.paddingLeft = "15px"
        this.selectbox.background = "white";
        this.selectbox.top = "20px";
        this.selectbox.setPadding("5px","5px","10px","5px");

        this.selectbox.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
        this.selectbox.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_TOP;
        advancedTexture.addControl(this.selectbox);

        this.groupSliders = [];
        this.groupSliders[0] = new GUI.SliderGroup("Menu Paramètres");
        this.selectbox.addGroup(this.groupSliders[0]);
        this.groupSliders[1] = new GUI.CheckboxGroup("");
        this.groupSliders[1].top = "10px";
        this.selectbox.addGroup(this.groupSliders[1])
        this.selectbox.isVisible = false;
        

     
    }

    createButtonActionMenu(){
        //on defini la variable de classe comme tableau
        this._buttonAction = [];
        const advancedTexture = GUI.AdvancedDynamicTexture.CreateFullscreenUI('UI', undefined);
        const panel = new GUI.StackPanel();
      
        //button play creation
        this._buttonAction[0] = GUI.Button.CreateImageButton("playButton","Play", "./images/sprites/play.png");
        this._buttonAction[0].width = "200px";
        this._buttonAction[0].height = "39px";
        this._buttonAction[0].background = 'white';
        this._buttonAction[0].color = "deepskyblue";
        
        panel.addControl(this._buttonAction[0]);
      
        this._buttonAction[1] = GUI.Button.CreateSimpleButton("restartButon", "Restart");
        this._buttonAction[1].width = "200px";
        this._buttonAction[1].height = "39px";
        this._buttonAction[1].background = 'white';
        this._buttonAction[1].color = "deepskyblue";
        
      
        panel.addControl(this._buttonAction[1]);

        this._buttonAction[2] = GUI.Button.CreateSimpleButton("Terminer", "Terminer");
        this._buttonAction[2].width = "200px";
        this._buttonAction[2].height = "39px";
        this._buttonAction[2].background = 'white';
        this._buttonAction[2].color = "deepskyblue"

        panel.addControl(this._buttonAction[2]);


        panel.isVertical = false;
        panel.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT;
        panel.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_TOP;
        panel.top = 10;
        panel.height="40px";
      
      
        advancedTexture.addControl(panel);
      }

    public Chrono(advancedTexture){
        //Game timer text
        const clockTime = new GUI.TextBlock();
        clockTime.name = "clock";
        clockTime.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_CENTER;
        clockTime.fontSize = "48px";
        clockTime.color = "white";
        clockTime.text = "00:00";
        clockTime.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_TOP;
        clockTime.resizeToFit = true;
        clockTime.height = "96px";
        clockTime.width = "220px";
        clockTime.fontFamily = "Viga";
        advancedTexture.addControl(clockTime);
        this._clockTime = clockTime;
        
    }

    //---- Game Timer ----
    public startTimer(): void {
        if(!this._stopTimer){

            this._startTime = new Date().getTime();
            this._stopTimer = false;
        }
    }
    public stopTimer(): void {
        this._stopTimer = true;
    }

    //format the time so that it is relative to 11:00 -- game time
    private _formatTime(time: number): string {
        const minsPassed = Math.floor(time / 60); //seconds in a min 
        const secPassed = time % 240; // goes back to 0 after 4mins/240sec
        //gameclock works like: 4 mins = 1 hr
        // 4sec = 1/15 = 1min game time        
            this._mString = Math.floor(minsPassed / 1) ;
            this._sString = (secPassed / 1 < 10 ? "0" : "") + secPassed / 1;
        
        const day = (this._mString == 11 ? " " : " ");
        
        return ("0"+this._mString + ":" + this._sString + day);
    }

    public updateHud(): void {
        if(!this._stopTimer && this._startTime != null ){
            const curTime = Math.floor((new Date().getTime() - this._startTime) / 10) + this._prevTime; // divide by 1000 to get seconds

            this.time = curTime; //keeps track of the total time elapsed in seconds
            this._clockTime.text = this._formatTime(curTime);
        }
            
    }
    

  
  affichageParametre(){
    if(this.selectbox.isVisible == false ){
        this.selectbox.isVisible = true;
    } else {
        this.selectbox.isVisible = false;
    }
  }


  calculs(potentiel=0,cinetique=0){
    this.texts = [];
     // Création de la GUI
     const advancedTexture = GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI");

     // Création d'un texte pour afficher l'énergie cinétique
     const kineticEnergyText = new GUI.TextBlock();
     kineticEnergyText.text = "Énergie Cinétique: "+cinetique;
     kineticEnergyText.color = "white";
     kineticEnergyText.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
     kineticEnergyText.left = '-250px';
     kineticEnergyText.top = -230;
     kineticEnergyText.fontSize = 24;
     advancedTexture.addControl(kineticEnergyText);

     this.texts[0] = kineticEnergyText;

     const potentialEnergy = new GUI.TextBlock();
     potentialEnergy.text = "Énergie Potentielle: "+potentiel;
     potentialEnergy.color = "white";
     potentialEnergy.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
     potentialEnergy.top = -200;
     potentialEnergy.left = '-250px';
     potentialEnergy.fontSize = 24;
     advancedTexture.addControl(potentialEnergy);

     this.texts[1] = potentialEnergy;

     

     // Variables pour la physique
     let velocity = new Vector3(0, 0, 0);
     const gravity = new Vector3(0, -0.1, 0);
     const mass = 1; // masse de la balle\


     // Création d'un texte pour afficher l'énergie cinétique
     const text3 = new GUI.TextBlock();
     text3.text = "Énergie Cinétique: "+cinetique;
     text3.color = "white";
     text3.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
     text3.left = '250px';
     text3.top = -230;
     text3.fontSize = 24;
     advancedTexture.addControl(text3);

     this.texts[2] = text3;

     const text4 = new GUI.TextBlock();
     text4.text = "Énergie Potentielle: "+potentiel;
     text4.color = "white";
     text4.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
     text4.top = -200;
     text4.left = '250px';
     text4.fontSize = 24;
     advancedTexture.addControl(text4);

     this.texts[3] = text4;
  }


  
}