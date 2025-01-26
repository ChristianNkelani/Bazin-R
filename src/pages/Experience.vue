<template>

<div class="h-screen w-screen bg-cover bg-[url('@/assets/fond.gif')] flex items-center justify-center flex-col">
    <div style="background-color: rgba(0, 0, 50, .5);" class="w-full h-full flex flex-col items-center justify-center">   

        <div class="w-full px-32 flex justify-between text-white">
            <h1 class=" text-yellow-500 font-bold text-3xl  uppercase">
                {{ tt }}
            </h1>
            <p><RouterLink to="/categorie">Retour</RouterLink></p>
        </div>
        <div class="flex gap-10 py-10">
                <div v-for="experience in filteredExperiences" :key="experience.cat" class="flex-1">
                    <RouterLink :to="`/${experience.id}`">
                        <div class="text-white bg-cover shadow-md  text-center flex items-center justify-center px-5 h-64 py-16 text-lg" style="background-color: rgba(0, 0, 0, .3);">
                            {{ experience.nom }}
                        </div>
                    </RouterLink>
                </div>
        </div>full
    </div>
    

    
</div>
</template>
<script>
export default {
    data(){
        return {
            experiences : [
                { id : '1', nom : 'Elements de base de la cinématique', cat : 3 , img : '',   },
                { id : "2", nom : 'MRU et MRUV', cat : 3 , img : ''  },
                { id : "3", nom : 'Chute libre des corps', cat : 3 , img : ''  },
                { id : "5", nom : '1ère Loi de Newton : Inertie', cat : 2 , img : ''  },   
                { id : "6", nom : '2ème Loi de Newton : Principe fondamental de la Dynamique', cat : 2 , img : ''  },   
                { id : "7", nom : '3ème Loi de Newton : Action et réaction', cat : 2 , img : ''  },   
                { id : "4", nom : 'Poids d\'un corps et Attraction universelle', cat : 2 , img : ''  },   
                { id : "8", nom : 'Travail mécanique d\'un corps en mouvement ', cat : 1 , img : ''  },   
                { id : "9", nom : 'Energie mecanique d\'un corps : energie cinetique et energie potentielle', cat : 1 , img : ''  },   
                { id : "0", nom : 'Puissance mecanique d\'un corps en mouvement', cat : 1 , img : ''  },   
            ],
            cat : this.$route.params.cat,
        }
    },
    computed: {
        filteredExperiences() {
            return this.experiences.filter(
                (experience) => experience.cat == this.$route.params.cat
            );
        },
        tt() {
            return this.$route.params.tit;
        }
        
    },
}
</script>