<template>
  <div class="color-scheme">
    <app-color-field v-for="color in colors" :color="color"></app-color-field>
  </div>
</template>

<script>
  import ColorField from './color-field.vue';

  export default {
    props: ['colors'],
    components: {
      'app-color-field': ColorField
    }
  }
</script>

<style lang="sass">
  .color-scheme {
    position: fixed;
    top: 0;
    left: 0;
    width: 3rem;
    height: 100vh;
    overflow-y: scroll;
    overflow-x: hidden;
    background: #555;
    color: #eee;
    box-shadow: 0 0 5px transparentize(black, 0.5);
    transition: width, 0.3s;
    z-index: 10;

    &:hover {
      width: 14rem;
    }
  }
</style>