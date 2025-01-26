<template>
  <div
    class="h-screen w-screen bg-cover bg-[url('@/assets/fond.gif')]"
  >
    <div class="h-full w-full flex items-center justify-center px-16 flex-col" style="background-color: rgba(0, 0, 50, .5);">
      <div class="px-48 py-16 flex justify-between w-full">
        <h1 class="text-gray-100 font-bold text-3xl uppercase">Categories</h1>
        <p class="text-gray-100 font-bold">
          <RouterLink to="/">Retour</RouterLink>
        </p>
      </div>
      <div class="grid grid-cols-3 gap-10 px-48 h-full">
        <RouterLink
          :to="{ name: 'catDetail', params: { cat: 2, tit: 'Dynamique' } }"
        >
          <card
            class=""
            titre="Dynamique"
            photo="6272"
            description="La dynamique est la branche de la mécanique qui étudie les forces et leur effet sur le mouvement des objets. Notre simulation interactive vous permet..."
          />
        </RouterLink>

        <RouterLink
          :to="{ name: 'catDetail', params: { cat: 3, tit: 'Cinematique' } }"
        >
          <card
            class=""
            photo="cinematique"
            titre="Cinematique"
            description="La chute libre est un phénomène fondamental en physique, où un objet tombe sous l'influence de la gravité seule, sans résistance de l'air ou autres forces..."
          />
        </RouterLink>

        <RouterLink
          :to="{
            name: 'catDetail',
            params: { cat: 1, tit: 'Energie Mecanique' },
          }"
        >
          <card
            class=""
            photo="mecanique"
            titre="Energie Mecanique"
            description="La chute libre est un phénomène fondamental en physique, où un objet tombe sous l'influence de la gravité seule, sans résistance de l'air ou autres forces..."
          />
        </RouterLink>
      </div>
    </div>
  </div>
</template>
<script>
import card from "@/components/card.vue";
import { RouterLink } from "vue-router";
export default {
  components: {
    card,
  },
};
</script>
