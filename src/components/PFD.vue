<template>
  <!-- ! Les options lie a la taille -->
  <div
    id="opt"
    class="w-1/3 h-96 bg-white absolute z-40 top-1/3 left-1/3 hidden"
  >
    <div class="flex flex-col">
      <div class="grid grid-cols-2 pt-16">
        <div class="flex flex-col items-center h-64">
          <div class="h-16">
            <div
              class="bg-blue-800 rounded-full"
              :class="{
                'w-5 h-5': tailleB == 'petite',
                'w-10 h-10': tailleB == 'moyenne',
                'w-16 h-16': tailleB == 'grosse',
              }"
            ></div>
          </div>
          <span>Taille de la bille</span>
          <select
            name=""
            id=""
            v-model="tailleB"
            class="w-32 p-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-800 focus:border-blue-800"
          >
            <option value="petite">Petite</option>
            <option value="moyenne">Moyenne</option>
            <option value="grosse">Grosse</option>
          </select>
        </div>
        <div>
          <div class="flex flex-col items-center">
            <div class="h-16">
              <div
                class="bg-red-800 rounded-full"
                :class="{
                  'w-5 h-5': tailleR == 'petite',
                  'w-10 h-10': tailleR == 'moyenne',
                  'w-16 h-16': tailleR == 'grosse',
                }"
              ></div>
            </div>
            <span>Taille de la bille</span>
            <select
              name=""
              id=""
              v-model="tailleR"
              class="w-32 p-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-red-800 focus:border-red-800"
            >
              <option value="petite">Petite</option>
              <option value="moyenne">Moyenne</option>
              <option value="grosse">Grosse</option>
            </select>
          </div>
        </div>
      </div>
      <div class="flex gap-3 justify-center">
        <button
          @click="
            changerTaille(tailleB, tailleR);
            cacherCard('opt');
            flou = false;
          "
          class="bg-blue-500 w-64 text-md py-2 px-3 text-white"
        >
          Changer Taille
        </button>
        <button
          @click="
            cacherCard('opt');
            flou = false;
          "
          class="bg-red-500 w-64 text-md py-2 px-3 text-white"
        >
          Annuler
        </button>
      </div>
    </div>
  </div>
  <!-- <Questions
    id="card"
    Presentation=" Cette experience est une exploration captivante des lois fondamentales
        qui gouvernent le mouvement des objets dans notre univers."
    titre="PRINCIPE FONDAMENTALE DE LA DYNAMIQUE"
    :cacherCard="cacherCard"
    :questions="questions"
    fichier="principe_dynamique_pfd"
  /> -->
  <RouterLink to="/categorie" class="absolute z-40 right-0 bottom-5 w-16 h-16">
    <img
      class="w-16 h-16 bg-blue-500 rounded-full"
      src="../assets/retour.png"
      alt=""
    />
  </RouterLink>
  <!-- <main :class="{ 'blur-sm': flou == true }"> -->
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
      @click="
        voirCard('opt');
        flou = true;
      "
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
    <LoadingScreen :isLoaded="loaded" />
    <canvas></canvas>
  <!-- </main> -->
</template>

<script lang="ts">
import { defineComponent } from "vue";
import LoadingScreen from "@/components/LoadingScreen.vue";
import { Experience3 } from "@/scenes/Experience3_PFD/App";
import Questions from "../components/debut_experience/question.vue";
import { QcmStore } from "@/stores/store";

export default defineComponent({
  name: "Inertie",
  data() {
    return {
      loaded: false,
      flou: false,
      card: 1,
      tailleR: "moyenne",
      tailleB: "moyenne",
      experience3: null,
      questions: [],
    };
  },
  components: { LoadingScreen, Questions },
  mounted() {
    const canvas = document.querySelector("canvas") as HTMLCanvasElement;
    this.experience3 = new Experience3(
      canvas,
      this.setLoaded,
      this.voirCard,
      this.tailleR,
      this.tailleB
    );
  },
  methods: {
    setLoaded() {
      this.loaded = true;
      // gestion des foues
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
    changerTaille(a: string, b: string) {
      this.experience3._environement.changerTaille(a, b);
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
