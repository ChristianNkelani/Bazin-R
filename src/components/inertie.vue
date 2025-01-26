<template>
  <Questions
    id="card"
    Presentation=""
    titre="Premiere loi de Newton, l'inertie"
    :cacherCard="cacherCard"
    :questions="questions"
    fichier="principe_dynamique_inertie"
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
    <RouterLink to="/categorie" class="fixed z-40 right-2 bottom-5 w-16 h-16">
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
import LoadingScreen from "@/components/LoadingScreen.vue";
import { Experience2 } from "@/scenes/Experience2_Inertie/App";
import Questions from "@/components/debut_experience/question.vue";
import { Question } from "@/scenes/Experience1/question";
import { QcmStore } from "@/stores/store";

export default defineComponent({
  name: "Inertie",
  data() {
    return {
      loaded: false,
      card: 1,
      tailleM: "petite",
      flou: false,
      experience2: null,
      questions: [],
    };
  },
  components: { LoadingScreen, Questions },
  mounted() {
    const canvas = document.querySelector("canvas") as HTMLCanvasElement;
    this.experience2 = new Experience2(canvas, this.setLoaded, this.voirCard);
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
