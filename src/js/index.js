// Modules
import Vue from 'vue';
import Cookie from 'js-cookie';

// Containers
import App from 'containers/App';

// Router
import router from 'router/';

new Vue({
    el: '#root',
    router,
    render: h => h(App)
});