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
    var panel = new GUI.StackPanel();
    panel.width = "400px";
    panel.height = "50px"
    panel.top = "-50px";
    panel.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_CENTER;
    panel.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_BOTTOM;
    panel.isVertical = false;
    this.advencedTexture.addControl(panel);

    // Ajouter le bouton Start
    this.startButton = GUI.Button.CreateSimpleButton("startButton", "Start");
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
    var panel = new GUI.StackPanel();
    panel.width = "220px";
    panel.top = "-50px";
    panel.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT;
    panel.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_CENTER;
    this.advencedTexture.addControl(panel);

    var header1 = new GUI.TextBlock();
    header1.text = "Taille de la bille 1";
    header1.height = "40px";
    header1.color = "white";
    panel.addControl(header1);

    this.slider1 = new GUI.Slider();
    this.slider1.minimum = 0.5;
    this.slider1.maximum = 2;
    this.slider1.value = 0.5;
    this.slider1.height = "20px";
    this.slider1.width = "200px";
    panel.addControl(this.slider1);

    var header2 = new GUI.TextBlock();
    header2.text = "Taille de la bille 2";
    header2.height = "40px";
    header2.color = "white";
    panel.addControl(header2);

    this.slider2 = new GUI.Slider();
    this.slider2.minimum = 0.5;
    this.slider2.maximum = 2;
    this.slider2.value = 0.5;
    this.slider2.height = "20px";
    this.slider2.width = "200px";
    panel.addControl(this.slider2);
  }
}
