import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import money from './directives/money';
import './assets/tailwind.css';

const app = createApp(App);

app.directive('money', money);
app.use(router);
app.mount('#app');




