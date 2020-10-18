<template>
  <div class="loader-container">
    <div class="loader loader-6"></div>
    <div class="loader loader-5"></div>
    <div class="loader loader-4"></div>
    <div class="loader loader-3"></div>
    <div class="loader loader-2"></div>
    <div class="loader loader-3"></div>
    <div class="loader loader-2"></div>
    <div class="loader loader-1"></div>
    <div class="loader loader-2"></div>
    <div class="loader loader-4"></div>
    <div class="loader loader-6"></div>
  </div>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

@Component
export default class Loader extends Vue {}
</script>
<style scoped>
.loader-container {
  height: 100px;
  padding-top: 50px;
  margin: 0 auto;
  animation: fade 4s ease-in-out infinite;
}

.loader {
  display: inline-block;
  width: 5px;
  height: 100%;
  margin: 0 10px;
  background: #bbc9d6;
  border-radius: 5px;
  animation: load 4s ease-in-out infinite;
  transform-origin: bottom center;
}

.loader-2 {
  max-height: 80%;
  animation-delay: 0.1s;
}

.loader-3 {
  max-height: 70%;
  animation-delay: 0.2s;
}

.loader-4 {
  max-height: 60%;
  animation-delay: 0.3s;
}

.loader-5 {
  max-height: 50%;
  animation-delay: 0.4s;
}

.loader-6 {
  max-height: 40%;
  animation-delay: 0.5s;
}

@keyframes load {
  0%,
  100% {
    transform: scaleY(0.2);
  }
  16.67% {
    transform: scaleY(2);
  }
  33.33% {
    transform: scaleY(0.2);
  }
  50% {
    transform: scaleY(2);
  }
  66.67% {
    transform: scaleY(0.2);
  }
  83.34% {
    transform: scaleY(2);
  }
}

@keyframes fade {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}
</style>
