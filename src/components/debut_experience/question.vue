<template>
  <div
    id="card"
    class="w-1/3 h-96 absolute z-40 top-1/3 left-1/3 hidden " style="background-color: rgba(0, 0, 0, .4);"
  >
    <div
      class="h-full w-full flex flex-col justify-around items-center border"
      v-if="store.card === 1 && store.etat === 'un'"
    >
      <h2 class="text-yellow-500 text-2xl font-bold text-center">{{ titre }}</h2>
      <p class="text-gray-100 w-96">{{ Presentation }}</p>
      <button
        @click="incrementerCard"
        class="bg-yellow-500 w-64 text-md py-2 px-3 text-white"
      >
        continuer
      </button>
    </div>
    <div
      class="h-full w-full flex flex-col justify-around items-center border"
      v-if="store.card === 2 && store.etat === 'un'"
    >
      <h2 class="text-yellow-500 text-2xl font-bold text-center">
        Comment experimenter {{ titre }} ?
      </h2>
      <!-- <img src="../assets/guide.gif" alt="" class="bg-red-300 h-1/2" /> -->
      <button
        @click="incrementerCard"
        class="bg-yellow-500 w-64 text-md py-2 px-3 text-white"
      >
        Continuer
      </button>
    </div>
    <Qcm :cacherCard="cacherCard" :fichier="fichier" v-show="store.card == 3" />
  </div>
</template>

<script>
import { QcmStore } from "@/stores/store";
import { ref } from "vue"; // Assure-toi d'importer ref depuis vue
import Qcm from "../Qcm.vue";

export default {
  props: {
    titre: String,
    Presentation: String,
    questions: Array,
    cacherCard: Function,
    fichier: String,
  },
  components: { Qcm },
  setup(props) {
    const store = QcmStore();

    const numquestion = ref(1);
    const reponses = ref([]);

    const incrementerCard = () => {
      store.card++;
    };

    const choisir = (answer) => {
      reponses.value.push(answer);
      console.log(reponses.value);
    };

    const finalQuestion = (choix) => {
      props.cacherCard("card");
      choisir(choix);
    };

    return {
      store,
      numquestion,
      reponses,
      incrementerCard,
      choisir,
      finalQuestion,
    };
  },
};
</script>
