<template>
  <div class="wrapper" v-for="i in rows" :key="i">
      <HexTile v-for="n in columns"
               :key="{i, n}"
               :index-x="n"
               :index-y="i"
               :content="content(i, n)"
               :size="tileSize+'px'"
               :style="margin"
               @click="clickTile(i, n)">
      </HexTile>
  </div>
</template>

<script>

import HexTile from "@/components/HexTile";

export const [RED, BLUE, EMPTY] = ['🔴', '🔵', ''];

export default {
  name: 'App',
  components: {
    HexTile
  },
  beforeMount() {
    this.initBoard();
  },
  data() {
    return {
      turn: RED,
      hexField: new Map(),
      neighbors: new Map(),
      tileSize: 80,
      columns: 11,
      rows: 6,
    }
  },
  computed: {
    margin() {
      return {
        'margin': this.tileSize / 10 + 'px -' + this.tileSize / 15 + 'px'
      };
    }
  },
  methods: {
    initBoard() {
      for (let i = 0; i <= this.rows; i++) {
        for (let j = 0; j <= this.columns; j++) {
          this.hexField.set(`${i}:${j}`, EMPTY);
          this.neighbors.set(`${i}:${j}`, i === 0 && j === 0 ? [`${i}:${j+1}`, `${i+1}:${j}`]
          : i === 0 && j === this.columns ? [`${i}:${j-1}`, `${i+1}:${j}`]
          : i === this.rows && j === 0 ? [`${i}:${j+1}`, `${i-1}:${j+1}`, `${i-1}:${j}`]
              : i === this.rows && j === this.columns ? [`${i}:${j-1}`, `${i-1}:${j-1}`, `${i-1}:${j}`]
              : i === 0 ? j % 2 !== 0 ? [`${i}:${j-1}`, `${i}:${j+1}`, `${i+1}:${j-1}`, `${i+1}:${j+1}`, `${i+1}:${j}`]
              : [`${i}:${j-1}`, `${i}:${j+1}`, `${i+1}:${j}`]
              : i === this.rows ? j % 2 !== 0 ? [`${i}:${j-1}`, `${i}:${j+1}`, `${i-1}:${j}`]
              : [`${i}:${j-1}`, `${i}:${j+1}`, `${i-1}:${j-1}`, `${i-1}:${j+1}`, `${i-1}:${j}`]
              : j === 0 ? [`${i-1}:${j}`, `${i+1}:${j}`, `${i}:${j+1}`, `${i+1}:${j+1}`]
              : j === this.columns ? [`${i-1}:${j}`, `${i+1}:${j}`, `${i}:${j-1}`, `${i+1}:${j-1}`]
              : j % 2 !== 0 ? [`${i}:${j-1}`, `${i}:${j+1}`, `${i-1}:${j}`, `${i+1}:${j}`, `${i-1}:${j+1}`, `${i+1}:${j+1}`]
              : [`${i}:${j-1}`, `${i}:${j+1}`, `${i-1}:${j}`, `${i+1}:${j}`, `${i-1}:${j-1}`, `${i+1}:${j-1}`]);
        }
      }
      console.log(this.hexField);
    },
    content(x, y) {
      return this.hexField.get(`${x}:${y}`);
    },
    clickTile(i, n) {
      this.hexField.set(`${i}:${n}`, this.turn);

      this.neighbors.get(`${i}:${n}`).forEach(neighbor => {
        if (this.hexField.get(neighbor) !== this.turn && this.hexField.get(neighbor) !== EMPTY) {
          this.hexField.set(neighbor, this.turn);
        }
      });

      this.turn = this.turn === RED ? BLUE : RED;
    },
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

:root {
  width: 100%;
  height: 100%;
  background: radial-gradient(#626262 0%, #000 100%);
}

body {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}

.wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
