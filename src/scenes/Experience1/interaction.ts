import { Sound } from "@babylonjs/core";
import * as GUI from '@babylonjs/gui/2D';


export class Interaction{
    suivant:any;
    groupCheck:any;
    
    Accueil(scene){
        //--SOUNDS--
        const start = new Sound("startSong", "./sounds/experience1/start.mp3", scene, function () {
        }, {
            volume: 1,
            loop: false,
            autoplay: true
        });

        const presentation = new Sound("presentation", "./sounds/experience1/presentation.mp3", scene, function () {
        }, {
            volume: 1,
            loop: false,
            autoplay: false
        });

        const advancedTexture = GUI.AdvancedDynamicTexture.CreateFullscreenUI('UI', undefined);
        const container = new GUI.Container();

    
        container.background = "gray"
        container.width = "33%"
        container.height="33%";
        container.shadowColor = "black";
        container.shadowBlur = 5        
        container.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_CENTER
        container.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_CENTER
        container.top = "20px"
        container.left = "10px"

        //image personnage
        const image = new GUI.Image("personnage","./images/personnage/personnage.png");
        image.width = "210px";
        image.height = "210px";

        container.addControl(image);
    
        // creation du texte
        const text = new GUI.TextBlock();
        text.text = "Assistant bazin-R"
        text.fontSize=25
        text.fontFamily="Montserrat Black"
        text.color ="white"
        text.height="25px"
        text.top = "5px"
        text.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_TOP
        container.addControl(text);
        advancedTexture.addControl(container)

        //creation button suivant
        this.suivant = [];

        this.suivant[0] = GUI.Button.CreateSimpleButton("suivant","suivant");
        this.suivant[0].width = "60px";
        this.suivant[0].top = "-10px";
        this.suivant[0].left = "-10px";
        this.suivant[0].height = "30px";
        this.suivant[0].background = "white";
        this.suivant[0].verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_BOTTOM;
        this.suivant[0].horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT;
        container.addControl(this.suivant[0]);

        //texte de bienvenue
        const texte = new GUI.TextBlock("text");
        texte.height=1;
        texte.color="white";
        texte.outlineColor = "white";
        text.outlineWidth = 2;
        texte.fontSize = 30

        texte.textWrapping = GUI.TextWrapping.WordWrap;
        texte.setPadding("5%","5%","10%","5%");
        texte.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_CENTER;
        texte.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_CENTER;
        texte.text = "";
        container.addControl(texte);


        //action button
        this.suivant[0].onPointerUpObservable.add(() => {
            container.isVisible = false;
            start.pause();
            this.presentationAudio(scene)
        })

    }

    presentationAudio(scene){
        const start = new Sound("startSong", "./sounds/experience1/presentation.mp3", scene, function () {
        }, {
            volume: 1,
            loop: false,
            autoplay: true
        });

        const advancedTexture = GUI.AdvancedDynamicTexture.CreateFullscreenUI('UI', undefined);

        const container = new GUI.Container("container");
        container.width = "250px"
        container.height=0.4
        container.top = "-50px";
        container.background = "white";
        container.left = "25px";
        container.background = "gray";
    
        container.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_LEFT
        container.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_BOTTOM;
        advancedTexture.addControl(container);

        //image personnage
        const image = new GUI.Image("personnage","./images/personnage/personnage.png");
        image.width = "80px";
        image.height = "80px";
        image.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
        image.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_TOP;
        image.top = "5px";
        image.left = "5px";
        container.addControl(image);

        //creation button suivant

        this.suivant[1] = GUI.Button.CreateSimpleButton("suivant","suivant");
        this.suivant[1].width = "60px";
        this.suivant[1].top = "-10px";
        this.suivant[1].left = "-10px";
        this.suivant[1].height = "30px";
        this.suivant[1].background = "white";
        this.suivant[1].verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_BOTTOM;
        this.suivant[1].horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT;
        container.addControl(this.suivant[1]);

        //text presentation environnement
        const textenv = new GUI.TextBlock("textenv", "L'ENVIRONNEMENT DE bazinR")
        textenv.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_CENTER;
        textenv.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_TOP;
        textenv.top = "-85                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              px";
        textenv.color = "white";
        textenv.textWrapping = GUI.TextWrapping.WordWrap;
        textenv.setPadding("10%","10%","10%","10%");
        textenv.left = "23px";
        container.addControl(textenv);

        //action suivant 
        this.suivant[1].onPointerUpObservable.add(() => {
            container.isVisible = false;
            start.pause();
            this.etapesFunction("./sounds/experience1/etape1.mp3","du texte", scene,advancedTexture);
            // this.questionForm("./sounds/experience1/etape1.mp3", "du texte",scene,container)
        })
        

    }

