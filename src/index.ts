import Vue from 'vue';
import Viewer from './components/Viewer.vue';

new Vue({
    render: createElement => createElement(Viewer)
}).$mount('#app');