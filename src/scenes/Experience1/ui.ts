import {
  Scene,
  MeshBuilder,
  Color3,
  PBRMaterial,
  Sound,
} from "@babylonjs/core";
import * as GUI from "@babylonjs/gui/2D";

export class UI {
  public _scene: Scene;
  public _sliders: any;
  public _buttonAction: any;
  public groupSliders: any;
  public selectbox: any;

  //Game Timer
  public time: number; //keep track to signal end game REAL TIME
  private _prevTime = 0;
  public _clockTime: any; //GAME TIME
  private _startTime: number;
  public _stopTimer: boolean;
  public _sString = "00";
  public _mString = 0;
  public gravitation: -9.8;

  public time1: number; //keep track to signal end game REAL TIME
  private _prevTime1 = 0;
  public _clockTime1: any; //GAME TIME
  private _startTime1: number;
  public _stopTimer1: boolean;
  public _sString1 = "00";
  public _mString1 = 0;

  public box: any;
  public textedynamique: string;

  constructor(scene: Scene) {
    this._scene = scene;

    //creation du menu
    this.createMenu();
    //menu action
    this.createButtonActionMenu();

    // creation de la chambre vide
    this.chambreVide();

    //create the texture
    const advancedTexture = GUI.AdvancedDynamicTexture.CreateFullscreenUI(
      "UI",
      undefined
    );
    this.Chrono(advancedTexture);
    this.Chrono1(advancedTexture);

    this.Formules();

    
  }

  public createMenu() {
    const advancedTexture = GUI.AdvancedDynamicTexture.CreateFullscreenUI(
      "UI",
      undefined
    );

    //create menu formule

    const container = new GUI.Container();

    container.background = "white";
    container.width = "250px";
    container.height = 0.4;

    container.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
    container.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_TOP;
    container.top = "20px";
    container.left = "10px";

    // creation du texte
    const text = new GUI.TextBlock();
    text.text = "Menu";
    text.fontSize = 30;
    text.fontFamily = "Montserrat Black";
    text.color = "deepskyblue";
    text.height = "25px";
    text.top = "5px";
    text.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_TOP;
    container.addControl(text);

    // creation de la bille
    const bille = GUI.Checkbox.AddCheckBoxWithHeader("Bille ", (value) => {
      console.log("bille");
    });
    bille.children[1].color = "black";
    bille.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_TOP;
    bille.top = 40;
    // container.addControl(bille);

    const textBille = new GUI.TextBlock();
    textBille.text = "Taille de la bille Jaune ";
    textBille.height = "15px";
    textBille.top = "55px";
    textBille.left = "-10px";
    textBille.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_TOP;
    container.addControl(textBille);

    this._sliders = [];
    // gestionnaire de taille
    this._sliders[0] = new GUI.Slider();
    this._sliders[0].minimum = 0.9;
    this._sliders[0].maximum = 2;
    this._sliders[0].height = "20px";
    this._sliders[0].width = "200px";
    this._sliders[0].value = 1;
    this._sliders[0].verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_TOP;
    this._sliders[0].top = "70x";
    this._sliders[0].left = "-10px";
    // ecouter un evenement au chanfement de la valeur

    container.addControl(this._sliders[0]);

    //text bille 2
    const textBille2 = new GUI.TextBlock();
    textBille2.text = "Taille de la bille Rouge";
    textBille2.height = "15px";
    textBille2.top = "103px";
    textBille2.left = "-10px";
    textBille2.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_TOP;
    container.addControl(textBille2);

    this._sliders[1] = new GUI.Slider();
    this._sliders[1].minimum = 0.9;
    this._sliders[1].maximum = 2;
    this._sliders[1].height = "20px";
    this._sliders[1].width = "200px";
    this._sliders[1].verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_TOP;
    this._sliders[1].value = 1;
    this._sliders[1].top = "120px";
    this._sliders[1].left = "-10px";

    this.textedynamique = "Activer";

    const chambrevide = GUI.Checkbox.AddCheckBoxWithHeader(
      "chambre vide",
      (value) => {
        this.box.isVisible = value;
      }
    );
    chambrevide.children[1].color = "black";
    chambrevide.left = "-25px";
    chambrevide.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_TOP;
    chambrevide.top = "210px";
    chambrevide.left = "-10";
    container.addControl(chambrevide);

    container.addControl(this._sliders[1]);

    //slider for gravitation
    this._sliders[2] = new GUI.Slider();
    this._sliders[2].minimum = 0.2;

    this._sliders[2].maximum = 9.8;
    this._sliders[2].height = "20px";
    this._sliders[2].width = "200px";
    this._sliders[2].top = "170px";
    this._sliders[2].verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_TOP;
    this._sliders[2].left = "-10px";

    container.addControl(this._sliders[2]);
    container.isVisible = false;

    //text bille 2
    const textgravitation = new GUI.TextBlock();
    textgravitation.text = "Constante de gravitation";
    textgravitation.height = "15px";
    textgravitation.top = "153px";
    textgravitation.left = "-15px";
    textgravitation.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_TOP;
    container.addControl(textgravitation);

    advancedTexture.addControl(container);
    // creation chronr

    this.selectbox = new GUI.SelectionPanel("sp");
    this.selectbox.width = 0.2;
    this.selectbox.height = 0.45;
    this.selectbox.left = "50px";
    this.selectbox.paddingLeft = "15px";
    this.selectbox.background = "white";
    this.selectbox.shadowColor = "gray";
    this.selectbox.shadowBlur = 10;
    this.selectbox.shadowOffsetX = 5;
    this.selectbox.shadowOffsetY = 5;
    
    this.selectbox.top = "80px";
    this.selectbox.setPadding("5px", "5px", "10px", "5px");

    this.selectbox.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
    this.selectbox.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_TOP;
    advancedTexture.addControl(this.selectbox);

    this.groupSliders = [];
    this.groupSliders[0] = new GUI.SliderGroup("Menu Paramètres");
    this.selectbox.addGroup(this.groupSliders[0]);
    this.groupSliders[1] = new GUI.CheckboxGroup("");
    this.groupSliders[1].top = "10px";
    this.selectbox.addGroup(this.groupSliders[1]);
    this.selectbox.isVisible = false;
  }

