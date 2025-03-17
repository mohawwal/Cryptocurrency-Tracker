<template>
  <div class="mx-auto px-4 sm:px-6 2xl:px-20 my-10">
    <Navigation />
    <RouterView />
  </div>
</template>

<script setup>
import { RouterView } from "vue-router";
import Navigation from "./components/Navigation.vue";
</script>
