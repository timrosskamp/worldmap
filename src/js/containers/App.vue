<template>
    <div class="app">
        <Scene />
        <router-view></router-view>
    </div>
</template>

<script>
import Scene from 'components/engine/Scene';
import Intro from 'components/Intro';

export default {
    name: 'App',
    components: {
        Scene,
        Intro
    }
}
</script>