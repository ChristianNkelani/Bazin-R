<template>
  <div class="  shadow-md px-5 py-32  border-gray-400 rounded-xl" style="background-color: rgba(0, 0, 0, .3); transform: skewX(20);">
    <div>
      <!-- <img :src="require(`@/assets/${photo}.jpg`)" alt="" class="h-48 w-full" /> -->
    </div>
    <div class="p-2">
      <h2 class="text-4xl text-yellow-500 text-bold">{{ titre }}</h2>
      <p class="text-justify text-gray-300 py-5 text-lg">
        {{ description }}
      </p>
    </div>
  </div>
</template>

<script>
export default {
  props: ["titre", "description", "photo"],
  computed: {
    photos() {
      return `${this.photo}`;
    },
  },
};
</script>
