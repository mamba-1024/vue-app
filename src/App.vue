<template>
  <div id="app">
  <container-component />
  </div>
</template>

<script lang="ts">
import ContainerComponent from './components/ContainerComponent.vue';

export default {
  name: 'App',
  components: {
    ContainerComponent,
  },
  data() {
    return {
      
    };
  },
};
</script>
