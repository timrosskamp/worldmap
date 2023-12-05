import Viewer from './components/three/Viewer.js'

const $canvasWrapper = document.querySelector('#canvasWrapper')

const viewer = new Viewer({
    el: $canvasWrapper
});