  createButtonActionMenu() {
    //on defini la variable de classe comme tableau
    this._buttonAction = [];
    const advancedTexture = GUI.AdvancedDynamicTexture.CreateFullscreenUI(
      "UI",
      undefined
    );
    const panel = new GUI.StackPanel();

    //button play creation
    this._buttonAction[0] = GUI.Button.CreateImageButton(
      "playButton",
      "Play",
      "./images/sprites/play.png"
    );
    this._buttonAction[0].width = "200px";
    this._buttonAction[0].height = "39px";
    this._buttonAction[0].background = "white";
    this._buttonAction[0].color = "deepskyblue";

    panel.addControl(this._buttonAction[0]);

    this._buttonAction[1] = GUI.Button.CreateSimpleButton(
      "restartButon",
      "Restart"
    );
    this._buttonAction[1].width = "200px";
    this._buttonAction[1].height = "39px";
    this._buttonAction[1].background = "white";
    this._buttonAction[1].color = "deepskyblue";

    panel.addControl(this._buttonAction[1]);

    panel.isVertical = false;
    panel.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT;
    panel.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_TOP;
    panel.top = 10;
    panel.height = "40px";

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
    clockTime.top = "150px";
    clockTime.width = "220px";
    clockTime.left = "-250px";
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
    clockTime.color = "white";
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
  
  return (this._mString1 < 10 ? "0" + this._mString1 + ":" + this._sString1 + day : "" + this._mString1 + ":" + this._sString1 + day);
}


public updateHud1(): void {
  if(!this._stopTimer1 && this._startTime1 != null ){
      const curTime = Math.floor((new Date().getTime() - this._startTime1) / 10) + this._prevTime1; // divide by 1000 to get seconds

      this.time1 = curTime; //keeps track of the total time elapsed in seconds
      this._clockTime1.text = this._formatTime1(curTime);
  }
      
}



