import { Scene, MeshBuilder, Color3, PBRMaterial, Sound } from "@babylonjs/core";
import * as GUI from '@babylonjs/gui/2D';
import { Vector3 } from "babylonjs";

export class UI {
    public _scene:Scene;
    public _sliders:any;
    public _buttonAction:any;
    public groupSliders:any;
    public texts:any;
    public _textMasse:any;
    public selectbox : any ;
    public _container2:any;
    public _container3:any;

    //Game Timer
    public time: number; //keep track to signal end game REAL TIME
    private _prevTime = 0;
    public _clockTime: any; //GAME TIME
    private _startTime: number;
    public _stopTimer: boolean;
    public _sString = "00";
    public _mString = 0;

    public time1: number; //keep track to signal end game REAL TIME
    private _prevTime1 = 0;
    public _clockTime1: any; //GAME TIME
    private _startTime1: number;
    public _stopTimer1: boolean;
    public _sString1 = "00";
    public _mString1 = 0;

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
        this.Chrono1(advancedTexture);

    }
   
    
    public createMenu(){
        const advancedTexture = GUI.AdvancedDynamicTexture.CreateFullscreenUI('UI', undefined);
        const container = new GUI.Container();
   
        advancedTexture.addControl(container)
        // creation chronr

        this.selectbox= new GUI.SelectionPanel("sp");
        this.selectbox.width=0.232;
        this.selectbox.height = 0.45;
        this.selectbox.left = "56px";
        this.selectbox.paddingLeft = "15px"
        this.selectbox.background = "white";
        this.selectbox.top = "10px";
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

        this._container2 = new GUI.Container();

        this._container2.background = "white";
        this._container2.width = 0.28;
        this._container2.height = 0.4;
    
        this._container2.horizontalAlignment =
          GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
        this._container2.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_TOP;
        this._container2.top = "350px";
        this._container2.left = -30;
        this._container2.paddingLeft = "90px";
        this._container2.isVisible = true;


        this._container3 = new GUI.Container();

        this._container3.background = "white";
        this._container3.width = 0.28;
        this._container3.height = 0.4;
    
        this._container3.horizontalAlignment =
          GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT;
        this._container3.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_TOP;
        this._container3.top = "350px";
        this._container3.left = -60;
        this._container3.paddingLeft = "90px";
        this._container3.isVisible = true;
    
        advancedTexture.addControl(this._container2);
        advancedTexture.addControl(this._container3);

        this.menuCalculs(this._container2);
        this.menuCalculs1(this._container3);
        

     
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
        clockTime.color = "yellow";
        clockTime.text = "00:00";
        clockTime.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_TOP;
        clockTime.top = "150px";
        clockTime.left = "-250px";
        clockTime.resizeToFit = true;
        clockTime.height = "96px";
        clockTime.width = "220px";
        clockTime.fontFamily = "Viga";
        advancedTexture.addControl(clockTime);
        this._clockTime = clockTime;
        
    }

    public Chrono1(advancedTexture){
        //Game timer text
        const clockTime = new GUI.TextBlock();
        clockTime.name = "clock";
        clockTime.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_CENTER;
        clockTime.fontSize = "48px";
        clockTime.color = "red";
        clockTime.text = "00:00";
        clockTime.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_TOP;
        clockTime.top = "150px";
        clockTime.left = "250px";
        clockTime.resizeToFit = true;
        clockTime.height = "96px";
        clockTime.width = "220px";
        clockTime.fontFamily = "Viga";
        advancedTexture.addControl(clockTime);
        this._clockTime1 = clockTime;
        
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
        const secPassed = time % 100; // goes back to 0 after 4mins/240sec
        //gameclock works like: 4 mins = 1 hr
        // 4sec = 1/15 = 1min game time        
        this._mString = Math.floor(minsPassed / 1) ;
        this._sString = (secPassed / 1 < 10 ? "0" : "") + secPassed / 1;
        
        const day = (this._mString == 11 ? " " : " ");

        
        return ("0"+this._mString + ":" + this._sString);
    }

    public updateHud(): void {
        if(!this._stopTimer && this._startTime != null ){
            const curTime = Math.floor((new Date().getTime() - this._startTime) / 10) + this._prevTime; // divide by 1000 to get seconds

            this.time = curTime; //keeps track of the total time elapsed in seconds
            this._clockTime.text = this._formatTime(curTime);
        }
        
    }
    
    
    //---- Game Timer ----
    public startTimer1(): void {
        if(!this._stopTimer1){
            this._startTime1 = new Date().getTime();
            this._stopTimer1 = false;
        }
    }
    
    public stopTimer1(): void {
        this._stopTimer1 = true;
    }


    //format the time so that it is relative to 11:00 -- game time
    private _formatTime1(time: number): string {
        const minsPassed = Math.floor(time / 60); //seconds in a min 
        const secPassed = time % 100; // goes back to 0 after 4mins/240sec
        //gameclock works like: 4 mins = 1 hr
        // 4sec = 1/15 = 1min game time        
            this._mString1 = Math.floor(minsPassed / 1) ;
            this._sString1 = (secPassed / 1 < 10 ? "0" : "") + secPassed / 1;
        
        const day = (this._mString1 == 11 ? " " : " ");
        
        return ("0"+this._mString1 + ":" + this._sString1 + day);
    }


    public updateHud1(): void {
        if(!this._stopTimer1 && this._startTime1 != null ){
            const curTime = Math.floor((new Date().getTime() - this._startTime1) / 10) + this._prevTime1; // divide by 1000 to get seconds

            this.time1 = curTime; //keeps track of the total time elapsed in seconds
            this._clockTime1.text = this._formatTime1(curTime);
        }
            
    }
    

  
  affichageParametre(){
    if(this.selectbox.isVisible == false ){
        this.selectbox.isVisible = true;
    } else {
        this.selectbox.isVisible = false;
    }
  }




    public menuCalculs(advancedTexture: GUI.AdvancedDynamicTexture) {
        this._textMasse = [];
        const container = new GUI.Container();
        advancedTexture.addControl(container);

        // Calcul des énergies pour les deux balles
        const g = -this.gravitation; // Gravité
        const masse1 = 1; // Masse de la première balle
        const masse2 = 1; // Masse de la deuxième balle

        // Position de la balle sur l'axe Y (hauteur)
        const hauteur1 = 2;
        const hauteur2 = 2;

        // Vitesse fictive pour simplification (peut être ajustée pour calcul réel)
        const vitesse1 = 2; 
        const vitesse2 = 2;

        // Calcul des énergies potentielles
        const energiePotentielle1 = masse1 * g * hauteur1;
        const energiePotentielle2 = masse2 * g * hauteur2;

        // Calcul des énergies cinétiques
        const energieCinetique1 = 0.5 * masse1 * Math.pow(vitesse1, 2);
        const energieCinetique2 = 0.5 * masse2 * Math.pow(vitesse2, 2);


        // Affichage des résultats dans l'interface utilisateur
        this._textMasse[4] = new GUI.TextBlock();
        this._textMasse[4].text = "Balle Jaune";
        this._textMasse[4].color = "black";
        this._textMasse[4].fontSize = 30;
        this._textMasse[4].top = "-130px";
        container.addControl(this._textMasse[4]);
        // this._textMasse[0] =  texteEnergiePotentielle1;

        const texteEnergieCinetique1 = new GUI.TextBlock();
        this._textMasse[1] = texteEnergieCinetique1;
        texteEnergieCinetique1.text = `Ec1 = ${energieCinetique1.toFixed(2)} J`;
        texteEnergieCinetique1.color = "red";
        texteEnergieCinetique1.fontSize = 18;
        texteEnergieCinetique1.top = "130px";
        container.addControl(texteEnergieCinetique1);
        
        
        // Affichage des résultats dans l'interface utilisateur
        this._textMasse[0] = new GUI.TextBlock();
        this._textMasse[0].text = `Ep = ${energiePotentielle1.toFixed(2)} J`;
        this._textMasse[0].color = "red";
        this._textMasse[0].fontSize = 18;
        this._textMasse[0].top = "100px";
        container.addControl(this._textMasse[0]);
        // this._textMasse[0] =  texteEnergiePotentielle1;




        //formules
        const formEc = new GUI.TextBlock();
        this._textMasse[5] = formEc;
        formEc.text = 'Ec = (1/2)xMassex(Vitesse) ² \n Or Vitesse = Distance/temps \n D\'où \n Ec = (1/2)xMassex(Distance/temps) ²';
        formEc.color = 'black';
        formEc.fontSize = 18;
        formEc.top = "-50px";
        container.addControl(formEc);

        //formules
        const formEp = new GUI.TextBlock();
        this._textMasse[6] = formEp;
        formEp.text = 'Ep = Masse x g x Hauteur';
        formEp.color = 'black';
        formEp.fontSize = 18;
        formEp.top = "20px";
        container.addControl(formEp);

        const formEm = new GUI.TextBlock();
        this._textMasse[6] = formEm;
        formEm.text = 'Em = Ec + Ep ';
        formEm.color = 'black';
        formEm.fontSize = 18;
        formEm.top = "50px";
        container.addControl(formEm);



       
    }

    public menuCalculs1(advancedTexture: GUI.AdvancedDynamicTexture) {
        const container = new GUI.Container();
        advancedTexture.addControl(container);

        // Calcul des énergies pour les deux balles
        const g = -this.gravitation; // Gravité
        const masse1 = 1; // Masse de la première balle
        const masse2 = 1; // Masse de la deuxième balle

        // Position de la balle sur l'axe Y (hauteur)
        const hauteur1 = 2;
        const hauteur2 = 2;

        // Vitesse fictive pour simplification (peut être ajustée pour calcul réel)
        const vitesse1 = 2; 
        const vitesse2 = 2;

        // Calcul des énergies potentielles
        const energiePotentielle1 = masse1 * g * hauteur1;
        const energiePotentielle2 = masse2 * g * hauteur2;

        // Calcul des énergies cinétiques
        const energieCinetique1 = 0.5 * masse1 * Math.pow(vitesse1, 2);
        const energieCinetique2 = 0.5 * masse2 * Math.pow(vitesse2, 2);

        // Affichage des résultats dans l'interface utilisateur
        this._textMasse[4] = new GUI.TextBlock();
        this._textMasse[4].text = "Balle Rouge";
        this._textMasse[4].color = "black";
        this._textMasse[4].fontSize = 30;
        this._textMasse[4].top = "-130px";
        container.addControl(this._textMasse[4]);
        // this._textMasse[0] =  texteEnergiePotentielle1;

        const texteEnergieCinetique2 = new GUI.TextBlock();
        this._textMasse[3] = texteEnergieCinetique2;
        texteEnergieCinetique2.text = `Ec = ${energieCinetique2.toFixed(2)} J`;
        texteEnergieCinetique2.color = "red";
        texteEnergieCinetique2.fontSize = 18;
        texteEnergieCinetique2.top = "130px";
        container.addControl(texteEnergieCinetique2);
        
        const texteEnergiePotentielle2 = new GUI.TextBlock();
        this._textMasse[2] = texteEnergiePotentielle2;
        texteEnergiePotentielle2.text = `Ep = ${energiePotentielle2.toFixed(2)} J`;
        texteEnergiePotentielle2.color = "red";
        texteEnergiePotentielle2.fontSize = 18;
        texteEnergiePotentielle2.top = "100px";
        container.addControl(texteEnergiePotentielle2);



        //formules
        const formEc = new GUI.TextBlock();
        this._textMasse[7] = formEc;
        formEc.text = 'Ec = (1/2)xMassex(Vitesse) ² \n Or Vitesse = Distance/temps \n D\'où \n Ec = (1/2)xMassex(Distance/temps) ²';
        formEc.color = 'black';
        formEc.fontSize = 18;
        formEc.top = "-50px";
        container.addControl(formEc);

        //formules
        const formEp = new GUI.TextBlock();
        this._textMasse[8] = formEp;
        formEp.text = 'Ep = Masse x g x Hauteur';
        formEp.color = 'black';
        formEp.fontSize = 18;
        formEp.top = "20px";
        container.addControl(formEp);

        const formEm = new GUI.TextBlock();
        this._textMasse[6] = formEm;
        formEm.text = 'Em = Ec + Ep ';
        formEm.color = 'black';
        formEm.fontSize = 18;
        formEm.top = "50px";
        container.addControl(formEm);

    }

  
}