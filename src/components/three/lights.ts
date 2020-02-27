import { HemisphereLight, AmbientLight } from 'three';
import { scene } from './scene';

const sun = new HemisphereLight(0xffffff, 0x080808, 1);
sun.position.set(4,4,6);

const ambient = new AmbientLight(0x404040);

scene.add(sun, ambient);

export { sun, ambient }