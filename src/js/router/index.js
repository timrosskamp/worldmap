// Modules
import Vue from 'vue';
import VueRouter from 'vue-router';

// Components
import Place from 'components/Place';
import Intro from 'components/Intro';
import Gallery from 'components/Gallery';


Vue.use(VueRouter);

export default new VueRouter({
    routes: [{
        path: '/orte/:place',
        name: 'place',
        component: Place,
        children: [{
            path: 'galerie',
            component: Gallery
        }]
    }, {
        path: '/',
        name: 'intro',
        component: Intro
    }]
});