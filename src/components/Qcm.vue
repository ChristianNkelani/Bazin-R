<template>
  <div class="p-4" style="width: 600px">
    <h1 class="text-3xl font-bold mb-6 text-center">Questionnaire</h1>
    <div class="relative w-full h-96 overflow-hidden">
      <transition-group
        name="slide"
        tag="div"
        class="absolute inset-0 flex transition-transform duration-300"
        :style="`transform: translateX(-${store.currentPage * 100}%);`"
      >
        <div
          v-for="(question, index) in questions"
          :key="index"
          class="w-full h-full flex-shrink-0 px-4"
        >
          <div v-if="store.currentPage === index">
            <h2 class="text-xl font-semibold mb-2">{{ question.question }}</h2>
            <div
              v-for="(option, optionIndex) in question.options"
              :key="optionIndex"
              class="mb-2"
            >
              <input
                type="radio"
                :id="'option' + optionIndex"
                :value="option"
                v-model="selectedOption"
                class="mr-2"
              />
              <label :for="'option' + optionIndex" class="text-gray-700">{{
                option
              }}</label>
            </div>
            <button
              @click="nextPage"
              class="mt-3 bg-blue-500 text-white py-2 px-4 rounded"
            >
              Suivant
            </button>
            <!-- Indicateurs de page -->

            <div
              class="flex gap-2 justify-center"
              v-if="store.currentPage < questions.length"
            >
              <div
                v-for="(question, index) in questions"
                :key="index"
                class="w-6 h-6 flex items-center justify-center rounded-full text-white"
                :class="{
                  'bg-blue-500': store.currentPage === index,
                  'bg-gray-300': store.currentPage !== index,
                }"
              >
                {{ index + 1 }}
              </div>
            </div>
          </div>
        </div>
      </transition-group>
      <div v-show="store.currentPage >= questions.length" class="w-full h-full">
        <div class="grid grid-cols-2">
          <p class="text-blue-500 text-lg font-semibold">
            Votre score Avant :
            <span class="text-blue-500 text-lg font-semibold">
              {{ store.score1 }}
            </span>
            / {{ totalPoints }}
          </p>
          <p class="text-gray-700">
            <span class="text-blue-500 text-lg font-semibold"
              >Votre score Apres :</span
            >
            {{ score }} / {{ totalPoints }}
          </p>
        </div>
        <h2 class="pt-16">Liste de bonnes reponse</h2>
        <ul
          class="max-w-md space-y-1 text-gray-500 list-inside dark:text-gray-400"
          v-for="(question, index) in questions"
          :key="index"
        >
          <li class="flex items-center">
            <svg
              class="w-3.5 h-3.5 me-2 text-green-500 dark:text-green-400 flex-shrink-0"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"
              />
            </svg>
            {{ question.correctAnswer }}
          </li>
        </ul>
        <div class="flex justify-center">
          <RouterLink to="/categorie">
            <button class="bg-blue-600 text-white py-2 px-3 rounded-md" @click="store.reinitialiser">
              Fermer l'experience
            </button>
          </RouterLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";
import { QcmStore } from "@/stores/store";

interface Question {
  question: string;
  options: string[];
  correctAnswer: string;
  points: number;
}

export default defineComponent({
  name: "Qcm",
  props: {
    cacherCard: {
      type: Function,
      required: true,
    },
    fichier: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const questions = ref<Question[]>([]);
    const store = QcmStore();
    const selectedOption = ref<string | null>(null);
    const score = ref(0);
    const totalPoints = ref(0);
    const selectedOptions = ref<string[]>(new Array(5).fill(null));

    const loadQuestions = async () => {
      const response = await fetch(`/${props.fichier}.json`);
      questions.value = await response.json();
      totalPoints.value = questions.value.reduce(
        (acc, question) => acc + question.points,
        0
      );
    };

    const nextPage = () => {
      if (selectedOption.value) {
        // Sauvegarder l'option sélectionnée pour la question actuelle
        selectedOptions.value[store.currentPage] = selectedOption.value;

        // Vérifier si l'option sélectionnée est correcte et mettre à jour le score
        if (
          selectedOption.value ===
          questions.value[store.currentPage].correctAnswer
        ) {
          score.value += questions.value[store.currentPage].points;
        }
        selectedOption.value = null;
        store.currentPage++;

        // Vérifier si le quiz est terminé
        if (
          store.currentPage === questions.value.length &&
          store.etat == "un"
        ) {
          store.score1 = score.value;
          score.value = 0;
          props.cacherCard("card");
        }
      } else {
        alert("Veuillez sélectionner une option.");
      }
    };

    // Gestion de l'état avec Pinia
    const etat = ref(store.etat);

    const cliquer = () => {
      store.cliquer();
    };

    onMounted(() => {
      loadQuestions();
      console.log(store.currentPage);
    });

    return {
      questions,
      selectedOption,
      score,
      totalPoints,
      selectedOptions,
      nextPage,
      etat,
      cliquer,
      store,
    };
  },
});
</script>

<style scoped>
.slide-enter-active,
.slide-leave-active {
  transition: transform 0.3s ease;
}
.slide-enter,
.slide-leave-to {
  transform: translateX(100%);
}
</style>
