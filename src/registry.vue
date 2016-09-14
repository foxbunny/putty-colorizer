<template>
  <section class="output">
    <h2>Your saved PuTTY sessions</h2>
    <p class="presets">
      <input v-model="presets" placeholder="comma-separated list of presets">
    </p>
    <p class="instructions">
      A comma-separated list of saved session names can be supplied.
      Registry entries will be generated for all listed sessions.
    </p>

    <h2>Output</h2>
    <textarea class="reg-text">{{ registryText }}</textarea>
    <p class="instructions">
      Copy this text into a file, save it as 'putty.reg', and
      double-click to install, or use the button below.
    </p>
    <p class="download">
      <a href="{{ registryHref }}" download="putty.reg">Download putty.reg</a>
    </p>
  </section>
</template>

<script>
  export default {
    props: ['colors', 'presets'],

    computed: {
      presetsArray: function () {
        return this.presets.split(',').map(function(preset) {
          return preset.trim();
        });
      },

      registryText: function () {
        var regText = 'Windows Registry Editor Version 5.00\n\n';
        var that = this;
        return regText + this.presetsArray.map(function(preset) {
          var regSection;

          if (preset === '') return null;

        // In the line below, note that we are not exactly doing URL quoting.
        // We only want to encode the space character.
        regSection = `[HKEY_CURRENT_USER\\Software\\SimonTatham\\PuTTY\\Sessions\\${ preset.replace(/ /g, '%20') }]\n`;
        return regSection + that.colors.map(function(color, index) {
          return `"Colour${index}"="${ color.registryValue }"`;
        }).join('\n');
      }).join('\n\n');
      },

      registryHref: function () {
        return 'data:text/plain;charset=utf-8,' +
        encodeURIComponent(this.registryText);
      }
    }
  };
</script>

<style lang="sass">
  .output {
    padding: 1rem;
    padding-left: 4rem;
    position: absolute;
    top: 0;
    right: 0;
    min-height: 100vh;
    max-width: 100rem;
    background-color: #eee;
    box-shadow: 0 0 10px transparentize(black, 0.5);

    h2 {
      font-size: 150%;
      line-height: 110%;
      margin: 2rem 0 1rem;
    }

    .instructions {
      color: #777;
      font-size: 90%;
      margin: 0.3rem 0 1rem;
    }

    input,
    textarea {
      width: 100%;
      padding: 0.3rem 0.5rem;
      font-family: monospace;
      border: 1px solid #ddd;
      background: #fff;
    }

    .reg-text {
      height: 10rem;
    }

    .download {
      margin-top: 2rem;

      a {
        font-size: 150%;
        padding: 0.5em 1em;
        border-radius: 5rem;
        background: #339;
        color: #fff;
        text-decoration: none;
      }
    }
  }
</style>