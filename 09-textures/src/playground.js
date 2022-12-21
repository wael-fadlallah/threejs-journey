import "./style.css";
import * as THREE from "three";

/**
 * Canvas
 */

const canvas = document.querySelector("canvas");

/**
 * Scene
 */
const scene = new THREE.Scene();

const loadingManger = new THREE.LoadingManager();
const textureLoader = new THREE.TextureLoader(loadingManger);
const texture = textureLoader.load("/textures/new/ConcreteBlocksPavingHexagon006_COL_2K.png");

/**
 * An object
 */
const geometry = new THREE.SphereGeometry(4, 32, 32);
const material = new THREE.MeshBasicMaterial({ map: texture});

const object = new THREE.Mesh(geometry, material);
scene.add(object);


/**
 * A camera
 */

const sizes = {
  width: 600,
  height: 400,
};
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

camera.position.z = 10;
/**
 * A renderer
 */

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);

document.body.appendChild(renderer.domElement);



function tick() {
    requestAnimationFrame(tick)
    object.rotation.x += 0.005;
    object.rotation.y += 0.005;
    renderer.render(scene, camera);
};

tick();