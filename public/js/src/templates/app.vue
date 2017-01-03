<template lang="html">
    <div class="container">
        <p>{{ greet }}</p>
    </div>
</template>
<script>
    export default {
        name: 'App',
        data() {
            return {
                greet: 'Hello from Vue starter!'
            };
        }
    };
</script>
<style lang="less" scoped>
    .container {
        width: 80%;
        margin: 0 auto;
        padding: 10px;
    }
</style>
