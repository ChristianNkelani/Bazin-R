<template>
  <div>
    <label for="range" class="text-sm font-medium text-gray-700">
        Ajustez la valeur
    </label>
    <!-- Range Input -->
    <input
        id="range"
        type="range"
        v-model="vitesse"
        min="0"
        max="100"
        step="1"
        value="50"
        class="w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        />
        <!-- Output -->
        <div id="output" class="text-lg font-semibold text-gray-800">{{vitesse}}</div>
  </div>
</template>

<script>
    export default {
        props : {
            vitesse : Number
        }
    }


</script>

<style>
    /* Style supplémentaire pour l'input range (curseur et barre) */
input[type="range"]::-webkit-slider-thumb {
  appearance: none;
  width: 20px;
  height: 20px;
  background: #3b82f6;
  border-radius: 50%;
  cursor: pointer;
  border: 2px solid #ffffff;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
}
input[type="range"]::-moz-range-thumb {
  width: 20px;
  height: 20px;
  background: #3b82f6;
  border-radius: 50%;
  cursor: pointer;
  border: 2px solid #ffffff;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
}
input[type="range"]::-ms-thumb {
  width: 20px;
  height: 20px;
  background: #3b82f6;
  border-radius: 50%;
  cursor: pointer;
  border: 2px solid #ffffff;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
}
</style>