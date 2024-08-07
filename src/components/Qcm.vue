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
                class="w-3 h-3 rounded-full"
                :class="{
                  'bg-blue-500': store.currentPage === index,
                  'bg-gray-300': store.currentPage !== index,
                }"
              ></div>
            </div>
          </div>
        </div>
      </transition-group>
    </div>

    <div
      v-if="store.currentPage >= questions.length"
      class="mt-2 flex flex-col justify-center items-center"
    >
      <h2 class="text-xl font-semibold mb-4">Quiz terminé !</h2>
      <p class="text-gray-700">Votre score : {{ score }} / {{ totalPoints }}</p>
      <div class="mt-4">
        <h3 class="text-lg font-semibold mb-2">Correction :</h3>
        <div class="grid grid-cols-3 gap-2">
          <div
            v-for="(question, index) in questions"
            :key="index"
            class="mb-4 p-2 bg-gray-100"
          >
            <p class="font-semibold">{{ question.question }}</p>
            <div
              v-for="(option, optionIndex) in question.options"
              :key="optionIndex"
              class="mb-2"
            >
              <input
                type="radio"
                :id="'corr-option' + optionIndex + '-' + index"
                :value="option"
                disabled
                :checked="selectedOptions[index] === option"
                class="mr-2"
              />
              <label
                :for="'corr-option' + optionIndex + '-' + index"
                :class="{
                  'text-green-500':
                    option === question.correctAnswer &&
                    selectedOptions[index] === option,
                  'text-red-500':
                    option !== question.correctAnswer &&
                    selectedOptions[index] === option,
                  'text-gray-700': option !== selectedOptions[index],
                }"
                >{{ option }}</label
              >
            </div>
          </div>
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
  },
  setup(props) {
    const questions = ref<Question[]>([]);
    const store = QcmStore();
    const selectedOption = ref<string | null>(null);
    const score = ref(0);
    const totalPoints = ref(0);
    const selectedOptions = ref<string[]>(new Array(5).fill(null));

    const loadQuestions = async () => {
      const response = await fetch("/Questions.json");
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
