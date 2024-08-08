<template>
  <Questions
    id="card"
    Presentation="La cinématique est une branche fondamentale de la physique qui étudie le mouvement 
                        des objets sans se préoccuper des causes de ce mouvement. Les concepts de trajectoire, 
                        trajet, vitesse, accélération, et les types de mouvement (rectiligne et circulaire) sont essentiels 
                        pour comprendre et analyser le comportement des objets en mouvement, tant dans le monde réel que dans 
                        des simulations informatiques."
    titre="Elements de base de la cinématique"
    :cacherCard="cacherCard"
    :questions="questions"
    fichier="element_base_question"
  />
  <main :class="{ 'blur-sm': flou == true }">
    <!-- Boutton pour la fin de la simulation -->
    <div
      class="absolute top-2 left-2 bg-white py-3 px-4 bg-white rounded-full flex justify-center items-center cursor-pointer"
      @click="testfinal"
    >
      Fin de la simulation
    </div>
    <LoadingScreen :isLoaded="loaded" />
    <canvas></canvas>
  </main>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import LoadingScreen from "@/components/LoadingScreen.vue";
import { Experience3 } from "@/scenes/Element_base_cinematique/App";
import Questions from "../components/debut_experience/question.vue";
import { Question } from "@/scenes/Experience1/question";
import { QcmStore } from "@/stores/store";

export default defineComponent({
  name: "Inertie",
  data() {
    return {
      loaded: false,
      flou: false,
      questions: [
        new Question("Qu'est-ce qu'une trajectoire ?", [
          "orier",
          "eouer",
          "eowurow",
        ]),
        new Question(
          " Quelle est la différence entre une trajectoire rectiligne et une trajectoire curviligne ?",
          ["orier", "eouer", "eowurow"]
        ),
        new Question(
          "Comment peut-on représenter une trajectoire en physique ?",
          ["orier", "eouer", "eowurow"]
        ),
        new Question("Qu'est-ce qu'une trajectoire parabolique ?", [
          "orier",
          "eouer",
          "eowurow",
        ]),
        new Question("Qu'est-ce qu'un trajet ?", ["orier", "eouer", "eowurow"]),
        new Question(
          "Quelle est la différence entre un trajet et une trajectoire ?",
          ["orier", "eouer", "eowurow"]
        ),
        new Question("Qu'est-ce qu'une trajectoire ?", [
          "orier",
          "eouer",
          "eowurow",
        ]),
      ],
    };
  },
  components: { LoadingScreen, Questions },

  mounted() {
    const canvas = document.querySelector("canvas") as HTMLCanvasElement;
    new Experience3(canvas, this.setLoaded, this.voirCard);
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
