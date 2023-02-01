<script setup>
import { RouterView } from "vue-router";
import NavBar from "./components/NavBar.vue";
</script>

<template>
  <div class="container">
    <NavBar />
    <main class="main-body">
      <RouterView />
    </main>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

main > .main-body {
  align-items: center;
  justify-content: center;
}
</style>
