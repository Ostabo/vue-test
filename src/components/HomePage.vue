<template>
  <div class="title">HEXXAGON</div>
  <button class="router-link" @click="changeRoute('/game')">PLAY</button>
  <button class="router-link" @click="changeRoute('/about')">ABOUT</button>
</template>

<script>
export default {
  name: "HomePage",
  methods: {
    changeRoute(route) {
      this.$router.push(route);
    }
  }
}
</script>

<style scoped>
@font-face {
  font-family: hex;
  src: url(../assets/Hexa.ttf);
}

div.title {
  font-family: hex, serif;
  font-size: 10em;
  padding: 0 1em;
  border: 2px solid black;
  text-align: center;
  text-shadow: white 2px 2px 2px;
}

.router-link {
  background: linear-gradient(45deg, var(--color1) 0%, var(--color2) 100%);
  display: block;
  padding: .5em;

  font-size: 2.5em;
  letter-spacing: .1em;
  color: white;
  border: 2px solid black;
  border-radius: 1em;
  margin: 1em 0;
  width: 100%;
}

.router-link:hover {
  background: var(--bgcolor1);
  color: black;
}

* {
  animation: fade-in .4s linear;
}
</style>