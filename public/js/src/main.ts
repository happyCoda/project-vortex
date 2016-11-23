import Dom from './dom';
import routes from './routes';
import * as Vue from 'vue';
import * as VueRouter from 'vue-router';
import * as AppTemplate from './templates/app.vue';

let myDom = new Dom(),
    content = myDom.grab('body'),
    textNode = myDom.spawn('div', {
        id: 'app',
    });

myDom.inject(content, textNode);

Vue.use(VueRouter);

const router = new VueRouter({
    routes
});

const app = new Vue({
    el: '#app',
    router,
    render(createComponent) {
        return createComponent(AppTemplate);
    }
});
