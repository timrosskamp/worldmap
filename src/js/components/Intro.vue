<template>
    <transition name="c-Intro">
        <div class="c-Intro">
            <div class="c-Intro__content">
                <p class="c-Intro__greeting  u-text-oldStyle">Hi,</p>
                <p>
                    ich bin Tim Roßkamp und ich dies ist meine persönliche Website. Hier halte
                    ich fest, welche besonderen Orte ich in meinen Leben gerne entdecken würde.
                </p>
                <blockquote class="c-Intro__blockquote">
                    Better to see something once than to hear about it a thousand times.
                </blockquote>
                <p>
                    Dieses Zitat beschreibt meine Motivation sehr gut. Ich glaube, dass das
                    Reisen und Entdecken eines der erfüllensten Dinge ist, die man im Leben
                    tun kann.
                </p>
                <p>
                    <router-link class="c-btn" to="/orte">ein wenig umschauen &raquo;</router-link>
                </p>
            </div>
        </div>
    </transition>
</template>

<script>
import Cookie from 'js-cookie';

export default {
    name: 'intro',
    data(){
        return {
            defaultChecked: Cookie.get('skipIntro') !== 'false'
        }
    },
    methods: {
        change: function(evt){
            Cookie.set('skipIntro', evt.target.checked, {
                path: '/',
                expires: 200
            });
        }
    }
}
</script>