<template>
    <div class="c-Viewer" ref="canvasWrapper"></div>
</template>

<script>
    import Viewer from './three/Viewer';

    export default {
        mounted(){
            const viewer = new Viewer({
                el: this.$refs.canvasWrapper
            });
        }
    }
</script>

<style lang="scss">
    .c-Viewer {
        width: 100vw;
        height: 100vh;
        overflow: hidden;
        background: radial-gradient(
            #1f9ce3, /* innen */
            #1219a6 /* außen */
        );

        cursor: move;
        cursor: grab;
        
        &.-grabbing {
            cursor: grabbing;
        }
    }
</style>