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

        <!-- Boutton pour paramètres -->

    <div
        class="absolute bottom-2 left-2 bg-white w-16 h-16 rounded-full flex justify-center items-center cursor-pointer"
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

      <div id="options" class="hidden w-96 absolute top-16 left-2 rounded-md">
        <table class="w-full text-sm text-center border border-gray-300 mt-4">
  <thead class="bg-gray-100 text-gray-700">
    <tr>
      <th class="border border-gray-300 px-2 py-2">Balle</th>
      <th class="border border-gray-300 px-2 py-2">Couleur</th>
      <th class="border border-gray-300 px-2 py-2">Type de mouvement</th>
      <th class="border border-gray-300 px-2 py-2">Description</th>
    </tr>
  </thead>
  <tbody class="bg-gray-100 text-gray-700">
    <tr>
      <td class="border border-gray-300 px-2 py-2 font-semibold">Balle 1</td>
      <td class="border border-gray-300 px-2 py-2">
        <div class="w-4 h-4 rounded-full bg-red-600 mx-auto"></div>
      </td>
      <td class="border border-gray-300 px-2 py-2">Mouvement rectiligne uniforme (MRU)</td>
      <td class="border border-gray-300 px-2 py-2">Ligne droite à vitesse constante.</td>
    </tr>
    <tr>
      <td class="border border-gray-300 px-2 py-2 font-semibold">Balle 2</td>
      <td class="border border-gray-300 px-2 py-2">
        <div class="w-4 h-4 rounded-full bg-green-600 mx-auto"></div>
      </td>
      <td class="border border-gray-300 px-2 py-2">Mouvement parabolique</td>
      <td class="border border-gray-300 px-2 py-2">Trajectoire en arc (projectile).</td>
    </tr>
    <tr>
      <td class="border border-gray-300 px-2 py-2 font-semibold">Balle 3</td>
      <td class="border border-gray-300 px-2 py-2">
        <div class="w-4 h-4 rounded-full bg-blue-600 mx-auto"></div>
      </td>
      <td class="border border-gray-300 px-2 py-2">Mouvement aléatoire</td>
      <td class="border border-gray-300 px-2 py-2">angement de direction est irrégulier.</td>
    </tr>
  </tbody>
</table>

</div>


    <!-- retour bouton -->
    <RouterLink to="/categorie" class="fixed z-40 right-2 bottom-5 w-16 h-16">
      <img
        class="w-16 h-16 bg-blue-500 rounded-full"
        src="../assets/retour.png"
        alt=""
      />
    </RouterLink>
    
    <LoadingScreen :isLoaded="loaded" />
    <canvas></canvas>
    <div class="fixed z-40 right-2 bottom-5 w-16 h-16" @click="actualiser">
      <img
        class="w-16 h-16 bg-blue-500 rounded-full"
        src="../assets/retour.png"
        alt=""
      />
    </div>

    
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
