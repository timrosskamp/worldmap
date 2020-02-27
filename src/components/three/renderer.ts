import { WebGLRenderer } from 'three';

class Renderer extends WebGLRenderer {
    constructor(){
        super({
            alpha: true,
            antialias: true
        });

        this.setPixelRatio(window.devicePixelRatio);
        this.setSize(window.innerWidth, window.innerHeight);

        window.addEventListener('resize', (evt) => {
            this.setSize(window.innerWidth, window.innerHeight);
        }, false);
    }
}

export const renderer = new Renderer();