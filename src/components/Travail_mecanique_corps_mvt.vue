<template>
  <Questions
    id="card"
    Presentation="Le travail mécanique d'un corps en mouvement est un concept fondamental en physique, lié à l'énergie et au mouvement des objets. Il se réfère à l'énergie transférée à un corps lorsqu'une force est appliquée sur celui-ci et que le corps se déplace en raison de cette force. Voici les principaux concepts et formules associés au travail mécanique :
                  Définition du Travail Mécanique Le travail (WW) effectué par une force (F) sur un corps est défini comme le produit scalaire de la force et du déplacement (d) du corps. Mathématiquement, cela peut être exprimé comme :

      W=F*d
"
    titre="Travail mecanique d'un corps en mouvement"
    :cacherCard="cacherCard"
    :questions="questions"
    fichier="travail_mecanique_corps"
  />
  <main :class="{ 'blur-sm': flou == true }">
    <!-- Le bouton des parametres -->
    <div
      class="absolute top-2 left-2 bg-white w-16 h-16 rounded-full flex justify-center items-center cursor-pointer"
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
    <div
      class="absolute bottom-2 left-2 bg-white w-16 h-16 rounded-full flex justify-center items-center cursor-pointer"
    >
      <img src="../assets/calculer.png" class="w-8 h-8" alt="" />
    </div>

    <LoadingScreen :isLoaded="loaded" />
    <canvas></canvas>
  </main>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import LoadingScreen from "@/components/LoadingScreen.vue";
import Questions from "../components/debut_experience/question.vue";
import { Question } from "@/scenes/Experience1/question";
import { Experience8 } from "@/scenes/Travail_mecanique_corps_mvt/App";

export default defineComponent({
  name: "Travail mecanique corps en mvt",
  components: { LoadingScreen, Questions },
  data() {
    return {
      loaded: false,
      flou: false,
      presentation: "Japhet BAZ le leader",
      titre: "Détermination du poids d'un corps",
      questions: [
        new Question(
          "<<Loi>> de Newton et <<Principe>> de Newton signifien la même chose",
          ["Vrai", "Faux"]
          // ),
          // new Question(
          //     'La dynamique est l\'étude de la persévérance d\'un corpso',
          //     [
          //         'Vrai',
          //         'Faux',
          //     ]
          // ),
          // new Question(
          //     'La masse seule d\'un corps peut déterminer la force à exercer par un objet.',
          //     [
          //         'Vrai',
          //         'Faux',
          //     ]
          // ),
          // new Question(
          //     'Lors d\'un mouvement, la masse s\'oppose au mouvement',
          //     [
          //         'Vrai',
          //         'Faux',
          //     ]
          // ),
          // new Question(
          //     'Le poids et la masse sont deux grandeurs physiquement identiques.',
          //     [
          //         'Vrai',
          //         'Faux',
          //     ]
          // ),
          // new Question(
          //     'La dynamique est l\'étude de la persévérance d\'un corpso',
          //     [
          //         'Vrai',
          //         'Faux',
          //     ]
          // ),
          // new Question(
          //     'Comment se calcul le poid d\'un corps?',
          //     [
          //         'Poids = (masse pesée sur la balance) x (accélération de la pesanteur)',
          //         'Poids = masse pesée sur la balance',
          //     ]
        ),
      ],
    };
  },
  mounted() {
    const canvas = document.querySelector("canvas") as HTMLCanvasElement;
    new Experience8(canvas, this.setLoaded, this.voirCard);
  },
  methods: {
    setLoaded() {
      this.loaded = true;
      this.flou = true;
    },
    voirCard() {
      document.querySelector("#card")?.classList.remove("hidden");
    },
    cacherCard() {
      document.querySelector("#card").classList.add("hidden");
      this.flou = false;
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
