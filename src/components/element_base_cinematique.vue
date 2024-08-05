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
    />
    <main :class="{'blur-sm': flou== true}">
        <LoadingScreen :isLoaded="loaded"/>
        <canvas></canvas>
    </main>
</template>

<script lang="ts">
    import {defineComponent} from 'vue';
    import LoadingScreen from "@/components/LoadingScreen.vue";
    import { Experience3 } from '@/scenes/Element_base_cinematique/App';
    import Questions from '../components/debut_experience/question.vue';
    import { Question } from '@/scenes/Experience1/question';

    export default defineComponent({
        name: 'Inertie',
        data(){
            return {
                loaded : false,
                flou: false,
                questions:[
                    new Question("Qu'est-ce qu'une trajectoire ?",["orier","eouer","eowurow"]),
                    new Question(" Quelle est la différence entre une trajectoire rectiligne et une trajectoire curviligne ?",["orier","eouer","eowurow"]),
                    new Question("Comment peut-on représenter une trajectoire en physique ?",["orier","eouer","eowurow"]),
                    new Question("Qu'est-ce qu'une trajectoire parabolique ?",["orier","eouer","eowurow"]),
                    new Question("Qu'est-ce qu'un trajet ?",["orier","eouer","eowurow"]),
                    new Question("Quelle est la différence entre un trajet et une trajectoire ?",["orier","eouer","eowurow"]),
                    new Question("Qu'est-ce qu'une trajectoire ?",["orier","eouer","eowurow"]),

                    
                    
                ]
            }
        },
        components : {LoadingScreen, Questions},

        mounted(){
            const canvas = document.querySelector('canvas') as HTMLCanvasElement;
            new Experience3(canvas, this.setLoaded, this.voirCard);
        },
        methods: {
            setLoaded(){
                this.loaded = true;
                this.flou = true;
            },

            voirCard(){
                document.querySelector('#card')?.classList.remove('hidden');
            },
            cacherCard(){
                document.querySelector('#card')?.classList.add('hidden');
                this.flou = false;
            }
        },


    })
</script>
<style scoped>
  canvas{
    width: 100%;
    height: 100%;
  }
</style>