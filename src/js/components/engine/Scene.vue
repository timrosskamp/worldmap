<template>
    <div v-bind:class="['c-Scene', isGrabbing ? '-grabbing' : '']">
        <router-link v-for="marker in markers" class="c-Scene__marker" v-bind:style="marker.style" :to="`/orte/${marker.slug}`">
            <img src="https://placehold.it/48x48">
            <span class="u-visuallyhidden">{{ marker.name }}</span>
        </router-link>
    </div>
</template>

<script>
// Modules
import TWEEN from '@tweenjs/tween.js';

// Components
import {
    controls,
    renderer,
    camera,
    lights,
    earth$,
    markers,
    scene,
    pivot
} from 'components/engine/core';

// Utils
import { CAMERA_DEFAULT_Z } from 'utils';


export default {
    data(){
        return {
            isGrabbing: false,
            markers: markers.items
        }
    },
    created(){
        controls.down$.subscribe(() => {
            this.isGrabbing = true;
        });

        controls.up$.subscribe(() => {
            this.isGrabbing = false;
        });
    },
    mounted(){
        this.init();
    },
    methods: {
        init(){
            // Initialize
            this.initEarth();

            // Events
            this.$router.afterEach(this.onRouteChange.bind(this));

            // Methods
            this.initialRoute();

            // Append DOM Element
            this.$el.appendChild(renderer.domElement);

            // Run
            this.kickoff();
        },
        initEarth(){
            earth$.subscribe(earth => {
                pivot.add(earth);
            });
        },
        focus(marker, animated = true){
            const duration = animated === true ? 2000 : 0;
            controls.disabled = true;
            controls.stop();
            marker.active = true;

            // Ensure that the y rotation isn't greater than pi or less than -pi
            while(pivot.rotation.y > Math.PI || pivot.rotation.y < -Math.PI){
                pivot.rotation.y -= Math.PI * 2 * Math.sign(pivot.rotation.y);
            }

            // Rotate Pivot to face camera
            new TWEEN.Tween(pivot.rotation)
            .to({
                y: marker.location.lng * (Math.PI / -180),
                x: marker.location.lat * (Math.PI / 180)
            }, duration)
            .easing(TWEEN.Easing.Sinusoidal.InOut)
            .start();

            // Zoom camera in
            new TWEEN.Tween(camera.position)
            .to({
                z: 6,
                y: -3
            }, duration)
            .easing(TWEEN.Easing.Sinusoidal.InOut)
            .start();

            // Tilt camera a bit
            new TWEEN.Tween(camera.rotation)
            .to({
                x: 1.2
            }, duration)
            .easing(TWEEN.Easing.Sinusoidal.InOut)
            .start();
        },
        blur(marker){
            marker.active = false;

            // Rotate the pivot a bit, so that the camera isn't directly above the marker
            new TWEEN.Tween(pivot.rotation)
            .to({
                x: pivot.rotation.x - 0.25
            }, 2000)
            .easing(TWEEN.Easing.Sinusoidal.InOut)
            .start();

            // Reset camera rotation
            new TWEEN.Tween(camera.rotation)
            .to({
                x: 0
            }, 2000)
            .easing(TWEEN.Easing.Sinusoidal.InOut)
            .start();

            // Reset camera position
            new TWEEN.Tween(camera.position)
            .to({
                z: CAMERA_DEFAULT_Z,
                y: 0
            }, 2000)
            .easing(TWEEN.Easing.Sinusoidal.InOut)
            .onComplete(() => {
                controls.disabled = false;
            })
            .start();
        },
        kickoff(){
            const animate = () => {
                renderer.render(scene, camera)
                controls.update();
                TWEEN.update();
                markers.render();
                requestAnimationFrame(animate);
            }
            requestAnimationFrame(animate);
        },
        initialRoute(){
            const currentMarker = 'place' in this.$router.history.current.params ? this.markers.find(marker => {
                return marker.slug === this.$router.history.current.params.place;
            }) : undefined;

            if(currentMarker){
                this.focus(currentMarker, false);
            }
        },
        onRouteChange(to, from, next){
            const prevMarker = 'place' in from.params ? this.markers.find(marker => {
                return marker.slug === from.params.place;
            }) : undefined;
            const nextMarker = 'place' in to.params ? this.markers.find(marker => {
                return marker.slug === to.params.place;
            }) : undefined;

            if(prevMarker !== nextMarker){
                if(nextMarker){
                    this.focus(nextMarker);
                }else if(prevMarker){
                    this.blur(prevMarker);
                }
            }
        }
    }
}
</script>