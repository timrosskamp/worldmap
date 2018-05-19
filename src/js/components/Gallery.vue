<template>
    <div class="c-Gallery">
        <div class="c-Gallery__slider" ref="slider">
            <img class="c-Gallery__img" v-for="img in images" :src="prefix + img.url" :style="{ objectPosition: img.position }">
        </div>
    </div>
</template>

<script>

export default {
    data(){
        return {
            prefix: '/assets/img/machu_picchu/',
            images: [{
                url: 'machu_picchu_1.jpg',
                position: '50% 50%'
            }, {
                url: 'machu_picchu_2.jpg',
                position: '50% 50%'
            }, {
                url: 'machu_picchu_3.jpg',
                position: '50% 50%'
            }, {
                url: 'machu_picchu_4.jpg',
                position: '50% 50%'
            }, {
                url: 'machu_picchu_5.jpg',
                position: '50% 50%'
            }]
        }
    },
    mounted(){
        // TODO: Create a slider
    }
}

</script>