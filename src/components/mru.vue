<template>
  <div>
    <Questions
      id="card"
      Presentation="Découvrez le mouvement rectiligne uniforme à travers nos expériences interactives ! Ce type de mouvement, où un objet se déplace en ligne droite à une vitesse constante, fait partie des bases de la dynamique. Explorez comment les objets parcourent des distances égales en des temps égaux."
      titre="Le Mouvement rectiligne"
      :cacherCard="cacherCard"
      :questions="questions"
    />

    <main :class="{ 'blur-sm': flou == true }">
      <!-- Boutton pour la fin de la simulation -->
      <div
        class="absolute top-2 left-2 bg-white py-3 px-4 bg-white rounded-full flex justify-center items-center cursor-pointer"
        @click="testfinal"
      >
        Fin de la simulation
      </div>

      <!-- Le bouton des parametres -->
      <div
        class="absolute bottom-2 left-2 bg-white w-16 h-16 rounded-full flex justify-center items-center"
        @click="gererVisibilite('options')"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="size-9"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M10.343 3.94c.09-.542.56-.94 1.11-.94h1.093c.55 0 1.02.398 1.11.94l.149.894c.07.424.384.764.78.93.398.164.855.142 1.205-.108l.737-.527a1.125 1.125 0 0 1 1.45.12l.773.774c.39.389.44 1.002.12 1.45l-.527.737c-.25.35-.272.806-.107 1.204.165.397.505.71.93.78l.893.15c.543.09.94.559.94 1.109v1.094c0 .55-.397 1.02-.94 1.11l-.894.149c-.424.07-.764.383-.929.78-.165.398-.143.854.107 1.204l.527.738c.32.447.269 1.06-.12 1.45l-.774.773a1.125 1.125 0 0 1-1.449.12l-.738-.527c-.35-.25-.806-.272-1.203-.107-.398.165-.71.505-.781.929l-.149.894c-.09.542-.56.94-1.11.94h-1.094c-.55 0-1.019-.398-1.11-.94l-.148-.894c-.071-.424-.384-.764-.781-.93-.398-.164-.854-.142-1.204.108l-.738.527c-.447.32-1.06.269-1.45-.12l-.773-.774a1.125 1.125 0 0 1-.12-1.45l.527-.737c.25-.35.272-.806.108-1.204-.165-.397-.506-.71-.93-.78l-.894-.15c-.542-.09-.94-.56-.94-1.109v-1.094c0-.55.398-1.02.94-1.11l.894-.149c.424-.07.765-.383.93-.78.165-.398.143-.854-.108-1.204l-.526-.738a1.125 1.125 0 0 1 .12-1.45l.773-.773a1.125 1.125 0 0 1 1.45-.12l.737.527c.35.25.807.272 1.204.107.397-.165.71-.505.78-.929l.15-.894Z"
          />
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
          />
        </svg>
      </div>
      <div id="options" class="hidden">
        <div class="bg-white w-96 h-80 absolute bottom-5 left-16 rounded-md">
          <h2 class="text-xl text-blue-600 font-bold">Parametres</h2>
          <div class="grid grid-cols-2">
            <div>
              <p>vitesse de la voiture jaune</p>
            </div>
            <div>
              <p>vitesse de la voiture rouge</p>
            </div>
          </div>
        </div>
      </div>

      <LoadingScreen :isLoaded="loaded" />
      <canvas></canvas>
      <!-- retour bouton -->
      <RouterLink to="/categorie" class="fixed z-40 right-2 bottom-5 w-16 h-16">
        <img
          class="w-16 h-16 bg-blue-500 rounded-full"
          src="../assets/retour.png"
          alt=""
        />
      </RouterLink>
    </main>
  </div>
</template>
<script lang="ts">
import { Mru } from "@/scenes/mru/App";
import { defineComponent } from "vue";
import LoadingScreen from "@/components/LoadingScreen.vue";
import Questions from "../components/debut_experience/question.vue";
import { Question } from "@/scenes/Experience1/question";
import Qcm from "./Qcm.vue";
import { QcmStore } from "@/stores/store";

export default defineComponent({
  name: "mru",
  data() {
    return {
      mru: null,
      loaded: false,
      flou: false,
      questions: [new Question("dsdssdsadsad", ["sasasasa", "assasaassa"])],
    };
  },
  components: { LoadingScreen, Questions, Qcm },
  mounted() {
    const canvas = document.querySelector("canvas") as HTMLCanvasElement;
    this.mru = new Mru(canvas, this.setLoaded, this.voirCard);
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
    gererVisibilite(id: string): void {
      const element = document.querySelector(`#${id}`);
      if (element?.classList.contains("hidden")) {
        element.classList.remove("hidden");
      } else {
        element?.classList.add("hidden");
        this.flou = false;
      }
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
