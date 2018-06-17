<template>
    <transition name="c-Place">
        <div class="c-Place" v-if="place">
            <router-link to="/orte">
                <svg class="c-Place__close">
                    <circle class="circle" cx="24" cy="24" r="23" />
                    <use xlink:href="#icon-close" fill="#fff" width="24" height="24" x="12" y="12"></use>
                </svg>
            </router-link>
            <div class="c-Place__hero">
                <div class="c-Place__country u-text-oldStyle">{{ place.country }}</div>
                <h2 class="c-Place__title"><span>{{ place.name }}</span></h2>
            </div>
            <div class="c-Place__opener">
                <router-link v-bind:to="'/orte/' + $route.params.place + '/galerie'" class="link">
                    Leertaste gedrückt halten
                </router-link>
            </div>
            <router-view></router-view>
        </div>
    </transition>
</template>

<script>
// Data
import places from 'data/places';

export default {
    name: 'place',
    data(){
        return {
            place: places.find(place => {
                if(place.slug === this.$route.params.place){
                    return place;
                }
            })
        }
    }
}
</script>