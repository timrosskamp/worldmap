import { WebGLRenderer } from 'three';

import { isMobileDevice } from 'utils';

class Renderer extends WebGLRenderer {
    constructor(){
        super({
            alpha: true,
            antialias: isMobileDevice() ? false : true
        });

        this.setPixelRatio(window.devicePixelRatio);
        this.setSize(window.innerWidth, window.innerHeight);

        window.addEventListener('resize', (evt) => {
            this.setSize(window.innerWidth, window.innerHeight);
        }, false);
    }
}

export const renderer = new Renderer();