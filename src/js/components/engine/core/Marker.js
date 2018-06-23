import { Object3D, Vector3 } from 'three';

import { camera } from './camera';
import { pivot } from './pivot';
import { renderer } from './renderer';

// Utils
import { convertCoordsToVector } from 'utils';

export class Marker {
    constructor({ location, name, slug }){
        this.location = location;
        this.name = name;
        this.slug = slug;
        this.css = {
            transform: ""
        }

        const position = convertCoordsToVector(location.lat, location.lng, 4.5);

        this._pos = new Object3D();

        this._pos.position.set(position.x, position.y, position.z);

        pivot.add(this._pos);
    }
    object(){
        return this._pos;
    }
    _getXYonScreen(){
        const pos = new Vector3(
            this._pos.position.x,
            this._pos.position.y,
            this._pos.position.z
        ).project(camera);

        const screenDimentions = {
            width: renderer.domElement.width / 2,
            height: renderer.domElement.height / 2
        }

        return {
            x: (pos.x * screenDimentions.width) + screenDimentions.width,
            y: - (pos.y * screenDimentions.height) + screenDimentions.height
        }
    }
    render(){
        const pos = this._getXYonScreen();

        this.css.transform = `translate(${pos.x}px, ${pos.y}px)`;
    }
}