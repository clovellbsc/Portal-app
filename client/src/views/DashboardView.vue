<template>
  <main class="home-container">
    <CardList />
  </main>
</template>

<script>
import CardList from "@/components/CardList.vue";

export default {
  name: "DashboardView",
  components: {
    CardList,
  },
};
</script>

<style>
main > .home-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>
