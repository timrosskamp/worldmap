// Modules
import { BufferGeometryLoader, Mesh, MeshPhongMaterial } from 'three';
import { Observable } from 'rxjs';

export const earth$ = Observable.create(observer => {
    const loader = new BufferGeometryLoader();

    loader.load('/assets/json/earth.json', geometry => {
        geometry.computeVertexNormals();

        const earth = new Mesh(geometry, [
            new MeshPhongMaterial({
                color: 0x003CFF,
                flatShading: true
            }),
            new MeshPhongMaterial({
                color: 0xEEEEEE,
                flatShading: true
            }),
            new MeshPhongMaterial({
                color: 0x0ABE06,
                flatShading: true
            })
        ]);

        observer.next(earth);
        observer.complete();
    });
});