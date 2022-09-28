<template>
  <div :style="turnStyle" class="page">
    <button class="second-router-link" @click="changeRoute('/home')">RETURN</button>
    <div v-for="i in rows" :key="i" class="wrapper">
      <HexTile v-for="n in columns"
               :key="{i, n}"
               :content="content(i, n)"
               :index-x="n"
               :index-y="i"
               :size="tileSize+'px'"
               :style="style"
               @click="clickTile(i, n)">
      </HexTile>
    </div>
  </div>
</template>

<script>

import HexTile from "@/components/HexTile";
import {BLUE, EMPTY, RED} from "@/App";

export default {
  name: 'GameField',
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
    turnStyle() {
      return {
        '--turn': this.turn === RED ? 'var(--color1)' : 'var(--color2)',
      }
    },
    style() {
      return {
        'margin': this.tileSize / 10 + 'px -' + this.tileSize / 15 + 'px'
      };
    }
  },
  methods: {
    initBoard() {
      for (let i = 1; i <= this.rows; i++) {
        for (let j = 1; j <= this.columns; j++) {
          this.hexField.set(`${i}:${j}`, EMPTY);
          this.neighbors.set(`${i}:${j}`, i === 1 && j === 1 ? [`${i}:${j + 1}`, `${i + 1}:${j}`]
              : i === 1 && j === this.columns ? [`${i}:${j - 1}`, `${i + 1}:${j}`]
                  : i === this.rows && j === 1 ? [`${i}:${j + 1}`, `${i - 1}:${j + 1}`, `${i - 1}:${j}`]
                      : i === this.rows && j === this.columns ? [`${i}:${j - 1}`, `${i - 1}:${j - 1}`, `${i - 1}:${j}`]
                          : i === 1 ? j % 2 === 0 ? [`${i}:${j - 1}`, `${i}:${j + 1}`, `${i + 1}:${j - 1}`, `${i + 1}:${j + 1}`, `${i + 1}:${j}`]
                                  : [`${i}:${j - 1}`, `${i}:${j + 1}`, `${i + 1}:${j}`]
                              : i === this.rows ? j % 2 === 0 ? [`${i}:${j - 1}`, `${i}:${j + 1}`, `${i - 1}:${j}`]
                                      : [`${i}:${j - 1}`, `${i}:${j + 1}`, `${i - 1}:${j - 1}`, `${i - 1}:${j + 1}`, `${i - 1}:${j}`]
                                  : j === 1 ? [`${i - 1}:${j}`, `${i + 1}:${j}`, `${i}:${j + 1}`, `${i - 1}:${j + 1}`]
                                      : j === this.columns ? [`${i - 1}:${j}`, `${i - 1}:${j - 1}`, `${i}:${j - 1}`, `${i + 1}:${j}`]
                                          : j % 2 === 0 ? [`${i}:${j - 1}`, `${i}:${j + 1}`, `${i - 1}:${j}`, `${i + 1}:${j}`, `${i + 1}:${j - 1}`, `${i + 1}:${j + 1}`]
                                              : [`${i}:${j - 1}`, `${i}:${j + 1}`, `${i - 1}:${j}`, `${i + 1}:${j}`, `${i - 1}:${j - 1}`, `${i - 1}:${j + 1}`]);
        }
      }
    },
    content(x, y) {
      return this.hexField.get(`${x}:${y}`);
    },
    clickTile(i, n) {
      if (this.hexField.get(`${i}:${n}`) !== EMPTY) {
        return;
      }
      this.hexField.set(`${i}:${n}`, this.turn);

      this.neighbors.get(`${i}:${n}`).forEach(neighbor => {
        if (this.hexField.get(neighbor) !== this.turn && this.hexField.get(neighbor) !== EMPTY) {
          this.hexField.set(neighbor, this.turn);
        }
      });

      this.turn = this.turn === RED ? BLUE : RED;
    },
    changeRoute(route) {
      this.$router.push(route);
    }
  }
}
</script>

<style>
:root {
  --turn: #fff;
  --bgcolor3: #494949;
}

.page {
  background: linear-gradient(var(--bgcolor3) 10%, var(--bgcolor2));
  padding: 4em;
  border-radius: 2em;

  border: .2em solid var(--turn);

  transition: all .4s linear;
  user-select: none;
}

*:not(.wrapper *) {
  animation: fade-in .4s linear;
}

.wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
