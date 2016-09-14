<template>
  <section class="preview" :style="{ background: background.value, color: foreground.value }">
    <style>
      .cursor {
        background-color: {{ colors[5].value }};
        color: {{ colors[4].value }};
      }
      .bold {
        color: {{ colors[1].value }};
      }
    </style>

    <p>
      [user@universe ~] color-demo
    </p>
    <br>
    <p class="bold">PuTTY Colorizer v{{ version }}</p>
    <p>&copy;2016 Hajime Yamasaki Vukelic.</p>
    <p>Some rights reserved.</p>
    <br>
    <p class="color-bars" v-for="fg in ansiColors">
      <span class="color-cell" :style="{ color: fg.value }">gYw</span>
      <span class="color-cell" v-for="bg in ansiColors" :style="{ background: bg.value, color: fg.value }">
        gYw
      </span>
    </p>
    <br>
    <p>[user@universe ~] whereis source</p>
    <p>
      <a href="https://github.com/foxbunny/putty-colorizer" target="_blank">
        https://github.com/foxbunny/putty-colorizer
      </a>
    </p>
    <p>[user@universe ~] echo $LICENSE</p>
    <p>MIT</p>
    <p class="final-prompt">
      [user@universe ~] exi<span id="cursor" class="cursor">t</span>
    </p>
  </section>
</template>

<script>
  const CURSOR_BLINK_INTERVAL = 500;

  export default {
    props: ['colors', 'version'],

    computed: {
      ansiColors: function () {
        return this.colors.slice(6);
      },

      foreground: function () {
        return this.colors[0];
      },

      background: function () {
        return this.colors[2];
      },
    },

    ready: function () {
      var cursor = document.getElementById('cursor');
      setInterval(() => {
        cursor.className = cursor.className ? '' : 'cursor';
      }, CURSOR_BLINK_INTERVAL);
    }
  }
</script>

<style lang="sass">
  .preview {
    padding: 1rem;
    padding-left: 4rem;
    font-family: 'Consolas', 'Lucida Console', monospace;
    font-size: 120%;
    line-height: 110%;
    height: 100vh;
    transition: background-color 0.3s, color 0.3s;

    .color-bars {
      white-space: nowrap;
    }

    .color-cell {
      transition: background-color 0.3s, color 0.3s;
    }

    .cursor {
      display: inline-block;
    }

    a {
      color: inherit;
      text-decoration: none;

      &:hover {
        text-decoration: underline;
      }
    }
  }
</style>