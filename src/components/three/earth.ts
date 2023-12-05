// Modules
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader';
import { Object3D, Matrix4 } from 'three';
import { scene } from './scene';

const group = new Object3D();
scene.add(group);

// Loads the Earth Object and adds it to the Scene
(function loadEarth(){
    const objLoader = new OBJLoader();
    const mtlLoader = new MTLLoader();

    mtlLoader.load('models/earth.mtl', materialCreator => {
        materialCreator.preload();

        objLoader.setMaterials(materialCreator);

        objLoader.load('models/earth.obj', earth => {
            earth.name = "Earth";
            group.add(earth);
        });
    });
})();

function loadShip(){
    const objLoader = new OBJLoader();
    const mtlLoader = new MTLLoader();

    mtlLoader.load('models/container_ship.mtl', materialCreator => {
        materialCreator.preload();

        objLoader.setMaterials(materialCreator);

        objLoader.load('models/container_ship.obj', ship => {
            ship.name = 'Container Ship';

            ship.scale.set(0.1, 0.1, 0.1);
            ship.position.set(-1.22376, 1.65383, 1.82092);
            ship.lookAt(group.position);

            group.add(ship);
        });
    });
}

export {
    group as earth
}