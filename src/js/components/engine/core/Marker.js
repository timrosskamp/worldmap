import { Sprite, SpriteMaterial, TextureLoader } from 'three';

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

        this._sprite = new Sprite(
            new SpriteMaterial({
                map: new TextureLoader().load("/assets/img/target.png"),
                color: 0xffffff
            })
        );

        console.log(this._sprite);

        this._sprite.position.set(position.x, position.y, position.z);

        pivot.add(this._sprite);
    }
    object(){
        return this._sprite;
    }
}