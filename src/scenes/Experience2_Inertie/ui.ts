import { Scene } from "@babylonjs/core";
import * as GUI from "@babylonjs/gui/2D";
import { Environement } from "./Environement";

export class UI {
  public _scene: Scene;
  public _environement: Environement;
  public _images: GUI.Image[];
  public _buttonAction: any;

  constructor(scene: Scene) {
    this._scene = scene;
  }
 
}
