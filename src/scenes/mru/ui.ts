import { Scene } from "@babylonjs/core";
import * as GUI from '@babylonjs/gui/2D';

export class UI {
    private advancedTexture: GUI.AdvancedDynamicTexture;
    private _scene: Scene;
    public _bouttonAction: Array<GUI.Button>;
    public _v1 : GUI.TextBlock;

    constructor(scene: Scene) {
        this._scene = scene;
        this.createElement();
    }

    public createElement(): void {
        this._bouttonAction = [];
        this.advancedTexture = GUI.AdvancedDynamicTexture.CreateFullscreenUI('UI', undefined);
        const panel = new GUI.StackPanel();
        panel.width = "400px";
        panel.height = "40px";
        panel.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_TOP;
        panel .horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT;
        panel.isVertical = false;

        // Création du bouton "play"
        this._bouttonAction[0] = GUI.Button.CreateSimpleButton("playButton", "play");
        this._bouttonAction[0].width = "200px";
        this._bouttonAction[0].height = "39px";
        this._bouttonAction[0].color = "white";
        this._bouttonAction[0].background = "red";

        this._bouttonAction[1] = GUI.Button.CreateSimpleButton("playButton2", "Restore");
        this._bouttonAction[1].width = "200px";
        this._bouttonAction[1].height = "39px";
        this._bouttonAction[1].color = "white";
        this._bouttonAction[1].background = "yellow";

        // ajouter les elemets dans le advenceTexture
        this._bouttonAction.forEach((element)=> panel.addControl(element));


        // Ajout du panneau à la texture avancée
        this.advancedTexture.addControl(panel);


        const container = new GUI.Rectangle();
        container.background = "red";
        container.width = "300px";
        container.height = "100px";
        container.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_TOP;
        container.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;

        const text = new GUI.TextBlock("text", "Vitesse voiture rouge");
        text.height = "20px";
        this._v1 = new GUI.TextBlock("vitesse1", "");

        text.color = "white";
        text.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_TOP
        container.addControl(text);
        container.addControl(this._v1);


        // this.advancedTexture.addControl(container);
    }

}
