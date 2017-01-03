import Vue from 'vue';
import AppComponent from './templates/app.vue';

new Vue({
    el: '#app',
    render(createComponent) {
        return createComponent(AppComponent);
    }
});
