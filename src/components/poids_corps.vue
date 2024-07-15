<template>
    <Questions
        id="card"
        Presentation="Japhet BAZ le leader"
        titre="Detremination du poid d'un corps"
        :cacherCard ="cacherCard"
        :questions="questions"
    />
    <main :class="{'blur-sm': flou == true}">
        <LoadingScreen :isLoaded="loaded"/>
        <canvas></canvas>
    </main>

</template>

<script lang="ts">
import { defineComponent } from 'vue';
import LoadingScreen from "@/components/LoadingScreen.vue";
import { Experience3 } from '@/scenes/Experience_poids_corps/App';
import Questions from '../components/debut_experience/question.vue';
import { Question } from '@/scenes/Experience1/question';

export default defineComponent({
    name: 'Inertie',
    components: { LoadingScreen, Questions },
    data() {
        return {
            loaded: false,
            flou: false,
            presentation: 'Japhet BAZ le leader',
            titre: 'Détermination du poids d\'un corps',
            questions: [
                new Question(
                    'dsdssdsadsad',
                    [
                        'sasasasa',
                        'assasaassa',
                    ]
                )
            ] 
        };
    },
    mounted() {
        const canvas = document.querySelector('canvas') as HTMLCanvasElement;
        new Experience3(canvas, this.setLoaded, this.voirCard);
    },
    methods: {
        setLoaded() {
            this.loaded = true;
            this.flou = true;
        },
        voirCard() {
            document.querySelector('#card')?.classList.remove('hidden');
        },
        cacherCard(){
            document.querySelector('#card').classList.add('hidden');
            this.flou = false;
        },
    },
});
</script>

<style scoped>
html, body {
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