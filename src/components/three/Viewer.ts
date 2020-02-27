import { renderer } from './renderer';
import { camera } from './camera';
import { scene } from './scene';
import { controls } from './controls';
import './lights';
import './earth';

class Viewer {
    constructor({ el }: { el: HTMLElement }){
        el.appendChild(renderer.domElement);

        this.startRenderLoop();
    }
    private startRenderLoop(){
        const animate = () => {
            renderer.render(scene, camera);
            controls.update();
            // TWEEN.update();
            requestAnimationFrame(animate);
        }
        requestAnimationFrame(animate);
    }
}

export default Viewer;