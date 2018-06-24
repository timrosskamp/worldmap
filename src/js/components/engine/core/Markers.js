import { Object3D, Vector3, Matrix4 } from 'three';

// Scene
import { scene } from './scene';
import { camera } from './camera';
import { pivot } from './pivot';
import { renderer } from './renderer';

// Data
import places from 'data/places.json';

// Utils
import { convertCoordsToVector } from 'utils';



const vector = new Vector3();
const viewMatrix = new Matrix4();
const viewProjectionMatrix = new Matrix4();

let _widthHalf = 0;
let _heightHalf = 0;

class Marker {
    constructor({ location, name, slug }){
        this.location = location;
        this.name = name;
        this.slug = slug;
        this.style = {
            transform: ""
        }

        const position = convertCoordsToVector(location.lat, location.lng, 4.5);

        this._pos = new Object3D();

        this._pos.position.set(position.x, position.y, position.z);

        pivot.add(this._pos);
    }
    render(){
        vector.setFromMatrixPosition(this._pos.matrixWorld);
        vector.applyMatrix4(viewProjectionMatrix);

        this.style.transform = 'rotate(0.001deg) translate(-50%,-50%) translate(' + ( vector.x * _widthHalf + _widthHalf ) + 'px,' + ( - vector.y * _heightHalf + _heightHalf ) + 'px)';
    }
}

class Markers {
    constructor(){
        this.items = places.map(place => new Marker(place));
    }
    render(){
        scene.updateMatrixWorld();
        if( camera.parent === null ) camera.updateMatrixWorld();

        viewMatrix.copy(camera.matrixWorldInverse);
		viewProjectionMatrix.multiplyMatrices(camera.projectionMatrix, viewMatrix);

        _widthHalf = renderer.getSize().width / 2;
        _heightHalf = renderer.getSize().height / 2;

        this.items.forEach(marker => marker.render());
    }
}

export const markers = new Markers();