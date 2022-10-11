import { createApp } from 'vue';
// import { createStore } from 'vuex'
import App from './App.vue'
import store from '@store'
import http from '@api';

// Vue.prototype.$http = http;

const app = createApp(App);
// const store = createStore();
app.config.globalProperties.$store = store;
app.config.globalProperties.$http = http;
app.mount('#app');
app.use(store);