import * as HomeTemplate from './templates/home.vue';
import * as AboutTemplate from './templates/about.vue';

const routes = [
  {
    path: '/',
    component: HomeTemplate
  },
  {
    path: '/about',
    component: AboutTemplate
  }
];

export default routes;
