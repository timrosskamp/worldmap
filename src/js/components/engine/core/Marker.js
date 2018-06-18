import { Mesh, ConeGeometry, MeshPhongMaterial, Vector3 } from 'three';

import { pivot } from './pivot';

// Utils
import { convertCoordsToVector } from 'utils';

export class Marker {
    constructor({ location, name, slug }){
        this.location = location;
        this.name = name;
        this.slug = slug;
        this.active = false;

        const position = convertCoordsToVector(location.lat, location.lng, 4.5);

        this._cone = new Mesh(
            new ConeGeometry(
                0.15, // radius
                0.6, // height
                5 // radialSegments
            ),
            new MeshPhongMaterial({
                color: 0xbbddff,
                flatShading: true
            })
        );
        this._cone.geometry.rotateX(Math.PI / 2);
        this._cone.position.set(position.x, position.y, position.z);
        this._cone.lookAt(new Vector3(0,0,0));

        pivot.add(this._cone);
    }
    object(){
        return this._cone;
    }
}