  //---- Game Timer ----
  public startTimer(): void {
    if (!this._stopTimer) {
      this._startTime = new Date().getTime();
      this._stopTimer = false;
    }
  }
  public stopTimer(): void {
    this._stopTimer = true;
  }

  //format the time so that it is relative to 11:00 -- game time
  private _formatTime(time: number): string {
    let minsPassed = Math.floor(time / 60); //seconds in a min 
    let secPassed = time % 100; // goes back to 0 after 4mins/240sec
    //gameclock works like: 4 mins = 1 hr
    // 4sec = 1/15 = 1min game time        
        this._mString = Math.floor(minsPassed / 1) ;
        this._sString = (secPassed / 1 < 10 ? "0" : "") + secPassed / 1;
    
    
    return (this._mString < 10 ? "0" + this._mString + ":" + this._sString : this._mString + ":" + this._sString);
}

  public updateHud(): void {
    if (!this._stopTimer && this._startTime != null) {
      const curTime =
        Math.floor((new Date().getTime() - this._startTime) / 10) +
        this._prevTime; // divide by 1000 to get seconds

      this.time = curTime; //keeps track of the total time elapsed in seconds
      this._clockTime.text = this._formatTime(curTime);
    }
  }

  // creation de la chambre a vide

  chambreVide() {
    this.box = MeshBuilder.CreateBox(
      "box",
      {
        width: 2.8,
        height: 5.9,
        size: 5.5,
      },
      this._scene
    );
    this.box.position.x = 6.5;
    this.box.position.z = -2.5;
    const glass = new PBRMaterial("glass", this._scene);
    glass.alpha = 0.5;
    glass.directIntensity = 0.0;
    glass.environmentIntensity = 0.7;
    glass.cameraExposure = 0.66;
    glass.cameraContrast = 1.66;
    glass.microSurface = 1;
    glass.reflectivityColor = new Color3(0.2, 0.2, 0.2);
    glass.albedoColor = new Color3(0.95, 0.95, 0.95);
    this.box.material = glass;
    this.box.isVisible = false;
  }
  affichageParametre() {
    if (this.selectbox.isVisible == false) {
      this.selectbox.isVisible = true;
    } else {
      this.selectbox.isVisible = false;
    }
  }


  public Formules() {
    const advancedTexture = GUI.AdvancedDynamicTexture.CreateFullscreenUI(
      "UI",
      undefined
    );

    const container = new GUI.Container();

    advancedTexture.addControl(container);


    container.background = "white";
    container.width = "310px";
    container.height = 0.25;

    container.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
    container.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_TOP;
    container.top = "450px";
    container.left = "55px";
    container.shadowColor = "gray";
    container.shadowBlur = 50 ;
    container.shadowOffsetX = 5;
    container.shadowOffsetY = 5;
    
    // Affichage des résultats dans l'interface utilisateur
    const formule = new GUI.TextBlock();
    formule.text = "Formules";
    formule.color = "blue";
    formule.fontSize = 25;
    formule.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_TOP;
    formule.top = "-75px";
    container.addControl(formule);

    // Affichage des résultats dans l'interface utilisateur
    const formule1 = new GUI.TextBlock();
    formule1.text = "h = (1/2) x g x t² \n t = √(2xh/g) \n h : hauteur de chute \n g : accélération de la pesanteur   \n t : temps de chute ";
    formule1.color = "black";
    formule1.fontSize = 20;
    formule1.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_TOP;
    formule1.top = "10px";
    container.addControl(formule1);
    // this._textMasse[0] =  texteEnergiePotentielle1;




}
}
