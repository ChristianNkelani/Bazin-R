<template>
  <Questions
    id="card"
    Presentation="Action et Réaction : Lorsque deux objets interagissent, ils exercent des forces 
    l'un sur l'autre. Ces forces sont toujours égales en magnitude mais opposées en direction. Si un objet A exerce une force sur un objet B, alors B exerce une force de même magnitude sur A, mais dans la direction opposée.
    Importance de la Loi : Ce principe est crucial pour comprendre le comportement des objets en interaction. Il est à la base de nombreuses technologies, comme le fonctionnement des fusées. Lorsqu'une fusée expulse des gaz 
    vers l'arrière (action), les gaz exercent une force opposée qui propulse la fusée vers l'avant (réaction)"
    titre="Troisième principe de la dynamique : Action et réaction"
    :cacherCard="cacherCard"
    :questions="questions"
    fichier="action_reaction"
  />
  <main :class="{ 'blur-sm': flou == true }">
    <!-- Boutton pour la fin de la simulation -->
    <div
      class="absolute top-2 left-2 bg-white py-3 px-4 bg-white rounded-full flex justify-center items-center cursor-pointer"
      @click="testfinal"
    >
      Fin de la simulation
    </div>

    <!-- Les boutons du bas -->

    <LoadingScreen :isLoaded="loaded" />
    <canvas></canvas>
    <!-- retour bouton -->
    <RouterLink to="/categorie" class="fixed z-40 right-2 bottom-5 w-16 h-16" @click="actualiser">
      <img
        class="w-16 h-16 bg-blue-500 rounded-full"
        src="../assets/retour.png"
        alt=""
      />
    </RouterLink>
  </main>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { Experience1 } from '../scenes/Experience_action_reaction/App';
import LoadingScreen from "@/components/LoadingScreen.vue";
// import { Experience3 } from "@/scenes/Experience_poids_corps/App";
import Questions from "../components/debut_experience/question.vue";
import { Question } from "@/scenes/Experience1/question";
import { QcmStore } from "@/stores/store";

export default defineComponent({
  name: "Inertie",
  components: { LoadingScreen, Questions },
  data() {
    return {
      experience3: null,
      loaded: false,
      flou: false,
      presentation: "Japhet BAZ le leader",
      titre: "Détermination du poids d'un corps",
      questions: [
        new Question(
          "<<Loi>> de Newton et <<Principe>> de Newton signifien la même chose",
          ["Vrai", "Faux"]
        ),
        new Question(
          "La dynamique est l'étude de la persévérance d'un corpso",
          ["Vrai", "Faux"]
        ),
        new Question(
          "La masse seule d'un corps peut déterminer la force à exercer par un objet.",
          ["Vrai", "Faux"]
        ),
        new Question("Lors d'un mouvement, la masse s'oppose au mouvement", [
          "Vrai",
          "Faux",
        ]),
        new Question(
          "Le poids et la masse sont deux grandeurs physiquement identiques.",
          ["Vrai", "Faux"]
        ),
        new Question(
          "La dynamique est l'étude de la persévérance d'un corpso",
          ["Vrai", "Faux"]
        ),
        new Question("Comment se calcul le poid d'un corps?", [
          "Poids = (masse pesée sur la balance) x (accélération de la pesanteur)",
          "Poids = masse pesée sur la balance",
        ]),
      ],
    };
  },
  mounted() {
    const canvas = document.querySelector("canvas") as HTMLCanvasElement;
    this.experience3 = new Experience1(canvas, this.setLoaded, this.voirCard);
  },
  methods: {
    setLoaded() {
      this.loaded = true;
      this.flou = true;
    },
    voirCard(id: string): void {
      console.log(id);
      document.querySelector(`#${id}`)?.classList.remove("hidden");
    },
    cacherCard(id: string): void {
      document.querySelector(`#${id}`).classList.add("hidden");
      this.flou = false;
    },
    testfinal() {
      const store = QcmStore();
      this.voirCard("card");
      this.flou = true;
      store.card = 3;
      store.currentPage = 0;
      store.etat = "deux";
    },
    voirParam() {
      this.experience3._environement.voirParam();
    },
    voirCalcul() {
      this.experience3._environement.voirCalcul();
    },

    actualiser(){
      location.reload();
    }
  },
});
</script>

<style scoped>
html,
body {
  margin: 0;
  padding: 0;
  height: 100%;
  overflow: hidden;
}
canvas {
  display: block;
  width: 100vw;
  height: 100vh;
}
main {
  width: 100%;
  height: 100%;
}
</style>











