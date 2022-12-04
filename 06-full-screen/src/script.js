import "./style.css";
import * as THREE from "three";
import {OrbitControls, orbitControls} from 'three/examples/jsm/controls/OrbitControls';

// Canvas
const canvas = document.querySelector("canvas.webgl");

const cursor = {
  x: 0,
  y: 0,
};
window.addEventListener("mousemove", (e) => {
  cursor.x = -(e.clientX / sizes.width - 0.5);
  cursor.y = e.clientY / sizes.height - 0.5;

});
// Scene
const scene = new THREE.Scene();

// Object
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

// Sizes
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

// Handle resizes
window.addEventListener('resize', () => {
  // Get the new sizes
  sizes.width = window.innerWidth
  sizes.height = window.innerHeight

  // update camera
  camera.aspect = sizes.width / sizes.height
  camera.updateProjectionMatrix();
  renderer.setPixelRatio(Math.min(window.devicePixelRatio,2))
  renderer.setSize(sizes.width, sizes.height);
})

// Camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
);

window.addEventListener('dblclick', () => {
  if(!document.fullscreenElement){
    canvas.requestFullscreen();
  }else{
    document.exitFullscreen();
  }
})

const controls = new OrbitControls(camera, canvas);
// damping will enalbe a smooth animation when we control the object but we will need to update the controls in each frame 
controls.enableDamping = true;
camera.position.z = 3;
scene.add(camera);

// Renderer
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setPixelRatio(Math.min(window.devicePixelRatio,2))
renderer.setSize(sizes.width, sizes.height);

const clock = new THREE.Clock();

// Animations
const tick = () => {
  const elapsedTime = clock.getElapsedTime();

//   camera.position.x = Math.sin(cursor.x * Math.PI * 2) * 3;
//   camera.position.z = Math.cos(cursor.x * Math.PI * 2) * 3;
//   camera.position.y = cursor.y * 5;

//   camera.lookAt(mesh.position);

// update controls for the dummping 
controls.update(); 
  // Render
  renderer.render(scene, camera);
  window.requestAnimationFrame(tick);
};

tick();
