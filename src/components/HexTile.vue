<template>
  <div class="hex-tile" :style="style">
    {{ getContent }}
  </div>
</template>

<script>
import {RED, BLUE} from "@/App";


export default {
  name: "HexTile",
  props: {
    indexX: Number,
    indexY: Number,
    size: String,
    content: String,
  },
  computed: {
    getContent() {
      return this.content;
    },
    style() {
      return {
        '--color': this.content === RED ? 'red' : this.content === BLUE ? 'blue' : 'white',
        '--opp-color': this.content === RED ? 'blue' : this.content === BLUE ? 'red' : 'white',
      }
    }
  }
}
</script>

<style scoped>

.hex-tile {
  --color: black;
  --opp-color: white;

  width: calc(v-bind(size) + v-bind(size) / 10);
  height: v-bind(size);
  background: radial-gradient(#fff 0%, #fff 60%, var(--color) 100%);
  text-shadow: black 0 2px 2px;
  text-align: center;
  line-height: v-bind(size);
  font-size: calc(v-bind(size) / 2);

  transition: all .1s linear;

  clip-path: polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%);
}

.hex-tile:nth-child(odd) {
  margin-top: calc(v-bind(size) * -1 - v-bind(size) / 10) !important; /* not pretty, but works */
}

.hex-tile:hover {
  scale: 1.2;
}
</style>