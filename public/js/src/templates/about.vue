<template lang="html">
  <div class="content">
    <div>{{ greet }}</div>
    <router-link to="/">Home</router-link>
  </div>
</template>
<script>
  import About from '../components/about';

  export default About.vueComponentOptions;
</script>
