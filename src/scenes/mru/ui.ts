import { Scene } from "@babylonjs/core";
import * as GUI from '@babylonjs/gui/2D';

export class UI {
    private advancedTexture: GUI.AdvancedDynamicTexture;
    private _scene: Scene;
    public _bouttonAction: Array<GUI.Button>;
    public restore : GUI.Button;
    public _v1: GUI.TextBlock;
    private speedTextVoiture1: GUI.TextBlock;
    private speedTextVoiture2: GUI.TextBlock;

    constructor(scene: Scene) {
        this._scene = scene;
        this.createElement();
    }

    public createElement(): void {
        this._bouttonAction = [];
        this.advancedTexture = GUI.AdvancedDynamicTexture.CreateFullscreenUI('UI', undefined);

        const panel = new GUI.StackPanel();
        panel.width = "800px";
        panel.height = "40px";
        panel.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_TOP;
        panel.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT;
        panel.isVertical = false;

        // Bouton pour lancer la voiture 1
        this._bouttonAction[0] = GUI.Button.CreateSimpleButton("playButton", "Voiture 1");
        this._bouttonAction[0].width = "200px";
        this._bouttonAction[0].height = "39px";
        this._bouttonAction[0].color = "white";
        this._bouttonAction[0].background = "blue";

        // Bouton pour lancer la voiture 2
        this._bouttonAction[1] = GUI.Button.CreateSimpleButton("playButton2", "Voiture 2");
        this._bouttonAction[1].width = "200px";
        this._bouttonAction[1].height = "39px";
        this._bouttonAction[1].color = "white";
        this._bouttonAction[1].background = "red";

        // Bouton pour restaurer les positions
        this.restore = GUI.Button.CreateSimpleButton("restore", "Restore");
        this.restore.width = "200px";
        this.restore.height = "39px";
        this.restore.color = "white";
        this.restore.background = "green";
        this.advancedTexture.addControl(this.restore)

        // Ajouter les boutons au panneau
        this._bouttonAction.forEach((element) => panel.addControl(element));

        // Ajouter le panneau à la texture avancée
        this.advancedTexture.addControl(panel);

        // Conteneur pour afficher les vitesses
        const container = new GUI.Rectangle();
        container.background = "red";
        container.width = "300px";
        container.height = "100px";
        container.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_TOP;
        container.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;

        const text = new GUI.TextBlock("text", "Vitesse voiture rouge");
        text.height = "20px";
        text.color = "white";
        text.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_TOP;
        container.addControl(text);

        this._v1 = new GUI.TextBlock("vitesse1", "");
        container.addControl(this._v1);

        // TextBlock pour afficher la vitesse de la voiture 1
        this.speedTextVoiture1 = new GUI.TextBlock();
        this.speedTextVoiture1.text = "Vitesse Voiture 1: 0 m/s";
        this.speedTextVoiture1.color = "white";
        this.speedTextVoiture1.fontSize = 24;
        this.speedTextVoiture1.width = "300px";
        this.speedTextVoiture1.top = "50px";
        this.speedTextVoiture1.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT;
        this.speedTextVoiture1.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_CENTER;
        this.advancedTexture.addControl(this.speedTextVoiture1);

        // TextBlock pour afficher la vitesse de la voiture 2
        this.speedTextVoiture2 = new GUI.TextBlock();
        this.speedTextVoiture2.text = "Vitesse Voiture 2: 0 m/s";
        this.speedTextVoiture2.color = "white";
        this.speedTextVoiture2.fontSize = 24;
        this.speedTextVoiture2.width = "300px";
        this.speedTextVoiture2.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT;
        this.speedTextVoiture2.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_CENTER;
        this.advancedTexture.addControl(this.speedTextVoiture2);
    }

    // Mise à jour de l'interface avec les vitesses des voitures
    public updateSpeedUI(vitesseVoiture1: number, vitesseVoiture2: number): void {
        // Afficher la vitesse réelle des voitures
        this.speedTextVoiture1.text = `Vitesse Voiture 1: 5 m/s`;
        this.speedTextVoiture2.text = `Vitesse Voiture 2: ${vitesseVoiture2.toFixed(2)} m/s`;
    }
}
