// Modules
import { PerspectiveCamera } from 'three';

// Utils
import { CAMERA_DEFAULT_Z } from 'utils';


class Camera extends PerspectiveCamera {
    constructor(){
        super(
            40, // FOV
            window.innerWidth / window.innerHeight, // aspect ratio
            0.1, // near
            1000 // far
        );
        this.position.z = CAMERA_DEFAULT_Z;

        window.addEventListener('resize', (evt) => {
            this.aspect = window.innerWidth / window.innerHeight;
            this.updateProjectionMatrix();
        }, false);
    }
}

export const camera = new Camera();