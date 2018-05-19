// Modules
import { HemisphereLight, AmbientLight } from 'three';

// Components
import { scene } from './scene';


function Lights(){
    this.sun = new HemisphereLight(0xffffff, 0x080808, 1);
    this.sun.position.set(4,4,6);

    this.ambient = new AmbientLight(0x404040);

    scene.add(
        this.sun,
        this.ambient
    );

    return this;
}

export const lights = new Lights();