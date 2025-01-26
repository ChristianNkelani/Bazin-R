<template>
  <Questions
    id="card"
<<<<<<< HEAD
    Presentation=""
=======
    Presentation="L'inertie, c’est la tendance d’un objet à rester immobile ou à continuer son mouvement si aucune force ne le dérange. C'est un principe fondamental qui explique le comportement des objets dans leur état de repos ou de mouvement."
>>>>>>> 44ec51de983061929676ea984dad3c698318391b
    titre="Premiere loi de Newton, l'inertie"
    :cacherCard="cacherCard"
    :questions="questions"
    fichier="principe_dynamique_inertie"
  />

  <main :class="{ 'blur-sm': flou == true }">
    <!-- Boutton pour la fin de la simulation -->
    <div
      class="absolute top-2 left-2 bg-white py-3 px-4 bg-white rounded-full flex justify-center items-center cursor-pointer"
      @click="testfinal">
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
      <!-- Les parametres  -->
      <div id="options" class="hidden">
        <div class="bg-white w-96 absolute bottom-5 left-16 rounded-md p-4">
          <div class="flex justify-between items-center mb-3">
            <h2 class="text-xl text-blue-600 font-bold">Parametres</h2>
            <div class="bg-red-400 text-white px-3 py-2 w-10 h-10 text-center cursor-pointer rounded-full flex items-center justify-center" @click="gererVisibilite('options')">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>

            </div>
          </div>

          <div class="flex justify-between items-center mb-3">
            <div class="bg-yellow-400 text-white px-3 py-2 rounded-md w-32 text-center cursor-pointer">Pause</div>
            <div class="bg-blue-400 text-white px-3 py-2 rounded-md w-32 text-center cursor-pointer">Pause</div>

          </div>
          

          <div class="flex flex-col items-center space-y-2">
            <!-- Label -->
            <label for="range" class="text-sm font-medium text-gray-700">
              Ajustez la force de lancement initial
            </label>
            <!-- Range Input -->
            <input
              id="range"
              @change="adjustSpeedB()"
              type="range"
              v-model="vitesseB"
              min="1"
              max="10"
              step="1"
              value="50"
              class="w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            />
            <!-- Output -->
            <div id="output" class="text-lg font-semibold text-gray-800">{{vitesseB}}</div>
          </div>

          <div class="flex flex-col items-center space-y-2">
            <!-- Label -->
            <label for="range" class="text-sm font-medium text-gray-700">
              Ajustez la force de lancement initial
            </label>
            <!-- Range Input -->
            <input
              id="range"
              type="range"
              @change="adjustSpeedJ()"
              v-model="vitesseJ"
              min="1"
              max="10"
              step="1"
              value="50"
              class="custom-range w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            />
            <!-- Output -->
            <div id="output" class="text-lg font-semibold text-gray-800">{{vitesseJ}}</div>
          </div>

        </div>
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
import { QcmStore } from "@/stores/store";

export default defineComponent({
  name: "Inertie",
  data() {
    return {
      vitesseB : 4,
      vitesseJ : 1,
      loaded: false,
      card: 1,
      tailleM: "petite",
      flou: false,
      experience2: null,
      questions: [],
      vitesse: 50, // Valeur par défaut pour la vitesse
      force: 50,   // Valeur par défaut pour la force
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
    gererVisibilite(id: string): void {
      const element = document.querySelector(`#${id}`);
      if (element?.classList.contains("hidden")) {
        element.classList.remove("hidden");
      } else {
        element?.classList.add("hidden");
        this.flou = false;
      }
    },
    adjustSpeedB() {
      // Appeler la méthode pour ajuster la vitesse dans ton expérience
      this.experience2?.adjustVitesseB(this.vitesseB);
    },
    adjustSpeedJ() {
      // Appeler la méthode pour ajuster la vitesse dans ton expérience
      this.experience2?.adjustVitesseJ(this.vitesseJ);
    },
    adjustForce() {
      // Appeler la méthode pour ajuster la force dans ton expérience
      this.experience2?.adjustForce(this.force);
    }
  }
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

/* Style supplémentaire pour l'input range (curseur et barre) */
/* Style par défaut pour tous les range inputs */
input[type="range"] {
  -webkit-appearance: none;
  width: 100%;
  height: 8px;
  background: #ddd;
  border-radius: 5px;
  cursor: pointer;
}

input[type="range"]::-webkit-slider-runnable-track {
  height: 8px;
  background: #ddd;
  border-radius: 5px;
}

input[type="range"]::-moz-range-track {
  height: 8px;
  background: #ddd;
  border-radius: 5px;
}

input[type="range"]::-ms-track {
  height: 8px;
  background: #ddd;
  border-radius: 5px;
  border-color: transparent;
  color: transparent;
  background-color: #ddd;
  border-width: 8px 0;
  width: 100%;
}

/* Style pour le "thumb" du range input */
input[type="range"]::-webkit-slider-thumb {
  -webkit-appearance: none;
  width: 20px;
  height: 20px;
  background: #3b82f6;
  border-radius: 50%;
  cursor: pointer;
  border: 2px solid #ffffff;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
}

input[type="range"]::-moz-range-thumb {
  width: 20px;
  height: 20px;
  background: #3b82f6;
  border-radius: 50%;
  cursor: pointer;
  border: 2px solid #ffffff;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
}

input[type="range"]::-ms-thumb {
  width: 20px;
  height: 20px;
  background: #3b82f6;
  border-radius: 50%;
  cursor: pointer;
  border: 2px solid #ffffff;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
}

/* Nouveau style pour le range input avec la classe .custom-range */
input[type="range"].custom-range {
  width: 100%;
  height: 8px;
  background: #d6e40f;
  border-radius: 5px;
}

input[type="range"].custom-range::-webkit-slider-runnable-track {
  height: 8px;
  background: #d6e40f;
  border-radius: 5px;
}

input[type="range"].custom-range::-moz-range-track {
  height: 8px;
  background: #d6e40f;
  border-radius: 5px;
}

input[type="range"].custom-range::-ms-track {
  height: 8px;
  background: #d6e40f;
  border-radius: 5px;
  border-color: transparent;
  color: transparent;
  background-color: #d6e40f;
  border-width: 8px 0;
  width: 100%;
}

/* Nouveau style pour le "thumb" du range input avec .custom-range */
input[type="range"].custom-range::-webkit-slider-thumb {
  -webkit-appearance: none;
  width: 20px;
  height: 20px;
  background: #ff6347; /* couleur différente */
  border-radius: 50%;
  cursor: pointer;
  border: 2px solid #ffffff;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
}

input[type="range"].custom-range::-moz-range-thumb {
  width: 20px;
  height: 20px;
  background: #ff6347; /* couleur différente */
  border-radius: 50%;
  cursor: pointer;
  border: 2px solid #ffffff;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
}

input[type="range"].custom-range::-ms-thumb {
  width: 20px;
  height: 20px;
  background: #ff6347; /* couleur différente */
  border-radius: 50%;
  cursor: pointer;
  border: 2px solid #ffffff;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
}

</style>