    etapesFunction(audio,message,scene,advancedTexture){

        const container = new GUI.Container("container");
        container.width = "250px"
        container.height=0.4
        container.top = "-50px";
        container.background = "white";
        container.left = "25px";
        container.background = "gray";
    
        container.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_LEFT
        container.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_BOTTOM;
        advancedTexture.addControl(container);

        //image personnage
        // const image = new GUI.Image("personnage","./images/personnage/personnage.png");
        // image.width = "80px";
        // image.height = "80px";
        // image.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
        // image.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_TOP;
        // image.top = "5px";
        // image.left = "5px";
        // container.addControl(image);

        const start = new Sound("startSong", audio, scene, function () {
        }, {
            volume: 1,
            loop: false,
            autoplay: true
        });

        //text presentation environnement
        const textenv = new GUI.TextBlock("textenv", "ETAPES A SUIVRE        1. Au menu paramètres, ajustez la taille et la masse des deux balles, de sorte que l'une d'entre elles soit plus grande que l'autre.")
        textenv.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_CENTER;
        textenv.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_CENTER;
        textenv.top = "-30px";
        textenv.color = "white";
        textenv.fontSize = "20px";
        textenv.textWrapping = GUI.TextWrapping.WordWrap;
        textenv.setPadding("10%","10%","10%","10%");
        // textenv.left = "23px";
        container.addControl(textenv);

        //creation button suivant

        this.suivant[2] = GUI.Button.CreateSimpleButton("suivant","suivant");
        this.suivant[2].width = "60px";
        this.suivant[2].top = "-10px";
        this.suivant[2].left = "-10px";
        this.suivant[2].height = "30px";
        this.suivant[2].background = "white";
        this.suivant[2].verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_BOTTOM;
        this.suivant[2].horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT;
        container.addControl(this.suivant[2]);

        this.suivant[2].onPointerUpObservable.add(()=>{
            container.isVisible = false;
            this.questionForm("./sounds/experience1/question1.mp3", "du texte",scene,advancedTexture)
        })

    }

    questionForm(audio,message,scene,advancedTexture){
        
        const container = new GUI.Container("container");
        container.width = "250px"
        container.height=0.4
        container.top = "-50px";
        container.background = "white";
        container.left = "25px";
        container.background = "gray";
    
        container.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_LEFT
        container.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_BOTTOM;
        advancedTexture.addControl(container);

        //image personnage
        // const image = new GUI.Image("personnage","./images/personnage/personnage.png");
        // image.width = "80px";
        // image.height = "80px";
        // image.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
        // image.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_TOP;
        // image.top = "5px";
        // image.left = "5px";
        // container.addControl(image);

        const start = new Sound("startSong", audio, scene, function () {
        }, {
            volume: 1,
            loop: false,
            autoplay: true
        });

        //text presentation environnement
        const textenv = new GUI.TextBlock("textenv", "Question: Si on laisse tomber les deux balles simultannement, selon vous laquelle atteindra la table en première position?")
        textenv.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_CENTER;
        textenv.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_TOP;
        textenv.top = "-50px";
        textenv.color = "white";
        textenv.fontSize = "20px";
        textenv.textWrapping = GUI.TextWrapping.WordWrap;
        textenv.setPadding("5%","5%","10%","5%");
        // textenv.left = "23px";
        container.addControl(textenv);

        //creation button suivant

        this.suivant[2] = GUI.Button.CreateSimpleButton("suivant","suivant");
        this.suivant[2].width = "60px";
        this.suivant[2].top = "-10px";
        this.suivant[2].left = "-10px";
        this.suivant[2].height = "30px";
        this.suivant[2].background = "white";
        this.suivant[2].verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_BOTTOM;
        this.suivant[2].horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT;
        container.addControl(this.suivant[2]);


        const selectbox= new GUI.SelectionPanel("sp");
        selectbox.width=1;
        selectbox.height = 0.45;
        selectbox.left = "0px";
        selectbox.paddingLeft = "15px"
        selectbox.background = "white";
        selectbox.top = "0px";
        selectbox.setPadding("5px","5px","10px","5px");

        selectbox.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
        selectbox.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_BOTTOM;
        container.addControl(selectbox);

        this.groupCheck = [];
    
        this.groupCheck[0] = new GUI.CheckboxGroup("Choix:");
        this.groupCheck[0].top = "10px";
        this.groupCheck[0].addCheckbox("Balle rouge", (value) => {
            const simuler = new Sound("startSong", "./sounds/experience1/simulerq1.mp3", scene, function () {
            }, {
                volume: 1,
                loop: false,
                autoplay: true
            });
        },null )
        this.groupCheck[0].addCheckbox("Balle jaune",(value) => {
            const simuler = new Sound("startSong", "./sounds/experience1/simulerq1.mp3", scene, function () {
            }, {
                volume: 1,
                loop: false,
                autoplay: true
            });
        }, null)

        this.groupCheck[0].addCheckbox("Les deux",(value) => {
            const simuler = new Sound("startSong", "./sounds/experience1/simulerq1.mp3", scene, function () {
            }, {
                volume: 1,
                loop: false,
                autoplay: true
            });
        }, null)


        selectbox.addGroup(this.groupCheck[0])
    
    }
}