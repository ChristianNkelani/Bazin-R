<template>
    <div id="cardInertie" class="w-1/3 h-96 bg-white absolute z-40 top-1/3 left-1/3 hidden">
        <div class="h-full w-full flex flex-col justify-around items-center border" v-if="card==1">
            <h2 class="text-blue-500 text-2xl font-bold text-center">PRINCIPE D'INERTIE</h2>
            <p class="text-gray-500 w-96">Le principe d'inertie, formulé par Isaac Newton, est une loi fondamentale de la physique qui décrit le comportement des objets en mouvement ou au repos.</p>
            <button @click="card++" class="bg-blue-500 w-64 text-md py-2 px-3 text-white">Commencer</button>
        </div>
        <div v-if="card==2">
            <div class="h-64 flex flex-col justify-around items-center">
                <div class="h-32">
                    <div class="bg-red-800" :class="{'w-5 h-5':tailleM=='petite','w-10 h-10':tailleM=='moyenne','w-16 h-16':tailleM=='grosse'}"></div>
                </div>

                <div>
                    <span>Taille de la masse</span>
                    <select name="" id="" v-model="tailleM" class="w-32 p-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-800 focus:border-blue-800">
                            <option value="petite">Petite</option>
                            <option value="moyenne">Moyenne</option>
                            <option value="grosse">Grosse</option>
                    </select>
                </div>
                <div class="flex justify-center">
                    <button @click="continueExperience"  class="bg-blue-500 w-64 text-md py-2 px-3 text-white">Continuer</button>
                </div>

                
            </div>
        </div>
    </div>
    <main :class="{'blur-sm': flou == true}">

        
        <LoadingScreen :isLoaded="loaded"/>
        <canvas></canvas>
    </main>
</template>

<script lang="ts">
    import {defineComponent} from 'vue';
    import LoadingScreen from "@/components/LoadingScreen.vue";
    import { Experience2 } from '@/scenes/Experience2_Inertie/App';

    export default defineComponent({
        name: 'Inertie',
        data(){
            return {
                loaded : false,
                card : 1,
                tailleM : 'petite',
                flou : false,
                experience2 : null
            }
        },
        components : {LoadingScreen},
        mounted(){
            const canvas = document.querySelector('canvas') as HTMLCanvasElement;
            this.experience2 = new Experience2(canvas, this.setLoaded,this.voirCard);
        },
        methods: {
            setLoaded(){
                this.loaded = true;
                this.flou = true;
            },
            voirCard(){
                document.querySelector('#cardInertie').classList.remove('hidden');
            },
            cacherCard(){
                document.querySelector('#cardInertie').classList.add('hidden');

                // gestion des flous
                this.flou = false
            },
            continueExperience() {
                this.cacherCard();
                // if (this.experience2) {
                //     this.experience2._environement.createBalle(this.tailleB, this.tailleR)
                // }
            }
        },
    })
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