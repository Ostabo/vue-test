<template>
  <router-view>
  </router-view>
</template>

<script>

export const [RED, BLUE, EMPTY] = ['🔴', '🔵', ''];

export default {
  name: 'App',
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  text-align: center;
}

:root {
  --color1: #cc0000;
  --color2: #0000cc;
  --bgcolor1: #ececec;
  --bgcolor2: #000;

  width: 100%;
  height: 100%;
  background: radial-gradient(var(--bgcolor1) 0%, var(--bgcolor2) 100%);
}

body {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}

.second-router-link {
  display: block;
  padding: .5em;

  font-size: 1.5em;
  letter-spacing: .1em;
  border: 2px solid black;
  border-radius: 1em;
  margin: 0 0 4em 0;
  width: 100%;
  min-width: 200px;
}

.second-router-link:hover {
  color: white;
  background: black;
}

@keyframes fade-in {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
</style>
