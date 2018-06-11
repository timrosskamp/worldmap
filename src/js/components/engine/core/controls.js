// Modules
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/concatMap';
import 'rxjs/add/operator/pairwise';
import 'rxjs/add/operator/takeUntil';

// Utils
import { lerp, MAX_POLAR_ANGLE, MIN_POLAR_ANGLE } from 'utils';

// Components
import { renderer } from './renderer';
import { pivot } from './pivot';


class Controls {
    constructor(){
        this.object = pivot;
        this.domElement = renderer.domElement;
        this.disabled = false;

        this.friction = 0.1;
        this.damping = 0.05;
        this.autototate = 1;

        this._velocity = {
            x: 0,
            y: 0
        }

        this._defineObservables();

        this.drag$.subscribe(evt => {
            if( this.disabled ){
                return;
            }

            this._velocity.x += evt.x * this.damping;
            this._velocity.y += evt.y * this.damping;
        });
    }
    _defineObservables(){
        const mouseEventMap = evt => {
            evt.preventDefault();
            return {
                x: evt.clientX,
                y: evt.clientY
            }
        }

        const touchEventMap = evt => {
            evt.preventDefault()
            return {
                x: evt.changedTouches[0].clientX,
                y: evt.changedTouches[0].clientY
            }
        }

        const mouseDown$ = Observable.fromEvent(this.domElement, 'mousedown').map(mouseEventMap);
        const mouseMove$ = Observable.fromEvent(window, 'mousemove').map(mouseEventMap);
        const mouseUp$ = Observable.fromEvent(window, 'mouseup').map(mouseEventMap);

        const touchDown$ = Observable.fromEvent(this.domElement, 'touchstart').map(touchEventMap);
        const touchMove$ = Observable.fromEvent(window, 'touchmove').map(touchEventMap);
        const touchUp$ = Observable.fromEvent(window, 'touchend').map(touchEventMap);

        const down$ = Observable.merge(mouseDown$, touchDown$);
        const move$ = Observable.merge(mouseMove$, touchMove$);
        const up$ = Observable.merge(mouseUp$, touchUp$);

        this.drag$ = down$
        .concatMap(() => {
            return move$.pairwise().takeUntil(up$);
        })
        .map(evt => {
            return {
                x: evt[1].x - evt[0].x,
                y: evt[1].y - evt[0].y
            }
        });
    }
    stop(){
        this._velocity.x = 0;
        this._velocity.y = 0;
    }
    update(){
        this._velocity.x = lerp(this._velocity.x, this.disabled ? 0 : this.autototate, this.friction);
        this._velocity.y = lerp(this._velocity.y, 0, this.friction);

        this.object.rotation.y += this._velocity.x * 0.002;

        if((this._velocity.y < 0 || this.object.rotation.x < MAX_POLAR_ANGLE) && (this._velocity.y > 0 || this.object.rotation.x > MIN_POLAR_ANGLE)){
            this.object.rotation.x += this._velocity.y * 0.002;
        }
    }
}

export const controls = new Controls();