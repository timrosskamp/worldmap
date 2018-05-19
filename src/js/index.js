// Modules
import Vue from 'vue';
import Cookie from 'js-cookie';

// Containers
import App from 'containers/App';

// Router
import router from 'router/';

router.onReady(function(){
    const skipIntro = Cookie.get('skipIntro') !== 'false';

    if(router.history.current.name == 'intro' && skipIntro){
        router.push('/orte');
    }
});


new Vue({
    el: '#root',
    router,
    render: h => h(App)
});