import * as THREE from 'three';

export default function ThreeModel() {
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

    const renderer = new THREE.WebGLRenderer()

    renderer.setSize( window.innerWidth, window.innerHeight );
    

    return (
        <div id='three-d-comp'>

        </div>
    );
};