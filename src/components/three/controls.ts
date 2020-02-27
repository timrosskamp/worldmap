import { fromEvent, merge } from 'rxjs';
import { map, concatMap, pairwise, takeUntil } from 'rxjs/operators';
import { renderer } from './renderer';
import { earth } from './earth';
import { camera } from './camera';
import { Object3D } from 'three';
import { lerp } from '../../utils/lerp';


const MAX_POLAR_ANGLE = (Math.PI / 2) - 0.2;
const MIN_POLAR_ANGLE = (Math.PI / -2) + 0.2;
const MAX_CAMERA_ZOOM = 6;
const MIN_CAMERA_ZOOM = 20;

const FRICTION = 0.1;
const ZOOM_FRICTION = 0.1;
const DAMPING = 0.0002;
const ZOOM_DAMPING = 0.05;
const AUTOROTATE = 0 /* 0.001 */;


class Controls {
    private readonly object = earth;
    private readonly domElement = renderer.domElement;
    
    private disabled: boolean = false;
    private velocity = {
        x: 0,
        y: 0,
        zoom: 0
    }
    private isDragging: boolean = false;
    
    constructor(){
        const mouseEventMap = (evt: any) => {
            evt.preventDefault();
            return {
                x: evt.clientX,
                y: evt.clientY
            }
        }

        const touchEventMap = (evt: any) => {
            evt.preventDefault();
            return {
                x: evt.changedTouches[0].clientX,
                y: evt.changedTouches[0].clientY
            }
        }

        const mouseDown$ = fromEvent(this.domElement, 'mousedown').pipe(
            map(mouseEventMap)
        );
        const mouseMove$ = fromEvent(window, 'mousemove').pipe(
            map(mouseEventMap)
        );
        const mouseUp$ = fromEvent(window, 'mouseup').pipe(
            map(mouseEventMap)
        );

        const touchDown$ = fromEvent(this.domElement, 'touchstart').pipe(
            map(touchEventMap)
        );
        const touchMove$ = fromEvent(window, 'touchmove').pipe(
            map(touchEventMap)
        );
        const touchUp$ = fromEvent(window, 'touchend').pipe(
            map(touchEventMap)
        );

        const down$ = merge(mouseDown$, touchDown$);
        const move$ = merge(mouseMove$, touchMove$);
        const up$ = merge(mouseUp$, touchUp$);

        down$.subscribe(() => {
            this.isDragging = true;
        });

        up$.subscribe(() => {
            this.isDragging = false;
        });

        const drag$ = down$.pipe(
            concatMap(() => {
                return move$.pipe(
                    pairwise(),
                    takeUntil(up$)
                )
            }),
            map(evt => {
                return {
                    x: evt[1].x - evt[0].x,
                    y: evt[1].y - evt[0].y
                }
            })
        );

        drag$.subscribe(evt => {
            if( this.disabled ){
                return;
            }

            this.velocity.x += evt.x * DAMPING;
            this.velocity.y += evt.y * DAMPING;
        });


        const mouseWheel = fromEvent(this.domElement, 'wheel');

        mouseWheel.subscribe((e: any) => {
            if( this.disabled ){
                return;
            }

            this.velocity.zoom += e.deltaY * ZOOM_DAMPING;
        });
    }
    stop(){
        this.velocity.x = 0;
        this.velocity.y = 0;
    }
    update(){
        this.velocity.x = lerp(this.velocity.x, (this.disabled || this.isDragging) ? 0 : AUTOROTATE, FRICTION);
        this.velocity.y = lerp(this.velocity.y, 0, FRICTION);
        this.velocity.zoom = lerp(this.velocity.zoom, 0, ZOOM_FRICTION);

        this.object.rotation.y += this.velocity.x;

        if( (this.velocity.y < 0 || this.object.rotation.x < MAX_POLAR_ANGLE) && (this.velocity.y > 0 || this.object.rotation.x > MIN_POLAR_ANGLE) ){
            this.object.rotation.x += this.velocity.y;
        }

        if( (this.velocity.zoom < 0 || camera.position.z < MIN_CAMERA_ZOOM) && (this.velocity.zoom > 0 || camera.position.z > MAX_CAMERA_ZOOM) ){
            camera.position.z += this.velocity.zoom;
            // camera.rotation.x = ((camera.position.z - MIN_CAMERA_ZOOM) * -1) / 30;
            // camera.position.y = (camera.position.z - MIN_CAMERA_ZOOM) / 8;
        }
    }
}

export const controls = new Controls();