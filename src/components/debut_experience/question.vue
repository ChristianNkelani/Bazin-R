<template>
    <div id="card" class="w-1/3 h-96 bg-white absolute z-40 top-1/3 left-1/3 hidden">
        <div class="h-full w-full flex flex-col justify-around items-center border" v-if="card==1">
            <h2 class="text-blue-500 text-2xl font-bold text-center">{{ titre }}</h2>
            <p class="text-gray-500 w-96">{{ Presentation }}</p>
            <button @click="card++"  class="bg-blue-500 w-64 text-md py-2 px-3 text-white">continuer</button>
        </div>
        <div class="h-full w-full flex flex-col justify-around items-center border" v-if="card==2">
            <h2 class="text-blue-500 text-2xl font-bold text-center">Comment experimenter {{ titre }} ?</h2>
              <!-- <img src="../assets/guide.gif" alt="" class="bg-red-300 h-1/2"> -->
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
    </div>
</template>
<script>

export default {
    props : {
        titre : String,
        Presentation : String,
        questions : Array,
        cacherCard : Function 
    },
    data(){
        return {
            card : 1,
            numquestion : 1,
            reponses : [],
        }
    },
    methods : {
    voirQuestion(){
      this.voirCard()
      this.card = 3;
      this.numquestion = 1;
      console.log(this.card)
    },
    choisir(answer){
      this.reponses.push(answer)
      console.log(this.reponses);
    },
    // la derniere question
    finalQuestion(choix){
      this.cacherCard();
      this.choisir(choix);
    },
    }    
}
</script>