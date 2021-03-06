import * as THREE from 'three';
import Cursor from './Cursor';

window.THREE = THREE;

/*------------------------------------------------------------------------------------
    Controller
------------------------------------------------------------------------------------*/

export class Controller {
    constructor(canvas,retina) {
        this.currentScene;
        this.canvas = canvas;

        this.renderer = new THREE.WebGLRenderer({ canvas: this.canvas});
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setPixelRatio(retina ? window.devicePixelRatio : 1);

        this.pageScroll = false;
        this.cursor = new Cursor();
        this.cursor.onTouchStart = this.onTouchStart.bind(this);
        this.cursor.onTouchMove = this.onTouchMove.bind(this);
        this.cursor.onTouchEnd = this.onTouchEnd.bind(this);

        window.addEventListener('orientationchange', this.onOrientationDevice.bind(this));
        window.addEventListener('resize', this.onWindowResize.bind(this));

        this.animate();
    }

    animate() {
        if (this.currentScene) {
            this.currentScene.tick();
        }
        requestAnimationFrame(this.animate.bind(this));
    }

    setScene(scene) {
        console.log('setScene');
        this.currentScene = scene;
        this.onWindowResize();
    }

    onWindowResize() {
        var width = window.innerWidth;
        var height = window.innerHeight;
        this.renderer.setSize(width, height);

        if (this.currentScene) {
            this.currentScene.Resize(width, height);
        }
    }

    onOrientationDevice() {
        this.onWindowResize();
    }

    onTouchStart(event) {
        if (this.currentScene) {
            this.currentScene.onTouchStart(this.cursor);
        }
    }

    onTouchMove(event) {
        if (!this.pageScroll) {
            event.preventDefault();
        }

        if (this.currentScene) {
            this.currentScene.onTouchMove(this.cursor);
        }
    }

    onTouchEnd(event) {
        if (this.currentScene) {
            this.currentScene.onTouchEnd(this.cursor);
        }
    }
}

/*------------------------------------------------------------------------------------
    BaseScene
------------------------------------------------------------------------------------*/

export class BaseScene {
    constructor(renderer) {
        this.renderer = renderer;
        this.scene = new THREE.Scene();
        this.clock = new THREE.Clock();
        this.camera = new THREE.PerspectiveCamera(50, innerWidth / innerHeight, 0.1, 1000);
        this.time = 0;
        this.deltaTime;
    }

    tick(){
        this.deltaTime = this.clock.getDelta();
        this.time += this.deltaTime;
        this.animate();
    }

    animate(){
    }

    onTouchStart(){
    }

    onTouchMove(){
    }

    onTouchEnd(){
    }
}


/*------------------------------------------------------------------------------------
    PostProcessing
------------------------------------------------------------------------------------*/
