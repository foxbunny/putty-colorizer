<template>
  <p class="color">
    <span class="swatch" :style="{ background: color.value }" v-on:click="activate" title="{{ color.name }}"></span>
    <input id="{{ color.id }}" v-model="color.value" placeholder="color" type="color">
    <label for="{{ color.id }}">{{ color.name }}</label>
  </p>
</template>

<script>
  export default {
    props: ['color'],

    ready: function () {
      // Input does not change, so no need to make it a reactive property
      this.input = document.getElementById(this.color.id);
    },

    methods: {
      // The swatch element is a proxy for the actual input. When the swatch
      // element is clicked, it activates the actual input by using the activate
      // method and passing it the input's id.
      activate: function (id) {
        // In Microsoft Edge, the click event alone will not cause the color
        // field to activate. On other browsers, focusing the field does not
        // activate. We therefore call both.
        this.input.click();
        this.input.focus();
      }
    }
  };
</script>

<style lang="sass">
.color {
  padding: 0.2rem 0.4rem;
  white-space: nowrap;
  line-height: 1.2rem;

  // Following two lines are used to tuck the invisible input away
  position: relative;
  overflow: hidden;

  // Invisible input
  input {
    position: absolute;
    top: 0;
    left: 0;
    opacity: 0;
    width: 0;
    height: 0;
  }

  .swatch {
    display: inline-block;
    width: 1.2rem;
    height: 1.2rem;
    padding: 0;
    vertical-align: middle;
    cursor: pointer;
    margin-right: 0.5rem;
    border-radius: 0.6rem;
    transition: background-color 0.3s;
  }

  label {
    font-size: 80%;
    font-weight: bold;
    width: 10rem;
    display: inline-block;
    vertical-align: middle;
    cursor: pointer;
  }
}
</style>