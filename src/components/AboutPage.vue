<template>
  <button class="second-router-link" @click="changeRoute('/home')">RETURN</button>
  <p>
    🦆
  </p>
</template>

<script>
export default {
  name: "AboutPage",
  methods: {
    changeRoute(route) {
      this.$router.push(route);
    }
  }
}
</script>

<style scoped>
* {
  animation: fade-in .4s linear;
}
</style>