<template>
  <!-- <div id="card" class="w-1/3 h-96 bg-white absolute z-40 top-1/3 left-1/3 hidden">
        <div class="h-full w-full flex flex-col justify-around items-center border" v-if="card==1">
            <h2 class="text-blue-500 text-2xl font-bold text-center">CHUTTE LIBRE D'UN CORPS</h2>
            <p class="text-gray-500 w-96">L'expérience de la chute libre est conçue pour illustrer les principes fondamentaux de la gravité et du mouvement des objets en chute. Cette expérience vous permet de comprendre comment les objets tombent sous l'influence de la gravité, indépendamment de leur masse, en l'absence de résistance de l'air</p>
            <button @click="card++"  class="bg-blue-500 w-64 text-md py-2 px-3 text-white">continuer</button>
        </div>
        <div class="h-full w-full flex flex-col justify-around items-center border" v-if="card==2">
            <h2 class="text-blue-500 text-2xl font-bold text-center">Comment experimenter la chutte libre ?</h2>
              <img src="../assets/guide.gif" alt="" class="bg-red-300 h-1/2">
            <button @click="card++"  class="bg-blue-500 w-64 text-md py-2 px-3 text-white">Continuer</button>
        </div>
        <div class="h-full w-full flex flex-col justify-around items-center border" v-show="card==3">
            <h2 class="text-blue-500 text-2xl font-bold text-center">Repondez à ces questions</h2>
            <div class="px-5">
              <div class="flex gap-8 justify-center items-center">
                <div class="bg-red-500 w-10 h-10 rounded-full"></div>
                <div class="bg-yellow-500 w-16 h-16 rounded-full"></div>
              </div>
              <h3 class="text-gray-400 text-md">
                {{ questions[numquestion-1].text }}
              </h3>
              <div class="py-2 text-gray-400 text-sm">
                <div class="flex flex-col items-center justify-center" v-bind:key="answer" v-for="answer in questions[numquestion-1].answers">
                  <button @click="choix = answer"  class="w-96 bg-gray-200 py-3 my-2" :class="{'border-red-500 border' : answer == choix}">{{ answer }}</button>
                </div>
              </div>
            </div>
            
            <button v-if="numquestion < questions.length" @click="numquestion++;choisir(choix)"  class="bg-blue-500 w-64 text-md py-2 px-3 text-white">Suivant</button>
            <button v-show="numquestion == questions.length" @click="finalQuestion(choix)"  class="bg-blue-500 w-64 text-md py-2 px-3 text-white">Continuer</button>
        </div>
  </div> -->
  <Questions
    id="card"
    Presentation="L'expérience de la chute libre est conçue pour illustrer les principes fondamentaux de la gravité et du mouvement des objets en chute. Cette expérience vous permet de comprendre comment les objets tombent sous l'influence de la gravité, indépendamment de leur masse, en l'absence de résistance de l'air"
    titre="CHUTTE LIBRE D'UN CORPS"
    :cacherCard="cacherCard"
    :questions="questions"
    fichier="chute_libre"
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
      @click="afficherMenu"
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
  </main>

  <!-- retour bouton -->

  <RouterLink to="/categorie" class="fixed z-40 right-2 bottom-5 w-16 h-16">
    <img
      class="w-16 h-16 bg-blue-500 rounded-full"
      src="../assets/retour.png"
      alt=""
    />
  </RouterLink>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { Experience1 } from "../scenes/Experience1/App";
import LoadingScreen from "@/components/LoadingScreen.vue";
import Questions from "../components/debut_experience/question.vue";

// importation de la classe question

import { Question } from "../scenes/Experience1/question";
import { QcmStore } from "@/stores/store";

export default defineComponent({
  name: "BabylonScene",
  data() {
    return {
      loaded: false,
      experience1: null,
      flou: false,
      card: 1,
      numquestion: 1,
      reponses: [],
      choix: "",

      // La liste de toutes les questions

      questions: [
        new Question(
          "On laisse tomber 2 billes, une rouge de petite taille, et l'autre jaune de grande taille, la quelle va ateindre le sol en premier ?",
          ["Les deux tombent au même moment", "La bille rouge", "La bille bleu"]
        ),

        new Question("comment appelle-t-on g", [
          "La pesanteur",
          "La gravité",
          "L'accélération de la pesanteur",
        ]),
        new Question("g reste constante dans n'importe que milieu.", [
          "Vrai",
          "Faux",
        ]),
        new Question(
          "Le corps tombe en chutte libre parce qu'ils possedent une masse",
          ["Vrai", "Faux"]
        ),
        new Question("La gravité n'agit que sur des corps en mouvement", [
          "Vrai",
          "Faux",
        ]),
        new Question("La gravité n'existe pas dans le vide.", ["Vrai", "Faux"]),
        new Question(
          "Que se passe-t-il lorsqu'on diminue g la constante de gravitation",
          ["Les corps tombent plus vite", "Les corps tombent moins vite"]
        ),
      ],
    };
  },
  components: { LoadingScreen, Questions },
  mounted() {
    const canvas = document.querySelector("canvas") as HTMLCanvasElement;
    this.experience1 = new Experience1(canvas, this.setLoaded, this.voirCard);
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
    afficherMenu() {
      this.experience1._environement._ui.affichageParametre();
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
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
  background-color: red;
}
</style>
