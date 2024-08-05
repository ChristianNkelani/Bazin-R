<template>
  <div class="p-4  bg-white rounded-lg shadow-md" style="width:600px;">
    <h1 class="text-3xl font-bold mb-6 text-center">Questionnaire</h1>
    <div v-if="currentPage < questions.length">
      <h2 class="text-xl font-semibold mb-4">{{ questions[currentPage].question }}</h2>
      <div v-for="(option, index) in questions[currentPage].options" :key="index" class="mb-2">
        <input
          type="radio"
          :id="'option' + index"
          :value="option"
          v-model="selectedOption"
          class="mr-2"
        />
        <label :for="'option' + index" class="text-gray-700">{{ option }}</label>
      </div>
      <button @click="nextPage" class="mt-4 bg-blue-500 text-white py-2 px-4 rounded">Suivant</button>
    </div>

    <div v-else>
      <h2 class="text-xl font-semibold mb-4">Quiz terminé !</h2>
      <p class="text-gray-700">Votre score : {{ score }} / {{ totalPoints }}</p>
      <div class="mt-4">
        <h3 class="text-lg font-semibold mb-2">Correction :</h3>
        <div class="grid grid-cols-3 gap-2">
          <div v-for="(question, index) in questions" :key="index" class="mb-4 p-2 bg-gray-100">
            <p class="font-semibold">{{ question.question }}</p>
            <div v-for="(option, optionIndex) in question.options" :key="optionIndex" class="mb-2">
              <input
                type="radio"
                :id="'corr-option' + optionIndex + '-' + index"
                :value="option"
                disabled
                :checked="selectedOptions[index] === option"
                class="mr-2"
              />
              <label :for="'corr-option' + optionIndex + '-' + index" :class="{'text-green-500': option === question.correctAnswer && selectedOptions[index] === option, 'text-red-500': option !== question.correctAnswer && selectedOptions[index] === option, 'text-gray-700': option !== selectedOptions[index]}">
                {{ option }}
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';

interface Question {
  question: string;
  options: string[];
  correctAnswer: string;
  points: number;
}

export default defineComponent({
  name: 'Qcm',
  setup() {
    const questions = ref<Question[]>([]);
    const currentPage = ref(0);
    const selectedOption = ref<string | null>(null);
    const score = ref(0);
    const totalPoints = ref(0);
    const selectedOptions = ref<string[]>(new Array(5).fill(null));

    const loadQuestions = async () => {
      const response = await fetch('/Questions.json');
      questions.value = await response.json();
      totalPoints.value = questions.value.reduce((acc, question) => acc + question.points, 0);
    };

    const nextPage = () => {
      if (selectedOption.value) {
        // Save the selected option for the current question
        selectedOptions.value[currentPage.value] = selectedOption.value;

        // Check if the selected option is correct and update the score
        if (selectedOption.value === questions.value[currentPage.value].correctAnswer) {
          score.value += questions.value[currentPage.value].points;
        }
        selectedOption.value = null;
        currentPage.value++;
      } else {
        alert('Veuillez sélectionner une option.');
      }
    };

    onMounted(() => {
      loadQuestions();
    });

    return {
      questions,
      currentPage,
      selectedOption,
      score,
      totalPoints,
      selectedOptions,
      nextPage
    };
  }
});
</script>

<style scoped>
/* Ajoutez des styles personnalisés ici */
</style>
