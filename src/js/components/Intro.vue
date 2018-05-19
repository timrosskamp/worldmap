<template>
    <transition name="c-Intro">
        <div class="c-Intro">
            <div class="c-Intro__content">
                <div class="c-Intro__blockquote">
                    <blockquote class="c-Intro__quote  u-oldStyle">Die größte Sehens&shy;würdig&shy;keit, die es gibt, ist die Welt &ndash; sieh sie dir an.</blockquote>
                    <p>Kurt Tucholsky</p>
                </div>
                <p>
                    Auf dieser Internetseite möchte ich festhalten, welche Orte ich in meinem Leben einmal bereisen möchte.
                </p>
                <p class="c-Intro__checkbox">
                    <label><input type="checkbox" v-on:change="change" v-bind:checked="defaultChecked" /> Intro nicht nochmal zeigen.</label>
                </p>
                <p>
                    <router-link class="o-btn" to="/orte">weiter</router-link>
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