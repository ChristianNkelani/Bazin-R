import {
    Scene, 
    Engine, 
    Vector3, 
    HemisphericLight, 
    UniversalCamera} from "@babylonjs/core";
import "@babylonjs/loaders";
import { UI } from "./ui";
import { Environement } from "./Environement";

export class  Experience4{

    scene: Scene;
    engine: Engine;

    private _ui: UI;
    private _environement: Environement;

    constructor(
    private canvas:HTMLCanvasElement,
    private setLoaded: () => void,
    private voirCard: () => void
    
){

    this.engine = new Engine(this.canvas);

    //on cree la scene de base
    this.scene = this.CreateScene();

    //on charge l environnement
    this._environement = new Environement(this.scene, this.engine, this.setLoaded, this.voirCard);

    this.engine.runRenderLoop(()=>{
        this.scene.render();
        if (this._environement.ball1.position._y <= 0.90   ) {

            this._environement._ui.stopTimer();
            this._environement._ui._textMasse[1].text = "Ec4 = (1/2) x " + this._environement.masse + " x " + "(" + this._environement.hauteur.toFixed(2) + "/" + this._environement._ui._mString + "." + this._environement._ui._sString + ") ²" + " = ??" ;

        }

        if (this._environement.ball2.position._y <= 0.90   ) {

            this._environement._ui.stopTimer1();
            this._environement._ui._textMasse[3].text = "Ec4 = (1/2) x " + this._environement.masse + " x " + "(" + this._environement.hauteur.toFixed(2) + "/" + this._environement._ui._mString1 + "." + this._environement._ui._sString1 + ") ²" + " = ??" ;

        }

    })
}

CreateScene():Scene {
    const scene = new Scene(this.engine);
    const camera = new UniversalCamera("camera", new Vector3(0,3.5,-2.5), this.scene );
    camera.speed = 0.5;
    camera.rotation._y = Math.PI/2;
    camera.rotation._x= Math.PI/14;
    camera.detachControl();
    const hemiLight = new HemisphericLight("hemiLight", new Vector3(0,1,0), this.scene);
    hemiLight.intensity = 1;
    return scene;
}

}