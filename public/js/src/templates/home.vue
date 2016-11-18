<template lang="html">
  <div class="content">
    <div>{{ greet }}</div>
    <router-link to="/about">About</router-link>
  </div>
</template>
<script>
  import Home from '../components/home';

  export default Home.vueComponentOptions;
</script>
