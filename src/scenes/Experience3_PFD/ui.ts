import { Scene } from "@babylonjs/core";
import * as GUI from "@babylonjs/gui/2D";
import { Environement } from "./Environement";
import { int } from "babylonjs";
// import { PlanePanel } from "babylonjs-gui";

export class UI {
  public _scene: Scene;
  public _environement: Environement;
  public _images: GUI.Image[];
  public advencedTexture: any;
  public startButton: any;
  public restartButton: any;
  public slider1 : any;
  public slider2 : any;

  // gestion des chrono
  public _sec: int;
  public _milsec: int;

  constructor(scene: Scene) {
    this._scene = scene;
    this.advencedTexture = GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI");
    this.btn();
    this.menu();
  }

  

  public btn(){
    const panel = new GUI.StackPanel();
    panel.width = "400px";
    panel.height = "50px"
    panel.top = "-50px";
    panel.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_CENTER;
    panel.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_BOTTOM;
    panel.isVertical = false;
    this.advencedTexture.addControl(panel);

    // Ajouter le bouton Start
    this.startButton = GUI.Button.CreateSimpleButton("startButton", "Poussez");
    this.startButton.width = "200px";
    this.startButton.height = "40px";
    this.startButton.color = "white";
    this.startButton.background = "green";
    panel.addControl(this.startButton);

    // restart bouton
    this.restartButton = GUI.Button.CreateSimpleButton("restartButton", "Restart");
    this.restartButton.width = "200px";
    this.restartButton.height = "40px";
    this.restartButton.color = "white";
    this.restartButton.background = "blue";
    panel.addControl(this.restartButton);
  }

  public menu(){
    const panel = new GUI.StackPanel();
    panel.width = "300px";
    panel.top = "-20px";
    panel.left = "-60px"
    panel.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT;
    panel.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_BOTTOM;
    this.advencedTexture.addControl(panel);

    const panel1 = new GUI.StackPanel();
    panel1.width = "300px";
    panel1.top = "-20px";
    panel1.left = "60px"
    panel1.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
    panel1.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_BOTTOM;
    this.advencedTexture.addControl(panel1);

    
    this.slider1 = new GUI.Slider();
    this.slider1.minimum = 0.5;
    this.slider1.maximum = 2;
    this.slider1.value = 0.5;
    this.slider1.height = "20px";
    this.slider1.width = "200px";

    const header1 = new GUI.TextBlock();
    header1.text = `Masse de la bille Rouge ${this.slider1.value.toFixed(1)*100} g`;
    header1.height = "40px";
    header1.color = "white";
    panel.addControl(header1);
    
    // Mettre à jour l'étiquette lorsque la valeur change
    this.slider1.onValueChangedObservable.add((value) => {
      header1.text = `Masse de la bille Rouge : ${value.toFixed(1)*100} g`; // Affiche un entier
    });
    panel.addControl(this.slider1);
    
    this.slider2 = new GUI.Slider();
    this.slider2.minimum = 0.5;
    this.slider2.maximum = 2;
    this.slider2.value = 0.5;
    this.slider2.height = "20px";
    this.slider2.width = "200px";
    panel1.addControl(this.slider2);

    this.slider2.onValueChangedObservable.add((value) => {
      header2.text = `Masse de la bille Blue : ${value.toFixed(1)} g`; // Affiche un entier
    });
    
    const header2 = new GUI.TextBlock();
    header2.text = `Masse de la bille Blue : ${this.slider2.value.toFixed(1)} g`;
    header2.height = "40px";
    header2.color = "white";
    panel1.addControl(header2);

  }
}
