<script>
import { RouterLink } from 'vue-router';
export default {
  name : 'Home',
}
</script>
<template>
    <div class="h-screen w-screen bg-cover bg-[url('@/assets/fond.gif')] ">
        <div class=" w-full h-full flex justify-center items-center grid grid-cols-3 p-5 gap-5" style="background-color: rgba(0, 0, 50, .5);">
          <div class="p-10 flex flex-col  justify-center h-full gap-5" style="background-color: rgba(0, 0, 0, .3);">
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
          <div class=" grid grid-rows-2 h-full gap-5">
            <div class="p-10 flex flex-col items-center justify-center grid grid-rows-2" style="background-color: rgba(0, 0, 0, .3);">
                <p class="uppercase md:text-7xl text-4xl text-gray-500"><span class="text-blue-400">A PROPOS</span></p>
                <p class=" text-gray-50 pt-8 text-justify">Découvrez un univers fascinant où la physique prend vie grâce à nos simulations interactives. Que vous soyez étudiant, enseignant, ou simplement passionné par les sciences, notre plateforme vous offre une expérience immersive et éducative</p>
                <div class="mt-4 bg-yellow-500 lg:w-32 py-2 px-3 text-xl rounded-md text-white">
                  <RouterLink to="/categorie">Commencer</RouterLink>
                </div>
            </div>
            <div class="p-10 flex flex-col items-center justify-center grid grid-rows-2" style="background-color: rgba(0, 0, 0, .3);">
                <p class="uppercase md:text-7xl text-4xl text-gray-500"><span class="text-blue-400">MODELES 3D</span></p>
                <p class=" text-gray-50 pt-8 text-justify">Découvrez un univers fascinant où la physique prend vie grâce à nos simulations interactives. Que vous soyez étudiant, enseignant, ou simplement passionné par les sciences, notre plateforme vous offre une expérience immersive et éducative</p>
                <div class="mt-4 bg-yellow-500 lg:w-32 py-2 px-3 text-xl rounded-md text-white">
                  <RouterLink to="/categorie">Commencer</RouterLink>
                </div>
            </div>
          </div>
          <div class=" grid grid-rows-2 h-full gap-5">
            <div class="p-10 flex flex-col items-center justify-center grid grid-rows-2" style="background-color: rgba(0, 0, 0, .3);">
                <p class="uppercase md:text-7xl text-4xl text-gray-500"><span class="text-blue-400">SIMULATIONS</span></p>
                <p class=" text-gray-50 pt-8 text-justify">Découvrez un univers fascinant où la physique prend vie grâce à nos simulations interactives. Que vous soyez étudiant, enseignant, ou simplement passionné par les sciences, notre plateforme vous offre une expérience immersive et éducative</p>
                <div class="mt-4 bg-yellow-500 lg:w-32 py-2 px-3 text-xl rounded-md text-white">
                  <RouterLink to="/categorie">Commencer</RouterLink>
                </div>
            </div>
            <div class="p-10 flex flex-col items-center justify-center grid grid-rows-2" style="background-color: rgba(0, 0, 0, .3);">
                <p class="uppercase md:text-7xl text-4xl text-gray-500"><span class="text-blue-400">J</span></p>
                <p class=" text-gray-50 pt-8 text-justify">Découvrez un univers fascinant où la physique prend vie grâce à nos simulations interactives. Que vous soyez étudiant, enseignant, ou simplement passionné par les sciences, notre plateforme vous offre une expérience immersive et éducative</p>
                <div class="mt-4 bg-yellow-500 lg:w-32 py-2 px-3 text-xl rounded-md text-white">
                  <RouterLink to="/categorie">Commencer</RouterLink>
                </div>
            </div>
          </div>
        </div>
    </div>
</template>