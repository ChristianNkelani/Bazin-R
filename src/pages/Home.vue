<script>
import { RouterLink } from 'vue-router';
export default {
  name : 'Home',
}
</script>
<template>
    <div class="h-screen w-screen bg-cover bg-[url('@/assets/fond.gif')] ">
        <div class=" w-full flex justify-center items-center grid grid-cols-3 p-5 gap-5" style="background-color: rgba(0, 0, 50, .5);">
          <div class="p-10 flex flex-col  justify-center gap-5" style="background-color: rgba(0, 0, 0, .3);">
              <p class="uppercase md:text-6xl text-4xl text-gray-500">
                <span class="text-blue-400">
                <span class="bg-yellow-500 px-1 text-gray-100">B</span>AZIN-R <span class="text-white">VirtLab</span></span>
              </p>
              <p class=" text-gray-50 pt-8 text-justify">Découvrez un univers fascinant où la physique prend vie grâce à nos simulations interactives. Que vous soyez étudiant, enseignant, ou simplement passionné par les sciences, notre plateforme vous offre une expérience immersive et éducative</p>
              <RouterLink to="/categorie" class="w-full">

                <div class="mt-4 border border-yellow-500  py-2 px-3 text-xl rounded-xl text-white text-center cursor-pointer">
                  Commencer
                </div>
              </RouterLink>
          </div>

          <div class=" grid grid-rows-2 gap-5">
            <div class="p-10 flex flex-col items-center justify-center grid grid-rows-2" style="background-color: rgba(0, 0, 0, .3);">
                <p class="uppercase md:text-7xl text-4xl text-gray-500"><span class="text-blue-400">A PROPOS</span></p>
                <p class=" text-gray-50 pt-8 text-justify">Plongez dans un univers captivant où la science devient accessible et vivante ! Bazin-R VirtLab est une plateforme innovante dédiée à l'apprentissage interactif de la physique. Grâce à nos simulations immersives, nous transformons des concepts complexes en expériences visuelles et dynamiques.</p>
            </div>
            <div class="p-10 flex flex-col items-center justify-center grid grid-rows-2" style="background-color: rgba(0, 0, 0, .3);">
                <p class="uppercase md:text-7xl text-4xl text-gray-500"><span class="text-blue-400">MODELES 3D</span></p>
                <p class=" text-gray-50 pt-8 text-justify">Nos modèles 3D vous permettent de visualiser des concepts physiques complexes sous des angles inédits. Manipulez, explorez et comprenez la mécanique, l'énergie, les ondes et bien plus encore dans un environnement virtuel où vous êtes aux commandes.</p>
                
            </div>
          </div>
          <div class=" grid grid-rows-2 gap-5">
            <div class="p-10 flex flex-col items-center justify-center grid grid-rows-2" style="background-color: rgba(0, 0, 0, .3);">
                <p class="uppercase md:text-7xl text-4xl text-gray-500"><span class="text-blue-400">SIMULATIONS</span></p>
                <p class=" text-gray-50 pt-8 text-justify">Que vous soyez étudiant curieux, enseignant passionné ou amateur de sciences, Bazin-R VirtLab est conçu pour enrichir vos connaissances tout en rendant l'apprentissage ludique et engageant. Rejoignez-nous et découvrez une nouvelle façon de vivre la physique à travers des simulations fascinantes et éducatives.</p>
                
            </div>
            <!-- <div class="p-10 flex flex-col items-center justify-center grid grid-rows-2" style="background-color: rgba(0, 0, 0, .3);">
                <p class="uppercase md:text-7xl text-4xl text-gray-500"><span class="text-blue-400">FLEXIBILITE</span></p>
                <p class=" text-gray-50 pt-8 text-justify">Notre plateforme offre une flexibilité inégalée, adaptée à tous les niveaux et besoins d’apprentissage.Avec Bazin-R VirtLab, apprenez à votre rythme, où que vous soyez, et explorez une large gamme de concepts scientifiques grâce à des outils intuitifs et modulables. Que ce soit pour expérimenter une simulation précise, visualiser des phénomènes complexes ou approfondir vos cours, le laboratoire s'adapte à vos objectifs.</p>
                <div class="mt-4 bg-yellow-500 lg:w-32 py-2 px-3 text-xl rounded-md text-white">
                  <RouterLink to="/categorie">Commencer</RouterLink>  
                </div>
            </div>
                <p class=" text-gray-50 text-justify">Notre plateforme offre une flexibilité inégalée, adaptée à tous les niveaux et besoins d’apprentissage.Avec Bazin-R VirtLab, apprenez à votre rythme, où que vous soyez, et explorez une large gamme de concepts scientifiques grâce à des outils intuitifs et modulables. Que ce soit pour expérimenter une simulation précise, visualiser des phénomènes complexes ou approfondir vos cours, le laboratoire s'adapte à vos objectifs.</p>
            </div> -->
          </div>
        </div>
    </div>
</template>